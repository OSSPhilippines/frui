//--------------------------------------------------------------------//
// Imports

//frui
import type { HTMLImageProps, SlotStyleProp } from '../types.js';
import Film from '../base/Film.js';
import getClassStyles from '../helpers/getClassStyles.js';
import getSlotStyles from '../helpers/getSlotStyles.js';

//--------------------------------------------------------------------//
// Types

export type ImageFilmProps = HTMLImageProps & { 
  //slot: class/style to apply to each image element wrapper
  frame?: SlotStyleProp
  //slot: class/style to apply to each image element
  image?: SlotStyleProp,
  value: string[]
};

//--------------------------------------------------------------------//
// Components

/**
 * Film Component (Main)
 */
export function ImageFilm(props: ImageFilmProps) {
  //props
  const { 
    value, 
    className, 
    frame,
    image, 
    style, 
    ...attributes 
  } = props;
  //variables
  const classes = [ 'frui-view-image-film' ];
  className && classes.push(className);
  // get slot styles
  const slot = image ? getSlotStyles(image, {}) : {};
  //get final classes and styles
  const styles = getClassStyles({
    //default classes to apply
    classes: [ 'frui-view-image-film-image' ],
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
  return (
    <Film className={classes.join(' ')} style={style} frame={frame}>
      {value.map((value, i) => (
        <Film.Frame key={i}>
          <img 
            {...attributes} 
            className={styles.classes.join(' ')} 
            style={styles.styles} 
            src={value} 
          />
        </Film.Frame>
      ))}
    </Film>
  );
};

//defaults to image film
export default Object.assign(ImageFilm, {
  useFilmContext: Film.useFilmContext,
  useContext: Film.useFilmContext,
  useFilm: Film.useFilmContext,
  use: Film.useFilmContext
});