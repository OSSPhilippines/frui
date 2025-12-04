//--------------------------------------------------------------------//
// Imports

//types
import { CSSProperties } from 'react';

//--------------------------------------------------------------------//
// Types

export type SeparateProps = { 
  value: (string|number)[], 
  separator?: string,
  className?: string,
  style?: CSSProperties
};

//--------------------------------------------------------------------//
// Components

/**
 * Separate Format Component (Main)
 */
export function Separate(props: SeparateProps) {
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
export default Separate;