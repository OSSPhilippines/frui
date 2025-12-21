//--------------------------------------------------------------------//
// Imports

//frui
import type { HTMLImageProps, SlotStyleProp } from '../types.js';
import type { CarouselProps } from '../base/Carousel.js';
import Carousel from '../base/Carousel.js';
import getClassStyles from '../helpers/getClassStyles.js';
import getSlotStyles from '../helpers/getSlotStyles.js';

//--------------------------------------------------------------------//
// Types

export type ImageCarouselProps = HTMLImageProps & CarouselProps & {
  //slot: class/style to apply to each image element
  image?: SlotStyleProp,
  value: string[]
};

//--------------------------------------------------------------------//
// Components

/**
 * Carousel Component (Main)
 */
export function ImageCarousel(props: ImageCarouselProps) {
  //props
  const { 
    auto,
    children, 
    className, 
    defaultIndex,
    film, 
    frame, 
    hidden,
    image,
    index,
    repeat,
    scroll,
    style, 
    value, 
    ...attributes 
  } = props;
  //variables
  const classes = [ 'frui-view-image-carousel' ];
  className && classes.push(className);
  // get slot styles
  const slot = image ? getSlotStyles(image, {}) : {};
  //get final classes and styles
  const styles = getClassStyles({
    //default classes to apply
    classes: [ 'frui-view-carousel-film-image' ],
    //style props
    props: {
      //prefer direct props over slot props
      className: slot.className,
      //prefer direct props over slot props
      style: slot.style
    },
    //state to pass to callable props
    state: {}
  });
  // get previous and next components
  const components = {
    previous: Carousel.getPrevious(children),
    next: Carousel.getNext(children)
  };
  //render
  return (
    <Carousel
      auto={auto}
      className={classes.join(' ')}
      defaultIndex={defaultIndex}
      film={film}
      hidden={hidden}
      index={index}
      repeat={repeat}
      scroll={scroll}
      style={style}
    >
      {components.previous}
      {value.map((value, i) => (
        <Carousel.Frame key={i}>
          <img 
            {...attributes} 
            className={styles.classes.join(' ')} 
            style={styles.styles} 
            src={value} 
          />
        </Carousel.Frame>
      ))}
      {components.next}
    </Carousel>
  );
};

//defaults to image carousel
export default Object.assign(ImageCarousel, {
  useCarousel: Carousel.useCarousel,
  useCarouselContext: Carousel.useCarouselContext,
  Prev: Carousel.Prev,
  Previous: Carousel.Previous,
  Next: Carousel.Next,
  useContext: Carousel.useCarouselContext,
  use: Carousel.useCarousel
});