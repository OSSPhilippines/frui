//--------------------------------------------------------------------//
// Imports

//types
import type { ReactNode, CSSProperties } from 'react';

//--------------------------------------------------------------------//
// Types

export type FieldControlProps = {
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
export function FieldControl(props: FieldControlProps) {
  //separate component related props from field attributes
  const {   
    label, 
    error, 
    children,
    className,
    ...atributes
  } = props;

  const classNames = [ 'frui-form-field-control' ];
  className && classNames.push(className);

  return (
    <div className={classNames.join(' ')} {...atributes}>
      {!!label && (
        <label className="frui-form-field-control-label">{label}</label>
      )}
      <div className="frui-form-field-control-field">{children}</div>
      {!!error && error?.length > 0 && (
        <div className="frui-form-field-control-error">{error}</div>
      )}
    </div>
  );
};

//defaults to field control
export default FieldControl;