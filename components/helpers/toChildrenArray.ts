//modules
import type { ReactNode } from 'react';

export default function toChildrenArray(children: ReactNode): ReactNode[] {
  if (!children) return [];
  if (Array.isArray(children)) return children;
  //check if Iterable and use array from
  if (typeof (children as any)[Symbol.iterator] === 'function') {
    return Array.from(children as Iterable<ReactNode>);
  } else {
    children = [children];
  }
  return [ children ];
};