//frui
import type { BorderColorProps } from '../types.js';
import setColorClass from './setColorClass.js';

/**
 * Set border color style
 */
export default function setBorderColorClass(
  props: BorderColorProps, 
  classNames: string[]
) {
  if (props.bdinfo) {
    return setColorClass({ info: true }, 'bd', classNames);
  } else if (props.bdwarning) {
    return setColorClass({ warning: true }, 'bd', classNames);
  } else if (props.bdsuccess) {
    return setColorClass({ success: true }, 'bd', classNames);
  } else if (props.bderror) {
    return setColorClass({ error: true }, 'bd', classNames);
  } else if (props.bdmuted) {
    return setColorClass({ muted: true }, 'bd', classNames);
  } else if (props.bdblack) {
    return setColorClass({ black: true }, 'bd', classNames);
  } else if (props.bdwhite) {
    return setColorClass({ white: true }, 'bd', classNames);
  } else if (props.bdprimary) {
    return setColorClass({ primary: true }, 'bd', classNames);
  } else if (props.bdsecondary) {
    return setColorClass({ secondary: true }, 'bd', classNames);
  } else if (props.bdtertiary) {
    return setColorClass({ tertiary: true }, 'bd', classNames);
  }
  return [ ...classNames ];
};