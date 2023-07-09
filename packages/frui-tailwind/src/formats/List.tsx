//types
import type { ListProps }from 'frui-core/dist/types/formats';
//react
import React from 'react';

const List: React.FC<ListProps> = ({ value, ordered }) => {
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

export default List;