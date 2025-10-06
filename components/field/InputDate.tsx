//--------------------------------------------------------------------//
// Imports

//types
import type { ExtendsType } from '../types.js';
import type { InputProps } from './Input.js';
//components
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type DateInput = string|number|Date;

export type DateConfig = {
  defaultValue?: DateInput, 
  onUpdate?: (value: string) => void
};

export type DateProps = ExtendsType<InputProps, {
  defaultValue?: DateInput
}>;

//--------------------------------------------------------------------//
// Hooks

/**
 * Date Hook Aggregate
 */
export function useDate({ onUpdate }: DateConfig) {
  return (value: string) => {
    if (onUpdate && value) {
      try {
        const utc = new Date(value).toUTCString();
        onUpdate(new Date(utc).toISOString());
      } catch(e) {} 
    }
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Date  Component
 */
export function DateField(props: DateProps) {
  const { defaultValue, className, onUpdate, ...attributes } = props;
  const update = useDate({ onUpdate });
  const classNames = [ 'frui-field-date' ];
  if (className) {
    classNames.push(className);
  }
  return (
    <Input 
      {...attributes}
      type="date"
      defaultValue={defaultValue 
        ? new Date(defaultValue).toISOString().split('T')[0]
        : undefined
      }
      className={classNames.join(' ')}
      onUpdate={update}
    />
  );
};

//defaults to date
export default DateField;