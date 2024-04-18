//types
import type { DateProps, DateConfig } from '../types/fields';
//components
import Input from './Input';

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
  const classNames = [ 'field-datetime' ];
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