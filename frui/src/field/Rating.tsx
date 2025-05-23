import type { 
  SVGProps,
  ChangeEvent, 
  MouseEvent, 
  ReactNode, 
  CSSProperties 
} from 'react';

import React, { useState, useCallback, useId } from 'react';

export type RatingConfig = {
  name?: string,
  value?: number | null,
  defaultValue?: number | null,
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: number | null) => void,
  //Hover change
  onChangeActive?: (event: MouseEvent, value: number | null) => void, 
  readOnly?: boolean,
  disabled?: boolean
};

export type RatingProps = {
  name?: string,
  value?: number | null,
  defaultValue?: number | null,
  max?: number,
  //(Future enhancement: 0.5 for half stars) - Currently supports 1
  //precision?: number,
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: number | null) => void,
  //Hover change
  onChangeActive?: (event: MouseEvent, value: number | null) => void, 
  readOnly?: boolean,
  disabled?: boolean,
  size?: 'small' | 'medium' | 'large',
  icon?: ReactNode,
  emptyIcon?: ReactNode,
  getLabelText?: (value: number) => string,
  highlightSelectedOnly?: boolean,
  className?: string,
  style?: CSSProperties
};

export const defaultGetLabelText = (value: number): string => `${value} Star${value !== 1 ? 's' : ''}`;

export function useRating(config: RatingConfig) {
  const {
    name: providedName,
    value: controlledValue,
    defaultValue = null,
    // precision = 1, // Currently fixed at 1
    onChange,
    onChangeActive,
    readOnly = false,
    disabled = false
  } = config;
  const [uncontrolledValue, setUncontrolledValue] = useState<number | null>(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const generatedName = useId();

  const name = providedName || generatedName;

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  const handlers = {
    radioChange: useCallback((event: ChangeEvent<HTMLInputElement>) => {
      if (readOnly) return;
      const newValue = parseInt(event.target.value, 10);
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(event, newValue);
    }, [isControlled, onChange, readOnly]),

    mouseEnter: useCallback((event: MouseEvent, indexValue: number) => {
      if (readOnly || disabled) return;
      setHoverValue(indexValue);
      onChangeActive?.(event, indexValue);
    }, [readOnly, disabled, onChangeActive]),

    mouseLeave: useCallback((event: MouseEvent) => {
      if (readOnly || disabled) return;
      setHoverValue(null);
      onChangeActive?.(event, null);
    }, [readOnly, disabled, onChangeActive])
  };

  return {
    name,
    value: currentValue,
    displayValue,
    hoverValue,
    setHoverValue,
    handlers,
    isControlled
  };
}

export function Star({ style, ...props }: SVGProps<SVGSVGElement>) {
  return (
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
};

export default function Rating(props: RatingProps) {
  const {
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
  } = props;

  const {
    name,
    value,
    handlers,
    displayValue,
    hoverValue
  } = useRating({
    name: providedName,
    value: controlledValue,
    defaultValue,
    onChange,
    onChangeActive,
    readOnly,
    disabled
  });

  const filledIcon = icon || <Star />;
  const unfilledIcon = emptyIcon || <Star style={{ opacity: 0.4 }} />;

  const classNames = [ 'frui-rating-root' ];
  if (size === 'small') {
    classNames.push(`frui-rating-small`);
  } else if (size === 'large') {
    classNames.push(`frui-rating-large`);
  } else {
    classNames.push(`frui-rating-medium`);
  }

  if (disabled) {
    classNames.push('frui-rating-disabled');
  }
  if (readOnly) {
    classNames.push('frui-rating-readonly');
  }
  classNames.push(className);

  return (
    <span 
      className={classNames.join(' ')} 
      style={style} 
      onMouseLeave={handlers.mouseLeave}
    >
      {Array.from({ length: max }, (_, index) => {
        const itemValue = index + 1;
        const isChecked = value === itemValue;
        let isFilled: boolean;
        if (highlightSelectedOnly) {
            isFilled = displayValue === itemValue;
        } else {
            isFilled = displayValue !== null && itemValue <= displayValue;
        }

        const iconNode = isFilled ? filledIcon : unfilledIcon;
        const classNames = [ 'frui-rating-icon' ];
        if (isFilled) {
          classNames.push('frui-rating-icon-filled');
        } else {
          classNames.push('frui-rating-icon-empty');
        }
        if (hoverValue === itemValue) {
          classNames.push('frui-rating-icon-hover');
        }
        if (value === itemValue) {
          classNames.push('frui-rating-icon-active');
        }
        return (
          <React.Fragment key={itemValue}>
            <label
              className="frui-rating-icon-label"
              onMouseEnter={(e) => handlers.mouseEnter(e, itemValue)}
              aria-label={getLabelText(itemValue)}
            >
              <input
                className="frui-rating-visually-hidden"
                type="radio"
                name={name}
                value={itemValue}
                checked={isChecked}
                onChange={handlers.radioChange}
                disabled={disabled}
                readOnly={readOnly}
              />
              <span className={classNames.join(' ')}>{iconNode}</span>
            </label>
          </React.Fragment>
        );
      })}
    </span>
  );
}