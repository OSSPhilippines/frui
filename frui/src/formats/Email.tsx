//types
import type { EmailProps } from '../types/formats';
//components
import Link from './Link';

export default function Email({ value, ...attributes }: EmailProps) {
  return (
    <Link {...attributes} value={`mailto:${value}`} label={value} />
  );
};