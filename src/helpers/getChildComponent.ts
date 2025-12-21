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
  const components = getChildComponents(
    component, 
    propName, 
    children, 
    recursive
  );
  return components.length > 0 ? components[0] : null;
};

/**
 * Get node from children or use default
 */
export function getChildComponents<C = ReactNode>(
  component: Function,
  propName: string,
  children?: ReactNode,
  recursive = true
) {
  const components: C[] = [];
  if (!children) return [];
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
      components.push(child as unknown as C);
    }
    if (Array.isArray(child) && recursive) {
      const nested = getChildComponents<C>(
        component, 
        propName, 
        child, 
        recursive
      );
      if (nested) components.push(...nested);
    }
  }
  return components;
};

export default getChildComponent;