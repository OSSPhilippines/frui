//--------------------------------------------------------------------//
// Imports

//types
import type { ExtendsType } from '../types.js';
import type { InputProps } from './Input.js';
//components
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type TimeInput = string|number|Date;

export type TimeConfig = {
  defaultValue?: TimeInput, 
  onUpdate?: (value: string) => void
};

export type TimeProps = ExtendsType<InputProps, {
  defaultValue?: TimeInput
}>;

//--------------------------------------------------------------------//
// Hooks

/**
 * Time Hook Aggregate
 */
export function useTime({ defaultValue }: TimeConfig) {
  let value: string|undefined = undefined;
  if (defaultValue) {
    try {
      const [ date, min ] = new Date(defaultValue).toISOString().split(':')
      value = [ date.split('T')[1], min ].join(':');
    } catch(e) {}
  }

  return value;
};

//--------------------------------------------------------------------//
// Components

/**
 * Time  Component
 */
export function Time(props: TimeProps) {
  const { defaultValue, className, ...attributes } = props;
  const value = useTime({ defaultValue });
  const classNames = [ 'frui-field-time' ];
  if (className) {
    classNames.push(className);
  }
  return (
    <Input 
      type="time"
      className={classNames.join(' ')}
      defaultValue={value}
      {...attributes}
    />
  );
};

//defaults to time
export default Time;