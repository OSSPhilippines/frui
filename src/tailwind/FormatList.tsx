//types
import type { FormatListProps } from '../types';
//react
import React from 'react';

const FormatList: React.FC<FormatListProps> = ({ value, ordered }) => {
  if (ordered) {
    return (
      <ol className="list-decimal pl-[18px]">
        {value.map((value, i) => <li key={i}>{value}</li>)}
      </ol>
    );
  }
  return (
    <ul className="list-disc pl-[18px]">
      {value.map((value, i) => <li key={i}>{value}</li>)}
    </ul>
  );
};

export default FormatList;