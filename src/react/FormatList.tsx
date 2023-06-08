//types
import type { FormatListProps } from '../types';
//react
import React from 'react';

const FormatList: React.FC<FormatListProps> = ({ value, ordered }) => {
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

export default FormatList;