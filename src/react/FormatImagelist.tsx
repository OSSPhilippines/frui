//types
import type { FormatImagelistProps } from '../types';
//react
import React from 'react';

const FormatImagelist: React.FC<FormatImagelistProps> = ({ value, ...attributes }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {value.map((value, i) => (
        <img key={i} {...attributes} src={value} />
      ))}
    </div>
  );
};

export default FormatImagelist;