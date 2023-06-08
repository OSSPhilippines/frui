//types
import type { FieldDatetimeProps } from '../types';
//react
import React from 'react';
//components
import Input from './FieldInput';
//hooks
import useDatetime from '../hooks/useFieldDatetime';
//helpers
import { makeClasses } from '../utils';

/**
 * Datetime Field Component
 */
const FieldDatetime: React.FC<FieldDatetimeProps> = (props) => {
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

export default FieldDatetime;