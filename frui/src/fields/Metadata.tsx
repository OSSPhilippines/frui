//types
import type { ExtendsType } from '../types';
import type { FieldsProps, FieldsetProps } from '../Fieldset';
//components
import Button from '../Button';
import make from '../Fieldset';
import Input from './Input';
import Number from './Number';
import Date from './Date';
import Datetime from './Datetime';
import Time from './Time';

/**
 * Metadata Type
 */
export type MetadataType = [ string, string|number|Date ];

/**
 * Metadata Config
 */
export type MetadataConfig = {
  type?: string,
  values?: (MetadataType|undefined)[],
  index: number,
  set: (values: (MetadataType|undefined)[]) => void
};

/**
 * Metadata Props
 */
export type MetadataProps = ExtendsType<FieldsetProps<MetadataType>, {
  type?: string,
  min?: number|string,
  max?: number|string,
  step?: number|string,
  placeholder?: string|string[]
}>;

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

/**
 * Key/Value Component 
 */
export function MetadataFields(props: FieldsProps<MetadataType>) {
  const {
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
    </div>
  );
};

const Fieldset = make<MetadataType>(MetadataFields);

/**
 * Metadata set Component (Main)
 */
export default function Metadata(props: MetadataProps) {
  const { type, min, max, step, placeholder, ...attributes } = props;
  const placeholders = Array.isArray(placeholder) 
    ? placeholder
    : [placeholder, placeholder];
  const config = { type, min, max, step, placeholder: placeholders };
  return (
    <Fieldset {...attributes} config={config} emptyValue={['', '']} />
  );
}