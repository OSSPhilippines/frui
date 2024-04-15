//types
import type { RadioProps } from '../types/fields';
//hooks
import useRadio from '../hooks/useRadio';

/**
 * Styled Radio  Component (Main)
 */
export default function Radio(props: RadioProps) {
  //separate component related props from field attributes
  const {   
    defaultChecked,
    checked,
    label, 
    error, 
    check,
    circle,
    square,
    rounded,
    blue,
    orange,
    style,
    className,
    onChange,
    onUpdate,
    ...attributes 
  } = props;
  //hooks
  const { handlers } = useRadio({ 
    onChange, 
    onUpdate, 
    checked,
    defaultChecked 
  });

  const classNames = [ 'field-option' ];
  if (rounded) {
    classNames.push('field-option-rounded');
  }

  if (check) {
    classNames.push('field-option-check');
  } else if (square) {
    classNames.push('field-option-square');
  } else {
    classNames.push('field-option-circle');
  }

  if (blue) {
    classNames.push('field-option-blue');
  } else if (orange) {
    classNames.push('field-option-orange');
  } else {
    classNames.push('field-option-default');
  }

  if (error) {
    classNames.push('tx-error');
  }

  if (className) {
    classNames.push(className);
  }

  //render
  return (
    <label className={classNames.join(' ')} style={style}>
      <input 
        {...attributes} 
        onChange={handlers.change} 
        onMouseOut={handlers.out}
        onMouseOver={handlers.over}
        type="radio" 
        className="field-option-control"
        checked={checked}
        defaultChecked={defaultChecked}
      />
      <span className="field-option-label">
        {label}
      </span>
    </label>
  );
}