//--------------------------------------------------------------------//
// Imports

//types
import type { HTMLImageProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type ImageCarouselProps = HTMLImageProps & { value: string[] };

//--------------------------------------------------------------------//
// Components

/**
 * ImageCarousel Format Component (Main)
 */
export function ImageCarousel(props: ImageCarouselProps) {
  const { value, className, ...attributes } = props;
  const classNames = ['frui-format-imagelist'];
  if (className) {
    classNames.push(className);
  }
  return (
    <div className={classNames.join(' ')}>
      {value.map((value, i) => (
        <img key={i} {...attributes} src={value} />
      ))}
    </div>
  );
};

//defaults to image carousel
export default ImageCarousel;