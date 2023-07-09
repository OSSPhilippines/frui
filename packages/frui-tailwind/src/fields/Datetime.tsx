//types
import type { DatetimeProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useDatetime from 'frui-core/dist/hooks/useDatetime';
//helpers
import { makeClasses } from 'frui-core/dist/utils';

/**
 * Datetime  Component
 */
const Datetime: React.FC<DatetimeProps> = (props) => {
  const { 
    defaultValue, 
    error, 
    className, 
    onUpdate, 
    ...attributes 
  } = props;
  const map = makeClasses(
    className, 
    [
      'items-center',
      'border',
      'bg-white',
      error ? 'border-[#DC3545]' : 'border-black',
      error ? 'text-[#DC3545]' : 'tet-black',
      'flex',
      'p-[7px]',
      'whitespace-nowrap',
      'w-full'
    ].filter(Boolean).join(' ')
  );
  const { value, update } = useDatetime({ defaultValue, onUpdate });
  return (
    <Input 
      {...attributes}
      type="datetime-local"
      className={map} 
      error={error}
      defaultValue={value}
      onUpdate={update}
    />
  );
};

export default Datetime;