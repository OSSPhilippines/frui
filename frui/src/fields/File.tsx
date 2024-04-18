//types
import type { ChangeEvent } from 'react';
import type { FileProps, FileConfig } from '../types/fields';
//hooks
import { useState, useEffect } from 'react';
import { useInput } from './Input';
//components
import Input from './Input';

/**
 * File Hook Aggregate
 */
export function useFile(config: FileConfig) {
  const {
    defaultValue,
    onChange, 
    onUpdate,
    onUpload
  } = config;
  const [ uploading, setUploading ] = useState(false);
  const [ url, setURL ] = useState<string|undefined>(defaultValue);
  useEffect(() => {
    onUpdate && onUpdate(url);
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

/**
 * Generic File  Component (Main)
 */
export default function File(props: FileProps) {
  //separate component related props from field attributes
  const { 
    locale = { uploading: 'Uploading...' },
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
  const { uploading, url, handlers } = useFile({ 
    defaultValue,
    onChange, 
    onUpdate, 
    onUpload 
  });
  const classNames = [ 'field-file' ];
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
          className="field-file-control"
          onChange={handlers.change} 
        />
      )}
      {!url && uploading && (
        <div className="field-file-file">
          <span className="field-file-link">
            {locale.uploading}
          </span>
        </div>
      )}
      {url && (
        <div className="field-file-file">
          <a 
            className="field-file-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="field-file-reset"
            onClick={() => handlers.reset()}
          >
            &times;
          </div>
        </div>
      )}
    </div>
  );
}