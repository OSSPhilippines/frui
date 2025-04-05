//types
import type { ExtendsType } from '../types';
import type { InputProps } from './Input';
//components
import Input from './Input';

/**
 * Date Input
 */
export type DateInput = string|number|Date;

/**
 * Date Config
 */
export type DateConfig = {
  defaultValue?: DateInput, 
  onUpdate?: (value: string) => void
};

/**
 * Date Props
 */
export type DateProps = ExtendsType<InputProps, {
  defaultValue?: DateInput
}>;

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

/**
 * Date  Component
 */
export default function DateField(props: DateProps) {
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