import type { FieldSlugProps } from '../types';
import FieldInput from './FieldInput';

import useFieldSlug from '../hooks/useFieldSlug';

const FieldSlug: React.FC<FieldSlugProps> = (props) => {
  const { 
    dash,
    line,
    camel,
    value: rawValue, 
    defaultValue: rawDefaultValue, 
    onChange,
    ...attributes 
  } = props;

  const { value, defaultValue, change } = useFieldSlug({
    dash,
    line,
    camel,
    value: rawValue, 
    defaultValue: rawDefaultValue,
    onChange
  });

  return (
    <FieldInput 
      {...attributes} 
      value={value} 
      defaultValue={defaultValue} 
      onChange={change}
    />
  );
};

export default FieldSlug;