//types
import type { ChangeEvent, MouseEvent, CSSProperties } from 'react';
import type { InputConfig } from './Input';
import type { HTMLInputProps } from '../types';
//hooks
import { useState, useEffect } from 'react';

/**
 * Switch Props
 */
export type SwitchProps = HTMLInputProps & {
  label?: string,
  error?: any,
  rounded?: boolean,
  onoff?: boolean,
  yesno?: boolean,
  checkex?: boolean,
  sunmoon?: boolean,
  ridge?: boolean,
  blue?: boolean,
  orange?: boolean,
  green?: boolean,
  theme?: string|number,
  style?: CSSProperties,
  className?: string,
  onUpdate?: (value: string|number|undefined, checked: boolean) => void
};

/**
 * Switch Hook Aggregate
 */
export function useSwitch(config: InputConfig) {
  const { onChange, onUpdate, defaultChecked, checked } = config;
  const [ isChecked, check ] = useState(Boolean(defaultChecked || checked));
  const [ isHovering, hover ] = useState(false);
  useEffect(() => {
    if (typeof checked === 'undefined') return;
    if (checked !== isChecked) {
      check(checked);
    }
  }, [ checked ]);
  return {
    isHovering,
    isChecked,
    handlers: {
      out: (e: MouseEvent<HTMLInputElement>) => hover(false),
      over: (e: MouseEvent<HTMLInputElement>) => hover(true),
      change: (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked !== checked) {
          check(e.target.checked);
        }
        onChange && onChange(e);
        onUpdate && onUpdate(e.target.value, e.target.checked);
      }
    }
  };
}
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

  const classNames = [ 'frui-field-switch' ];
  if (rounded) {
    classNames.push('frui-field-switch-rounded');
  }

  if (onoff) {
    classNames.push('frui-field-switch-onoff');
  } else if (yesno) {
    classNames.push('frui-field-switch-yesno');
  } else if (sunmoon) {
    classNames.push('frui-field-switch-sunmoon');
  } else {
    classNames.push('frui-field-switch-checkex');
  }

  if (ridge) {
    classNames.push('frui-field-switch-ridge');
  } else {
    classNames.push('frui-field-switch-smooth');
  }

  if (blue) {
    classNames.push('frui-field-switch-blue');
  } else if (orange) {
    classNames.push('frui-field-switch-orange');
  } else if (green) {
    classNames.push('frui-field-switch-green');
  } else {
    classNames.push('frui-field-switch-default');
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
        className="frui-field-switch-control"
        checked={checked}
        defaultChecked={defaultChecked}
      />
      <span className="frui-field-switch-label">
        {label}
      </span>
    </label>
  );
}