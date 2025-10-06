//frui
import type { TextColorProps } from '../types.js';
import setColorClass from './setColorClass.js';

/**
 * Set text color style
 */
export default function setTextColorClass(
  props: TextColorProps, 
  classNames: string[]
) {
  if (props.txinfo) {
    return setColorClass({ info: true }, 'tx', classNames);
  } else if (props.txwarning) {
    return setColorClass({ warning: true }, 'tx', classNames);
  } else if (props.txsuccess) {
    return setColorClass({ success: true }, 'tx', classNames);
  } else if (props.txerror) {
    return setColorClass({ error: true }, 'tx', classNames);
  } else if (props.txmuted) {
    return setColorClass({ muted: true }, 'tx', classNames);
  } else if (props.txblack) {
    return setColorClass({ black: true }, 'tx', classNames);
  } else if (props.txwhite) {
    return setColorClass({ white: true }, 'tx', classNames);
  } else if (props.txprimary) {
    return setColorClass({ primary: true }, 'tx', classNames);
  } else if (props.txsecondary) {
    return setColorClass({ secondary: true }, 'tx', classNames);
  } else if (props.txtertiary) {
    return setColorClass({ tertiary: true }, 'tx', classNames);
  }
  return [ ...classNames ];
};