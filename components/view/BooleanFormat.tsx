//--------------------------------------------------------------------//
// Types

export type YesnoProps = { value: any, yes?: string, no?: string };

//--------------------------------------------------------------------//
// Components

/**
 * Yesno Format Component (Main)
 */
export function BooleanFormat(props: YesnoProps) {
  const { value, yes = 'Yes', no = 'No' } = props;
  return (<>{!!value ? yes : no}</>);
};

//defaults to boolean format
export default BooleanFormat;