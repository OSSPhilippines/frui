//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties, ReactElement } from 'react';
import { cloneElement } from 'react';

//frui
import type { ClassStyleProps, ColorPropType, ThemeProps } from '../types.js';
import BackgroundColorTool from '../helpers/tools/BackgroundColorTool.js';
import BorderColorTool from '../helpers/tools/BorderColorTool.js';
import BorderRadiusTool from '../helpers/tools/BorderRadiusTool.js';
import BorderStyleTool from '../helpers/tools/BorderStyleTool.js';
import ColorTool from '../helpers/tools/ColorTool.js';
import DisplayTool from '../helpers/tools/DisplayTool.js';
import FillTool from '../helpers/tools/FillTool.js';
import TextAlignTool from '../helpers/tools/TextAlignTool.js';
import TextColorTool from '../helpers/tools/TextColorTool.js';
import TextSizeTool from '../helpers/tools/TextSizeTool.js';
import removeThemeProps from '../helpers/removeThemeProps.js';

//--------------------------------------------------------------------//
// Types

export type ThemeStyleConfig = ThemeProps 
  & ClassStyleProps 
  & { applyColor?: ColorPropType };

export type ThemeStyleProps = ThemeStyleConfig & {
  //children is required, should only be one child and valid React Element
  children: ReactElement;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Use theme style hook
 */
export function useThemeStyle(
  config: ThemeStyleConfig,
  defaultClassName?: string,
  defaultStyle?: CSSProperties
) {
  //config
  const { 
    applyColor, 
    className, 
    style, 
    ...attributes 
  } = removeThemeProps(config);
  //variables
  // set default styles and classes
  const styles = { ...defaultStyle, ...style } as CSSProperties;
  const classes: string[] = [];
  // - add default class
  defaultClassName && classes.push(defaultClassName);
  // - determine background color
  BackgroundColorTool.get(config).getClassStyles({ classes, styles });
  // - determine border color
  BorderColorTool.get(config).getClassStyles({ classes, styles });
  // - determine border radius
  BorderRadiusTool.get(config).getClassStyles({ classes, styles });
  // - determine border style
  BorderStyleTool.get(config).getClassStyles({ classes, styles });
  // - determine fill
  FillTool.get(config).getClassStyles({ classes, styles });
  // - determine display
  DisplayTool.get(config).getClassStyles({ classes, styles });
  // - determine text align
  TextAlignTool.get(config).getClassStyles({ classes, styles });
  // - determine text color
  TextColorTool.get(config).getClassStyles({ classes, styles });
  // - determine text size
  TextSizeTool.get(config).getClassStyles({ classes, styles });
  // - determine color
  applyColor && ColorTool.get(config, applyColor).getClassStyles({ classes, styles });
  // - add custom class
  className && classes.push(className);
  return { 
    attributes: { className, style, ...attributes }, 
    styles, 
    classes 
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Theme Style Component
 */
export function ThemeStyle(props: ThemeStyleProps) {
  //props
  const { children: root, ...config } = props;
  //hooks
  const { attributes } = useThemeStyle(config);
  //add attributes to child (react element)
  return cloneElement(root, { ...attributes });
};

export default Object.assign(ThemeStyle, {
  removeThemeProps,
  useThemeStyle,
  use: useThemeStyle
});