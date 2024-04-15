//types
import type { SwitchProps } from '../types/fields';
//hooks
import useSwitch from '../hooks/useSwitch';

/**
 * Styled Switch  Component (Main)
 */
export default function Switch(props: SwitchProps) {
  //separate component related props from field attributes
  const {   
    defaultChecked,
    checked,
    label, 
    error, 
    rounded,
    onoff,
    yesno,
    checkex,
    sunmoon,
    ridge,
    blue,
    orange,
    green,
    style,
    className,
    onChange,
    onUpdate,
    ...attributes 
  } = props;
  //hooks
  const { handlers } = useSwitch({ 
    onChange, 
    onUpdate, 
    checked,
    defaultChecked 
  });

  const classNames = [ 'field-switch' ];
  if (rounded) {
    classNames.push('field-switch-rounded');
  }

  if (onoff) {
    classNames.push('field-switch-onoff');
  } else if (yesno) {
    classNames.push('field-switch-yesno');
  } else if (sunmoon) {
    classNames.push('field-switch-sunmoon');
  } else {
    classNames.push('field-switch-checkex');
  }

  if (ridge) {
    classNames.push('field-switch-ridge');
  } else {
    classNames.push('field-switch-smooth');
  }

  if (blue) {
    classNames.push('field-switch-blue');
  } else if (orange) {
    classNames.push('field-switch-orange');
  } else if (green) {
    classNames.push('field-switch-green');
  } else {
    classNames.push('field-switch-default');
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
        className="field-switch-control"
        checked={checked}
        defaultChecked={defaultChecked}
      />
      <span className="field-switch-label">
        {label}
      </span>
    </label>
  );
}