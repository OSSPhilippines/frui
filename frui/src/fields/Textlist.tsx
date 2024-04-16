//types
import type { TextlistType } from '../types/fields';
import type { FieldsProps, FieldsetProps } from '../types/components';
//components
import Input from './Input';
import Button from '../Button';
import make from '../Fieldset';
//hooks
import useTextlists from '../hooks/useTextlist';

/**
 * Text Item Component 
 */
export function Fields(props: FieldsProps<TextlistType>) {
  const { 
    data,
    values, 
    index, 
    error,
    set
  } = props;
  //variables
  const placeholder = data?.placeholder as string | undefined;
  //handlers
  const { handlers } = useTextlists({ values, index, set });

  return (
    <div className="field-textlist-row">
      <Input
        className="field-textlist-input"
        placeholder={placeholder}
        defaultValue={values ? values[index]: undefined}
        onUpdate={handlers.update}
        error={error}
        required 
      />
      <Button 
        outline
        error
        onClick={handlers.remove}
        className="field-textlist-remove"
      >
        &times;
      </Button>
    </div>
  );
};

const Fieldset = make<TextlistType>(Fields);

/**
 * Textlist set Component (Main)
 */
export default function Textlist(props: FieldsetProps<TextlistType>) {
  return (<Fieldset {...props} emptyValue={''} />);
};