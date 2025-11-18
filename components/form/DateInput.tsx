//--------------------------------------------------------------------//
// Imports

//modules
import { useEffect, useState } from 'react';
//frui
import type { ExtendsType } from '../types.js';
import type { InputProps } from './Input.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type DateInputConfig = {
  //uncontrolled default value
  defaultValue?: string | number | Date, 
  //handler when value updates
  onUpdate?: (value?: Date) => void,
  //controlled value
  value?: string | number | Date
};

export type DateInputProps = ExtendsType<InputProps, DateInputConfig>;

//--------------------------------------------------------------------//
// Helpers

/**
 * Convert various date input formats into a Date object
 */
export function toDate(input?: string | number | Date) {
  if (!input) {
    return undefined;
  } else if (input instanceof Date) {
    return input;
  }
  try {
    return new Date(input);
  } catch(e) {}
  return undefined;
};

export function toDateString(date?: Date) {
  if (!date || isNaN(date.getTime())) return undefined;
  const YYYY = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const DD = String(date.getDate()).padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Date Hook Aggregate
 */
export function useDateInput(config: DateInputConfig) {
  //props
  const { defaultValue, onUpdate, value } = config;
  const defaultDate = toDate(defaultValue);
  //hooks
  const [ date, setDate ] = useState(defaultDate);
  //handlers
  const handlers = {
    set: setDate,
    toString: () => date
      ? toDateString(date)
      : undefined,
    update: (value?: string) => {
      const date = toDate(value);
      setDate(date);
      onUpdate && onUpdate(date);
    }
  };
  //effects
  // whenever value changes from outside, update internal state
  useEffect(() => {
    //dont allow undefined to override existing value
    if (value === undefined) return;
    handlers.set(toDate(value));
  }, [ value ]);
  return { date, handlers };
};

//--------------------------------------------------------------------//
// Components

/**
 * Date  Component
 */
export function DateInput(props: DateInputProps) {
  //props
  const { 
    className, 
    defaultValue, 
    onUpdate, 
    value, 
    ...attributes 
  } = props;
  //hooks
  const { handlers } = useDateInput({ defaultValue, onUpdate, value });
  //variables
  const classNames = [ 'frui-form-date-input' ];
  className && classNames.push(className);
  //render
  return (
    <Input 
      {...attributes}
      type="date"
      className={classNames.join(' ')}
      onUpdate={handlers.update}
      value={handlers.toString() || ''}
    />
  );
};

//defaults to date
export default Object.assign(DateInput, {
  toDate,
  toDateString,
  useDateInput,
  use: useDateInput
});