//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode, ReactElement } from 'react';
import { 
  cloneElement, 
  createContext,
  useContext,
  useEffect, 
  useRef, 
  useState 
} from 'react';
//frui
import type { 
  ClassStyleProps,
  ChildrenProps, 
  HTMLImageProps, 
  SlotStyleProp 
} from '../types.js';
import type { FilmProps } from './Film.js';
import Film from './Film.js';
import getClassStyles from '../helpers/getClassStyles.js';
import getSlotStyles from '../helpers/getSlotStyles.js';
import getChildComponent from '../helpers/getChildComponent.js';

//--------------------------------------------------------------------//
// Types

export type CarouselContext = {
  index: number,
  prev: () => void,
  next: () => void
};

export type CarouselConfig = {
  //starting index (uncontrolled)
  defaultIndex?: number,
  //controlled index
  index?: number,
  //whether to repeat the carousel
  repeat?: boolean,
  value: string[]
};

export type CarouselPreviousProps = ClassStyleProps & ChildrenProps & {
  asChild?: boolean
};
export type CarouselNextProps = ClassStyleProps & ChildrenProps & {
  asChild?: boolean
};

export type CarouselProps = HTMLImageProps & FilmProps & ChildrenProps & {
  //overflow auto sliding
  auto?: boolean,
  //starting index (uncontrolled)
  defaultIndex?: number,
  //slot: class/style to apply to film component
  film?: SlotStyleProp,
  //slot: class/style to apply to carousel frame
  frame?: SlotStyleProp,
  //overflow hidden
  hidden?: boolean,
  //controlled index
  index?: number,
  //whether to repeat the carousel
  repeat?: boolean,
  //overflow scroll bars
  scroll?: boolean
};

//--------------------------------------------------------------------//
// Helpers

/**
 * Get first previous component from children node
 */
export function getPrevious(children?: ReactNode) {
  return getChildComponent(
    CarouselPrevious, 
    'carouselPrevious', 
    children
  );
};

/**
 * Get first next component from children node
 */
export function getNext(children?: ReactNode) {
  return getChildComponent(
    CarouselNext, 
    'carouselNext', 
    children
  );
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Carousel Context hook
 */
export function useCarouselContext() {
  return useContext(CarouselContext);
};

/**
 * Carousel hook
 */
export function useCarousel(config: CarouselConfig) {
  //config
  const { defaultIndex = 0, index, repeat, value } = config;
  const [ active, setActive ] = useState(defaultIndex);
  //variables
  const refs = {
    frame: useRef<HTMLDivElement>(null)
  };
  //handlers
  const handlers = {
    set: setActive,
    prev() {
      setActive(index => {
        const previous = index - 1;
        if (previous < 0 && repeat) {
          return value.length - 1;
        }
        return previous;
      });
    },
    next() {
      setActive(index => {
        const next = index + 1;
        if (next >= value.length && repeat) {
          return 0;
        }
        return next;
      });
    }
  };
  //effects
  // when index changes, update active
  useEffect(() => {
    if (typeof index === 'number') {
      setActive(index);
    }
  }, [ index ]);
  // when active changes, slide to show active image
  useEffect(() => {
    if (!refs.frame.current) return;
    const images = Array
      .from(refs.frame.current.querySelectorAll('img'))
      .map(image => image.parentElement as HTMLElement);
    const activeImage = images[active];
    if (activeImage) {
      const frameRect = refs.frame.current.getBoundingClientRect();
      const imageRect = activeImage.getBoundingClientRect();
      const offset = imageRect.left - frameRect.left;
      refs.frame.current.scrollBy({
        left: offset,
        behavior: 'smooth'
      });
    }
  }, [ active, refs.frame.current ]);

  return { refs, active, handlers };
};

//--------------------------------------------------------------------//
// Components

/**
 * Carousel Context
 */
export const CarouselContext = createContext<CarouselContext>({
  index: 0,
  prev: () => {},
  next: () => {}
});

/**
 * Carousel Previous Component
 */
export function CarouselPrevious(props: CarouselPreviousProps) {
  //props
  const { asChild, className, style, children } = props;
  //hooks
  const { prev } = useCarouselContext();
  //variables
  const classes = [ 'frui-view-carousel-prev' ];
  className && classes.push(className);
  const childProps = { 
    className: classes.join(' '), 
    style, 
    onClick: prev 
  } as ClassStyleProps;
  //render
  if (asChild) {
    //check if children is a valid react element
    if (children 
      && typeof children === 'object' 
      && 'type' in children
    ) {
      return cloneElement(children as ReactElement, childProps);
    }
    //if not check if children is an array and get the first element
    //then check if that is a valid react element
    if (Array.isArray(children) && children.length > 0) {
      if (children[0] 
        && typeof children[0] === 'object' 
        && 'type' in children[0]
      ) {
        return cloneElement(children[0] as ReactElement, childProps);
      }
    }
  }
  return (
    <div className={className} style={style} onClick={prev}>
      {children}
    </div>
  );
};

/**
 * Carousel Next Component
 */
export function CarouselNext(props: CarouselNextProps) {
  //props
  const { asChild, className, style, children } = props;
  //hooks
  const { next } = useCarouselContext();
  //variables
  const classes = [ 'frui-view-carousel-next' ];
  className && classes.push(className);
  const childProps = { 
    className: classes.join(' '), 
    style, 
    onClick: next 
  } as ClassStyleProps;
  //render
  if (asChild) {
    //check if children is a valid react element
    if (children 
      && typeof children === 'object' 
      && 'type' in children
    ) {
      return cloneElement(children as ReactElement, childProps);
    }
    //if not check if children is an array and get the first element
    //then check if that is a valid react element
    if (Array.isArray(children) && children.length > 0) {
      if (children[0] 
        && typeof children[0] === 'object' 
        && 'type' in children[0]
      ) {
        return cloneElement(children[0] as ReactElement, childProps);
      }
    }
  }
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

/**
 * Carousel Component (Main)
 */
export function Carousel(props: CarouselProps) {
  //props
  const { 
    auto,
    children, 
    className, 
    defaultIndex,
    film, 
    frame, 
    hidden,
    index,
    repeat,
    scroll,
    style, 
    value, 
    ...attributes 
  } = props;
  //hooks
  const { active, refs, handlers } = useCarousel(
    { value, defaultIndex, index, repeat }
  );
  //variables
  const classes = [ 'frui-view-carousel' ];
  className && classes.push(className);
  // get slot styles
  const slots = {
    film: film ? getSlotStyles(film, {}) : {},
    frame: frame ? getSlotStyles(frame, {}) : {}
  };
  // get final classes and styles
  const styles = {
    film: getClassStyles({
      //default classes to apply
      classes: [ 'frui-view-carousel-film' ],
      //style props
      props: {
        //prefer direct props over slot props
        className: slots.film.className,
        //prefer direct props over slot props
        style: slots.film.style
      },
      //state to pass to callable props
      state: {}
    }),
    frame: getClassStyles({
      //default classes to apply
      classes: [ 'frui-view-carousel-frame' ],
      //style props
      props: {
        //prefer direct props over slot props
        className: slots.frame.className,
        //prefer direct props over slot props
        style: slots.frame.style
      },
      //state to pass to callable props
      state: {}
    })
  };
  hidden && styles.frame.classes.push('frui-scroll-hidden');
  scroll && styles.frame.classes.push('frui-scroll');
  auto && styles.frame.classes.push('frui-scroll-auto');
  // get previous and next components
  const components = {
    previous: getPrevious(children),
    next: getNext(children)
  };
  // make provider
  const provider = {
    index: active,
    prev: handlers.prev,
    next: handlers.next
  };
  //render
  return (
    <CarouselContext.Provider value={provider}>
      <div className={classes.join(' ')} style={style}>
        {components.previous}
        <div 
          ref={refs.frame}
          className={styles.frame.classes.join(' ')} 
          style={styles.frame.styles} 
        >
          <Film 
            {...attributes} 
            className={styles.film.classes.join(' ')} 
            style={styles.film.styles} 
            value={value} 
          />
        </div>
        {components.next}
      </div>
    </CarouselContext.Provider>
  );
};

//defaults to image carousel
export default Object.assign(Carousel, {
  useCarousel,
  useCarouselContext,
  Prev: CarouselPrevious,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  useContext: useCarouselContext,
  use: useCarousel
});