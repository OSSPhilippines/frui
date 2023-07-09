//types
import type { TaglistProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';
//components
import Badge from '../Badge';

const Taglist: React.FC<TaglistProps> = (props) => {
  const { value, ...attributes } = props;
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {value.map((value, i) => (
        <Badge key={i} {...attributes}>{value}</Badge>
      ))}
    </span>
  );
};

export default Taglist;