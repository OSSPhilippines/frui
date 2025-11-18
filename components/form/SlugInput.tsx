//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent, FocusEvent } from 'react';
import { useEffect, useState } from 'react';
//frui
import type { ExtendsType } from '../types.js'
import type { InputProps, InputConfig } from './Input.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type SlugConfig = ExtendsType<InputConfig, {
  //whether to convert to camel case
  camel?: boolean,
  //whether to use dashes instead of underscores (default)
  dash?: boolean,
  //uncontrolled default value
  defaultValue?: string|number|readonly string[]|undefined,
  //whether to use underscores instead of dashes
  line?: boolean,
  //on blur event handler
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void,
  //controlled value
  value: string|number|readonly string[]|undefined
}>;

export type SlugProps = ExtendsType<InputProps, {
  dash?: boolean,
  line?: boolean,
  camel?: boolean
}>;

//--------------------------------------------------------------------//
// Helpers

/**
 * Converts a string to a slug
 */
export function slugify(
    value: string, 
    noDash = false, 
    noLine = false,
    allowDashWrapping = false
  ) {
  value = value.trim()
    //replace special characters with dashes (or underscores)
    .replace(/[^a-zA-Z0-9\-_]/g, noLine ? '-': '_')
    //replace dashes with underscores (or dashes if allowed)
    .replace(/-/g, noLine ? '-': '_')
    //replace dashes with underscores (or dashes if allowed)
    .replace(/_/g, noDash ? '_': '-')
    //replace multiple dashes with a single dash
    .replace(/-{2,}/g, '-')
    //replace multiple underscores with a single underscore
    .replace(/_{2,}/g, '_');

  if (!allowDashWrapping) {
    //trim dashes and underscores from the beginning and end of the string
    value = value
      .replace(/^-+|-+$/g, '')
      .replace(/^_+|_+$/g, '')
  }
  //convert to lowercase
  return value.toLowerCase();
};

/**
 * Converts a string to camel case
 */
export function camelfy(value: string) {
  return value.trim()
    //replace special characters with underscores
    .replace(/[^a-zA-Z0-9]/g, '_')
    //replace multiple underscores with a single underscore
    .replace(/_{2,}/g, '_')
    //trim underscores from the beginning and end of the string
    .replace(/^_+|_+$/g, '')
    //replace underscores with capital
    .replace(/([-_][a-z0-9])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Slug Hook Aggregate
 */
export function useSlug(config: SlugConfig) {
  //config
  const {
    //whether to convert to camel case
    camel, //?: boolean
    //whether to use dashes instead of underscores (default)
    dash, //?: boolean
    //uncontrolled default value
    defaultValue, //?: string|number|readonly string[]|undefined
    //whether to use underscores instead of dashes
    line, //?: boolean
    //on blur event handler
    onBlur, //?: (e: ChangeEvent<HTMLInputElement>) => void
    //on change event handler
    onChange, //?: (e: ChangeEvent<HTMLInputElement>) => void
    //controlled value
    value //: string|number|readonly string[]|undefined
  } = config;
  //hooks
  const [ slug, setSlug ] = useState<string>(camel 
    ? camelfy(String(defaultValue))
    : slugify(String(defaultValue), !dash, !line)
  );
  //handlers
  const handlers = {
    blur(e: FocusEvent<HTMLInputElement>) {
      setSlug(camel 
        ? camelfy(String(e.target.value))
        : slugify(String(e.target.value), !dash, !line)
      );
      onBlur && onBlur(e);
    },
    change(e: ChangeEvent<HTMLInputElement>) {
      setSlug(camel 
        ? camelfy(String(e.target.value))
        : slugify(String(e.target.value), !dash, !line, true)
      );
      onChange && onChange(e);
    } 
  };
  //effects
  useEffect(() => {
    if (value !== undefined) {
      const slug = camel 
        ? camelfy(String(value))
        : slugify(String(value), !dash, !line);
      setSlug(slug);
    }
  }, [ value, camel, dash, line ]);
  return { slug, handlers };
};

//--------------------------------------------------------------------//
// Components

/**
 * Styled Slug Component (Main)
 */
export function Slug(props: SlugProps) {
  const { 
    //whether to convert to camel case
    camel, //?: boolean
    //whether to use dashes instead of underscores (default)
    dash, //?: boolean
    //uncontrolled default value
    defaultValue, //?: string|number|readonly string[]|undefined
    //whether to use underscores instead of dashes
    line, //?: boolean
    //on blur event handler
    onBlur, //?: (e: ChangeEvent<HTMLInputElement>) => void
    //on change event handler
    onChange, //?: (e: ChangeEvent<HTMLInputElement>) => void
    //controlled value
    value, //: string|number|readonly string[]|undefined
    ...attributes 
  } = props;

  const { slug, handlers } = useSlug({
    dash,
    line,
    camel,
    value, 
    defaultValue,
    onBlur,
    onChange
  });

  return (
    <Input 
      {...attributes} 
      value={slug} 
      onBlur={handlers.blur}
      onChange={handlers.change}
    />
  );
};

//defaults to slug
export default Slug;