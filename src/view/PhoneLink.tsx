//--------------------------------------------------------------------//
// Imports

//types
import type { LinkProps } from './Link.js';
//components
import LinkFormat from './Link.js';

//--------------------------------------------------------------------//
// Types

/**
 * Phone Props
 */
export type PhoneLinkProps = LinkProps;

//--------------------------------------------------------------------//
// Components

/**
 * PhoneLink Format Component (Main)
 */
export function PhoneLink({ value, ...attributes }: PhoneLinkProps) {
  return (
    <LinkFormat {...attributes} value={`tel:${value}`} label={value} />
  );
};

//defaults to phone link
export default PhoneLink;