//--------------------------------------------------------------------//
// Imports

//types
import type { CSSProperties } from 'react';
import type { BadgeProps } from '../base/Badge.js';
//components
import Badge from '../base/Badge.js';

//--------------------------------------------------------------------//
// Types

export type TagsProps = BadgeProps & { 
  className?: string,
  style?: CSSProperties,
  value: (string|number)[] 
};

//--------------------------------------------------------------------//
// Components

/**
 * Tags Component (Main)
 */
export function Tags(props: TagsProps) {
  const { className, style, value, ...attributes } = props;
  return (
    <span className="frui-view-taglist">
      {value.map((value, i) => (
        <Badge className={className} style={style} key={i} {...attributes}>{value}</Badge>
      ))}
    </span>
  );
};

//defaults to taglist format
export default Tags;