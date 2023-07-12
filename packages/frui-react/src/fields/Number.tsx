//types
import type { NumberProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useNumber from 'frui-core/dist/hooks/useNumber';

/**
 * Number  Component (Main)
 */
const Number: React.FC<NumberProps> = (props) => {
  //expand props
  const { 
    name,
    value,
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
    value,
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
    <Input 
      passRef={handlers.passRef} 
      {...attributes}
      onChange={handlers.format} 
      onBlur={handlers.defocus} 
      value={displayValue}  
    />
  );
};

export default Number;