//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactElement } from 'react';
import { 
  cloneElement,
  createContext,
  useContext
} from 'react';

//frui
import type { 
  ChildrenProps,
  ClassStyleProps,
  SlotStyleProp 
} from '../types.js';
import getClassStyles from '../helpers/getClassStyles.js';
import getSlotStyles from '../helpers/getSlotStyles.js';

//--------------------------------------------------------------------//
// Types

export type FilmContext = {
  //slot: class/style to apply to each image element wrapper
  frame?: SlotStyleProp
};

export type FilmFrameProps = ClassStyleProps & ChildrenProps & {
  asChild?: boolean
};

export type FilmProps = ClassStyleProps & ChildrenProps & {
  //slot: class/style to apply to each image element wrapper
  frame?: SlotStyleProp
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Hook to use Film Context
 */
export function useFilmContext() {
  return useContext(FilmContext);
};

//--------------------------------------------------------------------//
// Components

/**
 * Film Context
 */
export const FilmContext = createContext<FilmContext>({});

/**
 * Film Frame Component
 */
export function FilmFrame(props: FilmFrameProps) {
  //props
  const { asChild, children, className, style } = props;
  //hooks
  const { frame } = useFilmContext();
  //variables
  // get slot styles
  const slot = frame ? getSlotStyles(frame, {}) : {};
  //get final classes and styles
  const { classes, styles } = getClassStyles({
    //default classes to apply
    classes: [ 'frui-film-frame' ],
    //style props
    props: {
      //prefer direct props over slot props
      className: className || slot.className,
      //prefer direct props over slot props
      style: style || slot.style
    },
    //state to pass to callable props
    state: {}
  });
  const childProps = { className: classes.join(' '), style: styles };
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
    <div className={classes.join(' ')} style={styles}>
      {children}
    </div>
  );
};

/**
 * Film Component (Main)
 */
export function Film(props: FilmProps) {
  //props
  const { 
    children, 
    className, 
    frame, 
    style
  } = props;
  //variables
  const classNames = [ 'frui-film' ];
  className && classNames.push(className);
  //render
  return (
    <FilmContext.Provider value={{ frame }}>
      <div className={classNames.join(' ')} style={style}>
        {children}
      </div>
    </FilmContext.Provider>
  );
};

//defaults to image film
export default Object.assign(Film, {
  useFilmContext,
  Frame: FilmFrame,
  useContext: useFilmContext,
  useFilm: useFilmContext,
  use: useFilmContext
});