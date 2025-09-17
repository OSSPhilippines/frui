//modules
import type { JSX } from 'react';
import { useLanguage } from 'r22n';
//frui
import { 
  Table, 
  Thead, 
  Trow, 
  Tcol, 
  useStripe 
} from 'components/element/Table.js';

export default function Props({ props }: { props: (string|JSX.Element)[][] }) {
  const { _ } = useLanguage();
  const stripe = useStripe('theme-bg-2', 'theme-bg-1');
  return (
    <Table>
      <Thead className="text-left theme-bg-3">{_('Name')}</Thead>
      <Thead className="text-left theme-bg-3">{_('Type')}</Thead>
      <Thead className="text-center theme-bg-3">{_('Required')}</Thead>
      <Thead className="text-left theme-bg-3">{_('Notes')}</Thead>
      {props.map((prop, i) => (
        <Trow key={i}>
          <Tcol className={`${stripe(i)}`}>
            {prop[0]}
          </Tcol>
          <Tcol className={`${stripe(i)}`}>
            {prop[1]}
          </Tcol>
          <Tcol className={`${stripe(i)} text-center`}>
            {prop[2]}
          </Tcol>
          <Tcol className={`${stripe(i)}`}>
            {prop[3]}
          </Tcol>
        </Trow>
      
      ))}
    </Table>
  );
};