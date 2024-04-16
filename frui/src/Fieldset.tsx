//types
import type { FieldsetProps, FieldsProps } from './types/components';
//react
import React from 'react';
//components
import Button from './Button';
//hooks
import useFieldset from './hooks/useFieldset';

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