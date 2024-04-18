//types
import type { ChangeEvent, MouseEvent, CSSProperties } from 'react';
import type { HTMLInputProps } from '../types';
import type { InputConfig } from './Input';
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