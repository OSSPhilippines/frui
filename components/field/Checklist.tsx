//modules
import type { ChangeEvent, CSSProperties, ReactNode } from 'react';
import { 
  useState, 
  useEffect, 
  Children, 
  isValidElement, 
  cloneElement 
} from 'react';
//src
import type { HTMLInputProps } from '../types.js';
import type { InputConfig } from './Input.js';

export type ChecklistProps = {
  children: ReactNode;
  name: string;
  defaultValue?: (string | number)[];
  onChange?: (selected: (string | number)[]) => void;
  onUpdate?: (value: string | number, checked: boolean) => void;
  style?: CSSProperties;
  className?: string;
  orientation?: 'row' | 'column';
  size?: number;
  error?: boolean;
  disabled?: boolean;
  color?: string;
};

export type ChecklistItemProps = Omit<
  HTMLInputProps,
  'onChange' | 'type' | 'defaultChecked' | 'checked'
> & {
  label: string;
  value: string | number;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: string | number, checked: boolean) => void;
  onUpdate?: (value: string | number, checked: boolean) => void;
  size?: number;
  error?: boolean;
  disabled?: boolean;
  color?: string;
};

export function useChecklistItem(
  config: InputConfig & {
    value: string | number;
    onUpdate?: (value: string | number, checked: boolean) => void;
  }
) {
  const { onChange, checked: propChecked, defaultChecked, value, onUpdate } =
    config;
  const [isChecked, setIsChecked] = useState(
    Boolean(defaultChecked || propChecked)
  );

  useEffect(() => {
    if (typeof propChecked === 'undefined') return;
    if (propChecked !== isChecked) {
      setIsChecked(propChecked);
    }
  }, [propChecked]);

  return {
    isChecked,
    handlers: {
      change: (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        onChange && onChange(e);
        onUpdate && onUpdate(value, e.target.checked);
      },
    },
  };
}

export function ChecklistItem({
  label,
  value,
  checked: propChecked,
  defaultChecked,
  onChange,
  onUpdate,
  size = 17,
  error,
  disabled,
  color,
  ...rest
}: ChecklistItemProps) {
  const { isChecked, handlers } = useChecklistItem({
    onChange: (e: { target: { checked: boolean } }) =>
      onChange && onChange(value, e.target.checked),
    onUpdate,
    checked: propChecked,
    defaultChecked,
    value,
  });

  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '15px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        marginTop: '2px',
        color: error ? 'red' : disabled ? 'gray' : 'inherit',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={handlers.change}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: disabled ? 'not-allowed' : 'pointer',
          verticalAlign: 'middle',
          marginTop: '2px',
          accentColor: error ? 'red' : color || 'inherit',
        }}
        disabled={disabled}
        {...rest}
      />
      <span style={{ fontSize: 'inherit', lineHeight: `${size}px` }}>
        {label}
      </span>
    </label>
  );
}

export default function Checklist({
  children,
  name,
  defaultValue = [],
  onChange,
  onUpdate,
  style,
  className,
  orientation = 'row',
  size = 17,
  error,
  disabled,
  color,
}: ChecklistProps) {
  const [selected, setSelected] = useState<(string | number)[]>(() => {
    const defaultCheckedValues: (string | number)[] = [];
    Children.forEach(children, (child) => {
      if (isValidElement<ChecklistItemProps>(child) && child.props.defaultChecked) {
        defaultCheckedValues.push(child.props.value);
      }
    });

    if (defaultValue.length > 0) {
      return defaultValue;
    }

    return defaultCheckedValues;
  });

  const toggleSelection = (
    value: string | number,
    checked: boolean,
    itemOnUpdate?: (value: string | number, checked: boolean) => void
  ) => {
    if (!disabled) {
      setSelected((prev) => {
        const newSelection = checked
          ? [...prev, value]
          : prev.filter((v) => v !== value);
        onChange?.(newSelection);
        return newSelection;
      });

      // ✅ Call updates *after* React has handled DOM changes
      setTimeout(() => {
        onUpdate?.(value, checked);
        itemOnUpdate?.(value, checked);
      }, 0);
    }
  };

  return (
    <div
      className={`checklist ${className || ''}`}
      style={{
        display: 'flex',
        flexDirection: orientation === 'column' ? 'column' : 'row',
        alignItems: 'center',
        gap: '12px',
        fontSize: '15px',
        marginTop: '2px',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {Children.map(children, (child) => {
        if (isValidElement<ChecklistItemProps>(child)) {
          return cloneElement(child, {
            checked: selected.includes(child.props.value),
            onChange: (value: string | number, checked: boolean) => {
              toggleSelection(value, checked, child.props.onUpdate);
            },
            size: child.props.size || size,
            error: child.props.error !== undefined ? child.props.error : error,
            disabled: disabled || child.props.disabled,
            color: child.props.color || color,
            onUpdate: child.props.onUpdate,
          });
        }
        return child;
      })}
      <input type="hidden" name={name} value={JSON.stringify(selected)} />
    </div>
  );
}
