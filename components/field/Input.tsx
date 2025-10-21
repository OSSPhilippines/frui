//--------------------------------------------------------------------//
// Imports

//types
import type { ChangeEvent } from 'react';
import type { HTMLInputProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type InputConfig = {
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: Function, 
  onUpdate?: Function
};

export type InputProps = HTMLInputProps & {
  error?: any,
  onUpdate?: (value: string) => void
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Input Hook Aggregate
 */
export function useInput({ onChange, onUpdate }: InputConfig) {
  const handlers = {
    change: (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
      handlers.update(e.target.value);
    },
    update: (value: string) => {
      onUpdate && onUpdate(value);
    }
  };
  return { handlers };
};

//--------------------------------------------------------------------//
// Components

/**
 * Generic Input  Component (Main)
 */
export function Input(props: InputProps) {
  //separate component related props from field attributes
  const {   
    error, 
    className,
    onChange,
    onUpdate,
    ref,
    ...attributes 
  } = props;
  //hooks
  const { handlers } = useInput({ onChange, onUpdate });
  const classNames = [ 'frui-field-input' ];
  if (error) {
    classNames.push('frui-tx-error', 'frui-bd-error');
  }
  if (className) {
    classNames.push(className);
  }
  //render
  return (
    <input 
      {...attributes} 
      className={classNames.join(' ')}
      onChange={handlers.change} 
    />
  );
};

//defaults to input
export default Input;