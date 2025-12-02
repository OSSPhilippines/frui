//--------------------------------------------------------------------//
// Imports

//modules
import { useState, useRef, useEffect } from 'react';

//frui
import type { BorderRadiusProps } from './helpers/tools/BorderRadiusTool.js';
import type { ColorProps } from './helpers/tools/ColorTool.js';
import type { HTMLElementProps } from './types.js';
import BorderRadiusTool from './helpers/tools/BorderRadiusTool.js';
import ColorTool from './helpers/tools/ColorTool.js';
import { removeThemeProps } from './Box.js';

//--------------------------------------------------------------------//
// Types

export type TooltipConfig = {
  //whether to show the tooltip pointer arrow
  arrow?: boolean,
  //position tooltip at the bottom of the container
  bottom?: boolean,
  //whether to show the tooltip on hover
  hover?: boolean,
  //position tooltip at the left of the container
  left?: boolean,
  //position tooltip at the right of the container
  right?: boolean,
  //whether to show the tooltip (controlled)
  show?: boolean,
  //text to display inside the tooltip
  text: string,
  //position tooltip at the top of the container
  top?: boolean
};

export type TooltipContainerProps = HTMLElementProps<HTMLDivElement>;

export type TooltipProps = ColorProps 
  & BorderRadiusProps 
  & HTMLElementProps<HTMLSpanElement>
  & TooltipConfig
  & {
    //slot: props for container element
    container?: TooltipContainerProps,
    //tooltip class name
    opacity?: string | number
  };

export type TooltipDirection = 'top' | 'bottom' | 'left' | 'right' | null;

//--------------------------------------------------------------------//
// Helpers

/**
 * Determines the tooltip position based on container and direction
 */
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
 * Tooltip container component
 */
export function TooltipContainer(props: TooltipContainerProps) {
  //props
  const { 
    //contents of the tooltip
    children, //?: ReactNode
    //tooltip class name
    className, //?: string
    ...attributes
  } = props;
  //variables
  // configure classes
  const classes = [ 'frui-tooltip-container' ];
  if (className) classes.push(className);
  return (
    <div {...attributes} className={classes.join(' ')}>
      {children}
    </div>
  );
};

/**
 * Tooltip component (main)
 */
export function Tooltip(props: TooltipProps) {
  //props
  const { 
    //position tooltip at the left of the container
    left, //?: boolean
    //position tooltip at the right of the container
    right //?: boolean
  } = props;
  const {
    //whether to show the tooltip pointer arrow
    arrow, //?: boolean
    //position tooltip at the bottom of the container
    bottom, //?: boolean
    //container content (assigned to the tooltip)
    children, //?: ReactNode
    //custom tooltip class names
    className, //?: string
    //slot: props for container element
    container, //?: TooltipContainerProps
    //whether to show the tooltip on hover
    hover, //?: boolean
    //tooltip class name
    opacity, //?: string | number
    //whether to show the tooltip (controlled)
    show, //?: boolean
    //custom tooltip styles
    style, //?: CSSProperties
    //text to display inside the tooltip
    text, //: string
    //position tooltip at the top of the container
    top, //?: boolean
    ...attributes
  } = removeThemeProps(props);

  const {
    position,
    direction,
    isVisible, 
    visible,
    containerRef,
    tooltipRef
  } = useTooltip({
    arrow,
    bottom,
    hover,
    left,
    right,
    show,
    text,
    top
  });
  
  //set default styles and classes
  const classes = [ 'frui-tooltip' ];
  const styles = { ...style, left: position[0], top: position[1] };
  // - set bar radius
  BorderRadiusTool.get(props).getClassStyles({ classes, styles });
  // - set bar color (background color)
  ColorTool.get(props, 'bg').getClassStyles({ classes, styles });
  //determine opacity
  if (!isNaN(Number(opacity))) {
    styles.opacity = Number(opacity) / 100;
  }
  //if custom class, add it
  arrow && classes.push('frui-tooltip-arrow');
  direction && classes.push(`frui-tooltip-arrow-${direction}`);
  className && classes.push(className);

  return (
    <TooltipContainer
      {...container}
      ref={containerRef}
      onMouseEnter={() => hover && visible(true)}
      onMouseLeave={() => hover && visible(false)}
    >
      {children}
      {isVisible && (
        <div 
          {...attributes}
          ref={tooltipRef} 
          className={classes.join(' ')} 
          style={styles}
        >
          {text}
        </div>
      )}
    </TooltipContainer>
  );
};

//defaults to tooltip
export default Object.assign(Tooltip, {
  getTooltipPosition,
  useTooltip,
  Container: TooltipContainer,
  use: useTooltip
});