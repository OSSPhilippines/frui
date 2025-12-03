//--------------------------------------------------------------------//
// Imports

//types
import type { LinkFormatProps } from './LinkFormat.js';
//components
import LinkFormat from './LinkFormat.js';

//--------------------------------------------------------------------//
// Types

export type EmailLinkProps = LinkFormatProps;

//--------------------------------------------------------------------//
// Components

/**
 * Email Format Component (Main)
 */
export function EmailLink({ value, ...attributes }: EmailLinkProps) {
  return (
    <LinkFormat {...attributes} value={`mailto:${value}`} label={value} />
  );
};

//defaults to email link
export default EmailLink;