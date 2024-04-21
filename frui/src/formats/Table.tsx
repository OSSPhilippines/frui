//types
import type { CSSProperties } from 'react';
//components
import { Table, Thead, Tcol, Trow } from '../Table';

/**
 * Table Props
 */
export type TableProps = { 
  style?: CSSProperties,
  className?: string,
  value: Record<string, string|number>[],
  stripes?: [ string, string, string ]
};

/**
 * Table Format Component (Main)
 */
export default function TableFormat(props: TableProps) {
  const { style = {}, className, value, stripes } = props;
  if (!value || !value.length) return null;
  const styles = {
    head: { 
      ...style,
      textAlign: 'left' as 'left',
      backgroundColor: stripes ? stripes[0]: undefined 
    },
    rows: [
      { ...style, backgroundColor: stripes ? stripes[1]: undefined },
      { ...style, backgroundColor: stripes ? stripes[2]: undefined }
    ]
  }
  return (
    <Table>
      {Object.keys(value[0]).map((key) => (
        <Thead key={key} className={className} style={styles.head}>{key}</Thead>
      ))}
      {value.map((row, i) => (
        <Trow key={i}>
          {Object.values(row).map((value, j) => (
            <Tcol key={`${i}-${j}`} className={className} style={styles.rows[i % 2]}>{value}</Tcol>
          ))}
        </Trow>
      ))}
    </Table>
  );
};