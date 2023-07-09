//types
import type { JSONProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';

const JSONFormat: React.FC<JSONProps> = ({ value, ...attributes }) => {
  return (<pre {...attributes}>{JSON.stringify(value, null, 2)}</pre>);
};

export default JSONFormat;