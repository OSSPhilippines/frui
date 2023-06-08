//types
import type { FormatTaglistProps } from '../types';
//react
import React from 'react';
//components
import Badge from './Badge';

const FormatTaglist: React.FC<FormatTaglistProps> = (props) => {
  const { value, ...attributes } = props;
  return (
    <span className="inline-flex gap-[2px]">
      {value.map((value, i) => (
        <Badge key={i} {...attributes}>{value}</Badge>
      ))}
    </span>
  );
};

export default FormatTaglist;