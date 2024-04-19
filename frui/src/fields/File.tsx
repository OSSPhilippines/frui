//types
import type { ChangeEvent, CSSProperties } from 'react';
import type { InputProps, InputConfig } from './Input';
//hooks
import { useState, useEffect } from 'react';
import { useInput } from './Input';
//components
import Input from './Input';

/**
 * File Config
 */
export type FileConfig = InputConfig & {
  defaultValue?: string,
  onUpload?: (file: File, update: (url: string) => void) => void
};

/**
 * File Props
 */
export type FileProps = InputProps & {
  defaultValue?: string,
  uploading?: string,
  style?: CSSProperties,
  className?: string,
  onUpdate?: (value: string) => void,
  onUpload?: (file: File, update: (url: string) => void) => void
};

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

/**
 * Generic File  Component (Main)
 */
export default function File(props: FileProps) {
  //separate component related props from field attributes
  const { 
    uploading: locale = 'Uploading...',
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
  const { uploading, url, handlers } = useFile({ 
    //files are not controllable because it relies on the file object
    //not the value attribute. Therefore, defaultValue is used instead
    //and value and defaultValue are used interchangeably.
    defaultValue: defaultValue || value as string|undefined,
    onChange, 
    onUpdate, 
    onUpload 
  });
  const classNames = [ 'frui-field-file' ];
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
          className="frui-field-file-control"
          onChange={handlers.change} 
        />
      )}
      {!url && uploading && (
        <div className="frui-field-file-file">
          <span className="frui-field-file-link">
            {locale}
          </span>
        </div>
      )}
      {url && (
        <div className="frui-field-file-file">
          <a 
            className="frui-field-file-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="frui-field-file-reset"
            onClick={() => handlers.reset()}
          >
            &times;
          </div>
        </div>
      )}
    </div>
  );
}