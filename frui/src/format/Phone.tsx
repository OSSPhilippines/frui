//types
import type { LinkProps } from './Link.js';
//components
import Link from './Link.js';

/**
 * Phone Props
 */
export type PhoneProps = LinkProps;

/**
 * Phone Format Component (Main)
 */
export default function Phone({ value, ...attributes }: PhoneProps) {
  return (
    <Link {...attributes} value={`tel:${value}`} label={value} />
  );
};