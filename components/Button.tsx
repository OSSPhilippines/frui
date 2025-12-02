//--------------------------------------------------------------------//
// Imports

//frui
import type { HTMLButtonProps } from './types.js';
import type { 
  BorderRadiusProps 
} from './helpers/tools/BorderRadiusTool.js';
import type {
 BorderStyleProps
} from './helpers/tools/BorderStyleTool.js';
import type { ColorValueProps } from './helpers/tools/ColorTool.js';
import type { DisplayProps } from './helpers/tools/DisplayTool.js';
import type { FillProps } from './helpers/tools/FillTool.js';
import type { SizeProps } from './helpers/tools/SizeTool.js';
import type { TextAlignProps } from './helpers/tools/TextAlignTool.js';
import Box from './Box.js';

//--------------------------------------------------------------------//
// Types

export type ButtonProps = ColorValueProps
  & BorderRadiusProps
  & BorderStyleProps
  & DisplayProps
  & FillProps
  & SizeProps
  & TextAlignProps 
  & HTMLButtonProps 
  & {
    href?: string,
    target?: string,
    title?: string
  };

//--------------------------------------------------------------------//
// Components

/**
 * Generic Button Component (Main)
 */
export function Button(props: ButtonProps) {
  //props
  // extract box props
  const boxProps = Box.getThemeProps(props);
  // extract child props
  const {
    children,
    className,
    href,
    style,
    target,
    title,
    ...buttonProps 
  } = Box.removeThemeProps(props);
  //variables
  const classes: string[] = [ 'frui-button' ];
  className && classes.push(className);
  //defaults
  // make sure either fill or outline is set
  if (!boxProps.outline) {
    boxProps.fill = true;
  }
  // set align to center if no text align is set
  if (!Box.hasTextAlignProps(props)) {
    boxProps.center = true;
  }
  // if full prop is set, convert to w="full"
  // because default applied size is txs
  if (boxProps.full) {
    boxProps.full = false;
    boxProps.w = 'full';
  }
  // set default paddings if none are set
  if (!Box.hasPaddingProps(props)) {
    if (boxProps.xs) {
      boxProps.px = boxProps.px || 'md';
      boxProps.py = boxProps.py || 'xs';
    } else if (boxProps.sm) {
      boxProps.px = boxProps.px || 'xl';
      boxProps.py = boxProps.py || 'sm';
    } else {
      boxProps.px = boxProps.px || '5xl';
      boxProps.py = boxProps.py || 'lg';
    }
  }
  
  if (href) {
    return (
      <Box 
        {...boxProps}
        className={classes.join(' ')} 
        style={style} 
        asChild
      >
        <a 
          href={href} 
          target={target}
          title={title}
        >
          {children}
        </a>
      </Box>
    );
  }

  return (
    <Box 
      {...boxProps}
      className={classes.join(' ')} 
      style={style} 
      asChild
    >
      <button {...buttonProps} title={title}>
        {children}
      </button>
    </Box>
  );
};

//defaults to button
export default Button;