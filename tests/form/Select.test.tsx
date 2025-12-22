//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
//frui
import Select, { SelectPlaceholder } from '../../src/form/Select.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('src/helpers/getClassStyles.js', () => ({
  __esModule: true,
  default: ({
    classes,
    props,
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

describe('<Select />', () => {
  it('renders base wrapper and placeholder text', () => {
    render(
      <Select placeholder="Pick one">
        <SelectPlaceholder>Pick one</SelectPlaceholder>
      </Select>
    );
    const wrapper = document.querySelector('.frui-form-select');
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('applies error class when error prop set', () => {
    const { container } = render(<Select error />);
    const wrapper = container.querySelector('.frui-form-select');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.className).toContain('frui-form-select-error');
  });

  it('toggles dropdown open on placeholder click', () => {
    render(
      <Select
        options={[
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' }
        ]}
      >
        <SelectPlaceholder>Click me</SelectPlaceholder>
      </Select>
    );
    const toggle = screen.getByText('Click me');
    fireEvent.click(toggle);
    expect(
      document.querySelector(
        '.frui-form-select-control-actions-toggle'
      )
    ).toBeInTheDocument();
  });

  it('calls onUpdate when external value changes', async () => {
    const onUpdate = vi.fn();
    const { rerender } = render(
      <Select
        onUpdate={onUpdate}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
        value="yes"
      />
    );
    rerender(
      <Select
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

  it('adds hidden input after selection', async () => {
    const { rerender } = render(
      <Select
        name="colors"
        options={[ { value: 'blue', label: 'Blue' } ]}
        value=""
      />
    );
    rerender(
      <Select
        name="colors"
        options={[ { value: 'blue', label: 'Blue' } ]}
        value="blue"
      />
    );
    await waitFor(() => {
      const hidden = document.querySelector(
        'input[ type="hidden" ]'
      ) as HTMLInputElement;
      expect(hidden).toBeInTheDocument();
      expect(hidden.name).toBe('colors');
      expect(hidden.value).toBe('blue');
    });
  });

  it('supports multiple selections and clear button', async () => {
    const { rerender } = render(
      <Select
        multiple
        name="multi"
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]}
        value={[]}
      />
    );
    rerender(
      <Select
        multiple
        name="multi"
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]}
        value={[ 'a', 'b' ]}
      />
    );
    await waitFor(() => {
      const clearBtn = document.querySelector(
        '.frui-form-select-control-actions-clear'
      );
      expect(clearBtn).toBeInTheDocument();
      fireEvent.click(clearBtn!);
      const inputs = document.querySelectorAll(
        'input[ type="hidden" ]'
      );
      expect(inputs.length).toBe(0);
    });
  });

  it(
    'renders correct selected option when value prop provided',
    async () => {
      const { rerender, container } = render(
        <Select
          options={[
            { value: 'opt1', label: 'Opt1' },
            { value: 'opt2', label: 'Opt2' }
          ]}
          value="opt2"
        />
      );
      const control = container.querySelector(
        '.frui-form-select-control-selected'
      );
      expect(control).toBeInTheDocument();
      expect(control?.textContent).toContain('Opt2');
      rerender(
        <Select
          options={[
            { value: 'opt1', label: 'Opt1' },
            { value: 'opt2', label: 'Opt2' }
          ]}
          value="opt1"
        />
      );
      await waitFor(() => {
        const updated = container.querySelector(
          '.frui-form-select-control-selected'
        );
        expect(updated).toBeInTheDocument();
        expect(updated?.textContent).toContain('Opt1');
      });
    }
  );
});