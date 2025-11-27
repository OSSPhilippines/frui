//--------------------------------------------------------------------//
// Imports

//types
import type { LinkProps } from './Link.js';
//components
import Link from './Link.js';

//--------------------------------------------------------------------//
// Types

export type EmailLinkProps = LinkProps;

//--------------------------------------------------------------------//
// Components

/**
 * Email Format Component (Main)
 */
export function EmailLink({ value, ...attributes }: EmailLinkProps) {
  return (
    <Link {...attributes} value={`mailto:${value}`} label={value} />
  );
};

//defaults to email link
export default EmailLink;