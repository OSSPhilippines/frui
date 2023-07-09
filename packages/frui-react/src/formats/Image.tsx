//types
import type { ImageProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';

const Image: React.FC<ImageProps> = ({ value, ...attributes }) => {
  return (
    <img {...attributes} src={value} />
  );
};

export default Image;