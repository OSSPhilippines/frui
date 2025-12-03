//--------------------------------------------------------------------//
// Imports

//frui
import type {
  ClassStyleProps,
  ChildrenProps,
  HTMLElementProps
} from './types.js';

import type { 
  BackgroundColorProps, 
  ColorProps 
} from './helpers/tools/ColorTool.js';
import type { 
  BorderRadiusProps 
} from './helpers/tools/BorderRadiusTool.js';

import BorderRadiusTool from './helpers/tools/BorderRadiusTool.js';
import ColorTool from './helpers/tools/ColorTool.js';
import Box from './Box.js';

//--------------------------------------------------------------------//
// Types

export type ProgressContainerProps = ColorProps
  & BorderRadiusProps
  & HTMLElementProps<HTMLDivElement>
  & { height?: number | string };

export type ProgressProps = BackgroundColorProps 
  & ColorProps 
  & BorderRadiusProps
  & ClassStyleProps 
  & ChildrenProps 
  & {
    //slot: props for container element
    container?: ProgressContainerProps,
    width?: number
    height?: number | string
  };

//--------------------------------------------------------------------//
// Components

/**
 * Progress container component
 */
export function ProgressContainer(props: ProgressContainerProps) {
  //props
  const { 
    children, 
    className,
    height,
    //html 
    style,
    ...attributes 
  } = Box.removeThemeProps(props);
  //variables
  // set default styles and classes
  const styles = { ...style };
  const classes = [ 'frui-progress-container' ];
  // - set bar radius
  BorderRadiusTool.get(props).getClassStyles({ classes, styles });
  // - set bar color (background color)
  ColorTool.get(props, 'bgc').getClassStyles({ classes, styles });
  //set the container height
  if (height) {
    styles.height = typeof height === 'number' ? `${height}px` : height;
  }
  // - add custom class
  className && classes.push(className);
  return (
    <div {...attributes} className={classes.join(' ')}>
      {children}
    </div>
  );
};

/**
 * ProgressBar component (main)
 */
export function Progress(props: ProgressProps) {
  //props
  const { 
    children, 
    className,
    width = 0,
    height,
    container = {},
    style,
    ...attributes 
  } = Box.removeThemeProps(props);
  //variables
  // set default styles and classes
  const styles = { ...style };
  const classes = [ 'frui-progress' ];
  // - set bar color (background color)
  ColorTool.get(props, 'bgc').getClassStyles({ classes, styles });
  // - set bar height
  if (height) {
    styles.height = typeof height === 'number' ? `${height}px` : height;
  }
  // - set bar radius
  BorderRadiusTool.get(props).getClassStyles({ classes, styles });
  // - add custom class
  className && classes.push(className);
  // setup the container props
  Object.assign(
    container, 
    //pass 'bgc' here to 'color' prop
    { color: props.bgc },
    //add radius props
    BorderRadiusTool.get(props).config,
    //add height prop
    { height }
  );
  //render
  return (
    <ProgressContainer {...container}>
      <div {...attributes} className={classes.join(' ')} style={styles}>
        {children}
      </div>
    </ProgressContainer>
  );
};

//defaults to progress
export default Object.assign(Progress, {
  Container: ProgressContainer
});
