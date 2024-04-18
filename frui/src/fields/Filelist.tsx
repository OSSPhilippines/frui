//types
import type { ChangeEvent } from 'react';
import type { FilelistProps, FilelistConfig } from '../types/fields';
//hooks
import { useState, useEffect } from 'react';
import { useInput } from './Input';
//components
import Input from './Input';

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
    locale = {
      uploading: 'Uploading...',
      progress: '%s of %s uploaded',
      complete: '%s files uploaded'
    },
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
  const { queued, uploaded, handlers } = useFilelist({ 
    defaultValue,
    onChange, 
    onUpdate, 
    onUpload 
  });
  
  const classNames = [ 'field-filelist' ];
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
        className="field-filelist-control"
        onChange={handlers.change} 
      />
      {uploaded.length > 0 && uploaded.map((url, i) => (
        <div key={i} className="field-filelist-file">
          <a 
            className="field-filelist-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="field-filelist-remove"
            onClick={() => handlers.remove(i)}
          >
            &times;
          </div>
        </div>
      ))}
      {queued > 0 && (
        <div className="field-filelist-file">
          <span className="field-filelist-link">
            {locale.uploading}
          </span>
        </div>
      )}
    </div>
  );
}