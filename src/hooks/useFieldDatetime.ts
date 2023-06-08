import type { FieldDatetimeConfig } from '../types';

import useDate from '../hooks/useFieldDate';

export default function useFieldDatetime({ defaultValue, onUpdate }: FieldDatetimeConfig) {
  const update = useDate({ onUpdate });
  let value: string|undefined = undefined;
  if (defaultValue) {
    try {
      value = new Date(defaultValue).toISOString().replace('Z', '');
    } catch(e) {}
  }
  return { value, update };
};