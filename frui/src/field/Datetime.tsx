//types
import type { ExtendsType } from '../types';
import type { InputProps } from './Input';
//hooks
import { useDate } from './Date';
//components
import Input from './Input';

/**
 * Datetime Input
 */
export type DatetimeInput = string|number|Date;

/**
 * Datetime Config
 */
export type DatetimeConfig = {
  defaultValue?: DatetimeInput, 
  onUpdate?: (value: string) => void
};

/**
 * Datetime Props
 */
export type DatetimeProps = ExtendsType<InputProps, {
  defaultValue?: DatetimeInput
}>;

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