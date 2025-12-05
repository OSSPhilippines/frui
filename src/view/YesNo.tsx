//--------------------------------------------------------------------//
// Types

export type YesNoProps = { value: any, yes?: string, no?: string };

//--------------------------------------------------------------------//
// Components

/**
 * YesNo Component (Main)
 */
export function YesNo(props: YesNoProps) {
  const { value, yes = 'Yes', no = 'No' } = props;
  return (<>{!!value ? yes : no}</>);
};

//defaults to boolean format
export default YesNo;