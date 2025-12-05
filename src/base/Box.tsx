//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties, ReactElement } from 'react';
import { cloneElement } from 'react';

//frui
import type { ChildrenProps, ClassStyleProps, Hash } from '../types.js';
import type { 
  BorderRadiusProps 
} from '../helpers/tools/BorderRadiusTool.js';
import type {
 BorderStyleProps
} from '../helpers/tools/BorderStyleTool.js';
import type { 
  ColorProps, 
  ColorTypeProp 
} from '../helpers/tools/ColorTool.js';
import type { DisplayProps } from '../helpers/tools/DisplayTool.js';
import type { FillProps } from '../helpers/tools/FillTool.js';
import type { 
  SizeProps, 
  SizeTypeProp 
} from '../helpers/tools/SizeTool.js';
import type { TextAlignProps } from '../helpers/tools/TextAlignTool.js';

import BorderRadiusTool from '../helpers/tools/BorderRadiusTool.js';
import BorderStyleTool from '../helpers/tools/BorderStyleTool.js';
import ColorTool from '../helpers/tools/ColorTool.js';
import DisplayTool from '../helpers/tools/DisplayTool.js';
import FillTool from '../helpers/tools/FillTool.js';
import SizeTool from '../helpers/tools/SizeTool.js';
import TextAlignTool from '../helpers/tools/TextAlignTool.js';

//--------------------------------------------------------------------//
// Types

export type BoxThemeConfig = ColorProps
  & BorderRadiusProps
  & BorderStyleProps
  & DisplayProps
  & FillProps
  & SizeProps
  & TextAlignProps;

export type BoxConfig = BoxThemeConfig & ClassStyleProps & { 
  applyColor?: ColorTypeProp,
  applySize?: SizeTypeProp
};

export type BoxProps = BoxConfig & ChildrenProps & {
  asChild?: boolean
};

//--------------------------------------------------------------------//
// Helpers

/**
 * Get all theme style props from config (non standard HTML props)
 */
export function getThemeProps<P extends Hash>(props: P) {
  return {
    ...BorderRadiusTool.get(props).config,
    ...BorderStyleTool.get(props).config,
    ...ColorTool.get(props, 'txc').config,
    ...DisplayTool.get(props).config,
    ...FillTool.get(props).config,
    ...SizeTool.get(props, 'txs').config,
    ...TextAlignTool.get(props).config
  };
};

/**
 * Returns true if config has border radius props
 */
export function hasBorderRadiusProps<P extends Hash>(props: P) {
  return Object
    .values(BorderRadiusTool.get(props).config)
    .filter(value => typeof value !== 'undefined' && value !== false)
    .length > 0;
};

/**
 * Returns true if config has border size props
 */
export function hasBorderSizeProps<P extends Hash>(props: P) {
  return SizeTool.get(props, 'txs').hasBorderProps();
};

/**
 * Returns true if config has border style props
 */
export function hasBorderStyleProps<P extends Hash>(props: P) {
  return Object
    .values(BorderStyleTool.get(props).config)
    .filter(value => typeof value !== 'undefined' && value !== false)
    .length > 0;
};

/**
 * Returns true if config has color props
 */
export function hasColorProps<P extends Hash>(props: P) {
  return Object
    .values(ColorTool.get(props, 'txc').config)
    .filter(value => typeof value !== 'undefined' && value !== false)
    .length > 0;
};

/**
 * Returns true if config has dimension props
 */
export function hasDimensionProps<P extends Hash>(props: P) {
  return SizeTool.get(props, 'txs').hasDimensionProps();
};

/**
 * Returns true if config has display props
 */
export function hasDisplayProps<P extends Hash>(props: P) {
  return Object
    .values(DisplayTool.get(props).config)
    .filter(value => typeof value !== 'undefined' && value !== false)
    .length > 0;
};

/**
 * Returns true if config has fill props
 */
export function hasFillProps<P extends Hash>(props: P) {
  return Object
    .values(FillTool.get(props).config)
    .filter(value => typeof value !== 'undefined' && value !== false)
    .length > 0;
};

/**
 * Returns true if config has margin, padding, size or text props
 */
export function hasMarginProps<P extends Hash>(props: P) {
  return SizeTool.get(props, 'txs').hasMarginProps();
};

/**
 * Returns true if config has padding props
 */
export function hasPaddingProps<P extends Hash>(props: P) {
  return SizeTool.get(props, 'txs').hasPaddingProps();
};

/**
 * Returns true if config has size props
 */
export function hasSizeProps<P extends Hash>(props: P) {
  return Object
    .values(SizeTool.get(props, 'txs').config)
    .filter(value => typeof value !== 'undefined' && value !== false)
    .length > 0;
};

/**
 * Returns true if config has text align props
 */
export function hasTextAlignProps<P extends Hash>(props: P) {
  return Object
    .values(TextAlignTool.get(props).config)
    .filter(value => typeof value !== 'undefined' && value !== false)
    .length > 0;
};

/**
 * Returns true if config has text size props
 */
export function hasTextSizeProps<P extends Hash>(props: P) {
  return SizeTool.get(props, 'txs').hasTextProps();
};

/**
 * Remove all theme style props from config (non standard HTML props)
 */
export function removeThemeProps<P extends Hash>(props: P) {
  const remove1 = BorderRadiusTool.get(props);
  const remove2 = BorderStyleTool.get(remove1.attributes);
  const remove3 = ColorTool.get(remove2.attributes, 'txc');
  const remove4 = DisplayTool.get(remove3.attributes);
  const remove5 = FillTool.get(remove4.attributes);
  const remove6 = SizeTool.get(remove5.attributes, 'txs');
  const remove7 = TextAlignTool.get(remove6.attributes);
  return remove7.attributes;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Use theme style hook
 */
export function useBox(
  config: BoxConfig,
  defaultClassName?: string,
  defaultStyle?: CSSProperties
) {
  //config
  const { 
    applyColor = 'txc', 
    applySize = 'txs',
    className, 
    style, 
    ...attributes 
  } = removeThemeProps(config);
  //variables
  // tools
  const tools = {
    borderRadius: BorderRadiusTool.get(config),
    borderStyle: BorderStyleTool.get(config),
    color: ColorTool.get(config, applyColor),
    display: DisplayTool.get(config),
    fill: FillTool.get(config),
    size: SizeTool.get(config, applySize),
    textAlign: TextAlignTool.get(config)
  }
  // set default styles and classes
  const styles = { ...defaultStyle, ...style } as CSSProperties;
  const classes: string[] = [ 'frui-box' ];
  // - add default class
  defaultClassName && classes.push(defaultClassName);
  // - determine border radius
  tools.borderRadius.getClassStyles({ classes, styles });
  // - determine border style
  tools.borderStyle.getClassStyles({ classes, styles });
  // - determine color
  tools.color.getClassStyles({ classes, styles });
  // - determine fill
  tools.fill.getClassStyles({ classes, styles });
  // - determine display
  tools.display.getClassStyles({ classes, styles });
  // - determine size
  tools.size.getClassStyles({ classes, styles });
  // - determine text align
  tools.textAlign.getClassStyles({ classes, styles });
  // - add custom class
  className && classes.push(className);
  return { 
    attributes: { className, style, ...attributes }, 
    styles, 
    classes,
    tools
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Theme Style Component
 */
export function Box(props: BoxProps) {
  //props
  const { asChild, children, ...config } = props;
  //hooks
  const { attributes, classes, styles } = useBox(config);
  const boxProps = { 
    ...attributes, 
    className: classes.join(' '), 
    style: styles 
  };
  //render
  // if asChild, clone child element with styles
  if (asChild) {
    //check if children is a valid react element
    if (children 
      && typeof children === 'object' 
      && 'type' in children
    ) {
      return cloneElement(children as ReactElement, boxProps);
    }
    //if not check if children is an array and get the first element
    //then check if that is a valid react element
    if (Array.isArray(children) && children.length > 0) {
      if (children[0] 
        && typeof children[0] === 'object' 
        && 'type' in children[0]
      ) {
        return cloneElement(children[0] as ReactElement, boxProps);
      }
    }
  }
  // render normally
  return (<div {...boxProps}>{children}</div>);
};

//defaults to box
export default Object.assign(Box, {
  getThemeProps,
  hasBorderRadiusProps,
  hasBorderSizeProps,
  hasBorderStyleProps,
  hasColorProps,
  hasDimensionProps,
  hasDisplayProps,
  hasFillProps,
  hasMarginProps,
  hasPaddingProps,
  hasSizeProps,
  hasTextAlignProps,
  hasTextSizeProps,
  removeThemeProps,
  useBox,
  use: useBox
});