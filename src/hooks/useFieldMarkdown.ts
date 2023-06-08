//types
import type { FieldMarkdownConfig } from '../types';
//hooks
import { useState } from 'react';

export default function useFieldMarkdown({ onUpdate, defaultValue }: FieldMarkdownConfig) {
  const [ mode, setMode ] = useState<'preview'|'edit'>('edit');
  const [ value, setValue ] = useState(defaultValue || '');
  
  return {
    mode,
    value,
    handlers: {
      mode: setMode,
      update: (value: string) => {
        setValue(value)
        onUpdate && onUpdate(value);
      }
    }
  };
}