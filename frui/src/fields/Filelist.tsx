//types
import type { ChangeEvent, CSSProperties } from 'react';
import type { InputProps, InputConfig } from './Input';
//hooks
import { useState, useEffect } from 'react';
import { useInput } from './Input';
//components
import Input from './Input';

/**
 * Filelist Config
 */
export type FilelistConfig = InputConfig & {
  defaultValue?: string[],
  onUpload?: (files: File[], update: (urls: string[]) => void) => void
};

/**
 * Filelist Props
 */
export type FilelistProps = InputProps & {
  uploading?: string,
  defaultValue?: string[],
  value?: string[],
  style?: CSSProperties,
  className?: string,
  onUpdate?: (value: string[]) => void,
  onUpload?: (files: File[], update: (urls: string[]) => void) => void
};

/**
 * Filelist Hook Aggregate
 */
export function useFilelist(config: FilelistConfig) {
  const {
    defaultValue,
    onChange, 
    onUpdate,
    onUpload
  } = config;
  const [ queued, setQueue ] = useState(0);
  const [ uploaded, setUploaded ] = useState<string[]>(defaultValue || []);
  useEffect(() => {
    onUpdate && onUpdate(uploaded);
  }, [ uploaded ]);
  const handlers = {
    change: (e: ChangeEvent<HTMLInputElement>) => {
      if (onUpload && e.target.files) {
        const pending = Array.from(e.target.files);
        const queue = queued + pending.length;
        setQueue(queue);
        const values: string[] = uploaded;
        onUpload(pending, urls => {
          const updated = queue - urls.length;
          values.push(...urls);
          setQueue(updated > 0 ? updated : 0);
          setUploaded([ ...values ]);
        });
      }
      
      onChange && onChange(e);
    },
    remove: (index: number) => {
      setQueue(queued ? queued - 1: 0);
      const keepUploaded = [ ...uploaded ];
      keepUploaded.splice(index, 1);
      setUploaded(keepUploaded);
    },
    reset: () => {
      setQueue(0);
      setUploaded([]);
    }
  }
  useInput({ onChange: handlers.change, onUpdate })

  return { queued, uploaded, handlers };  
};

/**
 * Generic File  Component (Main)
 */
export default function Filelist(props: FilelistProps) {
  //separate component related props from field attributes
  const { 
    uploading = 'Uploading...',
    defaultValue,
    value,
    error,
    style,
    className,
    onChange,
    onUpdate,
    onUpload,
    ...attributes 
  } = props;
  //hooks
  const { queued, uploaded, handlers } = useFilelist({ 
    defaultValue: value || defaultValue,
    onChange, 
    onUpdate, 
    onUpload 
  });
  
  const classNames = [ 'frui-field-filelist' ];
  if (className) {
    classNames.push(className);
  }
  //render
  return (
    <div className={classNames.join(' ')} style={style}>
      <Input 
        {...attributes} 
        multiple
        type="file" 
        error={error}
        className="frui-field-filelist-control"
        onChange={handlers.change} 
      />
      {uploaded.length > 0 && uploaded.map((url, i) => (
        <div key={i} className="frui-field-filelist-file">
          <a 
            className="frui-field-filelist-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="frui-field-filelist-remove"
            onClick={() => handlers.remove(i)}
          >
            &times;
          </div>
        </div>
      ))}
      {queued > 0 && (
        <div className="frui-field-filelist-file">
          <span className="frui-field-filelist-link">
            {uploading}
          </span>
        </div>
      )}
    </div>
  );
}