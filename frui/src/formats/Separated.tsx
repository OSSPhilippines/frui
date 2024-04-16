//types
import type { SeparatedProps } from '../types/formats';

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