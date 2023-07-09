import type { SlugProps } from 'frui-core/dist/types/fields';
import Input from './Input';

import useSlug from 'frui-core/dist/hooks/useSlug';

const Slug: React.FC<SlugProps> = (props) => {
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

export default Slug;