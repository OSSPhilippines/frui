//--------------------------------------------------------------------//
// Imports

//types
import { CSSProperties } from 'react';

//--------------------------------------------------------------------//
// Types

export type SpreadProps = { 
  value: (string|number)[], 
  separator?: string,
  className?: string,
  style?: CSSProperties
};

//--------------------------------------------------------------------//
// Components

/**
 * Spread Format Component (Main)
 */
export function Spread(props: SpreadProps) {
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

//defaults to separate
export default Spread;