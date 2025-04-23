//types
import type { CSSProperties } from 'react';
import type { BadgeProps } from '../element/Badge.js';
//components
import Badge from '../element/Badge.js';

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