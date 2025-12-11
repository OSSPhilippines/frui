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
  SlotStyleProp 
} from '../types.js';
import type { FilmProps } from './Film.js';
import Film, { FilmFrame } from './Film.js';
import getClassStyles from '../helpers/getClassStyles.js';
import getSlotStyles from '../helpers/getSlotStyles.js';
import getChildComponent, {
  getChildComponents
} from '../helpers/getChildComponent.js';

//--------------------------------------------------------------------//
// Types

export type CarouselContext = {
  index: number,
  jump: (index: number) => void,
  next: () => void,
  prev: () => void
};

export type CarouselConfig = {
  //starting index (uncontrolled)
  defaultIndex?: number,
  //number of frames
  frames: number,
  //controlled index
  index?: number,
  //whether to repeat the carousel
  repeat?: boolean
};

export type CarouselPreviousProps = ClassStyleProps & ChildrenProps & {
  asChild?: boolean
};
export type CarouselNextProps = ClassStyleProps & ChildrenProps & {
  asChild?: boolean
};

export type CarouselProps = FilmProps & ChildrenProps & {
  //overflow auto sliding
  auto?: boolean,
  //starting index (uncontrolled)
  defaultIndex?: number,
  //slot: class/style to apply to film component
  film?: SlotStyleProp,
  //overflow hidden
  hidden?: boolean,
  //controlled index
  index?: number,
  //whether to repeat the carousel
  repeat?: boolean,
  //overflow scroll bars
  scroll?: boolean,
  //slot: class/style to apply to carousel frame view
  view?: SlotStyleProp
};

//--------------------------------------------------------------------//
// Helpers

/**
 * Get all frame components from children node
 */
export function getFrames(children: ReactNode) {
  return getChildComponents<ReactElement>(
    FilmFrame, 
    'filmFrame', 
    children
  );
};

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
  const { defaultIndex = 0, index, repeat, frames } = config;
  const [ active, jump ] = useState(defaultIndex);
  //variables
  const refs = {
    view: useRef<HTMLDivElement>(null)
  };
  //handlers
  const handlers = {
    jump,
    prev() {
      jump(index => {
        const previous = index - 1;
        if (previous < 0) {
          return repeat ? frames - 1 : index;
        }
        return previous;
      });
    },
    next() {
      jump(index => {
        const next = index + 1;
        if (next >= frames) {
          return repeat ? 0 : index;
        }
        return next;
      });
    }
  };
  //effects
  // when index changes, update active
  useEffect(() => {
    if (typeof index === 'number') {
      jump(index);
    }
  }, [ index ]);
  // when active changes, slide to show active image
  useEffect(() => {
    if (!refs.view.current) return;
    const frames = Array.from(
      refs.view.current.querySelectorAll('.frui-film-frame')
    );
    const activeFrame = frames[active];
    if (activeFrame) {
      const frameRect = refs.view.current.getBoundingClientRect();
      const imageRect = activeFrame.getBoundingClientRect();
      const offset = imageRect.left - frameRect.left;
      refs.view.current.scrollBy({
        left: offset,
        behavior: 'smooth'
      });
    }
  }, [ active, refs.view.current ]);

  return { refs, active, handlers };
};

//--------------------------------------------------------------------//
// Components

/**
 * Carousel Context
 */
export const CarouselContext = createContext<CarouselContext>({
  index: 0,
  jump: () => {},
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
  const classes = [ 'frui-carousel-prev' ];
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
  const classes = [ 'frui-carousel-next' ];
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
    view
  } = props;
  const frames = getFrames(children);
  //hooks
  const { active, refs, handlers } = useCarousel(
    { frames: frames.length, defaultIndex, index, repeat }
  );
  //variables
  const classes = [ 'frui-carousel' ];
  className && classes.push(className);
  // get slot styles
  const slots = {
    film: film ? getSlotStyles(film, {}) : {},
    view: view ? getSlotStyles(view, {}) : {}
  };
  // get final classes and styles
  const styles = {
    film: getClassStyles({
      //default classes to apply
      classes: [ 'frui-carousel-film' ],
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
    view: getClassStyles({
      //default classes to apply
      classes: [ 'frui-carousel-view' ],
      //style props
      props: {
        //prefer direct props over slot props
        className: slots.view.className,
        //prefer direct props over slot props
        style: slots.view.style
      },
      //state to pass to callable props
      state: {}
    })
  };
  hidden && styles.view.classes.push('frui-scroll-hidden');
  scroll && styles.view.classes.push('frui-scroll');
  auto && styles.view.classes.push('frui-scroll-auto');
  // get previous and next components
  const components = {
    previous: getPrevious(children),
    next: getNext(children)
  };
  // make provider
  const provider = {
    index: active,
    jump: handlers.jump,
    next: handlers.next,
    prev: handlers.prev
  };
  //render
  return (
    <CarouselContext.Provider value={provider}>
      <div className={classes.join(' ')} style={style}>
        {components.previous}
        <div 
          ref={refs.view}
          className={styles.view.classes.join(' ')} 
          style={styles.view.styles} 
        >
          <Film 
            className={styles.film.classes.join(' ')} 
            frame={frame}
            style={styles.film.styles}
          >
            {frames}
          </Film>
        </div>
        {components.next}
      </div>
    </CarouselContext.Provider>
  );
};

//defaults to image carousel
export default Object.assign(Carousel, {
  getFrames,
  getPrevious,
  getNext,
  useCarousel,
  useCarouselContext,
  Frame: FilmFrame,
  Prev: CarouselPrevious,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  useContext: useCarouselContext,
  use: useCarousel
});