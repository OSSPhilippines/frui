//types
import type { DatetimeProps, DatetimeConfig } from '../types/fields';
//hooks
import { useDate } from './Date';
//components
import Input from './Input';

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

/**
 * Datetime  Component
 */
export default function Datetime(props: DatetimeProps) {
  const { defaultValue, className, onUpdate, ...attributes } = props;
  const { value, update } = useDatetime({ defaultValue, onUpdate });
  const classNames = [ 'field-datetime' ];
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