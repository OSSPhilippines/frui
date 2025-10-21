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

export type AlertProps = ColorProps 
  & FillProps 
  & RadiusProps 
  & HTMLElementProps<HTMLDivElement>;

//--------------------------------------------------------------------//
// Components

/**
 * Alert component (main)
 */
export function Alert(props: AlertProps) {
  //extract custom props
  const { 
    color,
    solid, 
    outline, 
    style,
    className,
    children,
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
  //set default styles and classes
  const styles = { ...style };
  const classes = [ 'frui-alert' ];
  //if custom class, add it
  className && classes.push(className);
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
    <div {...attributes} className={classes.join(' ')} style={styles}>
      {children}
    </div>
  );
};

//defaults to alert
export default Alert;