//types
import type { DateProps } from '../types/fields';
//components
import Input from './Input';
//hooks
import useDate from '../hooks/useDate';

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