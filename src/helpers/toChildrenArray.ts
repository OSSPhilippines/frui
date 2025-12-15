//modules
import type { ReactNode } from 'react';

export function toChildrenArray(children: ReactNode): ReactNode[] {
  if (!children) return [];
  if (Array.isArray(children)) return children;
  //check if Iterable and use array from
  if (typeof (children as any)[Symbol.iterator] === 'function') {
    return Array.from(children as Iterable<ReactNode>);
  } else {
    children = [ children ];
  }
  return [ children ];
};

export default toChildrenArray;