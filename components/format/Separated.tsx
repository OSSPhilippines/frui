//--------------------------------------------------------------------//
// Imports

//types
import { CSSProperties } from 'react';

//--------------------------------------------------------------------//
// Types

export type SeparatedProps = { 
  value: (string|number)[], 
  separator?: string,
  className?: string,
  style?: CSSProperties
};

//--------------------------------------------------------------------//
// Components

/**
 * Separated Format Component (Main)
 */
export function Separated(props: SeparatedProps) {
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

//defaults to separated
export default Separated;