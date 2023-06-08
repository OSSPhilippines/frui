import type { FieldDateConfig } from '../types';

export default function useFieldDate({ onUpdate }: FieldDateConfig) {
  return (value: string) => {
    if (onUpdate && value) {
      try {
        const utc = new Date(value).toUTCString();
        onUpdate(new Date(utc).toISOString());
      } catch(e) {} 
    }
  };
};
