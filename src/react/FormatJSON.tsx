//types
import type { FormatJSONProps } from '../types';
//react
import React from 'react';

const FormatJSON: React.FC<FormatJSONProps> = ({ value, ...attributes }) => {
  return (<pre {...attributes}>{JSON.stringify(value, null, 2)}</pre>);
};

export default FormatJSON;