//types
import type { ChangeEvent } from 'react';
import type { NumberOptions, NumberProps } from '../types/fields';
//hooks
import { useState, useEffect } from 'react';

function toggleNegative(value: string, absolute: boolean) {
  const isNegative = (value.match(/\-/g) || []).length % 2;
  const negative = !absolute && isNegative ? '-' : '';
  value = value.replaceAll('-', '');
  value = value.replace(new RegExp('^0+', 'g'), '');
  return negative + value;
}

function fixDecimal(
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
}

function between(value: string, min?: number, max?: number) {
  if (min && !isNaN(min) && parseFloat(value) < min) {
    value = String(min);
  }
  if (max && !isNaN(max) && parseFloat(value) > max) {
    value = String(max);
  }
  return value;
}

function padDecimals(value: string, decimal: string, decimals: number) {
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
}

function prettify(value: string, separator: string, decimal: string) {
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
}

function getFormats(
  value: string, 
  options: NumberOptions,
  cursor = 0
) {
  //expand options
  const {
    min,     
    max,      
    separator = ',', 
    decimal = '.', 
    decimals = 0, 
    absolute = false
  } = options;

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
}

function getFormatsFromInput(
  input: HTMLInputElement, 
  options: NumberOptions
) {
  const cursor = input.selectionStart? input.selectionStart - 1: 0;
  return getFormats(input.value, options, cursor);
}

export default function useNumber(config: NumberProps) {
  //expand props
  const {
    defaultValue,
    min,
    max,      
    separator = ',', 
    decimal = '.', 
    step, 
    absolute = false,
    controls,
    onUpdate,
    onChange
  } = config;

  const decimals = step? String(step).split('.')[1]?.length || -1: -1;
  const options = { 
    min: Number(min) || undefined, 
    max: Number(max) || undefined, 
    separator, 
    decimal, 
    decimals, 
    absolute 
  };
  const initial = getFormats(String(defaultValue || ''), options);
  //hooks
  const [ hiddenValue, setHiddenValue ] = useState(initial.value);
  const [ displayValue, setDisplayValue ] = useState(initial.display);
  const [ cursor, setCursor ] = useState(0);
  const [ input, setInput ] = useState<HTMLInputElement>();
  //handers
  const handlers = {
    update: (value: string|number) => {
      getFormats(String(value), options)
    },
    passRef: (element: HTMLInputElement) => {
      if (element && !input) {
        controls && controls({ update: handlers.update, value: hiddenValue });
        setInput(element);
      }
    },
    format: (e: ChangeEvent<HTMLInputElement>) => {
      const { value, display } = getFormatsFromInput(e.target, options);
      if (Number(hiddenValue) !== Number(value)) {
        onChange && onChange(e);
        onUpdate && onUpdate(String(Number(value)));
        setHiddenValue(value);
      }
      
      const pointer = e.target.selectionStart || 0;
      if (displayValue !== display) {
        if (display.length > displayValue.length) {
          setCursor(pointer + (display.length - displayValue.length) - 1);
        } else if (display.length < displayValue.length) {
          setCursor(pointer - (displayValue.length - display.length) + 1);
        } else {
          setCursor(pointer);
        }
        
        setDisplayValue(display);
      }
    },
    defocus: () => {
      setDisplayValue(padDecimals(displayValue, decimal, decimals));
    }
  };
  
  //effects
  useEffect(() => {
    if (input && cursor >= 0) {
      input.selectionStart = cursor;
      input.selectionEnd = cursor;
    } 
  }, [ cursor ]);

  return { displayValue, handlers };
}