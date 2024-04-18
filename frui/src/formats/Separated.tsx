//types
import { CSSProperties } from 'react';

/**
 * Separated Props
 */
export type SeparatedProps = { 
  value: (string|number)[], 
  separator?: string,
  className?: string,
  style?: CSSProperties
};

/**
 * Separated Format Component (Main)
 */
export default function Separated(props: SeparatedProps) {
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