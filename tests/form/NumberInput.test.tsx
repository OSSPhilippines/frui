//--------------------------------------------------------------------//
// Imports

//modules
import type {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent
} from 'react';
//tests
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import {
  NumberInput,
  applyBounds,
  convertNumberToString,
  countRawCharacters,
  createEmptyState,
  createStateFromInput,
  createStateFromSanitized,
  finalizeValue,
  findDisplayIndexForRawCount,
  formatDisplayValue,
  isDecimalToken,
  normalizeNegativeZero,
  replaceDecimalSymbol,
  resolveDecimalLimit,
  resolveNumericBound,
  sanitizeNumericString,
  shouldAllowDecimalFallback,
  toHiddenValue,
  useNumberInput
} from '../../src/form/NumberInput.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    onBlur,
    onChange,
    onKeyDown,
    value
  }: {
    value?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  }) => (
    <input
      data-testid="mock-input"
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type="text"
      value={value || ''}
    />
  )
}));

//--------------------------------------------------------------------//
// Helpers

const defaultOptions = {
  absolute: false,
  decimal: '.',
  separator: ',',
  min: undefined,
  max: undefined
};

function renderHookWithNumberInput(
  config: Parameters<typeof useNumberInput>[ 0 ]
) {
  let hookResult: ReturnType<typeof useNumberInput> | undefined;
  function TestComponent() {
    hookResult = useNumberInput(config);
    return <div data-testid="hook" />;
  }
  render(<TestComponent />);
  return () => hookResult!;
}

//--------------------------------------------------------------------//
// Tests

describe('Helper functions', () => {
  describe('applyBounds', () => {
    it('clamps value to max', () => {
      const opts = { ...defaultOptions, min: 0, max: 10 };
      expect(applyBounds('15', opts)).toBe('10');
    });

    it('clamps value to min', () => {
      const opts = { ...defaultOptions, min: 0, max: 10 };
      expect(applyBounds('-5', opts)).toBe('0');
    });

    it('returns empty for empty value', () => {
      expect(applyBounds('', defaultOptions)).toBe('');
    });

    it('preserves special values', () => {
      expect(applyBounds('-', defaultOptions)).toBe('-');
      expect(applyBounds('.', defaultOptions)).toBe('.');
      expect(applyBounds('-.', defaultOptions)).toBe('-.');
      expect(applyBounds('0.', defaultOptions)).toBe('0.');
      expect(applyBounds('-0.', defaultOptions)).toBe('-0.');
    });

    it('trims decimals when decimals option is set', () => {
      const opts = { ...defaultOptions, decimals: 2 };
      expect(applyBounds('5.12345', opts)).toBe('5.12');
    });

    it('removes decimals when decimals is 0', () => {
      const opts = { ...defaultOptions, decimals: 0 };
      expect(applyBounds('5.99', opts)).toBe('5');
    });
  });

  describe('convertNumberToString', () => {
    it('converts number to string', () => {
      expect(convertNumberToString(5)).toBe('5');
    });

    it('formats with decimals', () => {
      expect(convertNumberToString(5.1234, 2)).toBe('5.12');
    });

    it('rounds when decimals is 0', () => {
      expect(convertNumberToString(5.9, 0)).toBe('6');
    });
  });

  describe('countRawCharacters', () => {
    it('counts digits and minus', () => {
      expect(countRawCharacters('123', '.')).toBe(3);
      expect(countRawCharacters('-45', '.')).toBe(3);
    });

    it('counts decimal token', () => {
      expect(countRawCharacters('1.5', '.')).toBe(3);
      expect(countRawCharacters('1,5', ',')).toBe(3);
    });

    it('ignores separators', () => {
      expect(countRawCharacters('1,000', '.')).toBe(4);
    });
  });

  describe('createEmptyState', () => {
    it('creates empty state object', () => {
      const state = createEmptyState();
      expect(state).toEqual({
        raw: '',
        display: '',
        hidden: ''
      });
    });
  });

  describe('createStateFromInput', () => {
    it('creates state from string value', () => {
      const state = createStateFromInput('5', defaultOptions);
      expect(state.raw).toBe('5');
      expect(state.display).toBe('5');
      expect(state.hidden).toBe('5');
    });

    it('creates state from number value', () => {
      const state = createStateFromInput(10, defaultOptions);
      expect(state.raw).toBe('10');
    });

    it('creates empty state for undefined', () => {
      const state = createStateFromInput(undefined, defaultOptions);
      expect(state).toEqual(createEmptyState());
    });

    it('creates empty state for empty string', () => {
      const state = createStateFromInput('', defaultOptions);
      expect(state).toEqual(createEmptyState());
    });
  });

  describe('createStateFromSanitized', () => {
    it('creates state from sanitized value', () => {
      const state = createStateFromSanitized('5', defaultOptions);
      expect(state.raw).toBe('5');
      expect(state.display).toBe('5');
    });

    it('formats display with thousands separator', () => {
      const state = createStateFromSanitized('1000', defaultOptions);
      expect(state.display).toBe('1,000');
    });
  });

  describe('finalizeValue', () => {
    it('removes trailing decimal', () => {
      expect(finalizeValue('5.')).toBe('5');
    });

    it('returns empty for special cases', () => {
      expect(finalizeValue('-')).toBe('');
      expect(finalizeValue('.')).toBe('');
      expect(finalizeValue('-.')).toBe('');
    });

    it('preserves valid numbers', () => {
      expect(finalizeValue('5.5')).toBe('5.5');
    });
  });

  describe('findDisplayIndexForRawCount', () => {
    it('finds correct index for raw count', () => {
      expect(findDisplayIndexForRawCount('1,234', 2, '.')).toBe(3);
    });

    it('returns 0 for count <= 0', () => {
      expect(findDisplayIndexForRawCount('1,234', 0, '.')).toBe(0);
    });

    it('returns length when count exceeds', () => {
      expect(findDisplayIndexForRawCount('123', 10, '.')).toBe(3);
    });
  });

  describe('formatDisplayValue', () => {
    it('formats with thousands separator', () => {
      expect(formatDisplayValue('1000', defaultOptions)).toBe('1,000');
      expect(formatDisplayValue('1000000', defaultOptions)).toBe(
        '1,000,000'
      );
    });

    it('preserves negative sign', () => {
      expect(formatDisplayValue('-5', defaultOptions)).toBe('-5');
    });

    it('formats decimals correctly', () => {
      expect(formatDisplayValue('5.25', defaultOptions)).toBe('5.25');
    });

    it('handles trailing decimal', () => {
      expect(formatDisplayValue('5.', defaultOptions)).toBe('5.');
    });
  });

  describe('isDecimalToken', () => {
    it('detects decimal at index', () => {
      expect(isDecimalToken('1.5', 1, '.')).toBe(1);
    });

    it('detects multi-char decimal', () => {
      expect(isDecimalToken('1,5', 1, ',')).toBe(1);
    });

    it('returns 0 when no match', () => {
      expect(isDecimalToken('123', 1, '.')).toBe(0);
    });
  });

  describe('normalizeNegativeZero', () => {
    it('converts -0 to 0', () => {
      expect(normalizeNegativeZero('-0')).toBe('0');
      expect(normalizeNegativeZero('-0.0')).toBe('0.0');
    });

    it('preserves other negative numbers', () => {
      expect(normalizeNegativeZero('-5')).toBe('-5');
    });

    it('preserves positive numbers', () => {
      expect(normalizeNegativeZero('5')).toBe('5');
    });
  });

  describe('replaceDecimalSymbol', () => {
    it('replaces last decimal with dot', () => {
      expect(replaceDecimalSymbol('1,5', ',')).toBe('1.5');
    });

    it('removes duplicate decimals keeping last', () => {
      expect(replaceDecimalSymbol('1,2,3', ',')).toBe('12.3');
    });

    it('returns value when no decimal found', () => {
      expect(replaceDecimalSymbol('123', ',')).toBe('123');
    });
  });

  describe('resolveDecimalLimit', () => {
    it('returns decimals from step', () => {
      expect(resolveDecimalLimit('0.01')).toBe(2);
      expect(resolveDecimalLimit('0.5')).toBe(1);
    });

    it('returns 0 for integer step', () => {
      expect(resolveDecimalLimit('1')).toBe(0);
    });

    it('returns undefined for no step', () => {
      expect(resolveDecimalLimit(undefined)).toBeUndefined();
    });
  });

  describe('resolveNumericBound', () => {
    it('resolves number bound', () => {
      expect(resolveNumericBound(5, defaultOptions)).toBe(5);
    });

    it('resolves string bound', () => {
      expect(resolveNumericBound('10', defaultOptions)).toBe(10);
    });

    it('returns undefined for invalid', () => {
      expect(resolveNumericBound('abc', defaultOptions)).toBeUndefined();
      expect(resolveNumericBound(undefined, defaultOptions)).toBeUndefined();
    });
  });

  describe('sanitizeNumericString', () => {
    it('removes non-numeric characters', () => {
      expect(sanitizeNumericString('abc123', defaultOptions)).toBe(
        '123'
      );
    });

    it('handles negative numbers', () => {
      expect(sanitizeNumericString('-5', defaultOptions)).toBe('-5');
    });

    it('handles decimals', () => {
      expect(sanitizeNumericString('5.25', defaultOptions)).toBe('5.25');
    });

    it('removes separators', () => {
      expect(sanitizeNumericString('1,000', defaultOptions)).toBe(
        '1000'
      );
    });

    it('respects absolute option', () => {
      const opts = { ...defaultOptions, absolute: true };
      expect(sanitizeNumericString('-5', opts)).toBe('5');
    });

    it('limits decimals when specified', () => {
      const opts = { ...defaultOptions, decimals: 2 };
      expect(sanitizeNumericString('5.123', opts)).toBe('5.12');
    });

    it('normalizes leading dots', () => {
      expect(sanitizeNumericString('.5', defaultOptions)).toBe('0.5');
      expect(sanitizeNumericString('-.5', defaultOptions)).toBe('-0.5');
    });
  });

  describe('shouldAllowDecimalFallback', () => {
    it('disallows when decimal symbol exists', () => {
      expect(shouldAllowDecimalFallback('5.5', defaultOptions)).toBe(
        false
      );
    });

    it('disallows when no dot present', () => {
      expect(shouldAllowDecimalFallback('5', defaultOptions)).toBe(
        false
      );
    });
  });

  describe('toHiddenValue', () => {
    it('converts to hidden value', () => {
      expect(toHiddenValue('5')).toBe('5');
    });

    it('removes trailing decimal', () => {
      expect(toHiddenValue('5.')).toBe('5');
    });

    it('returns empty for minus', () => {
      expect(toHiddenValue('-')).toBe('');
    });

    it('normalizes negative zero', () => {
      expect(toHiddenValue('-0')).toBe('0');
    });
  });
});

describe('useNumberInput', () => {
  it('initializes with default value', () => {
    const getHook = renderHookWithNumberInput({
      defaultValue: '5',
      decimal: '.',
      separator: ','
    });
    const hook = getHook();
    expect(hook.displayValue).toBe('5');
    expect(hook.hiddenValue).toBe('5');
  });

  it('initializes with formatted value', () => {
    const getHook = renderHookWithNumberInput({
      defaultValue: '1000',
      decimal: '.',
      separator: ','
    });
    const hook = getHook();
    expect(hook.displayValue).toBe('1,000');
  });

  it('updates when update handler called', () => {
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

  it('calls onUpdate when value changes', () => {
    const onUpdate = vi.fn();
    const getHook = renderHookWithNumberInput({
      defaultValue: '5',
      decimal: '.',
      separator: ',',
      onUpdate
    });
    let hook = getHook();
    act(() => {
      hook.handlers.update('10');
    });
    hook = getHook();
    expect(onUpdate).toHaveBeenCalledWith(10);
  });

  it('respects min and max bounds', () => {
    const getHook = renderHookWithNumberInput({
      defaultValue: '5',
      min: 0,
      max: 10,
      decimal: '.',
      separator: ','
    });
    let hook = getHook();
    act(() => {
      hook.handlers.update('15');
    });
    hook = getHook();
    expect(hook.displayValue).toBe('10');
  });

  it('handles step increments', () => {
    const getHook = renderHookWithNumberInput({
      defaultValue: '5',
      step: 0.5,
      decimal: '.',
      separator: ','
    });
    const hook = getHook();
    expect(hook.displayValue).toBe('5');
  });
});

describe('NumberInput', () => {
  it('renders with empty value', () => {
    render(<NumberInput />);
    const input = screen.getByTestId('mock-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('renders with provided value', () => {
    render(<NumberInput value="25" />);
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;
    expect(input.value).toBe('25');
  });

  it('formats thousands separator', () => {
    render(<NumberInput value="1000" separator="," />);
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;
    expect(input.value).toBe('1,000');
  });

  it('handles onChange event', () => {
    const onChange = vi.fn();
    render(<NumberInput onChange={onChange} />);
    const input = screen.getByTestId('mock-input');

    act(() => {
      fireEvent.change(input, { target: { value: '10' } });
    });
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onUpdate with numeric value', () => {
    const onUpdate = vi.fn();
    render(<NumberInput defaultValue="2" onUpdate={onUpdate} />);
    const input = screen.getByTestId('mock-input');

    act(() => {
      fireEvent.change(input, { target: { value: '10' } });
    });
    expect(onUpdate).toHaveBeenCalledWith(10);
  });

  it('renders hidden input with name', () => {
    render(<NumberInput defaultValue="5" name="amount" />);
    const hidden = document.querySelector(
      'input[type="hidden"]'
    ) as HTMLInputElement;

    expect(hidden).toBeInTheDocument();
    expect(hidden.name).toBe('amount');
    expect(hidden.value).toBe('5');
  });

  it('handles onBlur event', () => {
    const onBlur = vi.fn();
    render(<NumberInput defaultValue="10" onBlur={onBlur} />);
    const input = screen.getByTestId('mock-input');

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it('handles ArrowUp key', () => {
    render(<NumberInput defaultValue="5" step={1} />);
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input.value).toBe('6');
  });

  it('handles ArrowDown key', () => {
    render(<NumberInput defaultValue="5" step={1} />);
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.value).toBe('4');
  });

  it('respects step increment', () => {
    render(<NumberInput defaultValue="5" step={0.5} />);
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input.value).toBe('5.5');
  });

  it('enforces min value', () => {
    const onUpdate = vi.fn();
    render(
      <NumberInput
        defaultValue="5"
        min={0}
        onUpdate={onUpdate}
      />
    );
    const input = screen.getByTestId('mock-input');

    act(() => {
      fireEvent.change(input, { target: { value: '-10' } });
      fireEvent.blur(input);
    });
    expect(onUpdate).toHaveBeenCalledWith(0);
  });

  it('enforces max value', () => {
    const onUpdate = vi.fn();
    render(
      <NumberInput
        defaultValue="5"
        max={10}
        onUpdate={onUpdate}
      />
    );
    const input = screen.getByTestId('mock-input');

    act(() => {
      fireEvent.change(input, { target: { value: '20' } });
      fireEvent.blur(input);
    });
    expect(onUpdate).toHaveBeenCalledWith(10);
  });

  it('handles absolute value mode', () => {
    render(<NumberInput absolute defaultValue="5" />);
    const input = screen.getByTestId('mock-input');

    act(() => {
      fireEvent.change(input, { target: { value: '-10' } });
    });
    const hiddenInput = document.querySelector(
      'input[type="hidden"]'
    ) as HTMLInputElement;
    expect(hiddenInput.value).toBe('10');
  });

  it('handles custom decimal symbol', () => {
    render(<NumberInput decimal="," value="5,5" />);
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;
    expect(input.value).toBe('5,5');
  });

  it('limits decimal places', () => {
    render(<NumberInput step="0.01" defaultValue="5.123" />);
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.blur(input);
    });
    expect(input.value).toBe('5.12');
  });

  it('removes invalid characters', () => {
    render(<NumberInput />);
    const input = screen.getByTestId('mock-input');

    act(() => {
      fireEvent.change(input, { target: { value: 'abc123' } });
    });
    const hiddenInput = document.querySelector(
      'input[type="hidden"]'
    ) as HTMLInputElement;
    expect(hiddenInput.value).toBe('123');
  });

  it('handles controlled value updates', () => {
    const { rerender } = render(<NumberInput value="5" />);
    let input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;
    expect(input.value).toBe('5');

    rerender(<NumberInput value="10" />);
    input = screen.getByTestId('mock-input') as HTMLInputElement;
    expect(input.value).toBe('10');
  });
});