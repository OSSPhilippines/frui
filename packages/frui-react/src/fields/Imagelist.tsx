//types
import type { FilelistProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useFilelist from 'frui-core/dist/hooks/useFilelist';
//helpers
import { makeGroupClasses, makeGroupStyles, makeStyles } from 'frui-core/dist/utils';

/**
 * Generic File  Component (Main)
 */
const Filelist: React.FC<FilelistProps> = (props) => {
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
        boxSizing: 'border-box',
        color: 'black',
        display: 'flex',
        paddingBottom: '6px',
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '6px',
        width: '100%'
      },
      link: { 
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1, 
        flexWrap: 'nowrap',
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
      reset: undefined,
      file: undefined,
      link: undefined,
      remove: undefined
    })
  };
  //render
  return (
    <div>
      <Input 
        {...attributes} 
        multiple
        type="file" 
        accept="image/*"
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
            <img src={url} alt="preview" style={{ height: '20px', marginRight: '8px' }} />
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

export default Filelist;