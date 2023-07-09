//types
import type { HTMLProps }from 'frui-core/dist/types/formats';
//react
import React from 'react';

const HTML: React.FC<HTMLProps> = ({ value }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: value }} />
  );
};

export default HTML;