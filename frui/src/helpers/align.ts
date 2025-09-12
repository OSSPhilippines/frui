//src
import type { AlignProps } from '../types';

/**
 * Set text align style
 */
export default function setTextAlignClass(
  props: AlignProps, 
  classNames: string[]
) {
  if (props.left) {
    classNames.push('frui-tx-left');
  } else if (props.center) {
    classNames.push('frui-tx-center');
  } else if (props.right) {
    classNames.push('frui-tx-right');
  } else if (props.justify) {
    classNames.push('frui-tx-justify');
  }
  return [ ...classNames ];
};