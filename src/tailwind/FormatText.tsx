//types
import type { FormatTextProps } from '../types';
//react
import React from 'react';

const FormatText: React.FC<FormatTextProps> = ({ value, format }) => {
  //we have to do it this way because of tailwind jit
  let transform = '';
  if (format === 'uppercase') {
    transform = 'uppercase';
  } else if (format === 'lowercase') {
    transform = 'lowercase';
  } else if (format === 'capitalize') {
    transform = 'capitalize';
  }
  return (<span className={transform}>{value}</span>);
};

export default FormatText;