//types
import type { FieldFilelistProps } from '../types';
//react
import React from 'react';
//components
import FieldInput from './FieldInput';
//hooks
import useFilelist from '../hooks/useFieldFilelist';
//helpers
import { makeGroupClasses, makeGroupStyles, makeStyles } from '../utils';

/**
 * Generic File Field Component (Main)
 */
const FieldFilelist: React.FC<FieldFilelistProps> = (props) => {
  //separate component related props from field attributes
  const { 
    locale = {
      uploading: 'Uploading...',
      progress: '%s of %s uploaded',
      complete: '%s files uploaded'
    },
    defaultValue,
    error,
    errorColor = '#DC3545',
    style,
    className,
    styles,
    classNames,
    onChange,
    onUpdate,
    onUpload,
    ...attributes 
  } = props;
  //hooks
  const { queued, uploaded, handlers } = useFilelist({ 
    defaultValue,
    onChange, 
    onUpdate, 
    onUpload 
  });
  //variables
  const map = {
    styles: makeGroupStyles(styles, {
      control: makeStyles(style, {
        borderColor: error ? errorColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
        color: 'black',
        paddingBottom: '6px',
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '6px',
        width: '100%'
      }),
      file: { 
        alignItems: 'center',
        borderColor: 'gray',
        borderStyle: 'solid',
        borderTopWidth: 0, 
        borderWidth: '1px',
        color: 'black',
        display: 'flex',
        paddingBottom: '6px',
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '6px',
        width: '100%'
      },
      link: { 
        flexGrow: 1, 
        overflow: 'hidden' 
      },
      remove: { 
        color: 'gray',
        cursor: 'pointer', 
        fontSize: '20px', 
        marginTop: '-2px', 
        paddingLeft: '8px' 
      }
    }),
    classes: makeGroupClasses(classNames, {
      control: className,
      file: undefined,
      link: undefined,
      remove: undefined
    })
  };
  //render
  return (
    <div>
      <FieldInput 
        {...attributes} 
        multiple
        type="file" 
        className={map.classes.control}
        style={map.styles.control}
        onChange={handlers.change} 
      />
      {uploaded.length > 0 && uploaded.map((url, i) => (
        <div key={i} className={map.classes.file} style={map.styles.file}>
          <a 
            className={map.classes.link} 
            style={map.styles.link} 
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className={map.classes.remove} 
            style={map.styles.remove}
            onClick={() => handlers.remove(i)}
          >
            &times;
          </div>
        </div>
      ))}
      {queued > 0 && (
        <div className={map.classes.file} style={map.styles.file}>
          <span className={map.classes.link} style={map.styles.link}>
            {locale.uploading}
          </span>
        </div>
      )}
    </div>
  );
}

export default FieldFilelist;