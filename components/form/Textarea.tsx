//--------------------------------------------------------------------//
// Imports

//types
import type { ChangeEvent, LegacyRef, CSSProperties } from 'react';
import type { ExtendsType, HTMLTextareaProps } from '../types.js';


//--------------------------------------------------------------------//
// Types

export type TextareaConfig = {
  onChange?: Function, 
  onUpdate?: Function
};

export type TextareaProps = ExtendsType<HTMLTextareaProps, {
  style?: CSSProperties,
  error?: any,
  onUpdate?: (value: string) => void,
  passRef?: LegacyRef<HTMLTextAreaElement>
}>;

//--------------------------------------------------------------------//
// Hooks

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
};

//--------------------------------------------------------------------//
// Components

/**
 * Generic Textarea  Component (Main)
 */
export function Textarea(props: TextareaProps) {
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
  const classNames = [ 'frui-form-textarea' ];
  if (error) {
    classNames.push('frui-tx-error', 'frui-bd-error');
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

//defaults to textarea
export default Object.assign(Textarea, { useTextarea, use: useTextarea });