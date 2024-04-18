//types
import type { InputProps } from './Input';
//hooks
import { useState } from 'react';
//components
import Input from './Input';

/**
 * Password Props
 */
export type PasswordProps = InputProps & {
  error?: boolean
};

/**
 * Password Hook Aggregate
 */
export function usePassword() {
  const [ showing, show ] = useState(false);
  const toggle = () => show(!showing);
  return { toggle, showing };
}

/**
 * Password  Component (Main)
 */
export default function Password(props: PasswordProps) {
  //remove type
  const { error, className, ...attributes } = props;
  //hooks
  const { showing, toggle } = usePassword();

  const classNames = [ 'field-password' ];
  if (className) {
    classNames.push(className);
  }

  const toggleClass = [ 'field-password-control' ];
  if (error) {
    toggleClass.push('tx-error bd-error');
  }

  return (
    <div className={classNames.join(' ')}>
      <Input 
        {...attributes} 
        error={error} 
        type={showing ? 'text': 'password'} 
        className="field-password-control"
      />
      <span className={toggleClass.join(' ')} onClick={toggle}>
        {showing ? '✷': 'A' }
      </span>
    </div>
  );
};