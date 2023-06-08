import type { ChangeEvent } from 'react';
import type { FieldInputConfig } from '../types';

export default function useInput({ onChange, onUpdate }: FieldInputConfig) {
  return {
    handlers: {
      change: (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onUpdate && onUpdate(e.target.value);
      }
    }
  };
}