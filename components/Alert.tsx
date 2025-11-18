//--------------------------------------------------------------------//
// Imports

//frui
import type { ThemeProps, HTMLElementProps } from './types.js';
import BackgroundColorTool from './helpers/tools/BackgroundColorTool.js';
import BorderColorTool from './helpers/tools/BorderColorTool.js';
import BorderRadiusTool from './helpers/tools/BorderRadiusTool.js';
import FillTool from './helpers/tools/FillTool.js';
import TextAlignTool from './helpers/tools/TextAlignTool.js';
import TextColorTool from './helpers/tools/TextColorTool.js';
import removeThemeProps from './helpers/removeThemeProps.js';

//--------------------------------------------------------------------//
// Types

export type AlertProps = ThemeProps & HTMLElementProps<HTMLDivElement>;

//--------------------------------------------------------------------//
// Components

/**
 * Alert component (main)
 */
export function Alert(props: AlertProps) {
  //props
  const { children, className, style } = props;
  //variables
  const attributes = removeThemeProps(props);
  // set default styles and classes
  const styles = { ...style };
  const classes = [ 'frui-alert' ];
  // - determine background color
  BackgroundColorTool.get(props).getClassStyles({ classes, styles });
  // - determine border color
  BorderColorTool.get(props).getClassStyles({ classes, styles });
  // - determine border radius
  BorderRadiusTool.get(props).getClassStyles({ classes, styles });
  // - determine fill
  FillTool.get(props).getClassStyles({ classes, styles, key: 'fill' });
  // - determine text align
  TextAlignTool.get(props).getClassStyles({ classes, styles });
  // - determine text color
  TextColorTool.get(props).getClassStyles({ classes, styles });
  // - add custom class
  className && classes.push(className);
  //render
  return (
    <div {...attributes} className={classes.join(' ')} style={styles}>
      {children}
    </div>
  );
};

//defaults to alert
export default Alert;