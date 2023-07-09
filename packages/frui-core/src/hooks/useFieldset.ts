import type { FieldsetConfig } from '../types/components';
//hooks
import { useState } from 'react';

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
  }

  return { values, handlers };
}