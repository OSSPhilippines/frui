//src
import type { DisplayProps } from '../types';

/**
 * Set display style
 */
export default function setDisplayClass(
  props: DisplayProps, 
  classNames: string[]
) {
  if (props.block) {
    classNames.push('frui-block');
  } else if (props.inline) {
    classNames.push('frui-inline');
  } else if (props.iblock) {
    classNames.push('frui-inline-block');
  } else if (props.flex) {
    classNames.push('frui-flex');
  } else if (props.iflex) {
    classNames.push('frui-inline-flex');
  } else if (props.grid) {
    classNames.push('frui-grid');
  } else if (props.igrid) {
    classNames.push('frui-inline-grid');
  } else if (props.hidden) {
    classNames.push('frui-hidden');
  }
  return [ ...classNames ];
};