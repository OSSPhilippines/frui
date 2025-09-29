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
 * Image Format Component (Main)
 */
export function Image({ value, ...attributes }: ImageProps) {
  return (
    <img {...attributes} src={value} />
  );
};

//defaults to image
export default Image;