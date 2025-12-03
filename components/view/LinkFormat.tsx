//--------------------------------------------------------------------//
// Imports

//types
import type { HTMLLinkProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type LinkFormatProps = HTMLLinkProps & { value: string, label?: string  };

//--------------------------------------------------------------------//
// Components

/**
 * Link Format Component (Main)
 */
export function LinkFormat({ value, label, ...attributes }: LinkFormatProps) {
  return (<a href={value} {...attributes}>{label || value}</a>);
};

//defaults to link format
export default LinkFormat;