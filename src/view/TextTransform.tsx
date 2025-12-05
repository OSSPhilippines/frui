//--------------------------------------------------------------------//
// Imports

import type { CSSProperties } from 'react';

//--------------------------------------------------------------------//
// Types

export type TextTransformProps = { 
  value: string, 
  format?: 'uppercase' | 'lowercase' | 'capitalize' | 'none',
};

//--------------------------------------------------------------------//
// Components

/**
 * Text Component (Main)
 */
export function TextTransform({ value, format }: TextTransformProps) {
  const styles: CSSProperties = {};
  if (format === 'uppercase') {
    styles.textTransform = 'uppercase';
  } else if (format === 'lowercase') {
    styles.textTransform = 'lowercase';
  } else if (format === 'capitalize') {
    styles.textTransform = 'capitalize';
  }
  return (<span style={styles}>{value}</span>);
};

export default TextTransform;
