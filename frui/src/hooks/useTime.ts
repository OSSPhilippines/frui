import type { TimeConfig } from '../types/fields';

export default function useTime({ defaultValue }: TimeConfig) {
  let value: string|undefined = undefined;
  if (defaultValue) {
    try {
      const [ date, min ] = new Date(defaultValue).toISOString().split(':')
      value = [ date.split('T')[1], min ].join(':');
    } catch(e) {}
  }

  return value;
};