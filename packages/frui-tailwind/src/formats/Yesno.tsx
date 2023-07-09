//types
import type { YesnoProps }from 'frui-core/dist/types/formats';
//react
import React from 'react';

const Yesno: React.FC<YesnoProps> = (props) => {
  const { value, yes = 'Yes', no = 'No' } = props;
  return (<>{!!value ? yes : no}</>);
};

export default Yesno;