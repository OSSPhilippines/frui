//--------------------------------------------------------------------//
// Imports

//types
import type { ExtendsType } from '../types.js';
import type { FieldsProps, FieldsetProps } from '../form/Fieldset.js';
//components
import Button from '../form/Button.js';
import make from '../form/Fieldset.js';
import Input from './Input.js';
import Number from './Number.js';
import Date from './DatePicker.js';
import Datetime from './DatetimePicker.js';
import Time from './TimePicker.js';

//--------------------------------------------------------------------//
// Types

export type MetadataType = [ string, string|number|Date ];

export type MetadataConfig = {
  type?: string,
  values?: (MetadataType|undefined)[],
  index: number,
  set: (values: (MetadataType|undefined)[]) => void
};

export type MetadataProps = ExtendsType<FieldsetProps<MetadataType>, {
  type?: string,
  min?: number|string,
  max?: number|string,
  step?: number|string,
  placeholder?: string|string[]
}>;

//--------------------------------------------------------------------//
// Hooks

/**
 * Metadata Hook Aggregate
 */
export function useMetadata(config: MetadataConfig) {
  const { type, values, index, set } = config;
  const isNumber = type === 'number';
  const isDate = ['date', 'time', 'datetime'].includes(type || '');
  const isText = !isDate && !isNumber;
  //handlers
  const handlers = {
    update: (key: 'name'|'value', input: any) => {
      const newValues = [ ...(values || []) ];
      const entry: [string, string|number|Date] = [ '', '' ];
      const current = newValues[index];
      entry[0] = current ? current[0] : '';
      entry[1] = current ? current[1] : '';
      if (key === 'name') {
        entry[0] = input;
      } else {
        entry[1] = input;
      }

      newValues[index] = entry
      set(newValues);
    },
    remove: () => {
      const newValues = [ ...(values || []) ];
      newValues[index] = undefined;
      set(newValues);
    }
  };
  
  return { handlers, input: { isDate, isText, isNumber } };
}

//--------------------------------------------------------------------//
// Components

/**
 * Key/Value Component 
 */
export function MetadataFields(props: FieldsProps<MetadataType>) {
  const {
    name,
    config = {},
    values, 
    index, 
    error,
    set
  } = props;
  //props
  const { type, min, max, step, placeholder } = config;
  //hooks
  const { handlers, input } = useMetadata({ 
    type,
    values, 
    index, 
    set 
  });
  //variables
  const value = values ? values[index]: undefined;
  
  //render
  return (
    <div className="frui-field-metadata-row">
      <Input 
        className="frui-field-metadata-name"
        placeholder={Array.isArray(placeholder) ? placeholder[0]: undefined}
        defaultValue={Array.isArray(value) ? value[0]: undefined}
        onUpdate={name => handlers.update('name', name)}
        error={error}
        required 
      />
      {input.isText && (
        <Input 
          type={type}
          className="frui-field-metadata-value"
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1] as string|number: undefined}
          onUpdate={value => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isNumber && (
        <Number
          min={min}
          max={max}
          step={step}
          className="frui-field-metadata-value"
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1] as string|number: undefined}
          onUpdate={(value: string) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isDate && type === 'date' && (
        <Date 
          type="date"
          className="frui-field-metadata-value"
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1]: undefined}
          onUpdate={value => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isDate && type === 'time' && (
        <Time 
          type="time"
          className="frui-field-metadata-value"
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1]: undefined}
          onUpdate={(value: string) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isDate && (type === 'datetime' || type === 'datetime-local') && (
        <Datetime 
          type="datetime-local"
          className="frui-field-metadata-value"
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1]: undefined}
          onUpdate={(value) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      <Button 
        outline
        error
        onClick={handlers.remove}
        className="frui-field-metadata-remove"
      >
        &times;
      </Button>
      {value && value[0].length > 0 && (<input 
        type="hidden" 
        name={`${name}[${value[0]}]`} 
        value={value[1] instanceof Date 
          ? value[1].toISOString()
          : String(value[1])
        } 
      />)}
    </div>
  );
};

const Fieldset = make<MetadataType>(MetadataFields);

/**
 * Metadata set Component (Main)
 */
export function Metadata(props: MetadataProps) {
  const { type, min, max, step, placeholder, ...attributes } = props;
  const placeholders = Array.isArray(placeholder) 
    ? placeholder
    : [placeholder, placeholder];
  const config = { type, min, max, step, placeholder: placeholders };
  return (
    <Fieldset {...attributes} config={config} emptyValue={['', '']} />
  );
};

//defaults to metadata
export default Metadata;