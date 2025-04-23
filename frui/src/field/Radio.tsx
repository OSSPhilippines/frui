//types
import type { ChangeEvent, MouseEvent, CSSProperties } from 'react';
import type { HTMLInputProps } from '../types.js';
import type { InputConfig } from './Input.js';
//hooks
import { useState, useEffect } from 'react';

/**
 * Radio Props
 */
export type RadioProps = HTMLInputProps & {
  label?: string,
  error?: any,
  check?: boolean,
  circle?: boolean,
  square?: boolean,
  rounded?: boolean,
  blue?: boolean,
  orange?: boolean,
  style?: CSSProperties,
  className?: string,
  onUpdate?: (value: string|number|undefined, checked: boolean) => void
};

/**
 * Currency Hook Aggregate
 */
export function useRadio(config: InputConfig) {
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
      out: (_e: MouseEvent<HTMLInputElement>) => hover(false),
      over: (_e: MouseEvent<HTMLInputElement>) => hover(true),
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

  const classNames = [ 'frui-field-option' ];
  if (rounded) {
    classNames.push('frui-field-option-rounded');
  }

  if (check) {
    classNames.push('frui-field-option-check');
  } else if (square) {
    classNames.push('frui-field-option-square');
  } else {
    classNames.push('frui-field-option-circle');
  }

  if (blue) {
    classNames.push('frui-field-option-blue');
  } else if (orange) {
    classNames.push('frui-field-option-orange');
  } else {
    classNames.push('frui-field-option-default');
  }

  if (error) {
    classNames.push('frui-tx-error');
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
        className="frui-field-option-control"
        checked={checked}
        defaultChecked={defaultChecked}
      />
      <span className="frui-field-option-label">
        {label}
      </span>
    </label>
  );
}