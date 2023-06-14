//types
import type { FieldMetadataConfig } from '../types';
//hooks
import { useState } from 'react';

export default function useFieldMetadata(config: FieldMetadataConfig) {
  const { type, values, index, set } = config;
  //hooks
  const row = values ? values[index]: undefined;
  const [ name, setName ] = useState(Array.isArray(row) ? row[0] || '': '');
  const [ value, setValue ] = useState<any>(Array.isArray(row) ? row[1] || '': '');

  const isNumber = type === 'number';
  const isDate = ['date', 'time', 'datetime'].includes(type || '');
  const isText = !isDate && !isNumber;
  //handlers
  const handlers = {
    update: (key: 'name'|'value', input: any) => {
      const newValues = [ ...(values || []) ];
      if (key === 'name') {
        setName(input);
        newValues[index] = [ input, value ];
      } else {
        setValue(value);
        newValues[index] = [ name, input];
      }
      set(newValues);
    },
    remove: () => {
      const newValues = [ ...(values || []) ];
      newValues[index] = undefined;
      set(newValues);
    }
  };
  
  return { name, value, handlers, input: { isDate, isText, isNumber } };
}