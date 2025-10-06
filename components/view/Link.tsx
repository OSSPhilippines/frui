//--------------------------------------------------------------------//
// Imports

//types
import type { HTMLLinkProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type LinkProps = HTMLLinkProps & { value: string, label?: string  };

//--------------------------------------------------------------------//
// Components

/**
 * Link Format Component (Main)
 */
export function Link({ value, label, ...attributes }: LinkProps) {
  return (<a href={value} {...attributes}>{label || value}</a>);
};

//defaults to link
export default Link;