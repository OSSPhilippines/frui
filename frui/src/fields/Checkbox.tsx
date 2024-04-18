//types
import type { ChangeEvent, MouseEvent, CSSProperties } from 'react';
import type { HTMLInputProps } from '../types';
import type { InputConfig } from './Input';
//hooks
import { useState, useEffect } from 'react';

/**
 * Checkbox Props
 */
export type CheckboxProps = HTMLInputProps & {
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
 * Checkbox Hook Aggregate
 */
export function useCheckbox(config: InputConfig) {
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
  const { handlers } = useCheckbox({ 
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