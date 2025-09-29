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

//defaults to text
export default Text;