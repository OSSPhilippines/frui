//types
import type { 
  FieldsProps, 
  FieldsetProps, 
  FieldMetadataType 
} from '../types';
//react
import React from 'react';
//components
import Button from './Button';
import make from './Fieldset';
import FieldInput from './FieldInput';
import FieldNumber from './FieldNumber';
import FieldDate from './FieldDate';
import FieldDatetime from './FieldDatetime';
import FieldTime from './FieldTime';
//hooks
import useMetadataFields from '../hooks/useFieldMetadata';
//helpers
import { 
  makeGroupStyles, 
  makeGroupClasses 
} from '../utils';

/**
 * Key/Value Component 
 */
const Fields: React.FC<FieldsProps<FieldMetadataType>> = (props) => {
  const { 
    type,
    min, 
    max,
    step,
    values, 
    index, 
    error,
    styles,
    classNames,
    set
  } = props;
  const { handlers, input } = useMetadataFields({ 
    type, 
    values, 
    index, 
    set 
  });
  
  //variables
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
      <FieldInput 
        style={map.styles.name}
        className={map.classNames.name}
        defaultValue={values ? values[index]?.name: undefined}
        onUpdate={(name) => handlers.update('name', name)}
        error={error}
        required 
      />
      {input.isText && (
        <FieldInput 
          type={type}
          style={map.styles.value}
          className={map.classNames.value}
          defaultValue={values ? values[index]?.value as string|number: undefined}
          onUpdate={(value) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isNumber && (
        <FieldNumber
          min={min}
          max={max}
          step={step}
          style={map.styles.value}
          className={map.classNames.value}
          defaultValue={values ? values[index]?.value as string|number: undefined}
          onUpdate={(value: string) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isDate && type === 'date' && (
        <FieldDate 
          type="date"
          style={map.styles.value}
          className={map.classNames.value}
          defaultValue={values ? values[index]?.value: undefined}
          onUpdate={(value) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isDate && type === 'time' && (
        <FieldTime 
          type="time"
          style={map.styles.value}
          className={map.classNames.value}
          defaultValue={values ? values[index]?.value: undefined}
          onUpdate={(value: string) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isDate && (type === 'datetime' || type === 'datetime-local') && (
        <FieldDatetime 
          type="datetime-local"
          style={map.styles.value}
          className={map.classNames.value}
          defaultValue={values ? values[index]?.value: undefined}
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

/**
 * Metadata Fieldset Component (Main)
 */
const FieldMetadata: React.FC<FieldsetProps<FieldMetadataType>> = (props) => {
  const { label, value, type, onChange, ...attributes } = props;
  const Fieldset = make<FieldMetadataType>(Fields);

  return (
    <Fieldset 
      {...attributes}
      value={value} 
      label={label} 
      type={type}
      emptyValue={{ name: '', value: '' }}
      onChange={onChange} 
    />
  );
}

export default FieldMetadata;