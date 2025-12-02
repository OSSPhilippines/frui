//--------------------------------------------------------------------//
// Imports

//frui
import type { HTMLElementProps } from './types.js';
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

export type BadgeProps = ColorValueProps
  & BorderRadiusProps
  & BorderStyleProps
  & DisplayProps
  & FillProps
  & SizeProps
  & TextAlignProps 
  & HTMLElementProps<HTMLDivElement>;

//--------------------------------------------------------------------//
// Components

/**
 * Generic Badge Component (Main)
 */
export function Badge(props: BadgeProps) {
  //props
  // extract box props
  const boxProps = Box.getThemeProps(props);
  // extract child props
  const {
    children,
    className,
    style,
    ...attributes 
  } = Box.removeThemeProps(props);
  //variables
  const classes: string[] = [ 'frui-badge' ];
  className && classes.push(className);
  //defaults
  // make sure either fill or outline is set
  if (!boxProps.outline) {
    boxProps.fill = true;
  }
  // set text size to small if none is set
  if (!Box.hasSizeProps(props) && !boxProps.txs) {
    boxProps.txs = 'sm';
  }
  // set default paddings if none are set
  if (!Box.hasPaddingProps(props)) {
    boxProps.px = boxProps.px || 'md';
    boxProps.py = boxProps.py || 'xs';
  }
  return (
    <Box 
      {...boxProps} 
      className={classes.join(' ')} 
      style={style} 
      asChild
    >
      <span {...attributes}>{children}</span>
    </Box>
  );
};

//defaults to button
export default Badge;