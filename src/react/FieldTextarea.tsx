//types
import type { FieldTextareaProps } from '../types';
//react
import React from 'react';
//hooks
import useTextarea from '../hooks/useFieldTextarea';
//helpers
import { makeStyles } from '../utils';

/**
 * Generic Textarea Field Component (Main)
 */
const FieldTextarea: React.FC<FieldTextareaProps> = (props) => {
  //separate component related props from field attributes
  const {  
    error, 
    errorColor = '#DC3545',
    style,
    onChange,
    onUpdate,
    passRef,
    ...attributes 
  } = props;
  //hooks
  const { handlers } = useTextarea({ onChange, onUpdate });
  //variables
  const map = makeStyles(style, {
    borderColor: error ? errorColor: 'black',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: 'black',
    paddingBottom: '8px',
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '8px',
    width: '100%'
  }) || {};
  //render
  return (
    <textarea 
      {...attributes} 
      style={style !== false ? map: undefined} 
      ref={passRef} 
      onChange={handlers.change} 
    />
  );
}

export default FieldTextarea;