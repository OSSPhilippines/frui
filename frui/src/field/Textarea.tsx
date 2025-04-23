//types
import type { ChangeEvent, LegacyRef, CSSProperties } from 'react';
import type { ExtendsType, HTMLTextareaProps } from '../types.js';

/**
 * Textarea Config
 */
export type TextareaConfig = {
  onChange?: Function, 
  onUpdate?: Function
};

/**
 * Textarea Props
 */
export type TextareaProps = ExtendsType<HTMLTextareaProps, {
  style?: CSSProperties,
  error?: any,
  onUpdate?: (value: string) => void,
  passRef?: LegacyRef<HTMLTextAreaElement>
}>;

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
  const classNames = [ 'frui-field-textarea' ];
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