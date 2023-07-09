//types
import type { TextProps }from 'frui-core/dist/types/formats';
//react
import React from 'react';

const Text: React.FC<TextProps> = ({ value, format }) => {
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

export default Text;