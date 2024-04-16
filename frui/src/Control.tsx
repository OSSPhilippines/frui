//types
import type { ControlProps } from './types/components';

/**
 * Form Control Component (Main)
 */
export default function Control(props: ControlProps) {
  //separate component related props from field attributes
  const {   
    label, 
    error, 
    children,
    className,
    ...atributes
  } = props;

  const classNames = ['control'];
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')} {...atributes}>
      {!!label && (
        <label className="control-label">{label}</label>
      )}
      <div className="control-field">{children}</div>
      {!!error && error?.length > 0 && (
        <div className="control-error">{error}</div>
      )}
    </div>
  );
};