//--------------------------------------------------------------------//
// Imports

//frui
import type { 
  ColorProps, 
  FillProps, 
  RadiusProps,
  HTMLElementProps
} from '../types.js';
import setColorClass from '../helpers/setColorClass.js';
import setRadiusClass from '../helpers/setRadiusClass.js';

//--------------------------------------------------------------------//
// Types

/**
 * Badge Props
 */
export type BadgeProps = ColorProps 
  & FillProps 
  & RadiusProps 
  & HTMLElementProps<HTMLSpanElement>;

//--------------------------------------------------------------------//
// Components

/**
 * Badge component (main)
 */
export function Badge(props: BadgeProps) {
  //extract custom props
  const { 
    color,
    solid, 
    outline, 
    style,
    className,
    children,
    ...attributes
  } = props;
  //set default styles and classes
  const styles = { ...style };
  const classes = [ 'frui-badge' ];
  //if custom class, add it
  if (className) {
    classes.push(className);
  }
  //determine layout
  const layout = outline 
    ? 'outline' 
    : solid 
    ? 'solid'
    : 'solid';
  //set radius
  setRadiusClass(props, classes);
  //if outline mode
  if (layout === 'outline') {
    classes.push('frui-solid', 'frui-thin');
    if (color) {
      styles.borderColor = color;
      styles.color = color;
    } else {
      setColorClass(props, 'bd', classes);
      setColorClass(props, 'tx', classes);
    }
  //it's solid mode
  } else {
    classes.push('frui-tx-white');
    if (color) {
      styles.backgroundColor = color;
    } else {
      setColorClass(props, 'bg', classes);
    }
  }

  return (
    <span {...attributes} className={classes.join(' ')} style={styles}>
      {children}
    </span>
  );
};

//defaults to badge
export default Badge;