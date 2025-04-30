// types
import type { ChangeEvent, CSSProperties, MouseEvent, ReactNode } from 'react';
import type { InputConfig } from './Input';
import type { HTMLInputProps } from '../types';
// hooks
import { useState, useEffect } from 'react';
// utils
import { Children, isValidElement, cloneElement } from 'react';

export type RadioGroupProps = {
  children: ReactNode;
  name: string;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  onUpdate?: (value: string | number | undefined, checked: boolean) => void;
  orientation?: 'row' | 'column';
  style?: CSSProperties;
  className?: string;
  color?: string;
  error?: boolean;
  disabled?: boolean;
};

export type RadioGroupItemProps = InputConfig & HTMLInputProps & {
  label: string;
  value: string | number;
  color?: string;
  error?: boolean;
  disabled?: boolean;
  onMouseOver?: (event: MouseEvent<HTMLInputElement>) => void;
  onMouseOut?: (event: MouseEvent<HTMLInputElement>) => void;
  onUpdate?: (value: string | number | undefined, checked: boolean) => void;
};

export function RadioGroupItem({
  label,
  value,
  name,
  checked,
  defaultChecked,
  onChange,
  color,
  error,
  disabled,
  onUpdate,
  onMouseOver,
  onMouseOut,
  ...rest
}: RadioGroupItemProps) {
  const handleChange = () => {
    if (disabled) return;
    onChange?.({ target: { value } } as ChangeEvent<HTMLInputElement>);
    onUpdate?.(value, true);
  };

  const inputStyle: CSSProperties = {
    marginRight: '6px',
    width: '18px',
    height: '18px',
    minWidth: '18px',
    minHeight: '18px',
    marginTop: '2px',
    accentColor: error ? 'red' : color,
    cursor: 'pointer',
  };

  const labelStyle: CSSProperties = {
    color: error ? 'red' : 'inherit',
    marginRight: '8px',
  };

  return (
    <label
      className="radio-option"
      style={{
        display: 'flex',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input
        {...rest}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className="radio-input"
        disabled={disabled}
        style={inputStyle}
        onMouseOver={(e) => onMouseOver?.(e)}
        onMouseOut={(e) => onMouseOut?.(e)}
      />
      <span className="radio-label" style={labelStyle}>{label}</span>
    </label>
  );
}

export default function RadioGroup({
  children,
  name,
  defaultValue,
  onChange,
  onUpdate,
  orientation = 'row',
  style,
  className,
  color,
  error,
  disabled,
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(defaultValue);

  // Set default selected value
  useEffect(() => {
    if (defaultValue !== undefined) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  // If no defaultValue, check for item with defaultChecked
  useEffect(() => {
    if (defaultValue !== undefined) return;

    Children.forEach(children, (child) => {
      if (
        isValidElement<RadioGroupItemProps>(child) &&
        child.props.defaultChecked
      ) {
        setSelectedValue(child.props.value);
      }
    });
  }, [children, defaultValue]);

  const handleChange = (
    newValue: string | number,
    itemOnUpdate?: (value: string | number | undefined, checked: boolean) => void
  ) => {
    if (disabled) return;
    setSelectedValue(newValue);
    onChange?.(newValue);
    itemOnUpdate?.(newValue, true);
    onUpdate?.(newValue, true);   
  };

  return (
    <div
      className={['radio-group', className].filter(Boolean).join(' ')}
      style={{
        display: 'flex',
        flexDirection: orientation,
        gap: '8px',
        ...style,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input type="hidden" name={name} value={selectedValue} />
      {Children.map(children, (child) =>
        isValidElement<RadioGroupItemProps>(child)
          ? cloneElement(child, {
              name,
              checked: selectedValue === child.props.value,
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                handleChange(
                  e.target.value,
                  child.props.onUpdate
                ),
              color: child.props.color || color,
              error: child.props.error ?? error,
              disabled: disabled || child.props.disabled,
            })
          : child
      )}
    </div>
  );
}