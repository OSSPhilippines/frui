//frui
import type { RadiusProps } from '../types';

/**
 * Set border radius style
 */
export default function setRadiusClass(
  props: RadiusProps, 
  classNames: string[]
) {
  if (props.curved) {
    classNames.push('frui-curved');
  } else if (props.rounded) {
    classNames.push('frui-rounded');
  } else if (props.pill) {
    classNames.push('frui-pill');
  }
  return [ ...classNames ];
}