//--------------------------------------------------------------------//
// Imports

//modules
import { useEffect, useState } from 'react';

//frui
import type { ExtendsType } from '../types.js';
import type { InputProps } from './Input.js';
import Input from './Input.js';
import { toDate } from './InputDate.js';

//--------------------------------------------------------------------//
// Types

export type DatetimeInput = string | number | Date;

export type DatetimeConfig = {
  //uncontrolled default value
  defaultValue?: DatetimeInput,
  //handler when value updates 
  onUpdate?: (value?: Date) => void,
  //controlled value
  value?: DatetimeInput
};

export type DatetimeProps = ExtendsType<InputProps, DatetimeConfig>;

//--------------------------------------------------------------------//
// Helpers

/**
 * Convert Date object into datetime string format
 */
export function toDateString(date?: Date) {
  if (!date || isNaN(date.getTime())) return undefined;
  const YYYY = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const DD = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:00`;
};

/**
 * Convert Date object into datetime-local input string format
 */
export function toDatetimeInputString(date?: Date) {
  if (!date || isNaN(date.getTime())) return undefined;
  const YYYY = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const DD = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Datetime Hook Aggregate
 */
export function useInputDatetime(config: DatetimeConfig) {
  //props
  const { defaultValue, onUpdate, value } = config;
  const defaultDate = toDate(defaultValue);
  //hooks
  const [ date, setDate ] = useState(defaultDate);
  //handlers
  const handlers = {
    set: setDate,
    toInputString: () => date
      ? toDatetimeInputString(date)
      : undefined,
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
 * Datetime  Component
 */
export function InputDatetime(props: DatetimeProps) {
  //props
  const { 
    className, 
    defaultValue, 
    name, 
    onUpdate, 
    value, 
    ...attributes 
  } = props;
  //hooks
  const { handlers } = useInputDatetime({ defaultValue, onUpdate, value });
  //variables
  const classes = [ 'frui-field-input-datetime' ];
  className && classes.push(className);
  //render
  return (
    <>
      <Input 
        {...attributes}
        type="datetime-local"
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

//defaults to datetime
export default Object.assign(InputDatetime, {
  toDate,
  toDateString,
  toDatetimeInputString,
  useInputDatetime
});