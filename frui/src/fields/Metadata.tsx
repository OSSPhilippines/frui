//types
import type { MetadataType } from '../types/fields';
import type { FieldsProps, FieldsetProps } from '../types/components';
//components
import Button from '../Button';
import make from '../Fieldset';
import Input from './Input';
import Number from './Number';
import Date from './Date';
import Datetime from './Datetime';
import Time from './Time';
//hooks
import useMetadata from '../hooks/useMetadata';

/**
 * Key/Value Component 
 */
export function Fields(props: FieldsProps<MetadataType>) {
  const {
    data = {},
    values, 
    index, 
    error,
    set
  } = props;
  //props
  const { type, min, max, step, placeholder } = data;
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
    <div className="field-metadata-row">
      <Input 
        className="field-metadata-name"
        placeholder={Array.isArray(placeholder) ? placeholder[0]: undefined}
        defaultValue={Array.isArray(value) ? value[0]: undefined}
        onUpdate={name => handlers.update('name', name)}
        error={error}
        required 
      />
      {input.isText && (
        <Input 
          type={type}
          className="field-metadata-value"
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
          className="field-metadata-value"
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
          className="field-metadata-value"
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
          className="field-metadata-value"
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
          className="field-metadata-value"
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
        className="field-metadata-remove"
      >
        &times;
      </Button>
    </div>
  );
};

const Fieldset = make<MetadataType>(Fields);

/**
 * Metadata set Component (Main)
 */
export default function Metadata(props: FieldsetProps<MetadataType>) {
  return (<Fieldset {...props} emptyValue={['', '']} />);
}