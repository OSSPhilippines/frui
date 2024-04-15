//types
import type { MarkdownConfig } from '../types/fields';
//hooks
import { useState } from 'react';

export default function useMarkdown({ onUpdate, defaultValue }: MarkdownConfig) {
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