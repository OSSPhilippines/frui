//types
import type { FormatHTMLProps } from '../types';
//react
import React from 'react';

const FormatHTML: React.FC<FormatHTMLProps> = ({ value }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: value }} />
  );
};

export default FormatHTML;