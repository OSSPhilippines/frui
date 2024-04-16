//types
import type { TimeProps } from '../types/fields';
//components
import Input from './Input';
//hooks
import useTime from '../hooks/useTime';

/**
 * Time  Component
 */
export default function Time(props: TimeProps) {
  const { defaultValue, className, ...attributes } = props;
  const value = useTime({ defaultValue });
  const classNames = [ 'field-time' ];
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
}