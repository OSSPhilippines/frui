//types
import type { LinkProps } from './Link.js';
//components
import Link from './Link.js';

/**
 * Email Props
 */
export type EmailProps = LinkProps;

/**
 * Email Format Component (Main)
 */
export default function Email({ value, ...attributes }: EmailProps) {
  return (
    <Link {...attributes} value={`mailto:${value}`} label={value} />
  );
};