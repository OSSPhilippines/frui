//modules
import type { CSSProperties, ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';

export type TooltipProps = {
  text: string,
  children: ReactNode,
  color?: string,
  info?: boolean,
  warning?: boolean,
  success?: boolean,
  error?: boolean,
  muted?: boolean,
  curved?: boolean,
  rounded?: boolean,
  pill?: boolean,
  style?: CSSProperties,
  className?: string,
  top?: boolean,
  bottom?: boolean,
  left?: boolean,
  right?: boolean,
  topLeft?: boolean,
  topRight?: boolean,
  bottomLeft?: boolean,
  bottomRight?: boolean,
  opacity?: string | number,
  arrow?: boolean,
  padding?: string | number
};

export type TooltipDirection = 'top' | 'bottom' | 'left' | 'right' | null;

// Tooltip Component
export default function Tooltip(props: TooltipProps) {
  const {
    text,
    children,
    color,
    info,
    warning,
    success,
    error,
    muted,
    curved,
    rounded,
    pill,
    style,
    className,
    top,
    bottom,
    left,
    right,
    opacity,
    arrow,
    padding, 
  } = props;
  const [ isVisible, visible ] = useState(false);
  const [ tooltipStyle, setTooltipStyle ] = useState({});
  const [ direction, setDirection ] = useState<TooltipDirection>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const defaults: {
    classes: string[];
    styles: Record<string, string | number>;
  } = {
    classes: [ 'frui-tooltip' ],
    styles: {},
  };

  if (curved) {
    defaults.classes.push('frui-curved');
  } else if (rounded) {
    defaults.classes.push('frui-rounded');
  } else if (pill) {
    defaults.classes.push('frui-pill');
  }

  if (color) {
    defaults.styles.backgroundColor = color;
  } else if (info) {
    defaults.classes.push('frui-bg-info');
  } else if (warning) {
    defaults.classes.push('frui-bg-warning');
  } else if (success) {
    defaults.classes.push('frui-bg-success');
  } else if (error) {
    defaults.classes.push('frui-bg-error');
  } else if (muted) {
    defaults.classes.push('frui-bg-muted');
  }

  const map = {
    classes: [...defaults.classes, className].join(' '),
    styles: { ...defaults.styles, ...style },
  };

  useEffect(() => {
    //if not visible, or if button or tooltip ref is not set, skip
    if (!isVisible || !buttonRef.current || !tooltipRef.current) {
      return;
    }

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const position = { x: 0, y: 0 };

    switch (true) {
      case top && left:
        position.y = buttonRect.top + window.scrollY - tooltipRect.height - 5;
        position.x = buttonRect.left + window.scrollX;
        setDirection('bottom');
        break;
      case top && right:
        position.y = buttonRect.top + window.scrollY - tooltipRect.height - 5;
        position.x = buttonRect.right + window.scrollX - tooltipRect.width;
        setDirection('bottom');
        break;
      case bottom && left:
        position.y = buttonRect.bottom + window.scrollY + 5;
        position.x = buttonRect.left + window.scrollX;
        setDirection('top');
        break;
      case bottom && right:
        position.y = buttonRect.bottom + window.scrollY + 5;
        position.x = buttonRect.right + window.scrollX - tooltipRect.width;
        setDirection('top');
        break;
      case bottom:
        position.y = buttonRect.bottom + window.scrollY + 5;
        position.x = buttonRect.left 
          + window.scrollX 
          + (buttonRect.width / 2) 
          - (tooltipRect.width / 2);
        setDirection('top');
        break;
      case left:
        position.y = buttonRect.top 
          + window.scrollY 
          + (buttonRect.height / 2) 
          - (tooltipRect.height / 2);
        position.x = buttonRect.left + window.scrollX - tooltipRect.width - 5;
        setDirection('right');
        break;
      case right:
        position.y = buttonRect.top 
          + window.scrollY 
          + (buttonRect.height / 2) 
          - (tooltipRect.height / 2);
        position.x = buttonRect.right + window.scrollX + 5;
        setDirection('left');
        break;
      case top:
      default:
        position.y = buttonRect.top + window.scrollY - tooltipRect.height - 5;
        position.x = buttonRect.left 
          + window.scrollX 
          + (buttonRect.width / 2) 
          - (tooltipRect.width / 2);
        setDirection('bottom');
        break;
    }

    if (position.y < window.scrollY) {
      position.y = buttonRect.bottom + window.scrollY + 5;
      if (top) setDirection('top');
    }
    if (position.x < window.scrollX) {
      position.x = window.scrollX + 10;
    }
    const overflowX = window.scrollX + window.innerWidth;
    const overflowY = window.scrollY + window.innerHeight;
    if ((position.x + tooltipRect.width) > overflowX) {
      position.x = overflowX - tooltipRect.width - 10;
    }
    if ((position.y + tooltipRect.height) > overflowY) {
      position.y = overflowY - tooltipRect.height - 10;
      if (bottom) setDirection('bottom');
    }

    setTooltipStyle({ 
      position: 'fixed', 
      top: position.y, 
      left: position.x, 
      zIndex: 10000 
    });
  }, [
    isVisible,
    top,
    bottom,
    left,
    right,
    text
  ]);

  const opacityStyle = !isNaN(Number(opacity)) ? { 
    opacity: Number(opacity) / 100 
  } : {};

  const paddingStyle = padding !== undefined ? { padding: padding } : {};

  return (
    <div
      ref={buttonRef}
      className="frui-tooltip-container"
      onMouseEnter={() => visible(true)}
      onMouseLeave={() => visible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`${map.classes} ${arrow ? 'frui-tooltip-arrow-container' : ''}`}
          style={{
            ...map.styles,
            ...tooltipStyle,
            ...opacityStyle,
            ...paddingStyle,
            ...(color ? { '--arrow-color': color } : {}),
          }}
        >
          {text}
          {arrow && direction && (
            <div className={`frui-tooltip-arrow ${color
              ? 'custom-color'
              : info
              ? 'info'
              : warning
              ? 'warning'
              : success
              ? 'success'
              : error
              ? 'error'
              : muted
              ? 'muted'
              : ''
            } ${direction}`}></div>
          )}
        </div>
      )}
    </div>
  );
};