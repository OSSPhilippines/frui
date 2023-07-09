import type { DateConfig } from '../types/fields';

export default function useDate({ onUpdate }: DateConfig) {
  return (value: string) => {
    if (onUpdate && value) {
      try {
        const utc = new Date(value).toUTCString();
        onUpdate(new Date(utc).toISOString());
      } catch(e) {} 
    }
  };
};
