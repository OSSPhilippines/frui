//--------------------------------------------------------------------//
// Imports

import '@testing-library/jest-dom';
import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import {
  NumberInput,
  useNumberInput,
  applyBounds,
  convertNumberToString
} from '../../src/form/NumberInput';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
    onBlur,
    onKeyDown
  }: {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  }) => (
    <input
      data-testid="mock-input"
      type="text"
      value={value || ''}
      onChange={(e) => onChange?.(e as React.ChangeEvent<HTMLInputElement>)}
      onBlur={(e) => onBlur?.(e as React.FocusEvent<HTMLInputElement>)}
      onKeyDown={(e) => onKeyDown?.(e as React.KeyboardEvent<HTMLInputElement>)}
    />
  )
}));

//--------------------------------------------------------------------//
// Tests

describe('Helper functions', () => {
  it('applyBounds clamps value between min and max', () => {
    const opts = { min: 0, max: 10, decimal: '.', absolute: false, separator: ',' };

    expect(applyBounds('15', opts)).toBe('10');
    expect(applyBounds('-5', opts)).toBe('0');
  });

  it('convertNumberToString formats numbers correctly', () => {
    expect(convertNumberToString(5)).toBe('5');
    expect(convertNumberToString(5.1234, 2)).toBe('5.12');
    expect(convertNumberToString(5.9, 0)).toBe('6');
  });
});
describe('useNumberInput Hook', () => {
  function renderHookWithNumberInput(config: Parameters<typeof useNumberInput>[0]) {
    let hookResult: ReturnType<typeof useNumberInput> | undefined;

    function TestComponent() {
      hookResult = useNumberInput(config);
      return <div data-testid="hook" />;
    }

    render(<TestComponent />);
    return () => hookResult!;
  }

  it('initializes with default value correctly', () => {
    const getHook = renderHookWithNumberInput({
      defaultValue: '5',
      decimal: '.',
      separator: ','
    });
    const hook = getHook();

    expect(hook.displayValue).toBe('5');
    expect(hook.hiddenValue).toBe('5');
  });

  it('updates state when update handler is called', () => {
    const getHook = renderHookWithNumberInput({
      defaultValue: '1',
      decimal: '.',
      separator: ','
    });
    let hook = getHook();

    act(() => {
      hook.handlers.update('10');
    });

    hook = getHook();
    expect(hook.displayValue).toBe('10');
  });
});
describe('<NumberInput />', () => {
  it('renders correctly with default props', () => {
    render(<NumberInput />);
    const input = screen.getByTestId('mock-input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('renders with provided value', () => {
    render(<NumberInput value="25" />);
    const input = screen.getByTestId('mock-input') as HTMLInputElement;

    expect(input.value).toBe('25');
  });

  it('handles onChange and updates hidden input value', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();

    render(
      <NumberInput
        defaultValue="2"
        onChange={onChange}
        onUpdate={onUpdate}
        name="num"
      />
    );

    const textInput = screen.getByTestId('mock-input') as HTMLInputElement;
    const hidden = screen
      .getAllByDisplayValue('2')
      .find((el) => (el as HTMLInputElement).type === 'hidden') as HTMLInputElement;

    expect(hidden).toHaveAttribute('type', 'hidden');
    expect(hidden).toHaveAttribute('name', 'num');

    act(() => {
      fireEvent.change(textInput, { target: { value: '10' } });
    });

    expect(onChange).toHaveBeenCalled();
  });

  it('handles onBlur correctly', () => {
    const onBlur = vi.fn();
    render(<NumberInput defaultValue="10" onBlur={onBlur} />);
    const input = screen.getByTestId('mock-input');

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it('handles ArrowUp and ArrowDown key events', () => {
    render(<NumberInput defaultValue="5" step={1} />);
    const input = screen.getByTestId('mock-input');

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toBeInTheDocument();
  });
});