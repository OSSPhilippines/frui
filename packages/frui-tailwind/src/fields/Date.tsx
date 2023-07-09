//types
import type { DateProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useDate from 'frui-core/dist/hooks/useDate';
//helpers
import { makeClasses } from 'frui-core/dist/utils';

/**
 * Date  Component
 */
const DateField: React.FC<DateProps> = (props) => {
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
  const update = useDate({ onUpdate });
  return (
    <Input 
      {...attributes}
      type="date"
      className={map} 
      error={error}
      defaultValue={defaultValue 
        ? new Date(defaultValue).toISOString().split('T')[0]
        : undefined
      }
      onUpdate={update}
    />
  );
};


export default DateField;