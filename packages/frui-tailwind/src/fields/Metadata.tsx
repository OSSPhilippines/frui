//types
import type { MetadataType } from 'frui-core/dist/types/fields';
import type { FieldsProps, FieldsetProps } from 'frui-core/dist/types/components';
//react
import React from 'react';
//components
import Button from '../Button';
import make from '../Fieldset';
import Input from './Input';
import Number from './Number';
import Date from './Date';
import Datetime from './Datetime';
import Time from './Time';
//hooks
import useMetadata from 'frui-core/dist/hooks/useMetadata';
//helpers
import { 
  makeGroupStyles, 
  makeGroupClasses 
} from 'frui-core/dist/utils';

/**
 * Key/Value Component 
 */
const Fields: React.FC<FieldsProps<MetadataType>> = (props) => {
  const { 
    data = {},
    values, 
    index, 
    error,
    styles,
    classNames,
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
  const map = {
    styles: makeGroupStyles(styles, {
      row: undefined,
      button: undefined,
      name: undefined,
      value: undefined
    }),
    classNames: makeGroupClasses(classNames, {
      container: [
        error ? 'text-[#DC3545]' : undefined
      ].filter(Boolean).join(' '),
      label: [
        'block'
      ].filter(Boolean).join(' '),
      field: undefined,
      error: undefined,
      row: [
        'flex',
        'mb-0.5'
      ].filter(Boolean).join(' '),
      button: [
        'items-center',
        'flex',
        'justify-center',
        'py-1',
        'px-4'
      ].filter(Boolean).join(' '),
      name: [
        'border',
        error ? 'border-[#DC3545]': 'border-black',
        error ? 'text-[#DC3545]': 'text-black',
        'p-2',
        'w-full',
        'basis-1/3',
        'mr-0.5'
      ].filter(Boolean).join(' '),
      value: [
        'border',
        error ? 'border-[#DC3545]': 'border-black',
        error ? 'text-[#DC3545]': 'text-black',
        'p-2',
        'w-full',
        'basis-2/3',
        'mr-0.5'
      ].filter(Boolean).join(' ')
    })
  };
  
  //render
  return (
    <div className={map.classNames.row} style={map.styles.row}>
      <Input 
        style={map.styles.name}
        className={map.classNames.name}
        placeholder={Array.isArray(placeholder) ? placeholder[0]: undefined}
        defaultValue={Array.isArray(value) ? value[0]: undefined}
        onUpdate={name => handlers.update('name', name)}
        error={error}
        required 
      />
      {input.isText && (
        <Input 
          type={type}
          style={map.styles.value}
          className={map.classNames.value}
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1] as string|number: undefined}
          onUpdate={(value) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isNumber && (
        <Number
          min={min}
          max={max}
          step={step}
          style={map.styles.value}
          className={map.classNames.value}
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
          style={map.styles.value}
          className={map.classNames.value}
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1]: undefined}
          onUpdate={(value) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isDate && type === 'time' && (
        <Time 
          type="time"
          style={map.styles.value}
          className={map.classNames.value}
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
          style={map.styles.value}
          className={map.classNames.value}
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1]: undefined}
          onUpdate={(value) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      <Button 
        outline
        danger
        onClick={handlers.remove}
        style={map.styles.button}
        className={map.classNames.button}
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
const Metadata: React.FC<FieldsetProps<MetadataType>> = (props) => {
  return (<Fieldset {...props} emptyValue={['', '']} />);
}

export default Metadata;