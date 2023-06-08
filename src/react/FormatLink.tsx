//types
import type { FormatLinkProps } from '../types';
//react
import React from 'react';

const FormatLink: React.FC<FormatLinkProps> = ({ value, label, ...attributes }) => {
  return (<a href={value} {...attributes}>{label || value}</a>);
};

export default FormatLink;