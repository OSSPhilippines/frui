//types
import type { ChangeEvent } from 'react';
import type { FileConfig } from '../types/fields';
//hooks
import { useState, useEffect } from 'react';
import useInput from './useInput';

export default function useUploader(config: FileConfig) {
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