//--------------------------------------------------------------------//
// Imports

//types
import type { ExtendsType } from '../types.js';
import type { ButtonProps } from '../Button.js';
//hooks
import React, { useState, useEffect } from 'react';
//components
import Button from '../Button.js';

//--------------------------------------------------------------------//
// Types

export type FieldsetConfig<ValueType = any> = {
  value?: ValueType[],
  defaultValue?: ValueType[],
  emptyValue?: ValueType,
  onChange?: (values: ValueType[]) => void,
  onUpdate?: (values: ValueType[]) => void
};

//use this type in your custom fieldset wrapper
//ex. const Custom: React.FC<FieldsetProps<YOUR ROW TYPE>> = (props) => {}
export type FieldsetProps<ValueType = any> = ExtendsType<ButtonProps, {
  add?: string,
  limit?: number,
  config?: Record<string, any>,
  value?: ValueType[],
  defaultValue?: ValueType[],
  emptyValue?: ValueType,
  error?: boolean,
  onChange?: (values: ValueType[]) => void,
  onUpdate?: (values: ValueType[]) => void
}>;

//use this type in your custom fields component
//ex. const Fields: React.FC<FieldsProps<YOUR ROW TYPE>> = (props) => {}
export type FieldsProps<ValueType = any> = {
  name?: string,
  limit?: number,
  config?: Record<string, any>,
  values?: (ValueType|undefined)[],
  index: number,
  error?: boolean,
  set: (values: (ValueType|undefined)[]) => void
};

//--------------------------------------------------------------------//
// Hooks

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
  const safeValues: (ValueType|undefined)[] = Array.isArray(
    defaultValue
  ) ? [ ...defaultValue ] : [];
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

//--------------------------------------------------------------------//
// Main

/**
 * Factory to make a dynamic form fieldset
 * A group of fields that can be multiplied or removed dynamically
 */
export function make<ValueType = any>(
  Fields: React.FC<FieldsProps<ValueType>>
) {
  //renders a dynamic form fieldset
  return function Fieldset (props: FieldsetProps<ValueType>) {
    //extract props
    const {
      name, 
      add,
      config,
      value, 
      limit = 0,
      defaultValue,
      emptyValue, 
      error,
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

    const size = values.filter(
      value => typeof value !== 'undefined'
    ).length;

    return (
      <>
        {values.map((value, index) => (
          typeof value !== 'undefined' ? (
            <Fields 
              name={name}
              config={config}
              key={index} 
              index={index}
              values={values}
              limit={limit}
              error={error}
              set={handlers.set}
            />
          ) : null
        ))}
        {(!limit || size < limit) && (
          <Button 
            muted
            {...attributes}
            onClick={handlers.add}
            type="button"
          >
            <span className="frui-form-fieldset-add">&#43;</span>
            {add || 'Add'}
          </Button>
        )}
      </>
    );
  };
};

//defaults to make
export default Object.assign(make, { useFieldset, use: useFieldset });