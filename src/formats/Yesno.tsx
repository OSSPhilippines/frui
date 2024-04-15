//types
import type { YesnoProps } from '../types/formats';

export default function Yesno(props: YesnoProps) {
  const { value, yes = 'Yes', no = 'No' } = props;
  return (<>{!!value ? yes : no}</>);
};