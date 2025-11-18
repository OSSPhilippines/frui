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

export type TimeInputConfig = {
  //uncontrolled default value
  defaultValue?: string | number | Date, 
  //handler when value updates
  onUpdate?: (value?: Date) => void,
  //controlled value
  value?: string | number | Date
};

export type TimeInputProps = ExtendsType<InputProps, TimeInputConfig>;

//--------------------------------------------------------------------//
// Constants

//input time value will look like 09:45
const TIME_INPUT_REGEX = /^\d{2}:\d{2}$/;

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
  } else if (typeof input === 'string' && TIME_INPUT_REGEX.test(input)) {
    const [ hh, mm ] = input.split(':').map(Number);
    const date = new Date();
    date.setHours(hh, mm, 0, 0);
    return date;
  }
  try {
    return new Date(input);
  } catch(e) {}
  return undefined;
};

/**
 * Convert Date object into datetime string format
 */
export function toTimeString(date?: Date) {
  if (!date || isNaN(date.getTime())) return undefined;
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}:00`;
};

/**
 * Convert Date object into datetime-local input string format
 */
export function toTimeInputString(date?: Date) {
  if (!date || isNaN(date.getTime())) return undefined;
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Time Hook Aggregate
 */
export function useTimeInput(config: TimeInputConfig) {
  //props
    const { defaultValue, onUpdate, value } = config;
    const defaultDate = toDate(defaultValue);
    //hooks
    const [ date, setDate ] = useState(defaultDate);
    //handlers
    const handlers = {
      set: setDate,
      toInputString: () => date
        ? toTimeInputString(date)
        : undefined,
      toString: () => date
        ? toTimeString(date)
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
 * Time  Component
 */
export function TimeInput(props: TimeInputProps) {
  const { 
    className, 
    defaultValue, 
    name, 
    onUpdate, 
    value, 
    ...attributes 
  } = props;
  const { handlers } = useTimeInput({ defaultValue, onUpdate, value });
  const classes = [ 'frui-form-input-time' ];
  className && classes.push(className);
  return (
    <>
      <Input 
        {...attributes}
        type="time"
        className={classes.join(' ')}
        onUpdate={handlers.update}
        value={handlers.toInputString() || ''}
      />
      <input 
        type="hidden"
        name={name}
        value={handlers.toString() || ''}
      />
    </>
  );
};

//defaults to time
export default Object.assign(TimeInput, {
  toDate,
  toTimeString,
  toTimeInputString,
  useTimeInput
});