//modules
import type { CSSProperties } from 'react';

//frui
import type { 
  CallableClassStyleProps, 
  ChildrenProps,
  ClassStyleProps
} from '../types';

export type GetClassStylesOptions<S> = ClassStyleProps & {
  classes?: string[],
  props: CallableClassStyleProps<S> & ChildrenProps, 
  state: S,
  styles?: CSSProperties
};

export function getClassStyles<S>(
  options: GetClassStylesOptions<S>
) {
  const { props, state, classes = [], styles = {} } = options;
  const { children, className, style } = props;

  if (className) {
    if (typeof className === 'function') {
      const result = className(state);
      if (typeof result === 'string') {
        classes.push(result);
      }
    } else {
      classes.push(className);
    }
  }
  if (style) {
    if (typeof style === 'function') {
      const result = style(state);
      if (typeof result === 'object') {
        Object.assign(styles, result);
      }
    } else {
      Object.assign(styles, style);
    }
  }
  return { children, classes: classes.filter(Boolean), styles };
};

export default getClassStyles;