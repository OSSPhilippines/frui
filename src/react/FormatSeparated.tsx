//types
import type { FormatSeparatedProps } from '../types';
//react
import React from 'react';

const FormatSeparated: React.FC<FormatSeparatedProps> = (props) => {
  const { value, className, style, separator = ' ' } = props;
  if (separator === 'line') {
    return (
      <div className={className} style={style}>
        {value.map((value, i) => <div key={i}>{value}</div>)}
      </div>
    );  
  }
  return (
    <span className={className} style={style}>
      {value.join(separator)}
    </span>
  );  
};

export default FormatSeparated;