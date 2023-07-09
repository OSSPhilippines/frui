//types
import type { LinkProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';

const Link: React.FC<LinkProps> = ({ value, label, ...attributes }) => {
  return (<a href={value} {...attributes}>{label || value}</a>);
};

export default Link;