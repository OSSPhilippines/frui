//types
import type { FieldFilelistProps } from '../types';
//react
import React from 'react';
//components
import FieldInput from './FieldInput';
//hooks
import useFilelist from '../hooks/useFieldFilelist';
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
        borderColor: error ? errorColor: 'black'
      }),
      file: undefined,
      link: undefined,
      remove: undefined
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
      file: [
        'items-center',
        'border',
        'border-gray-400',
        'border-t-0',
        'flex',
        'py-1.5',
        'px-2',
        'w-full',
        'text-black'
      ].join(' '),
      link: [
        'flex-grow',
        'overflow-hidden'
      ].join(' '),
      remove: [
        'text-gray-400',
        'cursor-pointer',
        'text-xl',
        'mt-[-2px]',
        'pl-2'
      ].join(' ')
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