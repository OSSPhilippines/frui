//src
import type { ColorProps, ColorPropType } from '../../types.js';

/**
 * Set color style
 */
export default function setColorClass(
  props: ColorProps, 
  type: ColorPropType, 
  classNames: string[]
) {
  if (props.info) {
    classNames.push(`frui-${type}-info`);
  } else if (props.warning) {
    classNames.push(`frui-${type}-warning`);
  } else if (props.success) {
    classNames.push(`frui-${type}-success`);
  } else if (props.error) {
    classNames.push(`frui-${type}-error`);
  } else if (props.muted) {
    classNames.push(`frui-${type}-muted`);
  } else if (props.black) {
    classNames.push(`frui-${type}-black`);
  } else if (props.white) {
    classNames.push(`frui-${type}-white`);
  } else if (props.primary) {
    classNames.push(`frui-${type}-primary`);
  } else if (props.secondary) {
    classNames.push(`frui-${type}-secondary`);
  } else if (props.tertiary) {
    classNames.push(`frui-${type}-tertiary`);
  }
  return [ ...classNames ];
};