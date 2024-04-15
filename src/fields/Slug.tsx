import type { SlugProps } from '../types/fields';
import Input from './Input';

import useSlug from '../hooks/useSlug';

export default function Slug(props: SlugProps) {
  const { 
    dash,
    line,
    camel,
    value: rawValue, 
    defaultValue: rawDefaultValue, 
    onChange,
    ...attributes 
  } = props;

  const { value, defaultValue, change } = useSlug({
    dash,
    line,
    camel,
    value: rawValue, 
    defaultValue: rawDefaultValue,
    onChange
  });

  return (
    <Input 
      {...attributes} 
      value={value} 
      defaultValue={defaultValue} 
      onChange={change}
    />
  );
};