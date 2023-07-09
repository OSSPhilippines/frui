//types
import type { ListProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';

const List: React.FC<ListProps> = ({ value, ordered }) => {
  if (ordered) {
    return (
      <ol style={{ listStyle: 'revert', paddingLeft: '18px' }}>
        {value.map((value, i) => <li key={i}>{value}</li>)}
      </ol>
    );
  }
  return (
    <ul style={{ listStyle: 'revert', paddingLeft: '18px' }}>
      {value.map((value, i) => <li key={i}>{value}</li>)}
    </ul>
  );
};

export default List;