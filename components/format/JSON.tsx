//types
import type { HTMLPreProps } from '../types.js';

/**
 * JSON Props
 */
export type JSONProps = HTMLPreProps & { value: any };

/**
 * JSON Format Component (Main)
 */
export default function JSONFormat({ value, ...attributes }: JSONProps) {
  return (<pre {...attributes}>{JSON.stringify(value, null, 2)}</pre>);
};