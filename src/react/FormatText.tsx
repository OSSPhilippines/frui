//types
import type { FormatTextProps } from '../types';
//react
import React from 'react';

const FormatText: React.FC<FormatTextProps> = ({ value, format }) => {
  const styles: React.CSSProperties = {};
  if (format === 'uppercase') {
    styles.textTransform = 'uppercase';
  } else if (format === 'lowercase') {
    styles.textTransform = 'lowercase';
  } else if (format === 'capitalize') {
    styles.textTransform = 'capitalize';
  }
  return (<span style={styles}>{value}</span>);
};

export default FormatText;