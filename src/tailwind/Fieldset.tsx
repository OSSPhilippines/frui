//types
import type { FieldsetProps, FieldsProps } from '../types';
//react
import React from 'react';
//components
import Button from './Button';
//hooks
import useFieldset from '../hooks/useFieldset';

/**
 * Factory to make a dynamic form fieldset
 * A group of fields that can be multiplied or removed dynamically
 */
export default function make<ValueType = any>(
  Fields: React.FC<FieldsProps<ValueType>>
) {
  //renders a dynamic form fieldset
  const Fieldset: React.FC<FieldsetProps<ValueType>> = (props) => {
    //extract props
    const { 
      label,
      min,
      max,
      step,
      type,
      data,
      value, 
      emptyValue, 
      error,
      errorColor = '#DC3545',
      styles,
      classNames,
      onChange, 
      onUpdate,
      ...attributes 
    } = props;

    const { values, handlers } = useFieldset({
      value, 
      emptyValue, 
      onChange, 
      onUpdate
    });

    return (
      <>
        {values.map((value, index) => (
          typeof value !== 'undefined' ? <Fields 
            type={type}
            data={data}
            min={min}
            max={max}
            step={step}
            key={index} 
            index={index}
            values={values}
            error={error}
            errorColor={errorColor}
            styles={styles}
            classNames={classNames}
            set={handlers.set}
          /> : null
        ))}
        <Button 
          muted
          {...attributes}
          onClick={handlers.add}
          type="button"
        >
          <span className="mr-0.5">&#43;</span>
          {label || 'Add'}
        </Button>
      </>
    );
  };

  return Fieldset;
}