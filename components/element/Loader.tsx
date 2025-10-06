//--------------------------------------------------------------------//
// Imports

//frui
import type { ColorProps, HTMLElementProps } from '../types.js';
import setColorClass from '../helpers/setColorClass.js';

//--------------------------------------------------------------------//
// Types

export type LoaderContainerProps = HTMLElementProps<HTMLDivElement>;

export type LoaderProps = ColorProps & HTMLElementProps<HTMLSpanElement> & {
  //slot: props for container element
  container?: LoaderContainerProps,
  //dashed shape
  dashed?: boolean,
  //dotted shape
  dotted?: boolean,
  //whether to show the loader or not
  show?: boolean,
  //size of loader in pixels
  size?: number,    
  //number of slices (0-3)
  slice?: number,
  //solid shape
  solid?: boolean,
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
  //extract custom props
  const { 
    children, 
    className,
    color, 
    //slot: props for container element
    container, //?: LoaderContainerProps
    //dashed shape
    dashed, //?: boolean
    //dotted shape
    dotted, //?: boolean
    //whether to show the loader or not
    show, //?: boolean
    //size of loader in pixels
    size = 20, //?: number
    //number of slices (0-3)
    slice = 0, //?: number
    //solid shape
    solid, //?: boolean
    //spin speed in milliseconds
    speed = 1000, //?: number
    //border thickness in pixels
    thickness = 2, //?: number
    //html 
    style = {},
    ...attributes
  } = props;
  //set default styles and classes
  const styles = { 
    borderColor: color || '#666666', 
    width: `${size}px`, 
    height: `${size}px`, 
    animationDuration: `${speed}ms`, 
    borderWidth: `${thickness}px`,
    ...style 
  };
  const classes = [ 
    'frui-loader',
    solid 
      ? 'frui-loader-solid' 
      : dotted 
      ? 'frui-loader-dotted' 
      : dashed 
      ? 'frui-loader-dashed' 
      : 'frui-loader-dashed'
  ];
  //if custom class, add it
  if (className) {
    classes.push(className);
  }
  //determine icon color
  if (color) {
    styles.borderColor = color;
  } else {
    setColorClass(props, 'bd', classes);
  }
  //determine slices
  if (slice > 2) {
    classes.push('frui-loader-slice-3');
  } else if (slice > 1) {
    classes.push('frui-loader-slice-2');
  } else if (slice > 0) {
    classes.push('frui-loader-slice-1');
  }
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
export default Object.assign(Loader, {
  Container: LoaderContainer
});