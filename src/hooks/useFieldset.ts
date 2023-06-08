import type { FieldsetConfig } from '../types';
//hooks
import { useState, useEffect } from 'react';

export default function useFieldset<ValueType = any>(
  config: FieldsetConfig<ValueType>
) {
  //extract props
  const { 
    value, 
    emptyValue, 
    onChange, 
    onUpdate
  } = config;

  //make sure we have an array
  const safeValues: (ValueType|undefined)[] = Array.isArray(value) ? value : [];
  //hooks
  const [ values, setValues ] = useState(safeValues);
  const [ changed, changeValues ] = useState<(ValueType|undefined)[]>();
  //handlers
  const handlers = {
    set: (values: (ValueType|undefined)[]) => {
      //set values
      setValues(values);
      //serialize the old change value and the new value
      const serial1 = changed 
        ? JSON.stringify(changed.filter(Boolean))
        : undefined;
      const serial2 = JSON.stringify(values.filter(Boolean));
      //if the values are different, update the change value
      if (serial1 !== serial2) {
        changeValues(values);
      }
    },
    add: () => handlers.set(values.concat([emptyValue]))
  }
  //effects
  useEffect(() => {
    //we only want to update the value if the change value is different
    changed 
      && onChange 
      && onChange(changed.filter(Boolean) as ValueType[]);
    //for consistency
    changed 
      && onUpdate 
      && onUpdate(changed.filter(Boolean) as ValueType[]);
  }, [ changed ]);

  return { values, handlers };
}