//--------------------------------------------------------------------//
// Imports

// types
import type { CSSProperties } from 'react';
// hooks
import { useRef, useState, useEffect, useCallback } from 'react';

//--------------------------------------------------------------------//
// Types

export type SliderValue = number | [number, number];

export type RangeSliderProps = {
  name?: string,
  value?: SliderValue,
  defaultValue?: SliderValue,
  onChange?: (value: SliderValue) => void,
  min?: number,
  max?: number,
  step?: number,
  range?: boolean,
  vertical?: boolean,
  disabled?: boolean,
  marks?: { [key: number]: string | React.ReactNode },
  tooltip?: boolean,
  tooltipFormatter?: (value: number) => string,
  trackColor?: string,
  railColor?: string,
  handleColor?: string,
  className?: string,
  style?: CSSProperties
};

//--------------------------------------------------------------------//
// Hooks

export function useRangeSlider(config: RangeSliderProps) {
  const {
    value,
    defaultValue,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    range = false,
    vertical = false,
    disabled = false,
    tooltip = false,
    tooltipFormatter = (val: number) => val.toString(),
    trackColor = '#1890ff',
    railColor = '#f5f5f5',
    handleColor = '#fff',
    className,
    style,
    marks = {},
    name
  } = config;

  const sliderRef = useRef<HTMLDivElement>(null);
  // Determine if component is controlled to decide state management strategy
  const isControlled = value !== undefined;
  // Initialize with controlled value or fallback to defaults based on slider type
  const initialValue = isControlled ? value : (defaultValue ?? (range ? [min, min] : min));
  const [internalValue, setInternalValue] = useState<SliderValue>(initialValue);
  // Track which handle is being dragged for proper event handling
  const [dragging, setDragging] = useState<'start' | 'end' | null>(null);
  // Control tooltip visibility independently of dragging state
  const [showTooltip, setShowTooltip] = useState<'start' | 'end' | null>(null);
  // Use controlled value when available, otherwise use internal state
  const currentValue = isControlled ? value : internalValue;
  // Normalize single values to arrays for consistent handling in range logic
  const valueArray = Array.isArray(currentValue) ? currentValue : [currentValue, currentValue];
  const [startValue, endValue] = valueArray;
  // Ensure values stay within defined bounds
  const clamp = (val: number) => Math.min(Math.max(val, min), max);
  // Round values to nearest step to maintain consistent increments
  const snap = (val: number) => Math.round(val / step) * step;
  // Convert value to percentage for CSS positioning
  const startPercent = Math.max(0, Math.min(100, ((startValue - min) / (max - min)) * 100));
  // For single sliders, end position matches start; for range sliders, calculate independently
  const endPercent = range ? Math.max(0, Math.min(100, ((endValue - min) / (max - min)) * 100)) : startPercent;
  const classNames = ['frui-field-slider'];

  // Apply layout-specific styling based on orientation
  if (vertical) { classNames.push('frui-field-slider-vertical') }
  // Indicate disabled state for accessibility and styling
  if (disabled) { classNames.push('frui-field-slider-disabled') }
  // Allow custom styling from parent components
  if (className) { classNames.push(className) }

  const trackStyle: CSSProperties = {
    backgroundColor: trackColor,
    // Position track differently based on orientation and slider type
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

  const startHandleStyle: CSSProperties = {
    backgroundColor: handleColor,
    borderColor: trackColor,
    // Position handle based on slider orientation
    ...(vertical ? { bottom: `${startPercent}%` } : { left: `${startPercent}%` })
  };

  const endHandleStyle: CSSProperties = {
    backgroundColor: handleColor,
    borderColor: trackColor,
    // Position handle based on slider orientation
    ...(vertical ? { bottom: `${endPercent}%` } : { left: `${endPercent}%` })
  };

  const updateValue = useCallback((newValue: SliderValue) => {
    // Only update internal state for uncontrolled components
    if (!isControlled) {
      setInternalValue(newValue);
    }
    // Always notify parent of value changes
    onChange?.(newValue);
  }, [isControlled, onChange]);

  const handleMouseDown = useCallback((handle: 'start' | 'end', e: React.MouseEvent) => {
    if (disabled) return;
    // Prevent text selection and other default behaviors during drag
    e.preventDefault();
    // Track which handle is active for proper drag calculations
    setDragging(handle);
    // Show tooltip immediately when dragging starts
    setShowTooltip(handle);
  }, [disabled]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || !sliderRef.current || disabled) return;

    const rect = sliderRef.current.getBoundingClientRect();
    // Use appropriate dimension based on slider orientation
    const dimension = vertical ? rect.height : rect.width;
    // Calculate position relative to slider bounds, accounting for orientation
    const position = vertical ? rect.bottom - e.clientY : e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (position / dimension) * 100));
    const rawValue = min + (percent / 100) * (max - min);
    const snappedValue = clamp(snap(rawValue));

    if (range) {
      const [currentStart, currentEnd] = valueArray;
      if (dragging === 'start') {
        // Prevent start handle from moving past end handle
        const newStart = Math.min(snappedValue, currentEnd);
        updateValue([newStart, currentEnd]);
      } else {
        // Prevent end handle from moving past start handle
        const newEnd = Math.max(snappedValue, currentStart);
        updateValue([currentStart, newEnd]);
      }
    } else {
      updateValue(snappedValue);
    }
  }, [dragging, disabled, vertical, min, max, step, range, valueArray, clamp, snap, updateValue]);

  const handleMouseUp = useCallback(() => {
    // Stop tracking mouse movement and hide tooltips
    setDragging(null);
    setShowTooltip(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      // Listen for mouse events on document to handle dragging outside slider
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        // Clean up listeners to prevent memory leaks
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  return {
    sliderRef,
    classNames,
    style,
    railColor,
    trackStyle,
    startHandleStyle,
    endHandleStyle,
    handleMouseDown,
    setShowTooltip,
    showTooltip,
    tooltip,
    tooltipFormatter,
    startValue,
    endValue,
    range,
    dragging,
    marks,
    min,
    max,
    vertical,
    name,
    disabled
  };
};

//--------------------------------------------------------------------//
// Components

export function RangeSlider(props: RangeSliderProps) {
  const {
    sliderRef,
    classNames,
    style,
    railColor,
    trackStyle,
    startHandleStyle,
    endHandleStyle,
    handleMouseDown,
    setShowTooltip,
    showTooltip,
    tooltip,
    tooltipFormatter,
    startValue,
    endValue,
    range,
    dragging,
    marks,
    min,
    max,
    vertical,
    name
  } = useRangeSlider(props);

  return (
    <div className={classNames.join(' ')} style={style}>
      <div
        ref={sliderRef}
        className="frui-field-slider-rail"
        style={{ backgroundColor: railColor }}
      >
        {/* Visual indicator of selected range/value */}
        <div className="frui-field-slider-track" style={trackStyle} />

        {/* Primary handle for single sliders, start handle for range sliders */}
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

        {/* Second handle only needed for range selection */}
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

        {/* Visual indicators for specific values along the slider */}
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

      {/* Enable form submission by providing hidden inputs with current values */}
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
};

//defaults to range slider
export default RangeSlider;

