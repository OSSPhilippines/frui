import type { ChangeEvent } from 'react';
import type { TextareaConfig } from '../types/fields';

export default function useTextarea({ onChange, onUpdate }: TextareaConfig) {
  return {
    handlers: {
      change: (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange && onChange(e);
        onUpdate && onUpdate(e.target.value);
      }
    }
  };
}