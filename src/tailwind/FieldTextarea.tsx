//types
import type { FieldTextareaProps } from '../types';
//react
import React from 'react';
//hooks
import useTextarea from '../hooks/useFieldTextarea';
//helpers
import { makeClasses } from '../utils';

/**
 * Generic Textarea Field Component (Main)
 */
const FieldTextarea: React.FC<FieldTextareaProps> = (props) => {
  //separate component related props from field attributes
  const {  
    error, 
    errorColor = '#DC3545',
    className,
    style,
    onChange,
    onUpdate,
    passRef,
    ...attributes 
  } = props;
  //hooks
  const { handlers } = useTextarea({ onChange, onUpdate });
  //variables
  const map = makeClasses(className, [
    'border',
    error ? 'border-[#DC3545]': 'border-black',
    'box-border',
    'text-black',
    'p-2',
    'w-full'
  ].filter(Boolean).join(' '));
  //render
  return (
    <textarea 
      {...attributes} 
      className={map} 
      style={style || undefined} 
      ref={passRef} 
      onChange={handlers.change} 
    />
  );
}

export default FieldTextarea;