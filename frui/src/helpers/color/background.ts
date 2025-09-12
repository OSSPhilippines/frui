//src
import type { BackgroundColorProps } from '../../types.js';
import setColorClass from './all.js';

/**
 * Set background color style
 */
export default function setBackgroundColorClass(
  props: BackgroundColorProps, 
  classNames: string[]
) {
  if (props.bginfo) {
    return setColorClass({ info: true }, 'bg', classNames);
  } else if (props.bgwarning) {
    return setColorClass({ warning: true }, 'bg', classNames);
  } else if (props.bgsuccess) {
    return setColorClass({ success: true }, 'bg', classNames);
  } else if (props.bgerror) {
    return setColorClass({ error: true }, 'bg', classNames);
  } else if (props.bgmuted) {
    return setColorClass({ muted: true }, 'bg', classNames);
  } else if (props.bgblack) {
    return setColorClass({ black: true }, 'bg', classNames);
  } else if (props.bgwhite) {
    return setColorClass({ white: true }, 'bg', classNames);
  } else if (props.bgprimary) {
    return setColorClass({ primary: true }, 'bg', classNames);
  } else if (props.bgsecondary) {
    return setColorClass({ secondary: true }, 'bg', classNames);
  } else if (props.bgtertiary) {
    return setColorClass({ tertiary: true }, 'bg', classNames);
  }
  return [ ...classNames ];
};