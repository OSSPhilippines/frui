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
export type PhoneLinkProps = LinkProps;

//--------------------------------------------------------------------//
// Components

/**
 * Phone Link Format Component (Main)
 */
export function PhoneLink({ value, ...attributes }: PhoneLinkProps) {
  return (
    <Link {...attributes} value={`tel:${value}`} label={value} />
  );
};

//defaults to phone link
export default PhoneLink;