import type { ChangeEvent } from 'react';
import type { InputConfig } from '../types/fields';

export default function useInput({ onChange, onUpdate }: InputConfig) {
  return {
    handlers: {
      change: (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onUpdate && onUpdate(e.target.value);
      }
    }
  };
}