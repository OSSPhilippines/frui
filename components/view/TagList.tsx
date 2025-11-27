//--------------------------------------------------------------------//
// Imports

//types
import type { CSSProperties } from 'react';
import type { BadgeProps } from '../Badge.js';
//components
import Badge from '../Badge.js';

//--------------------------------------------------------------------//
// Types

export type TagListFormatProps = BadgeProps & { 
  className?: string,
  style?: CSSProperties,
  value: (string|number)[] 
};

//--------------------------------------------------------------------//
// Components

/**
 * Taglist Format Component (Main)
 */
export function TagListFormat(props: TagListFormatProps) {
  const { className, style, value, ...attributes } = props;
  return (
    <span className="frui-format-taglist">
      {value.map((value, i) => (
        <Badge className={className} style={style} key={i} {...attributes}>{value}</Badge>
      ))}
    </span>
  );
};

//defaults to taglist
export default TagListFormat;