//types
import type { CSSProperties } from 'react';
import type { BadgeProps } from '../Badge';
//components
import Badge from '../Badge';

/**
 * Taglist Props
 */
export type TaglistProps = BadgeProps & { 
  className?: string,
  style?: CSSProperties,
  value: (string|number)[] 
};

/**
 * Taglist Format Component (Main)
 */
export default function Taglist(props: TaglistProps) {
  const { className, style, value, ...attributes } = props;
  return (
    <span className="frui-format-taglist">
      {value.map((value, i) => (
        <Badge className={className} style={style} key={i} {...attributes}>{value}</Badge>
      ))}
    </span>
  );
};