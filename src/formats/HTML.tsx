//types
import type { HTMLProps } from '../types/formats';

export default function HTML({ value }: HTMLProps) {
  return (
    <div dangerouslySetInnerHTML={{ __html: value }} />
  );
};