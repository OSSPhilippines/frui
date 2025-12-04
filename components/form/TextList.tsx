//--------------------------------------------------------------------//
// Imports

//types
import type { FieldsProps, FieldsetProps } from './Fieldset.js';
//components
import Input from './Input.js';
import Button from '../Button.js';
import make from './Fieldset.js';

//--------------------------------------------------------------------//
// Types

export type TextListType = string;

export type TextListConfig = {
  type?: string,
  values?: (TextListType|undefined)[],
  index: number,
  set: (values: (TextListType|undefined)[]) => void
};

export type TextListProps = FieldsetProps<TextListType> & {
  placeholder?: string
};

//--------------------------------------------------------------------//
// Hooks

/**
 * TextList Hook Aggregate
 */
export function useTextLists(config: TextListConfig) {
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
};

//--------------------------------------------------------------------//
// Components

/**
 * Text Item Component (Main)
 */
export function TextListFields(props: FieldsProps<TextListType>) {
  const { 
    name,
    config,
    values, 
    index, 
    error,
    set
  } = props;
  //variables
  const placeholder = config?.placeholder as string | undefined;
  //handlers
  const { handlers } = useTextLists({ values, index, set });
  //variables
  const value = values ? values[index]: undefined;

  return (
    <div className="frui-form-text-list-row">
      <Input
        className="frui-form-text-list-input"
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
        className="frui-form-text-list-remove"
      >
        &times;
      </Button>
      {typeof value === 'string' && (<input 
        type="hidden" 
        name={name} 
        value={String(value)
        } 
      />)}
    </div>
  );
};

const Fieldset = make<TextListType>(TextListFields);

/**
 * TextList set Component (Main)
 */
export function TextList(props: TextListProps) {
  const { placeholder, ...attributes } = props;
  const config = { placeholder };
  return (
    <Fieldset {...attributes} config={config} emptyValue="" />
  );
};

//defaults to textList
export default Object.assign(TextList, { 
  TextListFields, 
  useTextLists, 
  use: useTextLists 
});