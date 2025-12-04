//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent, CSSProperties } from 'react';
import { useState, useEffect } from 'react';
//frui
import type { ExtendsType } from '../types.js';
import type { InputProps, InputConfig } from './Input.js';
import Input, { useInput } from './Input.js';

//--------------------------------------------------------------------//
// Types

export type FileListConfig = ExtendsType<InputConfig, {
  defaultValue?: string[],
  onUpload?: (files: File[], update: (urls: string[]) => void) => void
}>;

export type FileListProps = ExtendsType<InputProps, {
  uploading?: string,
  defaultValue?: string[],
  value?: string[],
  style?: CSSProperties,
  className?: string,
  onUpdate?: (value: string[]) => void,
  onUpload?: (files: File[], update: (urls: string[]) => void) => void
}>;

//--------------------------------------------------------------------//
// Hooks

/**
 * FileList Hook Aggregate
 */
export function useFileList(config: FileListConfig) {
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

//--------------------------------------------------------------------//
// Components

/**
 * Generic FileList Component (Main)
 */
export function FileList(props: FileListProps) {
  //separate component related props from field attributes
  const { 
    uploading = 'Uploading...',
    name,
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
  const { queued, uploaded, handlers } = useFileList({ 
    defaultValue: value || defaultValue,
    onChange, 
    onUpdate, 
    onUpload 
  });
  
  const classNames = [ 'frui-form-file-list' ];
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
        className="frui-form-file-list-control"
        onChange={handlers.change} 
      />
      {uploaded.length > 0 && uploaded.map((url, i) => (
        <div key={i} className="frui-form-file-list-file">
          <a 
            className="frui-form-file-list-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="frui-form-file-list-remove"
            onClick={() => handlers.remove(i)}
          >
            &times;
          </div>
          <input type="hidden" name={name} value={url} />
        </div>
      ))}
      {queued > 0 && (
        <div className="frui-form-file-list-file">
          <span className="frui-form-file-list-link">
            {uploading}
          </span>
        </div>
      )}
    </div>
  );
};

//defaults to filelist
export default Object.assign(FileList, { useFileList, use: useFileList });