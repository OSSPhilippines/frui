//types
import type { SeparatedProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';

const Separated: React.FC<SeparatedProps> = (props) => {
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

export default Separated;