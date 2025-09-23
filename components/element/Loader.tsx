//--------------------------------------------------------------------//
// Imports

//frui
import type { ColorProps, HTMLProps, ChildrenProps } from '../types.js';
import setColorClass from '../helpers/color/all.js';

//--------------------------------------------------------------------//
// Types

export type LoaderProps = ColorProps & HTMLProps & ChildrenProps & {
  //shape
  size?: number,    
  slice?: number,
  speed?: number,
  thickness?: number,
  //styles
  solid?: boolean,
  dotted?: boolean,
  dashed?: boolean,
  //others
  show?: boolean,
};

//--------------------------------------------------------------------//
// Components

/**
 * Loader component (main)
 */
export function Loader(props: LoaderProps) {
  //extract custom props
  const { 
    //shape
    size = 20,
    slice = 0,
    speed = 1000,
    thickness = 2,
    //styles
    solid,
    dotted,
    dashed,
    //color
    //others
    show, 
    color, 
    //html 
    style = {}, 
    className,
    children 
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
    <div className="frui-loader-container">
      <span className={classes.join(' ')} style={styles} />
      {children}
    </div>
  );
};

//defaults to loader
export default Loader;