//types
import type { FilelistProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useFilelist from 'frui-core/dist/hooks/useFilelist';
//helpers
import { 
  makeClasses, 
  makeStyles,
  makeGroupClasses, 
  makeGroupStyles
} from 'frui-core/dist/utils';

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
        'box-border',
        'flex',
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