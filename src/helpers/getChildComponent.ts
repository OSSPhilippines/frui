//--------------------------------------------------------------------//
// Imports

import type { ReactNode } from 'react';

//--------------------------------------------------------------------//
// Functions

/**
 * Get node from children or use default
 */
export function getChildComponent(
  component: Function,
  propName: string,
  children?: ReactNode,
  recursive = true
): ReactNode {
  if (!children) return null;
  const nodes = !Array.isArray(children) 
    ? [ children ].filter(Boolean)
    : children;
  for (const child of nodes) {
    //skip null/undefined child
    if (!child) continue;
    //if child is a [DropdownHead]
    if (child.type === component 
      || child.props?.[propName]
      || child[propName]
    ) {
      return child;
    }
    if (Array.isArray(child) && recursive) {
      const nested = getChildComponent(component, propName, child);
      if (nested) return nested;
    }
  }
  return null;
};

export default getChildComponent;