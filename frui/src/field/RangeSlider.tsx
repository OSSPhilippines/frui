import { useRef, useState, useEffect, useCallback } from 'react';
import type { CSSProperties } from 'react';

export type SliderValue = number | [number, number]; //can be a single value or a range of values

//type
export type SliderProps = {
  name?: string;
  value?: SliderValue;
  defaultValue?: SliderValue;
  onChange?: (value: SliderValue) => void;
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  vertical?: boolean;
  disabled?: boolean;
  marks?: { [key: number]: string | React.ReactNode };
  tooltip?: boolean;
  tooltipFormatter?: (value: number) => string;
  trackColor?: string;
  railColor?: string;
  handleColor?: string;
  className?: string;
  style?: CSSProperties;
};

export function useSlider(config: {
  value?: SliderValue;
  defaultValue?: SliderValue;
  onChange?: (value: SliderValue) => void;
  min: number;
  max: number;
  step: number;
  range: boolean;
}) {
  const { value, defaultValue, onChange, min, max, step, range } = config;
  
  const isControlled = value !== undefined;
  const initialValue = isControlled ? value : (defaultValue ?? (range ? [min, min] : min));
  
  const [internalValue, setInternalValue] = useState<SliderValue>(initialValue);
  const [dragging, setDragging] = useState<'start' | 'end' | null>(null);
  const [showTooltip, setShowTooltip] = useState<'start' | 'end' | null>(null);
  
  const currentValue = isControlled ? value : internalValue;
  
  // Creates function that keeps values between 0 and 100
  const clamp = (val: number) => Math.min(Math.max(val, min), max);

  // Creates function that rounds to nearest step (1)
  const snap = (val: number) => Math.round(val / step) * step;
  
  const updateValue = useCallback((newValue: SliderValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, onChange]);
  
  return {
    currentValue,
    dragging,
    setDragging,
    showTooltip,
    setShowTooltip,
    updateValue,
    clamp,
    snap
  };
}

export default function RangeSlider(props: SliderProps) {
  const {
    name,
    value,
    defaultValue,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    range = false,
    vertical = false,
    disabled = false,
    marks = {},
    tooltip = false,
    tooltipFormatter = (val: number) => val.toString(),
    trackColor = '#1890ff',
    railColor = '#f5f5f5',
    handleColor = '#fff',
    className,
    style
  } = props;

  const sliderRef = useRef<HTMLDivElement>(null);
  
  const {
    currentValue,
    dragging,
    setDragging,
    showTooltip,
    setShowTooltip,
    updateValue,
    clamp,
    snap
  } = useSlider({
    value,
    defaultValue,
    onChange,
    min,
    max,
    step,
    range
  });

  // Convert value to array format for consistent handling
  const valueArray = Array.isArray(currentValue) ? currentValue : [currentValue, currentValue];
  const [startValue, endValue] = valueArray;


  // Calculate positions as percentages with proper bounds checking
  const startPercent = Math.max(0, Math.min(100, ((startValue - min) / (max - min)) * 100));
  const endPercent = range ? Math.max(0, Math.min(100, ((endValue - min) / (max - min)) * 100)) : startPercent;

  const handleMouseDown = useCallback((handle: 'start' | 'end', e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setDragging(handle);
    setShowTooltip(handle);
  }, [disabled]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || !sliderRef.current || disabled) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const dimension = vertical ? rect.height : rect.width;
    const position = vertical ? rect.bottom - e.clientY : e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (position / dimension) * 100));
    const rawValue = min + (percent / 100) * (max - min);
    const snappedValue = clamp(snap(rawValue));

    if (range) {
      const [currentStart, currentEnd] = valueArray;
      if (dragging === 'start') {
        const newStart = Math.min(snappedValue, currentEnd);
        updateValue([newStart, currentEnd]);
      } else {
        const newEnd = Math.max(snappedValue, currentStart);
        updateValue([currentStart, newEnd]);
      }
    } else {
      updateValue(snappedValue);
    }
  }, [dragging, disabled, vertical, min, max, step, range, valueArray, clamp, snap, updateValue]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
    setShowTooltip(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  // Generate CSS classes
  const classNames = ['frui-field-slider'];
  
  if (vertical) classNames.push('frui-field-slider-vertical');
  if (disabled) classNames.push('frui-field-slider-disabled');
  if (className) classNames.push(className);

  // Track style (the filled portion)
  // For single sliders: always extend from 0% to current position
  // For range sliders: extend from start handle to end handle
  const trackStyle: CSSProperties = {
    backgroundColor: trackColor,
    ...(vertical ? {
      bottom: range ? `${Math.min(startPercent, endPercent)}%` : '0%',
      height: range ? `${Math.abs(endPercent - startPercent)}%` : `${startPercent}%`,
      left: '0',
      width: '100%'
    } : {
      left: range ? `${Math.min(startPercent, endPercent)}%` : '0%',
      width: range ? `${Math.abs(endPercent - startPercent)}%` : `${startPercent}%`,
      top: '0',
      height: '100%'
    })
  };

  // Handle styles
  const startHandleStyle: CSSProperties = {
    backgroundColor: handleColor,
    borderColor: trackColor,
    ...(vertical ? { bottom: `${startPercent}%` } : { left: `${startPercent}%` })
  };

  const endHandleStyle: CSSProperties = {
    backgroundColor: handleColor,
    borderColor: trackColor,
    ...(vertical ? { bottom: `${endPercent}%` } : { left: `${endPercent}%` })
  };

  return (
    <div className={classNames.join(' ')} style={style}>
      <div
        ref={sliderRef}
        className="frui-field-slider-rail"
        style={{ backgroundColor: railColor }}
      >
        {/* Track (filled portion) */}
        <div className="frui-field-slider-track" style={trackStyle} />
        
        {/* Start handle */}
        <div
          className="frui-field-slider-handle"
          style={startHandleStyle}
          onMouseDown={(e) => handleMouseDown('start', e)}
          onMouseEnter={() => tooltip && setShowTooltip('start')}
          onMouseLeave={() => !dragging && setShowTooltip(null)}
        >
          {tooltip && showTooltip === 'start' && (
            <div className="frui-field-slider-tooltip">
              {tooltipFormatter(startValue)}
            </div>
          )}
        </div>

        {/* End handle (only for range sliders) */}
        {range && (
          <div
            className="frui-field-slider-handle"
            style={endHandleStyle}
            onMouseDown={(e) => handleMouseDown('end', e)}
            onMouseEnter={() => tooltip && setShowTooltip('end')}
            onMouseLeave={() => !dragging && setShowTooltip(null)}
          >
            {tooltip && showTooltip === 'end' && (
              <div className="frui-field-slider-tooltip">
                {tooltipFormatter(endValue)}
              </div>
            )}
          </div>
        )}

        {/* Marks */}
        {Object.entries(marks).map(([markValue, markLabel]) => {
          const markPercent = ((Number(markValue) - min) / (max - min)) * 100;
          return (
            <div
              key={markValue}
              className="frui-field-slider-mark"
              style={vertical ? { bottom: `${markPercent}%` } : { left: `${markPercent}%` }}
            >
              <div className="frui-field-slider-mark-dot" />
              <div className="frui-field-slider-mark-label">{markLabel}</div>
            </div>
          );
        })}
      </div>

      {/* Hidden inputs for form submission */}
      {name && (
        <>
          {range ? (
            <>
              <input name={`${name}[0]`} type="hidden" value={startValue} />
              <input name={`${name}[1]`} type="hidden" value={endValue} />
            </>
          ) : (
            <input name={name} type="hidden" value={startValue} />
          )}
        </>
      )}
    </div>
  );
}