//--------------------------------------------------------------------//
// Imports

//frui
import type {
  BackgroundColorProps, 
  ColorProps, 
  ClassStyleProps,
  RadiusProps,
  ChildrenProps,
  HTMLElementProps
} from '../types.js';
import setColorClass from '../helpers/setColorClass.js';
import setRadiusClass from '../helpers/setRadiusClass.js';

//--------------------------------------------------------------------//
// Types

export type ProgressContainerProps = ColorProps
  & RadiusProps
  & HTMLElementProps<HTMLDivElement>
  & { height?: number | string };

export type ProgressProps = BackgroundColorProps 
  & ColorProps 
  & RadiusProps
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
    color,
    //contents of the tooltip
    children, //?: ReactNode
    //tooltip class name
    className, //?: string
    height,
    style,
    info: _info,
    warning: _warning,
    success: _success,
    error: _error,
    muted: _muted,
    black: _black,
    white: _white,
    primary: _primary,
    secondary: _secondary,
    tertiary: _tertiary,
    curved: _curved,
    rounded: _rounded,
    pill: _pill,
    ...attributes
  } = props;
  //variables
  // configure classes
  const classes = [ 'frui-progress-container' ];
  const styles = { ...style };
  //set container radius
  setRadiusClass(props, classes);
  //set bar background color
  if (color) {
    styles.backgroundColor = color;
  } else {
    setColorClass(props, 'bg', classes);
  }
  //set the container height
  if (height) {
    styles.height = typeof height === 'number' ? `${height}px` : height;
  }
  if (className) classes.push(className);
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
  //extract custom props
  const { 
    bginfo,
    bgwarning,
    bgsuccess,
    bgerror,
    bgmuted,
    bgblack,
    bgwhite,
    bgprimary,
    bgsecondary,
    bgtertiary,
    bgcolor,
    color,
    curved,
    rounded,
    pill,
    style,
    className,
    children,
    width = 0,
    height,
    container = {},
    info: _info,
    warning: _warning,
    success: _success,
    error: _error,
    muted: _muted,
    black: _black,
    white: _white,
    primary: _primary,
    secondary: _secondary,
    tertiary: _tertiary,
    ...attributes
  } = props;
  
  //these are for the bar...
  
  //set default bar styles and classes
  const classes = [ 'frui-progress' ];
  const styles = { ...style, width: `${width}%` };
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
  if (className) classes.push(className);

  //map container background color
  container.color = bgcolor;
  container.info = bginfo; 
  container.warning = bgwarning; 
  container.success = bgsuccess; 
  container.error = bgerror; 
  container.muted = bgmuted; 
  container.black = bgblack; 
  container.white = bgwhite;
  container.primary = bgprimary; 
  container.secondary = bgsecondary;
  container.tertiary = bgtertiary;
  //set the container height
  container.height = height;
  //set container radius
  container.curved = curved;
  container.rounded = rounded;
  container.pill = pill;

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
