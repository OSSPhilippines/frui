//types
import type { TimeProps, TimeConfig } from '../types/fields';
//components
import Input from './Input';

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