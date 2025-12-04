//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent, FocusEvent, KeyboardEvent, RefObject } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
//frui
import type { ExtendsType } from '../types.js';
import type { InputProps } from './Input.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type FormatOptions = {
  //absolute value (no negatives)
  absolute: boolean,
  //decimal symbol
  decimal: string,
  //number of decimal places
  decimals?: number,
  //maximum value
  max?: number,
  //minimum value
  min?: number,
  //thousands separator
  separator: string
};

export type NumericState = {
  //formatted display value
  display: string,
  //hidden value (for form submission)
  hidden: string,
  //raw numeric value
  raw: string
};

export type NumberInputConfig = {
  //absolute value (no negatives)
  absolute?: boolean,
  //decimal symbol
  decimal?: string,
  //uncontrolled value
  defaultValue?: string | number,
  //maximum value
  max?: string | number,
  //minimum value
  min?: string | number,
  //handler when value changes
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  //handler when value updates
  onUpdate?: (value: number) => void,
  //reference to the input element
  ref?: RefObject<HTMLInputElement>,
  //thousands separator
  separator?: string,
  //incremental step (when using arrow keys)
  step?: string | number,
  //controlled value
  value?: string | number
};

export type NumberInputProps = ExtendsType<InputProps, NumberInputConfig>;

//--------------------------------------------------------------------//
// Constants

const DECIMAL_TOKEN = '__FRUI_DECIMAL__';

//--------------------------------------------------------------------//
// Helpers

/**
 * Apply Min/Max Bounds to Numeric String
 * Used in `onBlur()` and `onChange()` scenarios
 */
export function applyBounds(value: string, options: FormatOptions) {
  //if no value, return empty
  if (!value) {
    return '';
  }
  //if special cases, return as is
  if (value === '-' 
    || value === '.'
    || value === '-.' 
    || value === '0.' 
    || value === '-0.'
  ) {
    return value;
  }

  const numeric = Number(value);
  //if not a finite number, return as is
  if (!Number.isFinite(numeric)) {
    return value;
  }
  //extract options
  const { min, max, decimals } = options;
  //apply bounds
  let clamped = numeric;
  if (typeof min === 'number' && numeric < min) {
    clamped = min;
  }
  if (typeof max === 'number' && numeric > max) {
    clamped = max;
  }
  //if clamped, convert back to string with decimals
  if (clamped !== numeric) {
    return convertNumberToString(clamped, decimals);
  }
  //clamped and same as numeric, apply decimal trimming if needed
  if (typeof decimals === 'number' && decimals >= 0) {
    if (decimals === 0) {
      return normalizeNegativeZero(String(Math.trunc(numeric)));
    }
    const [ integer, fraction = '' ] = value.split('.');
    const trimmed = fraction.slice(0, decimals);
    return trimmed.length ? `${integer}.${trimmed}` : integer;
  }

  return normalizeNegativeZero(value);
};

/**
 * Convert Number to String with Decimals
 * Used in `applyBounds()`
 */
export function convertNumberToString(value: number, decimals?: number) {
  if (typeof decimals === 'number' && decimals >= 0) {
    return decimals === 0 ? String(Math.round(value)) : value.toFixed(decimals);
  }
  return String(value);
};

/**
 * Count Raw Characters in Fragment
 * Used in `onChange()` scenarios
 */
export function countRawCharacters(fragment: string, decimal: string) {
  let count = 0;
  for (let i = 0; i < fragment.length; i += 1) {
    const char = fragment[i];
    if (/\d/.test(char) || char === '-') {
      count += 1;
      continue;
    }
    const consumed = isDecimalToken(fragment, i, decimal);
    if (consumed) {
      count += 1;
      i += consumed - 1;
    }
  }
  return count;
};

/**
 * Create Numeric State Helpers
 * Used in `createStateFromInput()` and `createStateFromSanitized()`
 */
export function createEmptyState(): NumericState {
  return {
    raw: '',
    display: '',
    hidden: ''
  };
};

/**
 * Create State from Input Value
 * Used in `useNumberInput()` initialization and controlled updates
 */
export function createStateFromInput(
  value: string | number | undefined,
  options: FormatOptions
) {
  if (value === undefined || value === null || value === '') {
    return createEmptyState();
  }
  const sanitized = sanitizeNumericString(value, options, true);
  const bounded = applyBounds(sanitized, options);
  const finalized = finalizeValue(bounded);
  return createStateFromSanitized(finalized, options);
};

/**
 * Create State from Sanitized Value
 * Used in `createStateFromInput()` and `onChange()` / `onBlur()` scenarios
 */
export function createStateFromSanitized(value: string, options: FormatOptions) {
  if (!value) {
    return createEmptyState();
  }
  const normalized = normalizeNegativeZero(value);
  return {
    raw: normalized,
    display: formatDisplayValue(normalized, options),
    hidden: toHiddenValue(normalized)
  };
};

/**
 * Finalize Numeric String (on blur)
 */
export function finalizeValue(value: string) {
  if (!value) {
    return '';
  }
  if (value === '-' || value === '.' || value === '-.') {
    return '';
  }
  if (value.endsWith('.')) {
    return value.slice(0, -1);
  }
  return value;
};

/**
 * Find Display Index for Raw Character Count
 * Used in `onChange()` scenarios
 */
export function findDisplayIndexForRawCount(display: string, rawCount: number, decimal: string) {
  if (rawCount <= 0) {
    return 0;
  }
  let count = 0;
  for (let i = 0; i < display.length; i += 1) {
    const char = display[i];
    if (/\d/.test(char) || char === '-') {
      count += 1;
      if (count === rawCount) {
        return i + 1;
      }
      continue;
    }
    const consumed = isDecimalToken(display, i, decimal);
    if (consumed) {
      count += 1;
      if (count === rawCount) {
        return i + consumed;
      }
      i += consumed - 1;
    }
  }
  return display.length;
};

/**
 * Format Display Value
 * Used in `createStateFromSanitized()`
 */
export function formatDisplayValue(value: string, options: FormatOptions) {
  if (!value) {
    return '';
  }
  if (value === '-') {
    return value;
  }

  const normalized = normalizeNegativeZero(value);
  const negative = normalized.startsWith('-');
  const unsigned = negative ? normalized.substring(1) : normalized;

  const hasDecimal = unsigned.includes('.');
  const trailingDecimal = normalized.endsWith('.') && hasDecimal;
  const [ integerPart, fractionPart = '' ] = unsigned.split('.');

  const { separator, decimal } = options;
  const grouped = separator
    ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : integerPart;

  let result = negative ? '-' : '';
  result += grouped;

  if (hasDecimal) {
    result += decimal;
    if (!trailingDecimal) {
      result += fractionPart;
    }
  }

  return result;
};

/**
 * Check if Decimal Token is at Index
 * Used in `countRawCharacters()` and `findDisplayIndexForRawCount()`
 */
export function isDecimalToken(fragment: string, index: number, decimal: string) {
  if (!decimal || !decimal.length) {
    return 0;
  }
  return fragment.startsWith(decimal, index) ? decimal.length : 0;
};

/**
 * Normalize Negative Zero String
 * Used in various scenarios to standardize "-0" to "0"
 */
export function normalizeNegativeZero(value: string) {
  if (!value) {
    return '';
  }
  if (value.startsWith('-') && Number(value) === 0) {
    return value.substring(1);
  }
  return value;
};

/**
 * Replace Decimal Symbol with Dot
 * Used in `sanitizeNumericString()`
 */
export function replaceDecimalSymbol(value: string, decimal: string) {
  //no decimal symbol
  if (!decimal) {
    //nothing to replace
    return value;
  }
  //get last occurrence of decimal symbol
  const lastIndex = value.lastIndexOf(decimal);
  //no decimal symbol found
  if (lastIndex === -1) {
    //nothing to replace
    return value;
  }
  //get parts before and after last decimal symbol, 
  // and replace all other decimal symbols
  const before = value.substring(0, lastIndex).replaceAll(decimal, '');
  //get part after last decimal symbol
  // and replace all other decimal symbols
  const after = value.substring(lastIndex + decimal.length).replaceAll(decimal, '');
  //combine with dot
  return `${before}.${after}`;
};

/**
 * Resolve Decimal Limit from Step Value
 * Used in `useNumberInput()` for decimals processing
 */
export function resolveDecimalLimit(step?: string | number) {
  //undefined step means no limit
  if (step === undefined || step === null || step === '') {
    return undefined;
  }
  //
  const normalized = String(step).replace(',', '.');
  if (!normalized.includes('.')) {
    return 0;
  }
  const decimals = normalized.split('.')[1] || '';
  return decimals.length;
};

/**
 * Resolve Numeric Bound from String or Number
 * Used in `useNumberInput()` for min/max processing
 */
export function resolveNumericBound(
  bound: string | number | undefined,
  options: FormatOptions
) {
  if (bound === undefined || bound === null || bound === '') {
    return undefined;
  }
  if (typeof bound === 'number') {
    return Number.isFinite(bound) ? bound : undefined;
  }
  const parsed = sanitizeNumericString(bound, {
    ...options,
    absolute: false,
    decimals: undefined
  }, true);
  if (!parsed) {
    return undefined;
  }
  const numeric = Number(parsed);
  return Number.isFinite(numeric) ? numeric : undefined;
};

/**
 * Determines if decimal fallback should be allowed
 */
export function shouldAllowDecimalFallback(
  value: string,
  options: FormatOptions
) {
  //if no decimal symbol defined, do not allow
  if (!value.includes('.')) {
    return false;
  }
  //extract options
  const { decimal, separator, decimals } = options;
  //if decimal symbol exists in value, do not allow
  if (decimal && value.includes(decimal)) {
    return false;
  }
  //analyze digits around dot
  const numeric = value.replace(/[^\d.]/g, '');
  //find last dot
  const lastIndex = numeric.lastIndexOf('.');
  //if no dot, do not allow
  if (lastIndex === -1) {
    return false;
  }
  //count digits before and after dot
  const digitsAfter = numeric.length - lastIndex - 1;
  //get digits length before dot
  const digitsBefore = numeric.substring(0, lastIndex).replace(/\D/g, '').length;
  //if decimals is defined, enforce limit
  if (typeof decimals === 'number' && decimals >= 0) {
    return digitsAfter === 0 || digitsAfter <= decimals;
  }
  //if digits after is 0
  if (digitsAfter === 0
    //or digits before is 1 or less
    || digitsBefore <= 1
    //or digits after is 3 or less and digits before is 4 or more
    || (digitsAfter <= 3 && digitsBefore >= 4)
    //or digits after is 2 or less
    || digitsAfter <= 2
    //or no separator defined
    || !separator
  ) {
    return true;
  }
  //check for grouping pattern
  const groupingPattern = new RegExp(`\\${separator}\\d{3}`);
  //return false if grouping pattern found
  return !groupingPattern.test(value);
};

/**
 * Sanitize Numeric String
 * Used in `createStateFromInput()` and `onChange()` scenarios
 */
export function sanitizeNumericString(
  rawValue: string | number | undefined, 
  options: FormatOptions,
  allowDecimalFallback = false
) {
  //if no value, return empty
  if (rawValue === undefined || rawValue === null) {
    return '';
  }
  //convert to string and trim
  let value = String(rawValue).trim();
  //if still no value, return empty
  if (!value) {
    return '';
  }
  //extract options
  const { absolute, decimal, decimals, separator } = options;
  //protect decimal symbol before stripping separators
  let decimalProtected = false;
  //if there's a decimal symbol, protect it
  if (decimal && decimal.length && value.includes(decimal)) {
    const index = value.lastIndexOf(decimal);
    value = [
      value.substring(0, index),
      DECIMAL_TOKEN,
      value.substring(index + decimal.length)
    ].join('');
    decimalProtected = true;
  } else if (allowDecimalFallback && value.includes('.')) {
    const index = value.lastIndexOf('.');
    value = [
      value.substring(0, index),
      DECIMAL_TOKEN,
      value.substring(index + 1)
    ].join('');
    decimalProtected = true;
  }
  //if there's a separator, remove it
  if (separator) {
    value = value.split(separator).join('');
  }
  //restore protected decimal token
  if (decimalProtected) {
    value = value.replace(DECIMAL_TOKEN, '.');
  }
  //replace decimal symbol with dot
  value = replaceDecimalSymbol(value, decimal);
  //remove all non-numeric characters except dot and minus
  value = value.replace(/\s+/g, '');
  value = value.replace(/[^0-9.\-]/g, '');
  //if now no value, return empty
  if (!value) {
    return '';
  }
  //handle negatives
  let hasNegative = value.includes('-');
  //remove all minus signs
  value = value.replace(/\-/g, '');
  //if negative and not absolute, prepend minus
  if (!absolute && hasNegative) {
    value = `-${value}`;
  }
  //if decimals is zero, remove all dots
  if (decimals === 0) {
    value = value.replace(/\./g, '');
  //if decimal is an absolute number, make it fixed decimals
  } else if (typeof decimals === 'number' && decimals > 0) {
    const [ numerator, denominator = '' ] = value.split('.');
    const trimmed = denominator.slice(0, decimals);
    value = trimmed.length ? `${numerator}.${trimmed}` : numerator;
  }
  //normalize leading dots scenarios
  if (value.startsWith('-.')) {
    value = value.replace('-.', '-0.');
  } else if (value.startsWith('.')) {
    value = `0${value}`;
  }
  //re-test for negative
  hasNegative = value.startsWith('-');
  //remove all minus signs
  const unsigned = hasNegative ? value.substring(1) : value;
  const trailingDecimal = unsigned.endsWith('.');
  //split numerator and denominator
  const [ numerator, denominator ] = unsigned.split('.');
  //remove leading zeros from numerator
  const normalizedInteger = numerator.replace(/^0+(?=\d)/, '') || '0';
  //rebuild normalized value
  let normalized = hasNegative ? `-${normalizedInteger}` : normalizedInteger;
  //add denominator if exists
  if (denominator) {
    normalized += `.${denominator}`;
  } else if (trailingDecimal) {
    normalized += '.';
  }
  //return normalized value
  return normalized;
};

/**
 * Convert to Hidden Value (for form submission)
 */
export function toHiddenValue(value: string) {
  const normalized = normalizeNegativeZero(value);
  if (!normalized) {
    return '';
  }
  if (normalized === '-') {
    return '';
  }
  if (normalized.endsWith('.')) {
    const trimmed = normalized.slice(0, -1);
    return trimmed || '';
  }
  return normalized;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Number Input Hook Aggregate
 */
export function useNumberInput(config: NumberInputConfig) {
  //props
  const {
    //absolute value (no negatives)
    absolute = false, //?: boolean
    //decimal symbol
    decimal = '.', //?: string
    //uncontrolled value
    defaultValue, //?: string | number
    //maximum value
    max, //?: number
    //minimum value
    min, //?: number
    //handler when value changes
    onChange, //?: (e: ChangeEvent<HTMLInputElement>) => void
    //handler when value updates
    onUpdate, //?: (value: number) => void
    //reference to the input element
    ref: passRef, //?: RefObject<HTMLInputElement>,
    //thousands separator
    separator = ',', //?: string
    //incremental step (when using arrow keys)
    step, //?: number
    //controlled value
    value //?: string | number
  } = config;
  const decimals = useMemo(() => resolveDecimalLimit(step), [ step ]);
  const stepAmount = useMemo(() => {
    if (step === undefined || step === null || step === '') {
      return 1;
    }
    const parsed = typeof step === 'number' ? step : parseFloat(step);
    if (!Number.isFinite(parsed) || parsed === 0) {
      return 1;
    }
    return Math.abs(parsed);
  }, [ step ]);
  const baseOptions = useMemo<FormatOptions>(() => ({
    absolute,
    decimal,
    decimals,
    separator,
    min: undefined,
    max: undefined
  }), [ absolute, decimal, decimals, separator ]);

  const minValue = useMemo(
    () => resolveNumericBound(min, baseOptions),
    [ min, baseOptions ]
  );
  const maxValue = useMemo(
    () => resolveNumericBound(max, baseOptions),
    [ max, baseOptions ]
  );

  const options = useMemo<FormatOptions>(() => ({
    ...baseOptions,
    min: minValue,
    max: maxValue
  }), [ baseOptions, minValue, maxValue ]);

  const initialValue = value !== undefined ? value : defaultValue;
  const [ state, setState ] = useState<NumericState>(
    () => createStateFromInput(initialValue, options)
  );
  const pendingCursor = useRef<number | null>(null);
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = passRef || internalRef;
  const lastHidden = useRef<string | null>(state.hidden || null);

  const applyCursor = () => {
    if (!ref.current || pendingCursor.current === null) {
      return;
    }
    const node = ref.current;
    const position = Math.max(
      0,
      Math.min(pendingCursor.current, node.value.length)
    );
    node.setSelectionRange(position, position);
    pendingCursor.current = null;
  };

  const handlers = {
    update: (input: string | number) => {
      const nextState = createStateFromInput(input, options);
      setState(nextState);
    },
    change: (event: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event);
      const pointer = event.target.selectionStart ?? event.target.value.length;
      const rawBeforePointer = countRawCharacters(
        event.target.value.slice(0, pointer),
        options.decimal
      );
      const allowFallback = shouldAllowDecimalFallback(event.target.value, options);
      const sanitized = sanitizeNumericString(
        event.target.value,
        options,
        allowFallback
      );
      const bounded = applyBounds(sanitized, options);
      const nextState = createStateFromSanitized(bounded, options);
      pendingCursor.current = findDisplayIndexForRawCount(
        nextState.display,
        rawBeforePointer,
        options.decimal
      );
      setState(nextState);
    },
    defocus: () => {
      const finalized = finalizeValue(state.raw);
      const bounded = applyBounds(finalized, options);
      setState(createStateFromSanitized(bounded, options));
      pendingCursor.current = null;
    },
    keydown: (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
        return;
      }
      event.preventDefault();
      const direction = event.key === 'ArrowUp' ? 1 : -1;
      const hidden = toHiddenValue(finalizeValue(state.raw));
      const base = hidden !== ''
        ? Number(hidden)
        : (typeof options.min === 'number' ? options.min : 0);
      if (!Number.isFinite(base)) {
        return;
      }
      let nextNumeric = base + (direction * stepAmount);
      if (typeof options.decimals === 'number' && options.decimals >= 0) {
        const factor = Math.pow(10, options.decimals);
        nextNumeric = Math.round(nextNumeric * factor) / factor;
      }
      const nextState = createStateFromInput(nextNumeric, options);
      pendingCursor.current = nextState.display.length;
      setState(nextState);
    }
  };

  useEffect(() => {
    applyCursor();
  }, [ ref, state.display ]);

  useEffect(() => {
    if (value === undefined) {
      return;
    }
    setState(createStateFromInput(value, options));
  }, [ value, options ]);

  useEffect(() => {
    if (value !== undefined) {
      return;
    }
    setState((previous) => createStateFromSanitized(previous.raw, options));
  }, [ options, value ]);

  useEffect(() => {
    if (!onUpdate) {
      return;
    }
    if (!state.hidden) {
      if (lastHidden.current !== null) {
        lastHidden.current = null;
        onUpdate(Number.NaN);
      }
      return;
    }
    if (lastHidden.current === state.hidden) {
      return;
    }
    lastHidden.current = state.hidden;
    onUpdate(Number(state.hidden));
  }, [ state.hidden, onUpdate ]);

  return {
    ref,
    displayValue: state.display,
    hiddenValue: state.hidden,
    handlers
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Number Input Component (Main)
 */
export function NumberInput(props: NumberInputProps) {
  //props
  const { 
    //absolute value (no negatives)
    absolute = false, //?: boolean
    //decimal symbol
    decimal = '.', //?: string
    //uncontrolled value
    defaultValue, //?: string | number
    //maximum value
    max, //?: number
    //minimum value
    min, //?: number
    //input name (for form submission)
    name,
    //native blur handler
    onBlur,
    //native keydown handler
    onKeyDown,
    //handler when value changes
    onChange, //?: (e: ChangeEvent<HTMLInputElement>) => void
    //handler when value updates
    onUpdate, //?: (value: number) => void
    //reference to the input element
    ref: passRef, //?: RefObject<HTMLInputElement>,
    //thousands separator
    separator = ',', //?: string
    //incremental step (when using arrow keys)
    step, //?: number
    //controlled value
    value, //?: string | number
    ...attributes 
  } = props;
  //hooks
  const { 
    ref, 
    displayValue, 
    hiddenValue, 
    handlers 
  } = useNumberInput({ 
    absolute,
    decimal,
    defaultValue,
    max,
    min,
    onChange,
    onUpdate,
    ref: passRef,
    separator,
    step,
    value
  });
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    handlers.defocus();
    onBlur && onBlur(event);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    handlers.keydown(event);
    onKeyDown && onKeyDown(event);
  };
  //render
  return (
    <>
      <Input 
        {...attributes}
        ref={ref} 
        onChange={handlers.change} 
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        value={displayValue} 
        min={min}
        max={max}
        step={step}
      />
      <input 
        type="hidden" 
        name={name} 
        value={hiddenValue} 
      />
    </>
  );
};

//defaults to number input
export default Object.assign(NumberInput, {
  useNumberInput,
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
  toHiddenValue
});
