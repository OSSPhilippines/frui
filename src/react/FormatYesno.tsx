//types
import type { FormatYesnoProps } from '../types';
//react
import React from 'react';

const FormatYesno: React.FC<FormatYesnoProps> = (props) => {
  const { value, yes = 'Yes', no = 'No' } = props;
  return (<>{!!value ? yes : no}</>);
};

export default FormatYesno;