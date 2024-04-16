//types
import type { TextareaProps } from '../types/fields';
//hooks
import useTextarea from '../hooks/useTextarea';

/**
 * Generic Textarea  Component (Main)
 */
export default function Textarea(props: TextareaProps) {
  //separate component related props from field attributes
  const {  
    error, 
    className,
    onChange,
    onUpdate,
    passRef,
    ...attributes 
  } = props;
  //hooks
  const { handlers } = useTextarea({ onChange, onUpdate });
  //variables
  const classNames = [ 'field-textarea' ];
  if (error) {
    classNames.push('tx-error', 'bd-error');
  }
  if (className) {
    classNames.push(className);
  }
  //render
  return (
    <textarea 
      {...attributes} 
      className={classNames.join(' ')}
      ref={passRef} 
      onChange={handlers.change} 
    />
  );
};