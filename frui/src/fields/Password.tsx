//types
import type { PasswordProps } from '../types/fields';
//components
import Input from './Input';
//hooks
import usePassword from '../hooks/usePassword';

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