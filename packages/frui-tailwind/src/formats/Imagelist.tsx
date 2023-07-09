//types
import type { ImagelistProps }from 'frui-core/dist/types/formats';
//react
import React from 'react';

const Imagelist: React.FC<ImagelistProps> = ({ value, ...attributes }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {value.map((value, i) => (
        <img key={i} {...attributes} src={value} />
      ))}
    </div>
  );
};

export default Imagelist;