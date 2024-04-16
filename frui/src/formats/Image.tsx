//types
import type { ImageProps } from '../types/formats';

export default function Image({ value, ...attributes }: ImageProps) {
  return (
    <img {...attributes} src={value} />
  );
};