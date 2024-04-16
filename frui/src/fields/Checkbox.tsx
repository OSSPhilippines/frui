//types
import type { CheckboxProps } from '../types/fields';
//hooks
import useRadio from '../hooks/useRadio';

/**
 * Styled Checkbox Component (Main)
 */
export default function Checkbox(props: CheckboxProps) {
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

  if (circle) {
    classNames.push('field-option-circle');
  } else if (square) {
    classNames.push('field-option-square');
  } else {
    classNames.push('field-option-check');
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
        type="checkbox" 
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