import type { ChangeEvent } from 'react';
import type { FieldSlugConfig } from '../types';

//function to convert a string to a slug
const slugify = (str: string, allowDash = true) => {
  return str.trim()
    //replace spaces with dashes (or underscores)
    .replace(/\s+/g, allowDash ? '-': '_')
    //replace multiple dashes with a single dash
    .replace(/-{2,}/g, '-')
    //replace multiple underscores with a single underscore
    .replace(/_{2,}/g, '_')
    //replace anything that is not a letter, number, dash, or underscore
    .replace(/[^a-zA-Z0-9-\s_]/g, '')
    .toLowerCase();
};

export default function useFieldSlug(config: FieldSlugConfig) {
  const value = config.value
    ? slugify(String(config.value))
    : undefined;
  const defaultValue = config.defaultValue
    ? slugify(String(config.defaultValue))
    : undefined;
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = slugify(e.target.value, config.dash);
    config.onChange && config.onChange(e);
  };
  return { value, defaultValue, change };
};