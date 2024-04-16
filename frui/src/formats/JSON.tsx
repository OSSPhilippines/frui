//types
import type { JSONProps } from '../types/formats';

export default function JSONFormat({ value, ...attributes }: JSONProps) {
  return (<pre {...attributes}>{JSON.stringify(value, null, 2)}</pre>);
};