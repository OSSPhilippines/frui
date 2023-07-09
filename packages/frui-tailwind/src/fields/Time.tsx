//types
import type { TimeProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useTime from 'frui-core/dist/hooks/useTime';
//helpers
import { makeClasses } from 'frui-core/dist/utils';

/**
 * Time  Component
 */
const Time: React.FC<TimeProps> = (props) => {
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

export default Time;