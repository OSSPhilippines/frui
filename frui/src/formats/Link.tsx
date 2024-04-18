//types
import type { HTMLLinkProps } from '../types';

/**
 * Link Props
 */
export type LinkProps = HTMLLinkProps & { value: string, label?: string  };

/**
 * Link Format Component (Main)
 */
export default function Link({ value, label, ...attributes }: LinkProps) {
  return (<a href={value} {...attributes}>{label || value}</a>);
};