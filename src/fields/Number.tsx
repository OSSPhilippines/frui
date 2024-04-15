//types
import type { NumberProps } from '../types/fields';
//components
import Input from './Input';
//hooks
import useNumber from '../hooks/useNumber';

/**
 * Number  Component (Main)
 */
export default function Number(props: NumberProps) {
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