//types
import type { FormatPhoneProps } from '../types';
//react
import React from 'react';
//components
import FormatLink from './FormatLink';

const FormatPhone: React.FC<FormatPhoneProps> = ({ value, ...attributes }) => {
  return (
    <FormatLink {...attributes} value={`tel:${value}`}>
      {value}
    </FormatLink>
  );
};

export default FormatPhone;