//--------------------------------------------------------------------//
// Imports

//types
import type { InputProps } from './Input.js';
//hooks
import { useState } from 'react';
//components
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type PasswordProps = InputProps & {
  error?: boolean
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Password Hook Aggregate
 */
export function usePassword() {
  const [ showing, show ] = useState(false);
  const toggle = () => show(!showing);
  return { toggle, showing };
};

//--------------------------------------------------------------------//
// Components

/**
 * Password  Component (Main)
 */
export function Password(props: PasswordProps) {
  //remove type
  const { error, className, ...attributes } = props;
  //hooks
  const { showing, toggle } = usePassword();

  const classNames = [ 'frui-field-password' ];
  if (className) {
    classNames.push(className);
  }

  const toggleClass = [ 'frui-field-password-toggle' ];
  if (error) {
    toggleClass.push('frui-tx-error', 'frui-bd-error');
  }

  return (
    <div className={classNames.join(' ')}>
      <Input 
        {...attributes} 
        error={error} 
        type={showing ? 'text': 'password'} 
        className="frui-field-password-control"
      />
      <span className={toggleClass.join(' ')} onClick={toggle}>
        {showing ? '✷': 'A' }
      </span>
    </div>
  );
};

//defaults to password
export default Password;