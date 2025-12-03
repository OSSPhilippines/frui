//--------------------------------------------------------------------//
// Types

export type BooleanFormatProps = { value: any, yes?: string, no?: string };

//--------------------------------------------------------------------//
// Components

/**
 * Boolean Format Component (Main)
 */
export function BooleanFormat(props: BooleanFormatProps) {
  const { value, yes = 'Yes', no = 'No' } = props;
  return (<>{!!value ? yes : no}</>);
};

//defaults to boolean format
export default BooleanFormat;