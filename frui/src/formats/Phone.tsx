//types
import type { PhoneProps } from '../types/formats';
//components
import Link from './Link';

export default function Phone({ value, ...attributes }: PhoneProps) {
  return (
    <Link {...attributes} value={`tel:${value}`} label={value} />
  );
};