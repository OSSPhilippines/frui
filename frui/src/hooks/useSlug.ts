import type { ChangeEvent } from 'react';
import type { SlugConfig } from '../types/fields';

import { slugify, camelfy } from '../utils';

export default function useSlug(config: SlugConfig) {
  const value = config.value
    ? (config.camel 
      ? camelfy(String(config.value))
      : slugify(String(config.value), !config.dash, !config.line)
    ) : undefined;
  const defaultValue = config.defaultValue
    ? (config.camel 
      ? camelfy(String(config.defaultValue))
      : slugify(String(config.defaultValue), !config.dash, !config.line)
    ) : undefined;
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = config.camel 
      ? camelfy(e.target.value)
      : slugify(e.target.value, !config.dash, !config.line);
    config.onChange && config.onChange(e);
  };
  return { value, defaultValue, change };
};