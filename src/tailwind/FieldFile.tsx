//types
import type { FieldFileProps } from '../types';
//react
import React from 'react';
//components
import FieldInput from './FieldInput';
//hooks
import useFile from '../hooks/useFieldFile';
//helpers
import { 
  makeClasses, 
  makeStyles,
  makeGroupClasses, 
  makeGroupStyles
} from '../utils';

/**
 * Generic File Field Component (Main)
 */
const FieldFile: React.FC<FieldFileProps> = (props) => {
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
        borderColor: error ? errorColor: 'black'
      }),
      reset: { 
        color: errorColor
      },
      file: undefined,
      link: undefined
    }),
    classes: makeGroupClasses(classNames, {
      control: makeClasses(className, [
        'border',
        'border-black',
        'py-1.5',
        'px-2',
        'w-full',
        'text-black'
      ].join(' ')),
      reset: [
        'cursor-pointer',
        'text-xl',
        'mt-[-2px]'
      ].join(' '),
      file: [
        'flex',
        'items-center',
        'border',
        'border-gray-400',
        'border-t-0',
        'py-1.5',
        'px-2',
        'w-full',
        'text-black'
      ].join(' '),
      link: [
        'flex-grow',
        'overflow-hidden'
      ].join(' ')
    })
  };
  //render
  return (
    <div>
      {!url && !uploading && (
        <FieldInput 
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

export default FieldFile;