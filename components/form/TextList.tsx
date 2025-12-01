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

export type TextlistType = string;

export type TextlistConfig = {
  type?: string,
  values?: (TextlistType|undefined)[],
  index: number,
  set: (values: (TextlistType|undefined)[]) => void
};

export type TextlistProps = FieldsetProps<TextlistType> & {
  placeholder?: string
};

//--------------------------------------------------------------------//
// Hooks

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
};

//--------------------------------------------------------------------//
// Components

/**
 * Text Item Component 
 */
export function TextlistFields(props: FieldsProps<TextlistType>) {
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
  const { handlers } = useTextlists({ values, index, set });
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

const Fieldset = make<TextlistType>(TextlistFields);

/**
 * Textlist set Component (Main)
 */
export function Textlist(props: TextlistProps) {
  const { placeholder, ...attributes } = props;
  const config = { placeholder };
  return (
    <Fieldset {...attributes} config={config} emptyValue="" />
  );
};

//defaults to textlist
export default Object.assign(Textlist, { TextlistFields, useTextlists });