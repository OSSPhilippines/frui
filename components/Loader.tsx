//--------------------------------------------------------------------//
// Imports

//frui
import type { HTMLElementProps } from './types.js';
import type { ColorProps } from './helpers/tools/ColorTool.js';
import type { BorderStyleProps } from './helpers/tools/BorderStyleTool.js';
import BorderStyleTool from './helpers/tools/BorderStyleTool.js';
import ColorTool from './helpers/tools/ColorTool.js';
import Box from './Box.js';

//--------------------------------------------------------------------//
// Types

export type LoaderContainerProps = HTMLElementProps<HTMLDivElement>;

export type LoaderProps = BorderStyleProps 
  & ColorProps 
  & HTMLElementProps<HTMLSpanElement> 
  & {
    //slot: props for container element
    container?: LoaderContainerProps,
    //whether to show the loader or not
    show?: boolean,
    //size of loader in pixels
    size?: number,    
    //number of slices (0-3)
    slice?: number,
    //spin speed in milliseconds
    speed?: number,
    //border thickness in pixels
    thickness?: number
  };

//--------------------------------------------------------------------//
// Components

/**
 * Loader container component
 */
export function LoaderContainer(props: LoaderContainerProps) {
  //props
  const { 
    //contents of the loader
    children, //?: ReactNode
    //loader class name
    className, //?: string
    ...attributes
  } = props;
  //variables
  // configure classes
  const classes = [ 'frui-loader-container' ];
  if (className) classes.push(className);
  return (
    <div {...attributes} className={classes.join(' ')}>
      {children}
    </div>
  );
};

/**
 * Loader component (main)
 */
export function Loader(props: LoaderProps) {
  //props
  const { 
    children, 
    className,
    //slot: props for container element
    container, //?: LoaderContainerProps
    //whether to show the loader or not
    show, //?: boolean
    //number of slices (0-3)
    slice = 0, //?: number
    //spin speed in milliseconds
    speed = 1000, //?: number
    //border thickness in pixels
    thickness = 2, //?: number
    //html 
    style,
    ...attributes 
  } = Box.removeThemeProps(props);
  //size of loader in pixels
  const size = typeof props.size === 'number' ? props.size : 20;
  //variables
  // set default styles and classes
  const styles = { 
    borderColor: '#666666', 
    width: `${size}px`, 
    height: `${size}px`, 
    animationDuration: `${speed}ms`, 
    borderWidth: `${thickness}px`,
    ...style 
  };
  const classes = [ 'frui-loader' ];
  // - determine border style
  BorderStyleTool.get(props).getClassStyles({ classes, styles });
  // - determine border color
  ColorTool.get(props, 'bdc').getClassStyles({ classes, styles });
  //determine slices
  if (slice > 2) {
    classes.push('frui-loader-slice-3');
  } else if (slice > 1) {
    classes.push('frui-loader-slice-2');
  } else if (slice > 0) {
    classes.push('frui-loader-slice-1');
  }
  // - add custom class
  className && classes.push(className);
  //show it?
  if (show === false) {
    return null;
  }

  return (
    <LoaderContainer {...container}>
      <span 
        {...attributes} 
        className={classes.join(' ')} 
        style={styles} 
      />
      {children}
    </LoaderContainer>
  );
};

//defaults to loader
export default Object.assign(Loader, { Container: LoaderContainer });