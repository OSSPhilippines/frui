//types
import type { LinkProps } from '../types/formats';

export default function Link({ value, label, ...attributes }: LinkProps) {
  return (<a href={value} {...attributes}>{label || value}</a>);
};