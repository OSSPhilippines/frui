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
export function Email({ value, ...attributes }: EmailProps) {
  return (
    <Link {...attributes} value={`mailto:${value}`} label={value} />
  );
};

//defaults to email
export default Email;