import type { ChangeEvent } from 'react';
import type { FieldTextareaConfig } from '../types';

export default function useFieldTextarea({ onChange, onUpdate }: FieldTextareaConfig) {
  return {
    handlers: {
      change: (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange && onChange(e);
        onUpdate && onUpdate(e.target.value);
      }
    }
  };
}