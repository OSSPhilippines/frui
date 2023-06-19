import type { ChangeEvent } from 'react';
import type { FieldSlugConfig } from '../types';

import { slugify } from '../utils';

export default function useFieldSlug(config: FieldSlugConfig) {
  const value = config.value
    ? slugify(String(config.value), !config.dash, !config.line)
    : undefined;
  const defaultValue = config.defaultValue
    ? slugify(String(config.defaultValue), !config.dash, !config.line)
    : undefined;
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = slugify(e.target.value, !config.dash, !config.line);
    config.onChange && config.onChange(e);
  };
  return { value, defaultValue, change };
};