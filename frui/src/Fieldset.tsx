//types
import type { ExtendsType } from './types';
import type { ButtonProps } from './Button';
//hooks
import React, { useState, useEffect } from 'react';
//components
import Button from './Button';

/**
 * Fieldset Config
 */
export type FieldsetConfig<ValueType = any> = {
  value?: ValueType[],
  defaultValue?: ValueType[],
  emptyValue?: ValueType,
  onChange?: (values: ValueType[]) => void,
  onUpdate?: (values: ValueType[]) => void
}
//use this type in your custom fieldset wrapper
//ex. const Custom: React.FC<FieldsetProps<YOUR ROW TYPE>> = (props) => {}
export type FieldsetProps<ValueType = any> = ExtendsType<ButtonProps, {
  add?: string,
  data?: Record<string, any>,
  value?: ValueType[],
  defaultValue?: ValueType[],
  emptyValue?: ValueType,
  error?: boolean,
  errorColor?: string,
  onChange?: (values: ValueType[]) => void,
  onUpdate?: (values: ValueType[]) => void
}>;
//use this type in your custom fields component
//ex. const Fields: React.FC<FieldsProps<YOUR ROW TYPE>> = (props) => {}
export type FieldsProps<ValueType = any> = {
  type?: string,
  data?: Record<string, any>,
  min?: number|string,
  max?: number|string,
  step?: number|string,
  values?: (ValueType|undefined)[],
  index: number,
  error?: boolean,
  errorColor: string,
  set: (values: (ValueType|undefined)[]) => void
};

/**
 * Fieldset Hook Aggregate
 */
export function useFieldset<ValueType = any>(
  config: FieldsetConfig<ValueType>
) {
  //extract props
  const { 
    value, 
    defaultValue,
    emptyValue, 
    onChange, 
    onUpdate
  } = config;

  //make sure we have an array
  const safeValues: (ValueType|undefined)[] = Array.isArray(defaultValue) ? [ ...defaultValue ] : [];
  //hooks
  const [ values, setValues ] = useState(safeValues);
  //handlers
  const handlers = {
    set: (newValues: (ValueType|undefined)[]) => {
      //serialize the new value
      const serial = JSON.stringify(newValues);
      //if the values are different, update the change value
      if (serial !== JSON.stringify(values)) {
        const final = JSON
          .parse(serial)
          .map((value: any) => value === null ? undefined : value);
        const clean = final
          .filter((value: any) => typeof value !== 'undefined');
        setValues(final);
        onChange && onChange(clean as ValueType[]);
        onUpdate && onUpdate(clean as ValueType[]);
      }
    },
    add: () => handlers.set(values.concat([emptyValue]))
  };
  //for controlled states we should update 
  //the values when the value prop changes
  useEffect(() => {
    if (!Array.isArray(value)) return;
    handlers.set([ ...value ]);
  }, [ value ]);
  
  return { values, handlers };
};

/**
 * Factory to make a dynamic form fieldset
 * A group of fields that can be multiplied or removed dynamically
 */
export default function make<ValueType = any>(
  Fields: React.FC<FieldsProps<ValueType>>
) {
  //renders a dynamic form fieldset
  return function Fieldset (props: FieldsetProps<ValueType>) {
    //extract props
    const { 
      add,
      data,
      value, 
      defaultValue,
      emptyValue, 
      error,
      errorColor = '#DC3545',
      onChange, 
      onUpdate,
      ...attributes 
    } = props;

    const { values, handlers } = useFieldset({
      value, 
      defaultValue,
      emptyValue, 
      onChange, 
      onUpdate
    });

    return (
      <>
        {values.map((value, index) => (
          typeof value !== 'undefined' ? <Fields 
            data={data}
            key={index} 
            index={index}
            values={values}
            error={error}
            errorColor={errorColor}
            set={handlers.set}
          /> : null
        ))}
        <Button 
          muted
          {...attributes}
          onClick={handlers.add}
          type="button"
        >
          <span className="fieldset-plus">&#43;</span>
          {add || 'Add'}
        </Button>
      </>
    );
  };
};