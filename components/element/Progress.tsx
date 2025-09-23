//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties } from 'react';

//frui
import type {
  BackgroundColorProps, 
  ColorProps, 
  HTMLProps,
  RadiusProps,
  ChildrenProps
} from '../types.js';
import setColorClass from '../helpers/color/all.js';
import setBackgroundColorClass from '../helpers/color/background.js';
import setRadiusClass from '../helpers/radius.js';

//--------------------------------------------------------------------//
// Types

export type ProgressBarProps = BackgroundColorProps 
  & ColorProps 
  & RadiusProps
  & HTMLProps 
  & ChildrenProps 
  & {
    width?: number
    height?: number | string
  };

//--------------------------------------------------------------------//
// Components

/**
 * ProgressBar component (main)
 */
export function Progress(props: ProgressBarProps) {
  //extract custom props
  const { 
    bgcolor,
    color,
    style,
    className,
    children,
    width = 0,
    height
  } = props;
  
  //these are for the bar...
  
  //set default bar styles and classes
  const styles: CSSProperties = { width: `${width}%` };
  const classes = [ 'frui-progress' ];
  //set bar background color
  if (color) {
    styles.backgroundColor = color;
  } else {
    setColorClass(props, 'bg', classes);
  }
  //set bar height
  if (height) {
    styles.height = typeof height === 'number' ? `${height}px` : height;
  }
  //set bar radius
  setRadiusClass(props, classes);

  //these are for the container...
  const container: { classes: string[]; styles: CSSProperties } = {
    classes: [ 'frui-progress-container' ],
    styles: { ...style }
  };
  //if custom class, add it to container
  if (className) {
    container.classes.push(className);
  }
  //set container background color
  if (bgcolor) {
    container.styles.backgroundColor = bgcolor;
  } else {
    setBackgroundColorClass(props, container.classes);
  }
  //set the container height
  if (height) {
    container.styles.height = typeof height === 'number' ? `${height}px` : height;
  }
  //set container radius
  setRadiusClass(props, container.classes);

  //render
  return (
    <div className={container.classes.join(' ')} style={container.styles}>
      <div className={classes.join(' ')} style={styles}>
        {children}
      </div>
    </div>
  );
};

//defaults to progress
export default Progress;
