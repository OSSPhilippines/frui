//--------------------------------------------------------------------//
// Imports

//modules
import { useState, useRef, useEffect } from 'react';

//frui
import type { 
  ColorProps, 
  RadiusProps, 
  HTMLProps, 
  ChildrenProps 
} from '../types';
import setColorClass from '../helpers/color/all.js';
import setRadiusClass from '../helpers/radius.js';

//--------------------------------------------------------------------//
// Types

export type TooltipConfig = {
  text: string,
  top?: boolean,
  bottom?: boolean,
  left?: boolean,
  right?: boolean,
  arrow?: boolean,
  show?: boolean,
  hover?: boolean
};

export type TooltipProps = ColorProps 
  & RadiusProps 
  & HTMLProps 
  & ChildrenProps 
  & TooltipConfig
  & {
    opacity?: string | number
  };

export type TooltipDirection = 'top' | 'bottom' | 'left' | 'right' | null;

//--------------------------------------------------------------------//
// Helpers

export function getTooltipPosition(
  container: HTMLDivElement, 
  tooltip: HTMLDivElement,
  direction: { top: boolean, bottom: boolean, left: boolean, right: boolean }
) {
  const { top, bottom, left, right } = direction;
  const containerRect = container.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const position = { x: 0, y: 0, direction: null as TooltipDirection };

  switch (true) {
    case bottom && left:
      //y = container bottom + arrow size
      //(below the container)
      position.y = containerRect.height + 5;
      //x = container left
      position.x = 0;
      //set arrow direction to top
      position.direction = 'top';
      break;
    case bottom && right:
      //y = container bottom + arrow size
      //(below the container)
      position.y = containerRect.height + 5;
      //x = container right - tooltip width
      position.x = containerRect.width - tooltipRect.width;
      //set arrow direction to top
      position.direction = 'top';
      break;
    case top && left:
      //y = container top - tooltip height - arrow size
      //(above the container)
      position.y = -(tooltipRect.height + 5);
      //x = container left - tooltip width - arrow size
      //(to the left of the container)
      position.x = 0;
      //set arrow direction to bottom
      position.direction = 'bottom';
      break;
    case top && right:
      //y = container top - tooltip height - arrow size
      //(above the container)
      position.y = -(tooltipRect.height + 5);
      //x = container right + arrow size
      //(to the right of the container)
      position.x = containerRect.width - tooltipRect.width;
      //set arrow direction to bottom
      position.direction = 'bottom';
      break;
    case left:
      //y = container height / 2 - tooltip height / 2
      //(to center it)
      position.y = (containerRect.height / 2) - (tooltipRect.height / 2);
      //x = container left - tooltip width - arrow size
      //(to the left of the container)
      position.x = -(tooltipRect.width + 5);
      //set arrow direction to right
      position.direction = 'right';
      break;
    case right:
      //y = container height / 2 - tooltip height / 2
      //(to center it)
      position.y = (containerRect.height / 2) - (tooltipRect.height / 2);
      //x = container width + arrow size
      //(to the right of the container)
      position.x = containerRect.width + 5;
      //set arrow direction to left
      position.direction = 'left';
      break;
    case bottom:
      //y = container bottom + arrow size
      //(below the container)
      position.y = containerRect.height + 5;
      //x = container width / 2 - tooltip width / 2
      //(to center it)
      position.x = (containerRect.width / 2) - (tooltipRect.width / 2);
      //set arrow direction to top
      position.direction = 'top';
      break;
    case top:
    default:
      //y = container top - tooltip height - arrow size
      //(above the container)
      position.y = -(tooltipRect.height + 5);
      //x = container width / 2 - tooltip width / 2
      //(to center it)
      position.x = (containerRect.width / 2) - (tooltipRect.width / 2);
      //set arrow direction to bottom
      position.direction = 'bottom';
      break;
  }
  return position;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Returns tooltip states
 */
export function useTooltip(config: TooltipConfig) {
  //config
  const { text, top, bottom, left, right, show = false } = config;
  //hooks
  // whether to show the tooltip
  const [ isVisible, visible ] = useState(show);
  // position of the tooltip
  const [ position, setPosition ] = useState<[ number, number ]>([0, 0]);
  // direction of the tooltip arrow
  const [ direction, setDirection ] = useState<TooltipDirection>(null);
  //variables
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  //effects
  useEffect(() => {
    //if not visible, or if container or tooltip ref is not set, skip
    if (!isVisible || !containerRef.current || !tooltipRef.current) {
      return;
    }

    const position = getTooltipPosition(
      containerRef.current, 
      tooltipRef.current, 
      { top: !!top, bottom: !!bottom, left: !!left, right: !!right }
    );

    setDirection(position.direction);
    setPosition([ position.x, position.y ]);
  }, [ 
    isVisible,
    containerRef,
    tooltipRef,
    text, 
    top, 
    bottom, 
    left, 
    right
  ]);
  useEffect(() => {
    if (show === isVisible) return;
    visible(show);
  }, [ show ]);
  return {
    position,
    direction,
    isVisible, 
    visible,
    containerRef,
    tooltipRef
  }
};

//--------------------------------------------------------------------//
// Components

/**
 * Tooltip component (main)
 */
export function Tooltip(props: TooltipProps) {
  const {
    text,
    children,
    color,
    style,
    className,
    opacity,
    arrow,
    hover
  } = props;

  const {
    position,
    direction,
    isVisible, 
    visible,
    containerRef,
    tooltipRef
  } = useTooltip(props);
  
  //set default styles and classes
  const styles = { ...style };
  styles.left = position[0];
  styles.top = position[1];
  const classes = [ 'frui-tooltip' ];
  //if custom class, add it
  if (className) classes.push(className);
  if (arrow) classes.push('frui-tooltip-arrow');
  if (direction) classes.push(`frui-tooltip-arrow-${direction}`);
  //determine radius
  setRadiusClass(props, classes);
  //determine color
  if (color) {
    styles.backgroundColor = color;
  } else {
    setColorClass(props, 'bg', classes);
  }
  //determine opacity
  if (!isNaN(Number(opacity))) {
    styles.opacity = Number(opacity) / 100;
  }

  return (
    <div
      ref={containerRef}
      className="frui-tooltip-container"
      onMouseEnter={() => hover && visible(true)}
      onMouseLeave={() => hover && visible(false)}
    >
      {children}
      {isVisible && (
        <div 
          ref={tooltipRef} 
          className={classes.join(' ')} 
          style={styles}
        >
          {text}
        </div>
      )}
    </div>
  );
};

//defaults to tooltip
export default Tooltip;