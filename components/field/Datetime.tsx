//--------------------------------------------------------------------//
// Imports

//types
import type { ExtendsType } from '../types.js';
import type { InputProps } from './Input.js';
//hooks
import { useDate } from './Date.js';
//components
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type DatetimeInput = string|number|Date;

export type DatetimeConfig = {
  defaultValue?: DatetimeInput, 
  onUpdate?: (value: string) => void
};

export type DatetimeProps = ExtendsType<InputProps, {
  defaultValue?: DatetimeInput
}>;

//--------------------------------------------------------------------//
// Hooks

/**
 * Datetime Hook Aggregate
 */
export function useDatetime({ defaultValue, onUpdate }: DatetimeConfig) {
  const update = useDate({ onUpdate });
  let value: string|undefined = undefined;
  if (defaultValue) {
    try {
      value = new Date(defaultValue).toISOString().replace('Z', '');
    } catch(e) {}
  }
  return { value, update };
};

//--------------------------------------------------------------------//
// Components

/**
 * Datetime  Component
 */
export function Datetime(props: DatetimeProps) {
  const { defaultValue, className, onUpdate, ...attributes } = props;
  const { value, update } = useDatetime({ defaultValue, onUpdate });
  const classNames = [ 'frui-field-datetime' ];
  if (className) {
    classNames.push(className);
  }
  return (
    <Input 
      {...attributes}
      type="datetime-local"
      defaultValue={value}
      className={classNames.join(' ')}
      onUpdate={update}
    />
  );
};

//defaults to datetime
export default Datetime;