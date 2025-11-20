//--------------------------------------------------------------------//
// Imports

//frui
import type { ThemeProps, HTMLButtonProps } from './types.js';
import BackgroundColorTool from './helpers/tools/BackgroundColorTool.js';
import BorderColorTool from './helpers/tools/BorderColorTool.js';
import BorderRadiusTool from './helpers/tools/BorderRadiusTool.js';
import FillTool from './helpers/tools/FillTool.js';
import TextAlignTool from './helpers/tools/TextAlignTool.js';
import TextColorTool from './helpers/tools/TextColorTool.js';
import TextSizeTool from './helpers/tools/TextSizeTool.js';
import removeThemeProps from './helpers/removeThemeProps.js';

//--------------------------------------------------------------------//
// Types

export type ButtonProps = ThemeProps
  & HTMLButtonProps 
  & {
    href?: string,
    target?: string,
    title?: string,
    full?: boolean
  };

//--------------------------------------------------------------------//
// Components

/**
 * Generic Button Component (Main)
 */
export function Button(props: ButtonProps) {
  //props
  // extract size props
  const { 
    xs,
    sm,
    md,
    lg,
    xl,
    xl2,
    xl3,
    xl4,
    xl5
  } = TextSizeTool.get(props).config;
  // extract other props
  const { 
    children,
    className,
    full,
    href,
    style,
    target,
    title,
    ...attributes 
  } = removeThemeProps(props);
  //variables
  // set default styles and classes
  const styles = { ...style };
  const classes = [ 'frui-button' ];
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
  // - determine text size
  TextSizeTool.get(props).getClassStyles({ classes, styles });
  //determine button size
  classes.push(`frui-button-${
    xs ? 'xs' 
    : sm ? 'sm' 
    : md ? 'md' 
    : lg ? 'lg' 
    : xl ? 'xl' 
    : xl2 ? '2xl' 
    : xl3 ? '3xl' 
    : xl4 ? '4xl' 
    : xl5 ? '5xl' 
    : 'md'
  }`);
  //full width?
  full && classes.push('frui-full');
  // - add custom class
  className && classes.push(className);
  if (href) {
    return (
      <a 
        href={href} 
        target={target}
        title={title}
        className={classes.join(' ')} 
        style={styles}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      {...attributes}
      title={title}
      className={classes.join(' ')} 
      style={styles}
    >
      {children}
    </button>
  );
};

//defaults to button
export default Button;