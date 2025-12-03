//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent, CSSProperties } from 'react';
import { useState, useEffect } from 'react';
//frui
import type { ExtendsType, HTMLInputProps } from '../types.js';
import type { InputConfig } from './Input.js';

//--------------------------------------------------------------------//
// Types

export type CheckboxProps = ExtendsType<HTMLInputProps, {
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
}>;

//--------------------------------------------------------------------//
// Hooks

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
};

//--------------------------------------------------------------------//
// Components

/**
 * Styled Checkbox Component (Main)
 */
export function Checkbox(props: CheckboxProps) {
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

  const classNames = [ 'frui-form-option' ];
  if (rounded) {
    classNames.push('frui-form-option-rounded');
  }

  if (circle) {
    classNames.push('frui-form-option-circle');
  } else if (square) {
    classNames.push('frui-form-option-square');
  } else {
    classNames.push('frui-form-option-check');
  }

  if (blue) {
    classNames.push('frui-form-option-blue');
  } else if (orange) {
    classNames.push('frui-form-option-orange');
  } else {
    classNames.push('frui-form-option-default');
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
        className="frui-form-option-control"
        checked={checked}
        defaultChecked={defaultChecked}
      />
      <span className="frui-form-option-label">
        {label}
      </span>
    </label>
  );
};

//defaults to checkbox
export default Object.assign(Checkbox, { useCheckbox, use: useCheckbox });