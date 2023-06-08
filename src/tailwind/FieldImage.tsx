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
 * Generic Image Field Component (Main)
 */
const FieldImage: React.FC<FieldFileProps> = (props) => {
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
        'flex',
        'flex-grow',
        'flex-nowrap',
        'items-center',
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
          accept="image/*"
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
            <img src={url} alt="preview" style={{ height: '20px', marginRight: '8px' }} />
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

export default FieldImage;