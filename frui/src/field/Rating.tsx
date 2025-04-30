import React, { useState, useCallback, ChangeEvent, MouseEvent, ReactNode, useId, CSSProperties } from 'react';

// --- Default SVG Star Icon ---
const StarIcon = ({ style, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
    style={{ display: 'inline-block', flexShrink: 0, userSelect: 'none', ...style }}
    {...props}
  >
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

// --- Types ---

export type RatingProps = {
  name?: string;
  value?: number | null;
  defaultValue?: number | null;
  max?: number;
  // precision?: number; // (Future enhancement: 0.5 for half stars) - Currently supports 1
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: number | null) => void;
  onChangeActive?: (event: MouseEvent, value: number | null) => void; // Hover change
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  emptyIcon?: ReactNode;
  getLabelText?: (value: number) => string;
  highlightSelectedOnly?: boolean;
  className?: string;
  style?: CSSProperties;
};

const defaultGetLabelText = (value: number): string => `${value} Star${value !== 1 ? 's' : ''}`;

// --- Component ---

export default function Rating({
  name: providedName,
  value: controlledValue,
  defaultValue = null,
  max = 5,
  // precision = 1, // Currently fixed at 1
  onChange,
  onChangeActive,
  readOnly = false,
  disabled = false,
  size = 'medium',
  icon,
  emptyIcon,
  getLabelText = defaultGetLabelText,
  highlightSelectedOnly = false,
  className = '',
  style,
}: RatingProps) {

  const [uncontrolledValue, setUncontrolledValue] = useState<number | null>(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const generatedName = useId();
  const name = providedName || generatedName;

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const filledIcon = icon || <StarIcon />;
  const unfilledIcon = emptyIcon || <StarIcon style={{ opacity: 0.4 }} />;

  const handleRadioChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const newValue = parseInt(event.target.value, 10);
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(event, newValue);
  }, [isControlled, onChange, readOnly]);

  const handleMouseEnter = useCallback((event: MouseEvent, indexValue: number) => {
    if (readOnly || disabled) return;
    setHoverValue(indexValue);
    onChangeActive?.(event, indexValue);
  }, [readOnly, disabled, onChangeActive]);

  const handleMouseLeave = useCallback((event: MouseEvent) => {
    if (readOnly || disabled) return;
    setHoverValue(null);
    onChangeActive?.(event, null);
  }, [readOnly, disabled, onChangeActive]);

  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  const rootClassName = `frui-rating-root frui-rating-size${size.charAt(0).toUpperCase() + size.slice(1)} ${disabled ? 'frui-rating-disabled' : ''} ${readOnly ? 'frui-rating-readOnly' : ''} ${className}`;

  return (
    <span className={rootClassName} style={style} onMouseLeave={handleMouseLeave}>
      {Array.from({ length: max }, (_, index) => {
        const itemValue = index + 1;
        const isChecked = currentValue === itemValue;
        let isFilled: boolean;
        if (highlightSelectedOnly) {
            isFilled = displayValue === itemValue;
        } else {
            isFilled = displayValue !== null && itemValue <= displayValue;
        }

        const iconNode = isFilled ? filledIcon : unfilledIcon;
        const iconClassName = `frui-rating-icon ${isFilled ? 'frui-rating-icon-filled' : 'frui-rating-icon-empty'} ${hoverValue === itemValue ? 'frui-rating-icon-hover' : ''} ${currentValue === itemValue ? 'frui-rating-icon-active' : ''}`;

        return (
          <React.Fragment key={itemValue}>
            <label
              className="frui-rating-icon-label"
              onMouseEnter={(e) => handleMouseEnter(e, itemValue)}
              aria-label={getLabelText(itemValue)}
            >
              <input
                className="frui-rating-visually-hidden"
                type="radio"
                name={name}
                value={itemValue}
                checked={isChecked}
                onChange={handleRadioChange}
                disabled={disabled}
                readOnly={readOnly}
              />
              <span className={iconClassName}>{iconNode}</span>
            </label>
          </React.Fragment>
        );
      })}
    </span>
  );
}