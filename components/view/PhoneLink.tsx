//--------------------------------------------------------------------//
// Imports

//types
import type { LinkFormatProps } from './LinkFormat.js';
//components
import LinkFormat from './LinkFormat.js';

//--------------------------------------------------------------------//
// Types

/**
 * Phone Props
 */
export type PhoneLinkProps = LinkFormatProps;

//--------------------------------------------------------------------//
// Components

/**
 * Phone Link Format Component (Main)
 */
export function PhoneLink({ value, ...attributes }: PhoneLinkProps) {
  return (
    <LinkFormat {...attributes} value={`tel:${value}`} label={value} />
  );
};

//defaults to phone link
export default PhoneLink;