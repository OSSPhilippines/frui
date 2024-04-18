//types
import type { ChangeEvent } from 'react';
import type { TextareaProps, TextareaConfig } from '../types/fields';

/**
 * Textarea Hook Aggregate
 */
export function useTextarea({ onChange, onUpdate }: TextareaConfig) {
  return {
    handlers: {
      change: (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange && onChange(e);
        onUpdate && onUpdate(e.target.value);
      }
    }
  };
}

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