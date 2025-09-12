//src
import type { 
  ColorProps, 
  FillProps, 
  RadiusProps,
  HTMLProps,
  ChildrenProps
} from '../types.js';
import setColorClass from '../helpers/color/all.js';
import setRadiusClass from '../helpers/radius.js';

/**
 * Alert Props
 */
export type AlertProps = ColorProps 
  & FillProps 
  & RadiusProps 
  & HTMLProps 
  & ChildrenProps;

/**
 * Alert Component (Main)
 */
export default function Alert(props: AlertProps) {
  //extract custom props
  const { 
    color,
    solid, 
    outline, 
    style,
    className,
    children 
  } = props;
  //set default styles and classes
  const styles = { ...style };
  const classes = [ 'frui-alert' ];
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
    <div className={classes.join(' ')} style={styles}>
      {children}
    </div>
  );
};