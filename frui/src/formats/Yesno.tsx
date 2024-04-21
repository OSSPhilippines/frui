/**
 * Yesno Props
 */
export type YesnoProps = { value: any, yes?: string, no?: string };

/**
 * Yesno Format Component (Main)
 */
export default function Yesno(props: YesnoProps) {
  const { value, yes = 'Yes', no = 'No' } = props;
  return (<>{!!value ? yes : no}</>);
};