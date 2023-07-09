import type { DatetimeConfig } from '../types/fields';

import useDate from './useDate';

export default function useDatetime({ defaultValue, onUpdate }: DatetimeConfig) {
  const update = useDate({ onUpdate });
  let value: string|undefined = undefined;
  if (defaultValue) {
    try {
      value = new Date(defaultValue).toISOString().replace('Z', '');
    } catch(e) {}
  }
  return { value, update };
};