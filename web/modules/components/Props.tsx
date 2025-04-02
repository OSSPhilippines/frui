//hooks
import { useLanguage } from 'r22n';
import useStripe from 'modules/hooks/useStripe';
//components
import Table, { Thead, Trow, Tcol } from 'frui/element/Table';

export default function Props({ props }: { props: (string|JSX.Element)[][] }) {
  const { _ } = useLanguage();
  const stripe = useStripe('bg-b2', 'bg-b1');
  return (
    <Table>
      <Thead className="text-left bg-b3">{_('Name')}</Thead>
      <Thead className="text-left bg-b3">{_('Type')}</Thead>
      <Thead className="text-center bg-b3">{_('Required')}</Thead>
      <Thead className="text-left bg-b3">{_('Notes')}</Thead>
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