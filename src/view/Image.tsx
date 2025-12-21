//--------------------------------------------------------------------//
// Imports

//types
import type { HTMLImageProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type ImageProps = HTMLImageProps & { value: string };

//--------------------------------------------------------------------//
// Components

/**
 * Image Component (Main)
 */
export function Image({ value, ...attributes }: ImageProps) {
  return (
    <img {...attributes} src={value || undefined} />
  );
};

//defaults to image format
export default Image;