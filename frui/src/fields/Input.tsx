//types
import type { InputProps } from '../types/fields';
//hooks
import useInput from '../hooks/useInput';

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