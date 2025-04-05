//types
import type { ChangeEvent, CSSProperties } from 'react';
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
  useEffect(() => {
    if (typeof checked === 'undefined') return;
    if (checked !== isChecked) {
      check(checked);
    }
  }, [ checked ]);
  return {
    isChecked,
    handlers: {
      change: (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked !== checked) {
          check(e.target.checked);
        }
        onChange && onChange(e);
        onUpdate && onUpdate(
          e.target.checked ? e.target.value: undefined, 
          e.target.checked
        );
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

  const classNames = [ 'frui-field-option' ];
  if (rounded) {
    classNames.push('frui-field-option-rounded');
  }

  if (circle) {
    classNames.push('frui-field-option-circle');
  } else if (square) {
    classNames.push('frui-field-option-square');
  } else {
    classNames.push('frui-field-option-check');
  }

  if (blue) {
    classNames.push('frui-field-option-blue');
  } else if (orange) {
    classNames.push('frui-field-option-orange');
  } else {
    classNames.push('frui-field-option-default');
  }

  if (error) {
    classNames.push('frui-tx-error', 'frui-bd-error');
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
        type="checkbox" 
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