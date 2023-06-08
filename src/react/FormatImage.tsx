//types
import type { FormatImageProps } from '../types';
//react
import React from 'react';

const FormatImage: React.FC<FormatImageProps> = ({ value, ...attributes }) => {
  return (
    <img {...attributes} src={value} />
  );
};

export default FormatImage;