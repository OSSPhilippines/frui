//--------------------------------------------------------------------//
// Imports

//types
import type { ReactNode, CSSProperties } from 'react';

//--------------------------------------------------------------------//
// Types

export type ControlProps = {
  label?: string,
  error?: string,
  style?: CSSProperties,
  className?: string,
  children?: ReactNode
};

//--------------------------------------------------------------------//
// Components

/**
 * Form Control Component (Main)
 */
export function Control(props: ControlProps) {
  //separate component related props from field attributes
  const {   
    label, 
    error, 
    children,
    className,
    ...atributes
  } = props;

  const classNames = ['frui-control'];
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')} {...atributes}>
      {!!label && (
        <label className="frui-control-label">{label}</label>
      )}
      <div className="frui-control-field">{children}</div>
      {!!error && error?.length > 0 && (
        <div className="frui-control-error">{error}</div>
      )}
    </div>
  );
};

//defaults to control
export default Control;