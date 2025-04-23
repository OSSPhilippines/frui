// types
import type { CSSProperties, ReactNode } from 'react';
// hooks
import { useState, useRef, useEffect } from 'react';

// Types
export type TooltipProps = {
  text: string;
  children: ReactNode;
  color?: string;
  info?: boolean;
  warning?: boolean;
  success?: boolean;
  error?: boolean;
  muted?: boolean;
  curved?: boolean;
  rounded?: boolean;
  pill?: boolean;
  style?: CSSProperties;
  className?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  opacity?: string | number;
  arrow?: boolean;
  padding?: string | number; 
};

// Tooltip Component
export const Tooltip: React.FC<TooltipProps> = ({
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
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  opacity,
  arrow,
  padding, 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const [arrowDirection, setArrowDirection] = useState<
    "top" | "bottom" | "left" | "right" | null
  >(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const defaults: {
    classes: string[];
    styles: Record<string, string | number>;
  } = {
    classes: ["frui-tooltip"],
    styles: {},
  };

  if (curved) {
    defaults.classes.push("frui-curved");
  } else if (rounded) {
    defaults.classes.push("frui-rounded");
  } else if (pill) {
    defaults.classes.push("frui-pill");
  }

  if (color) {
    defaults.styles.backgroundColor = color;
  } else if (info) {
    defaults.classes.push("frui-bg-info");
  } else if (warning) {
    defaults.classes.push("frui-bg-warning");
  } else if (success) {
    defaults.classes.push("frui-bg-success");
  } else if (error) {
    defaults.classes.push("frui-bg-error");
  } else if (muted) {
    defaults.classes.push("frui-bg-muted");
  }

  const map = {
    classes: [...defaults.classes, className].join(" "),
    styles: { ...defaults.styles, ...style },
  };

  useEffect(() => {
    if (isVisible && buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      let tooltipTop = 0;
      let tooltipLeft = 0;
      let placement = "top";

      if (top) placement = "top";
      if (bottom) placement = "bottom";
      if (left) placement = "left";
      if (right) placement = "right";
      if (topLeft) placement = "topLeft";
      if (topRight) placement = "topRight";
      if (bottomLeft) placement = "bottomLeft";
      if (bottomRight) placement = "bottomRight";

      switch (placement) {
        case "top":
          tooltipTop = buttonRect.top + window.scrollY - tooltipRect.height - 5;
          tooltipLeft =
            buttonRect.left +
            window.scrollX +
            buttonRect.width / 2 -
            tooltipRect.width / 2;
          setArrowDirection("bottom");
          break;
        case "bottom":
          tooltipTop = buttonRect.bottom + window.scrollY + 5;
          tooltipLeft =
            buttonRect.left +
            window.scrollX +
            buttonRect.width / 2 -
            tooltipRect.width / 2;
          setArrowDirection("top");
          break;
        case "left":
          tooltipTop =
            buttonRect.top +
            window.scrollY +
            buttonRect.height / 2 -
            tooltipRect.height / 2;
          tooltipLeft = buttonRect.left + window.scrollX - tooltipRect.width - 5;
          setArrowDirection("right");
          break;
        case "right":
          tooltipTop =
            buttonRect.top +
            window.scrollY +
            buttonRect.height / 2 -
            tooltipRect.height / 2;
          tooltipLeft = buttonRect.right + window.scrollX + 5;
          setArrowDirection("left");
          break;
        case "topLeft":
          tooltipTop = buttonRect.top + window.scrollY - tooltipRect.height - 5;
          tooltipLeft = buttonRect.left + window.scrollX;
          setArrowDirection("bottom");
          break;
        case "topRight":
          tooltipTop = buttonRect.top + window.scrollY - tooltipRect.height - 5;
          tooltipLeft = buttonRect.right + window.scrollX - tooltipRect.width;
          setArrowDirection("bottom");
          break;
        case "bottomLeft":
          tooltipTop = buttonRect.bottom + window.scrollY + 5;
          tooltipLeft = buttonRect.left + window.scrollX;
          setArrowDirection("top");
          break;
        case "bottomRight":
          tooltipTop = buttonRect.bottom + window.scrollY + 5;
          tooltipLeft = buttonRect.right + window.scrollX - tooltipRect.width;
          setArrowDirection("top");
          break;
        default:
          tooltipTop = buttonRect.top + window.scrollY - tooltipRect.height - 5;
          tooltipLeft =
            buttonRect.left +
            window.scrollX +
            buttonRect.width / 2 -
            tooltipRect.width / 2;
          setArrowDirection("bottom");
          break;
      }

      if (tooltipTop < window.scrollY) {
        tooltipTop = buttonRect.bottom + window.scrollY + 5;
        if (placement.startsWith("top")) setArrowDirection("top");
      }
      if (tooltipLeft < window.scrollX) {
        tooltipLeft = window.scrollX + 10;
      }
      if (tooltipLeft + tooltipRect.width > window.scrollX + window.innerWidth) {
        tooltipLeft = window.scrollX + window.innerWidth - tooltipRect.width - 10;
      }
      if (tooltipTop + tooltipRect.height > window.scrollY + window.innerHeight) {
        tooltipTop = window.scrollY + window.innerHeight - tooltipRect.height - 10;
        if (placement.startsWith("bottom")) setArrowDirection("bottom");
      }

      setTooltipStyle({ position: "fixed", top: tooltipTop, left: tooltipLeft, zIndex: 10000 });
    }
  }, [
    isVisible,
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    text,
  ]);

  const opacityStyle =
    opacity !== undefined
      ? { opacity: typeof opacity === "string" ? parseInt(opacity) / 100 : opacity / 100 }
      : {};

  const paddingStyle = padding !== undefined ? { padding: padding } : {};

  return (
    <div
      ref={buttonRef}
      className="frui-tooltip-container relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`${map.classes} absolute text-white rounded-md shadow-md z-10 min-w-[200px] text-center whitespace-normal ${
            arrow ? "frui-tooltip-arrow-container" : ""
          }`}
          style={{
            ...map.styles,
            ...tooltipStyle,
            ...opacityStyle,
            ...paddingStyle,
            ...(color ? { "--arrow-color": color } : {}),
          }}
        >
          {text}
          {arrow && arrowDirection && (
            <div
              className={`frui-tooltip-arrow ${
                color
                  ? "custom-color"
                  : info
                  ? "info"
                  : warning
                  ? "warning"
                  : success
                  ? "success"
                  : error
                  ? "error"
                  : muted
                  ? "muted"
                  : ""
              } ${arrowDirection}`}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;