//types
import type { TextlistType, TextlistConfig } from '../types/fields';
import type { FieldsProps, FieldsetProps } from '../types/components';
//components
import Input from './Input';
import Button from '../Button';
import make from '../Fieldset';

/**
 * Textlist Hook Aggregate
 */
export function useTextlists(config: TextlistConfig) {
  const { values, index, set } = config;
  //handlers
  const handlers = {
    update: (value: string) => {
      const newValues = [ ...(values || []) ]
      newValues[index] = value;
      set(newValues);
    },
    remove: () => {
      const newValues = [ ...(values || []) ];
      newValues[index] = undefined;
      set(newValues);
    }
  };
  
  return { handlers };
}

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