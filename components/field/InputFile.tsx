//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
//frui
import type { ExtendsType } from '../types.js';
import type { InputProps, InputConfig } from './Input.js';
import Input, { useInput } from './Input.js';

//--------------------------------------------------------------------//
// Types

export type FileConfig = ExtendsType<InputConfig, {
  defaultValue?: string,
  onUpload?: (file: File, update: (url: string) => void) => void
}>;

export type FileProps = ExtendsType<InputProps, FileConfig & {
  onUpdate?: (value: string) => void,
  uploading?: string
}>;

//--------------------------------------------------------------------//
// Hooks

/**
 * File Hook Aggregate
 */
export function useInputFile(config: FileConfig) {
  const {
    defaultValue,
    onChange, 
    onUpdate,
    onUpload
  } = config;
  const [ uploading, setUploading ] = useState(false);
  const [ url, setURL ] = useState<string|undefined>(defaultValue);
  useEffect(() => {
    url && url.length > 0 && onUpdate && onUpdate(url);
  }, [ url ]);
  const handlers = {
    change: (e: ChangeEvent<HTMLInputElement>) => {
      if (onUpload && e.target.files?.length) {
        setUploading(true);
        onUpload(e.target.files[0], url => {
          setURL(url);
          setUploading(false);
        });
      }
      
      onChange && onChange(e);
    },
    reset: () => {
      setUploading(false);
      setURL(undefined);
    }
  }
  useInput({ onChange: handlers.change, onUpdate })

  return { uploading, url, handlers };   
};

//--------------------------------------------------------------------//
// Components

/**
 * Generic File  Component (Main)
 */
export function File(props: FileProps) {
  //separate component related props from field attributes
  const { 
    uploading: locale = 'Uploading...',
    name,
    value,
    defaultValue,
    error,
    style,
    className,
    onChange,
    onUpdate,
    onUpload,
    ...attributes 
  } = props;
  //hooks
  const { uploading, url, handlers } = useInputFile({ 
    //files are not controllable because it relies on the file object
    //not the value attribute. Therefore, defaultValue is used instead
    //and value and defaultValue are used interchangeably.
    defaultValue: defaultValue || value as string|undefined,
    onChange, 
    onUpdate, 
    onUpload 
  });
  const classNames = [ 'frui-field-input-file' ];
  if (className) {
    classNames.push(className);
  }
  //render
  return (
    <div className={classNames.join(' ')} style={style}>
      {!url && !uploading && (
        <Input 
          {...attributes} 
          type="file" 
          error={error}
          className="frui-field-input-file-control"
          onChange={handlers.change} 
        />
      )}
      {!url && uploading && (
        <div className="frui-field-input-file-file">
          <span className="frui-field-input-file-link">
            {locale}
          </span>
        </div>
      )}
      {url && (
        <div className="frui-field-input-file-file">
          <a 
            className="frui-field-input-file-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="frui-field-input-file-reset"
            onClick={() => handlers.reset()}
          >
            &times;
          </div>
          <input type="hidden" name={name} value={url} />
        </div>
      )}
    </div>
  );
};

//defaults to file
export default Object.assign(File, { useInputFile });