//types
import type { ChangeEvent } from 'react';
import type { InputProps, InputConfig } from '../types/fields';

/**
 * Input Hook Aggregate
 */
export function useInput({ onChange, onUpdate }: InputConfig) {
  return {
    handlers: {
      change: (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onUpdate && onUpdate(e.target.value);
      }
    }
  };
}

/**
 * Generic Input  Component (Main)
 */
export default function Input(props: InputProps) {
  //separate component related props from field attributes
  const {   
    label, 
    error, 
    className,
    onChange,
    onUpdate,
    passRef,
    ...attributes 
  } = props;
  //hooks
  const { handlers } = useInput({ onChange, onUpdate });
  const classNames = [ 'field-input' ];
  if (error) {
    classNames.push('tx-error', 'bd-error');
  }
  if (className) {
    classNames.push(className);
  }
  //render
  return (
    <input 
      {...attributes} 
      className={classNames.join(' ')}
      ref={passRef} 
      onChange={handlers.change} 
    />
  );
};