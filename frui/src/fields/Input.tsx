//types
import type { ChangeEvent, LegacyRef, CSSProperties } from 'react';
import type { ExtendsType, HTMLInputProps } from '../types';

/**
 * Input Config
 */
export type InputConfig = {
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: Function, 
  onUpdate?: Function
};

/**
 * Input Props
 */
export type InputProps = ExtendsType<HTMLInputProps, {
  style?: CSSProperties,
  error?: any,
  onUpdate?: (value: string) => void,
  passRef?: LegacyRef<HTMLInputElement>
}>;

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