//types
import type { FieldTimeProps } from '../types';
//react
import React from 'react';
//components
import Input from './FieldInput';
//hooks
import useTime from '../hooks/useFieldTime';
//helpers
import { makeClasses } from '../utils';

/**
 * Time Field Component
 */
const FieldTime: React.FC<FieldTimeProps> = (props) => {
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
  const value = useTime({ defaultValue });
  return (
    <Input 
      {...attributes}
      type="time"
      className={map} 
      error={error}
      defaultValue={value}
    />
  );
};

export default FieldTime;