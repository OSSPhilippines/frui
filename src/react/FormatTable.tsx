//types
import type { FormatTableProps } from '../types';
//react
import React from 'react';
//components
import { Table, Thead, Tcol, Trow } from './Table';

const FormatTable: React.FC<FormatTableProps> = ({ value, stripes }) => {
  if (!value || !value.length) return null;
  const styles = {
    head: { 
      textAlign: 'left' as 'left',
      color: stripes ? stripes[0][1]: undefined, 
      backgroundColor: stripes ? stripes[0][0]: undefined 
    },
    rows: [
      { 
        color: stripes ? stripes[1][1]: undefined, 
        backgroundColor: stripes ? stripes[1][0]: undefined 
      },
      { 
        color: stripes ? stripes[2][1]: undefined, 
        backgroundColor: stripes ? stripes[2][0]: undefined 
      }
    ]
  }
  return (
    <Table>
      {Object.keys(value[0]).map((key) => (
        <Thead key={key} style={styles.head}>{key}</Thead>
      ))}
      {value.map((row, i) => (
        <Trow key={i}>
          {Object.values(row).map((value, j) => (
            <Tcol style={styles.rows[i % 2]} key={j}>{value}</Tcol>
          ))}
        </Trow>
      ))}
    </Table>
  );
};

export default FormatTable;