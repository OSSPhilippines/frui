//--------------------------------------------------------------------//
// Types

export type OverflowProps = { 
  value: string, 
  length?: string|number, 
  words?: boolean,
  hellip?: boolean, 
};

//--------------------------------------------------------------------//
// Components

//--------------------------------------------------------------------//
// Types

export type TextProps = { value: string, format?: 'uppercase'|'lowercase'|'capitalize'|'none' };

//--------------------------------------------------------------------//
// Components

/**
 * Text Format Component (Main)
 */
export function Text({ value, format }: TextProps) {
  const styles: React.CSSProperties = {};
  if (format === 'uppercase') {
    styles.textTransform = 'uppercase';
  } else if (format === 'lowercase') {
    styles.textTransform = 'lowercase';
  } else if (format === 'capitalize') {
    styles.textTransform = 'capitalize';
  }
  return (<span style={styles}>{value}</span>);
};

/**
 * Text Format Component (Main)
 */
export function TextFormat(props: OverflowProps) {
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

//defaults to text format
export default TextFormat;