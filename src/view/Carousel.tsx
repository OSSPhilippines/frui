//--------------------------------------------------------------------//
// Imports

//types
import type { HTMLImageProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type CarouselProps = HTMLImageProps & { value: string[] };

//--------------------------------------------------------------------//
// Components

/**
 * Carousel Component (Main)
 */
export function Carousel(props: CarouselProps) {
  const { value, className, ...attributes } = props;
  const classNames = [ 'frui-view-carousel' ];
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
export default Carousel;