//types
import type { MetadataConfig } from '../types/fields';

export default function useMetadata(config: MetadataConfig) {
  const { type, values, index, set } = config;
  const isNumber = type === 'number';
  const isDate = ['date', 'time', 'datetime'].includes(type || '');
  const isText = !isDate && !isNumber;
  //handlers
  const handlers = {
    update: (key: 'name'|'value', input: any) => {
      const newValues = [ ...(values || []) ];
      const entry: [string, string|number|Date] = [ '', '' ];
      const current = newValues[index];
      entry[0] = current ? current[0] : '';
      entry[1] = current ? current[1] : '';
      if (key === 'name') {
        entry[0] = input;
      } else {
        entry[1] = input;
      }

      newValues[index] = entry
      set(newValues);
    },
    remove: () => {
      const newValues = [ ...(values || []) ];
      newValues[index] = undefined;
      set(newValues);
    }
  };
  
  return { handlers, input: { isDate, isText, isNumber } };
}