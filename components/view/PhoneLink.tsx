//--------------------------------------------------------------------//
// Imports

//types
import type { LinkProps } from './Link.js';
//components
import Link from './Link.js';

//--------------------------------------------------------------------//
// Types

/**
 * Phone Props
 */
export type PhoneProps = LinkProps;

//--------------------------------------------------------------------//
// Components

/**
 * Phone Format Component (Main)
 */
export function PhoneLink({ value, ...attributes }: PhoneProps) {
  return (
    <Link {...attributes} value={`tel:${value}`} label={value} />
  );
};

//defaults to phone link
export default PhoneLink;