//types
import type { FormatImagelistProps } from '../types';
//react
import React from 'react';

const FormatImagelist: React.FC<FormatImagelistProps> = ({ value, ...attributes }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {value.map((value, i) => (
        <img key={i} {...attributes} src={value} />
      ))}
    </div>
  );
};

export default FormatImagelist;