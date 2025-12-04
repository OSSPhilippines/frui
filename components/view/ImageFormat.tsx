//--------------------------------------------------------------------//
// Imports

//types
import type { HTMLImageProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type ImageFormatProps = HTMLImageProps & { value: string };

//--------------------------------------------------------------------//
// Components

/**
 * ImageFormat Component (Main)
 */
export function ImageFormat({ value, ...attributes }: ImageFormatProps) {
  return (
    <img {...attributes} src={value || undefined} />
  );
};

//defaults to image format
export default ImageFormat;