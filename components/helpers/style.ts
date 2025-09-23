import type { CSSProperties } from 'react';
import type { ClassStyleProp } from '../types.js';

export default function applyClassStyle(
  classes: string[], 
  styles: CSSProperties,
  classStyle: ClassStyleProp
) {
  if (typeof classStyle === 'string') {
    classes.push(classStyle);
  } else if (typeof classStyle === 'object') {
    Object.assign(styles, classStyle);
  } else if (Array.isArray(classStyle)) {
    if (typeof classStyle[0] === 'string') {
      classes.push(classStyle[0]);
    }
    if (typeof classStyle[1] === 'object') {
      Object.assign(styles, classStyle[1]);
    }
  }
}