//--------------------------------------------------------------------//
// Imports

//types
import type { HTMLPreProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type JSONProps = HTMLPreProps & { value: any };

//--------------------------------------------------------------------//
// Components

/**
 * JSON Format Component (Main)
 */
export function JSONFormat({ value, ...attributes }: JSONProps) {
  return (<pre {...attributes}>{JSON.stringify(value, null, 2)}</pre>);
};

//defaults to json
export default JSONFormat;