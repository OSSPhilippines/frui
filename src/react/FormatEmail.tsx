//types
import type { FormatEmailProps } from '../types';
//react
import React from 'react';
//components
import FormatLink from './FormatLink';

const FormatEmail: React.FC<FormatEmailProps> = ({ value, ...attributes }) => {
  return (
    <FormatLink {...attributes} value={`mailto:${value}`}>
      {value}
    </FormatLink>
  );
};

export default FormatEmail;