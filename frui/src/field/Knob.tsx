'use client';

import { useRef, useState, useEffect } from 'react';

export type KnobProps = {
  value?: number; // now optional
  defaultValue?: number; // for uncontrolled
  onChange?: (value: number) => void; // now optional
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  valueTemplate?: string;
  stroke?: number;
  size?: number;
  textColor?: string;
  rangeColor?: string;
  valueColor?: string;
};

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function getAngle(x: number, y: number, cx: number, cy: number) {
  return Math.atan2(y - cy, x - cx);
}

function formatValue(template: string, value: number) {
  return template.replace('{}', value.toString());
}

export default function Knob({
  value,
  defaultValue = 0,
  onChange,
  name = 'knob',
  min = 0,
  max = 100,
  step = 1,
  valueTemplate = '{}',
  stroke = 10,
  size = 100,
  textColor = '#000',
  rangeColor = '#eee',
  valueColor = '#007bff',
}: KnobProps) {
  const radius = size / 2;
  const knobRef = useRef<SVGSVGElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [dragging, setDragging] = useState(false);

  const actualValue = value !== undefined ? value : internalValue;

  const arcLength = 180;
  const percent = (clamp(actualValue, min, max) - min) / (max - min);
  const circumference = Math.PI * (size - stroke);
  const halfCirc = circumference / 2;
  const offset = halfCirc * (1 - percent);

  const updateValue = (val: number) => {
    if (onChange) {
      onChange(val);
    } else {
      setInternalValue(val);
    }
  };

  const handleInteraction = (clientX: number, clientY: number) => {
    const rect = knobRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + radius;
    const cy = rect.top + radius;
    const angle = getAngle(clientX, clientY, cx, cy);
    const deg = (angle * 180) / Math.PI + 180;

    if (deg < 0 || deg > 180) return;

    const norm = clamp((deg - 0) / arcLength, 0, 1);
    const rawVal = min + norm * (max - min);
    const newVal = Math.round(rawVal / step) * step;
    updateValue(clamp(newVal, min, max));
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging) {
        handleInteraction(e.clientX, e.clientY);
      }
    };
    const up = () => setDragging(false);

    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
    };
  }, [dragging]);

  return (
    <div className="frui-field-knob" style={{ width: size, height: size / 2 }}>
      <svg
        ref={knobRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        onPointerDown={(e) => {
          e.preventDefault();
          setDragging(true);
          handleInteraction(e.clientX, e.clientY);
        }}
        className="frui-field-knob__svg"
      >
        <circle
          cx={radius}
          cy={radius}
          r={radius - stroke / 2}
          stroke={rangeColor}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${halfCirc} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(180, ${radius}, ${radius})`}
        />
        <circle
          cx={radius}
          cy={radius}
          r={radius - stroke / 2}
          stroke={valueColor}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${halfCirc} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          transform={`rotate(180, ${radius}, ${radius})`}
        />
        <text
          x="50%"
          y="40%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.2}
          fill={textColor}
          className="frui-field-knob__label"
        >
          {formatValue(valueTemplate, actualValue)}
        </text>
      </svg>
      <input type="hidden" name={name} value={actualValue} />
    </div>
  );
}
