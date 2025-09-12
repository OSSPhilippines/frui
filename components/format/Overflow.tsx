/**
 * Overflow Props
 */
export type OverflowProps = { 
  value: string, 
  length?: string|number, 
  words?: boolean,
  hellip?: boolean, 
};

/**
 * Overflow Format Component (Main)
 */
export default function Overflow(props: OverflowProps) {
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