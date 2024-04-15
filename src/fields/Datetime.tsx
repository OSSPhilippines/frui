//types
import type { DatetimeProps } from '../types/fields';
//components
import Input from './Input';
//hooks
import useDatetime from '../hooks/useDatetime';

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