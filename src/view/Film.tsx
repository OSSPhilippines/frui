//--------------------------------------------------------------------//
// Imports

//frui
import type { HTMLImageProps, SlotStyleProp } from '../types.js';
import getClassStyles from '../helpers/getClassStyles.js';
import getSlotStyles from '../helpers/getSlotStyles.js';

//--------------------------------------------------------------------//
// Types

export type FilmProps = HTMLImageProps & { 
  //slot: class/style to apply to each image element
  image?: SlotStyleProp,
  value: string[],
  //slot: class/style to apply to each image element wrapper
  wrapper?: SlotStyleProp,
};

//--------------------------------------------------------------------//
// Components

/**
 * Film Component (Main)
 */
export function Film(props: FilmProps) {
  //props
  const { 
    value, 
    className, 
    image, 
    style, 
    wrapper, 
    ...attributes 
  } = props;
  //variables
  const classNames = [ 'frui-view-film' ];
  className && classNames.push(className);
  // get slot styles
  const slots = {
    image: image ? getSlotStyles(image, {}) : {},
    wrapper: wrapper ? getSlotStyles(wrapper, {}) : {}
  };
  //get final classes and styles
  const styles = {
    image: getClassStyles({
      //default classes to apply
      classes: [ 'frui-view-film-image' ],
      //style props
      props: {
        //prefer direct props over slot props
        className: slots.image.className,
        //prefer direct props over slot props
        style: slots.image.style
      },
      //state to pass to callable props
      state: {}
    }),
    wrapper: getClassStyles({
      //default classes to apply
      classes: [ 'frui-view-film-wrapper' ],
      //style props
      props: {
        //prefer direct props over slot props
        className: slots.wrapper.className,
        //prefer direct props over slot props
        style: slots.wrapper.style
      },
      //state to pass to callable props
      state: {}
    })
  };
  return (
    <div className={classNames.join(' ')} style={style}>
      {value.map((value, i) => (
        <div 
          key={i} 
          className={styles.wrapper.classes.join(' ')} 
          style={styles.wrapper.styles}
        >
          <img 
            {...attributes} 
            className={styles.image.classes.join(' ')} 
            style={styles.image.styles} 
            src={value} 
          />
        </div>
      ))}
    </div>
  );
};

//defaults to image film
export default Film;