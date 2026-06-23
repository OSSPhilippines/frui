//--------------------------------------------------------------------//
// Imports

//frui
import SuggestInput from '../../src/form/SuggestInput.js';
import '@testing-library/jest-dom';
import { 
  fireEvent, 
  render, 
  screen, 
  waitFor 
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

//--------------------------------------------------------------------//
// Mocks

vi.mock('src/helpers/getClassStyles.js', () => ({
  __esModule: true,
  default: ({
    classes,
    props,
    state
  }: {
    classes?: string[],
    props?: { className?: string, style?: object },
    state?: object
  }) => ({
    classes: classes || [],
    styles: props?.style || {}
  })
}));

//--------------------------------------------------------------------//
// Tests

describe('<SuggestInput />', () => {
  it('renders base wrapper and input field', () => {
    render(
      <SuggestInput placeholder="Type to search" />
    );
    const wrapper = 
      document.querySelector('.frui-form-suggest-input');
    expect(wrapper).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Type to search')
    ).toBeInTheDocument();
  });
  it('applies error class when error prop set', () => {
    const { container } = render(<SuggestInput error />);
    const wrapper = 
      container.querySelector('.frui-form-suggest-input');
    expect(wrapper).toBeInTheDocument();
    expect(
      wrapper?.className
    ).toContain('frui-form-suggest-input-error');
  });
  it('opens dropdown after typing minimum chars', () => {
    const onQuery = vi.fn();
    render(
      <SuggestInput
        chars={3}
        onQuery={onQuery}
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'apricot', label: 'Apricot' }
        ]}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'ap' } });
    expect(onQuery).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: 'app' } });
    expect(onQuery).toHaveBeenCalledWith('app');
  });
  it('calls onUpdate when external value changes', async () => {
    const onUpdate = vi.fn();
    const { rerender } = render(
      <SuggestInput
        onUpdate={onUpdate}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
        value="yes"
      />
    );
    rerender(
      <SuggestInput
        onUpdate={onUpdate}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
        value="no"
      />
    );
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith('no');
    });
  });
  it('shows controlled input value', async () => {
    const { rerender } = render(
      <SuggestInput
        name="search"
        options={[ { value: 'test', label: 'Test' } ]}
        value=""
      />
    );
    rerender(
      <SuggestInput
        name="search"
        options={[ { value: 'test', label: 'Test' } ]}
        value="test"
      />
    );
    await waitFor(() => {
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input).toBeInTheDocument();
      expect(input.name).toBe('search');
      expect(input.value).toBe('test');
    });
  });
  it('fetches remote suggestions with custom fetch prop', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { value: 'result1', label: 'Result 1' },
          { value: 'result2', label: 'Result 2' }
        ])
      } as Response)
    );
    render(
      <SuggestInput
        chars={2}
        fetch={mockFetch}
        remote="https://api.example.com/search?q={{QUERY}}"
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/search?q=test'
      );
    });
  });
  it(
    'renders correct selected value when value prop provided',
    async () => {
      const { rerender } = render(
        <SuggestInput
          options={[
            { value: 'opt1', label: 'Opt1' },
            { value: 'opt2', label: 'Opt2' }
          ]}
          value="opt2"
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('opt2');
      rerender(
        <SuggestInput
          options={[
            { value: 'opt1', label: 'Opt1' },
            { value: 'opt2', label: 'Opt2' }
          ]}
          value="opt1"
        />
      );
      await waitFor(() => {
        expect(input.value).toBe('opt1');
      });
    }
  );
});