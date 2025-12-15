//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import TextList, {
  TextListFields,
  useTextList
} from '../../src/form/TextList.js';

//--------------------------------------------------------------------//
// Tests

describe('useTextList()', () => {
  it('updates a value in the correct index', () => {
    const setMock = vi.fn();
    const values = [ 'a', 'b', 'c' ];
    const { result } = renderHook(() =>
      useTextList({ values, index: 1, set: setMock })
    );
    act(() => result.current.handlers.update('newVal'));
    expect(setMock).toHaveBeenCalledWith([
      'a',
      'newVal',
      'c'
    ]);
  });

  it('removes value by setting undefined at index', () => {
    const setMock = vi.fn();
    const values = [ 'a', 'b' ];
    const { result } = renderHook(() =>
      useTextList({ values, index: 0, set: setMock })
    );
    act(() => result.current.handlers.remove());
    expect(setMock).toHaveBeenCalledWith([ undefined, 'b' ]);
  });
});

describe('<TextListFields />', () => {
  it(
    'renders input field and remove button correctly',
    () => {
      const setMock = vi.fn();
      render(
        <TextListFields
          name="list"
          config={{ placeholder: 'Enter value' }}
          values={[ 'value1' ]}
          index={0}
          error={false}
          set={setMock}
        />
      );
      const input = screen.getByRole('textbox');
      const button = screen.getByText('×');
      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(input).toHaveAttribute(
        'placeholder',
        'Enter value'
      );
    }
  );

  it(
    'invokes onUpdate on input change and remove on click',
    () => {
      const setMock = vi.fn();
      render(
        <TextListFields
          name="list"
          config={{ placeholder: 'Type here' }}
          values={[ undefined ]}
          index={0}
          error={false}
          set={setMock}
        />
      );
      const input = screen.getByRole('textbox');
      const button = screen.getByText('×');
      fireEvent.change(input, {
        target: { value: 'typed text' }
      });
      expect(setMock).toHaveBeenCalled();
      fireEvent.click(button);
      expect(setMock).toHaveBeenCalled();
    }
  );

  it('renders hidden input when value is a string', () => {
    const setMock = vi.fn();
    const { container } = render(
      <TextListFields
        name="items"
        config={{}}
        values={[ 'abc' ]}
        index={0}
        error={false}
        set={setMock}
      />
    );
    const hidden = container.querySelector(
      'input[ type="hidden" ]'
    ) as HTMLInputElement;
    expect(hidden).toBeInTheDocument();
    expect(hidden).toHaveAttribute('type', 'hidden');
    expect(hidden).toHaveAttribute('name', 'items');
    expect(hidden).toHaveValue('abc');
  });
});

describe('<TextList />', () => {
  it('renders add button provided by Fieldset wrapper', () => {
    render(
      <TextList name="wrapper" placeholder="add something..." />
    );
    const addButton = screen.getByRole('button', {
      name: /add/i
    });
    expect(addButton).toBeInTheDocument();
  });
});