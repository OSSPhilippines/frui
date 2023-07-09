//types
import type { FileProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useFile from 'frui-core/dist/hooks/useFile';
//helpers
import { makeGroupClasses, makeGroupStyles, makeStyles } from 'frui-core/dist/utils';

/**
 * Generic File  Component (Main)
 */
const File: React.FC<FileProps> = (props) => {
  //separate component related props from field attributes
  const { 
    locale = { uploading: 'Uploading...' },
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
  const { uploading, url, handlers } = useFile({ 
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
      reset: { 
        color: errorColor,
        cursor: 'pointer',
        fontSize: '20px', 
        marginTop: '-2px' 
      },
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
        flexGrow: 1, 
        overflow: 'hidden' 
      }
    }),
    classes: makeGroupClasses(classNames, {
      control: className,
      reset: undefined,
      file: undefined,
      link: undefined
    })
  };
  //render
  return (
    <div>
      {!url && !uploading && (
        <Input 
          {...attributes} 
          type="file" 
          className={map.classes.control}
          style={map.styles.control}
          onChange={handlers.change} 
        />
      )}
      {!url && uploading && (
        <div className={map.classes.file} style={map.styles.file}>
          <span className={map.classes.link} style={map.styles.link}>
            {locale.uploading}
          </span>
        </div>
      )}
      {url && (
        <div className={map.classes.file} style={map.styles.file}>
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
            className={map.classes.reset} 
            style={map.styles.reset}
            onClick={() => handlers.reset()}
          >
            &times;
          </div>
        </div>
      )}
    </div>
  );
}

export default File;