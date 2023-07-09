//types
import type { TaglistProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//hooks
import useTaglist from 'frui-core/dist/hooks/useTaglist';
//helpers
import { makeGroupClasses, makeGroupStyles, makeStyles } from 'frui-core/dist/utils';

/**
 * Generic Taglist  Component (Main)
 */
const Taglist: React.FC<TaglistProps> = (props) => {
  //separate component related props from field attributes
  const {  
    error, 
    errorColor = '#DC3545',
    className,
    classNames,
    style,
    styles,
    onChange,
    onUpdate,
    ...attributes 
  } = props;
  //hooks
  const { input, tags, handlers } = useTaglist({ onChange, onUpdate });

  const map = {
    styles: makeGroupStyles(styles, {
      container: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
        boxSizing: 'border-box',
        color: 'black',
        display: 'flex',
        maxWidth: '100%',
        overflow: 'scroll',
        paddingLeft: '4px',
        width: '100%'
      },
      tag: {
        alignItems: 'center',
        backgroundColor: 'orange',
        borderColor: 'orange',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '5px',
        color: 'white',
        display: 'flex',
        marginBottom: '2px',
        marginRight: '4px',
        marginTop: '2px',
        paddingLeft: '8px',
        paddingRight: '5px',
        whiteSpace: 'nowrap'
      },
      remove: {
        backgroundColor: 'unset',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        paddingBottom: '2px',
        paddingLeft: '6px',
        paddingRight: '4px',
        paddingTop: '2px',
      },
      input: makeStyles(style, {
        border: 'none',
        outline: 'none',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '8px',
        minWidth: '50%',
        width: '100%'
      })
    }),
    classes: makeGroupClasses(classNames, {
      container: undefined,
      tag: undefined,
      remove: undefined,
      input: className
    })
  };

  //render
  return (
    <div className={map.classes.container} style={map.styles.container}>
      {tags.map((tag, i) => (
        <div key={i} className={map.classes.tag} style={map.styles.tag}>
          {tag}
          <button 
            className={map.classes.remove} 
            style={map.styles.remove}
            onClick={() => handlers.remove(i)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        {...attributes}
        className={map.classes.input} 
        style={map.styles.input}
        value={input}
        onKeyDown={handlers.edit}
        onKeyUp={handlers.save}
        onChange={handlers.change}
      />
    </div>
  );
}

export default Taglist;