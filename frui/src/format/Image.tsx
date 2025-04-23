//types
import type { HTMLImageProps } from '../types.js';

/**
 * Image Props
 */
export type ImageProps = HTMLImageProps & { value: string };

/**
 * Image Format Component (Main)
 */
export default function Image({ value, ...attributes }: ImageProps) {
  return (
    <img {...attributes} src={value} />
  );
};