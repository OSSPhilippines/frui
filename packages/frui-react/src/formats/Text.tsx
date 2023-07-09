//types
import type { TextProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';

const Text: React.FC<TextProps> = ({ value, format }) => {
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

export default Text;