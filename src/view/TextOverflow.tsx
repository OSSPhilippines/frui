//--------------------------------------------------------------------//
// Types

export type TextOverflowProps = { 
  value: string, 
  length?: string|number, 
  words?: boolean,
  hellip?: boolean, 
};

//--------------------------------------------------------------------//
// Components

/**
 * TextOverflow Component (Main)
 */
export function TextOverflow(props: TextOverflowProps) {
  const { value, length, words, hellip } = props;
  const count = typeof length === 'string' ? Number(length) || undefined : length;
  if (words) {
    const words = value.split(' ');
    if (count && words.length > count) {
      return (
        <>
          {words.slice(0, count).join(' ')}
          {hellip && (<>&hellip;</>)}
        </>
      );
    }

    return (<>{value}</>);
  }

  if (count && value.length > count) {
    return (
      <>
        {value.slice(0, count)}
        {hellip && (<>&hellip;</>)}
      </>
    );
  }

  return (<>{value}</>);
};

//defaults to text overflow
export default TextOverflow;