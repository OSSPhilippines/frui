//modules
import type { CSSProperties } from 'react';
//frui
import type { 
  ClassStyleProps,
  CallableSlotStyleProp
} from '../types.js';

export default function getSlotStyles<S>(
  props: CallableSlotStyleProp<S>, 
  state: S
): ClassStyleProps {
  //if string, return as className
  if (typeof props === 'string') {
    return { className: props };
  }
  //if object
  if (typeof props === 'object') {
    //if has className or style, return as is
    if ('className' in props || 'style' in props) {
      return props;
    }
    //else return as style
    return { style: props as CSSProperties };
  }
  //if function, execute and process result
  if (typeof props === 'function') {
    return getSlotStyles<S>(props(state), state);
  }
  //else, return empty object
  return {};
};