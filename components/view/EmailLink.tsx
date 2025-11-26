//--------------------------------------------------------------------//
// Imports

//types
import type { LinkProps } from './Link.js';
//components
import Link from './Link.js';

//--------------------------------------------------------------------//
// Types

export type EmailProps = LinkProps;

//--------------------------------------------------------------------//
// Components

/**
 * Email Format Component (Main)
 */
export function EmailLink({ value, ...attributes }: EmailProps) {
  return (
    <Link {...attributes} value={`mailto:${value}`} label={value} />
  );
};

//defaults to email link format
export default EmailLink;