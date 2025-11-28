//--------------------------------------------------------------------//
// Imports

//types
import type { LinkProps } from './LinkFormat.js';
//components
import Link from './LinkFormat.js';

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