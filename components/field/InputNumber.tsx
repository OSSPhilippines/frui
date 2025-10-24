//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent, RefObject } from 'react';
import { useState, useEffect, useRef } from 'react';
//frui
import type { ExtendsType } from '../types.js';
import type { InputProps } from './Input.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type NumberOptions = {
  //absolute value (no negatives)
  absolute?: boolean
  //decimal symbol
  decimal?: string,
  //number of decimal places
  decimals?: number,
  //maximum value
  max?: number,
  //minimum value
  min?: number,
  //thousands separator
  separator?: string
};

export type InputNumberConfig = {
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

export type InputNumberProps = ExtendsType<InputProps, InputNumberConfig>;

//--------------------------------------------------------------------//
// Helpers

/**
 * Toggles the negative sign
 */
export function toggleNegative(value: string, absolute: boolean) {
  const isNegative = (value.match(/\-/g) || []).length % 2;
  const negative = !absolute && isNegative ? '-' : '';
  value = value.replaceAll('-', '');
  value = value.replace(new RegExp('^0+', 'g'), '');
  return negative + value;
};

/**
 * Fixes the decimal length
 */
export function fixDecimal(
  value: string, 
  decimal: string, 
  decimals: number, 
  cursor: number
) {
  if (decimals < 0) {
    return value;
  }
  if (!decimals) {
    return value.replaceAll(decimal, '');
  }

  cursor = cursor || value.lastIndexOf(decimal);
  //if more than one decimal, then make it only one
  const allDecimals = new RegExp(`\\${decimal}`, 'g');
  if ((value.match(allDecimals) || []).length > 1) {
    //split up the text from where the cursor is
    value = [
      value.substring(0, cursor).replaceAll(decimal, ''), 
      value.substring(cursor + 1).replaceAll(decimal, '')
    ].join(decimal);
  }

  //if more decimals than allowed
  if ((value.split(decimal)[1] || '').length > decimals) {
    //remove the number before the cursor
    value = value.substring(0, value.length - 1);
  }

  return value;
};

/**
 * Returns true if the value is between the min and max
 */
export function between(value: string, min?: number, max?: number) {
  if (min && !isNaN(min) && parseFloat(value) < min) {
    value = String(min);
  }
  if (max && !isNaN(max) && parseFloat(value) > max) {
    value = String(max);
  }
  return value;
};

/**
 * Adds decimal numbers to the value
 */
export function padDecimals(value: string, decimal: string, decimals: number) {
  if (!decimals || !value.length) {
    return value;
  }

  //if the decimal is the last (with no number)
  if (value[value.length - 1] === decimal) {
    //remove it
    value = value.substring(0, value.length - 1);
  }
  //if no decimals
  const allDecimals = new RegExp(`\\${decimal}`, 'g');
  if (!(value.match(allDecimals) || []).length && decimals > 0) {
    value += decimal + '0'.repeat(decimals);
  } 
  //if the first one is a positive decimal
  if (value[0] === decimal) {
    value = '0' + value;
  }
  //if the first one is a negative decimal
  if (value.indexOf(`-${decimal}`) === 0) {
    value = '-0.' + value.substr(decimal.length + 1);
  }

  if (decimals > 0) {
    value += '0'.repeat(decimals - value.split(decimal)[1].length);
  }

  return value;
};

/**
 * Adds commas and decimals to the value
 */
export function prettify(value: string, separator: string, decimal: string) {
  const placeCommas = new RegExp(
    `\\B(?<!\\${separator}\\d*)(?=(\\d{3})+(?!\\d))`, 'g'
  );

  //Separate thousands
  if (separator) {
    if (value.indexOf(decimal) !== -1) {
      let [ numerator, denominator ] = value.split(decimal);
      numerator = numerator.replace(placeCommas, separator);
      value = [ numerator, denominator ].join(decimal);
    } else {
      value = value.replace(placeCommas, separator);
    }
  }

  return value
};

/**
 * Returns the actual and pretty number format
 */
export function getFormats(value: string|number, options: NumberOptions, cursor = 0) {
  //expand options
  const {
    min,     
    max,      
    separator = ',', 
    decimal = '.', 
    decimals = 0, 
    absolute = false
  } = options;
  value = String(value || '');
  const dec = decimal || '.';
  //1. Remove any non number related
  const notNumberRelated = new RegExp(`[^0-9\-\\${dec}]`, 'g');
  let formatted = value.replace(notNumberRelated, '');
  //2. Toggle negatives
  formatted = toggleNegative(formatted, absolute);
  //3. Format decimals
  formatted = fixDecimal(formatted, dec, decimals, cursor);
  //4. consider min max
  formatted = between(formatted, min, max);

  return {
    value: padDecimals(formatted, dec, decimals),
    display: prettify(formatted, separator, decimal)
  };
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Number Hook Aggregate
 */
export function useInputNumber(config: InputNumberConfig) {
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
  //auto determine the amount of decimals from the step value
  const decimals = step ? (String(step).split('.')[1]?.length || -1) : -1;
  //configure the options (to determine the hidden and display values)
  const options = { 
    min: Number(min) || undefined, 
    max: Number(max) || undefined, 
    separator, 
    decimal, 
    decimals, 
    absolute 
  };
  //now get the initial hidden and display values
  const initial = getFormats(defaultValue || '', options);
  //hooks
  const [ hiddenValue, setHiddenValue ] = useState(initial.value);
  const [ displayValue, setDisplayValue ] = useState(initial.display);
  const [ cursor, setCursor ] = useState(0);
  const internalRef = useRef<HTMLInputElement>(null)
  //variables
  const ref = passRef || internalRef;
  //handers
  const handlers = {
    update: (value: string|number, cursor?: number, pointer?: number) => {
      const format = getFormats(String(value), options, cursor);
      if (Number(hiddenValue) !== Number(format.value)) {
        setHiddenValue(format.value);
        onUpdate && onUpdate(Number(format.value));
      }

      if (displayValue !== format.display) {
        if (typeof pointer === 'number') {
          if (format.display.length > displayValue.length) {
            setCursor(pointer + (format.display.length - displayValue.length) - 1);
          } else if (format.display.length < displayValue.length) {
            setCursor(pointer - (displayValue.length - format.display.length) + 1);
          } else {
            setCursor(pointer);
          }
        }
        
        setDisplayValue(format.display);
      }
    },
    change: (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
      const cursor = e.target.selectionStart ? e.target.selectionStart - 1: 0;
      const pointer = e.target.selectionStart || 0;
      handlers.update(e.target.value, cursor, pointer);
    },
    defocus: () => {
      setDisplayValue(padDecimals(displayValue, decimal, decimals));
    }
  };
  
  //effects
  // whenever the cursor value changes, update the actual cursor in the input
  useEffect(() => {
    if (ref.current && cursor >= 0) {
      ref.current.selectionStart = cursor;
      ref.current.selectionEnd = cursor;
    } 
  }, [ cursor ]);
  // whenever value changes from outside, update internal state
  useEffect(() => {
    if (value === undefined) return;
    const format = getFormats(String(value || ''), options);
    setHiddenValue(format.value);
    setDisplayValue(format.display);
  }, [ value ]);

  return { ref, displayValue, hiddenValue, handlers };
};

//--------------------------------------------------------------------//
// Components

/**
 * Number  Component (Main)
 */
export function InputNumber(props: InputNumberProps) {
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
  } = useInputNumber({ 
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
  //render
  return (
    <>
      <Input 
        {...attributes}
        ref={ref} 
        onChange={handlers.change} 
        onBlur={handlers.defocus} 
        value={displayValue}  
      />
      <input 
        type="hidden" 
        name={name} 
        value={hiddenValue} 
      />
    </>
  );
};

//defaults to number
export default Object.assign(InputNumber, {
  useInputNumber,
  getFormats,
  toggleNegative,
  fixDecimal,
  between,
  padDecimals,
  prettify
});