//types
import type { FieldNumberProps } from '../types';
//react
import React from 'react';
//components
import FieldInput from './FieldInput';
//hooks
import useNumber from '../hooks/useFieldNumber';

/**
 * Number Field Component (Main)
 */
const FieldNumber: React.FC<FieldNumberProps> = (props) => {
  //expand props
  const { 
    name,
    defaultValue,
    min,
    max,      
    separator = ',', 
    decimal = '.', 
    step, 
    absolute = false,
    controls,
    onUpdate,
    onChange,
    ...attributes 
  } = props;

  const { displayValue, handlers } = useNumber({
    defaultValue,
    min,
    max,      
    separator, 
    decimal, 
    step, 
    absolute,
    controls,
    onUpdate,
    onChange
  });

  return (
    <FieldInput 
      passRef={handlers.passRef} 
      {...attributes}
      onChange={handlers.format} 
      onBlur={handlers.defocus} 
      value={displayValue}  
    />
  );
};

export default FieldNumber;