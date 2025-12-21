//modules
import type { JSX } from 'react';
import { useLanguage } from 'r22n';
//frui
import Table from 'src/base/Table.js';

export type PropsProps = { props: (string|JSX.Element)[][] };

export default function Props({ props }: PropsProps) {
  const { _ } = useLanguage();
  return (
    <Table column={[ 'theme-bg-2', 'theme-bg-1' ]}>
      <Table.Head className="text-left theme-bg-3">{_('Name')}</Table.Head>
      <Table.Head className="text-left theme-bg-3">{_('Type')}</Table.Head>
      <Table.Head className="text-center theme-bg-3">{_('Required')}</Table.Head>
      <Table.Head className="text-left theme-bg-3">{_('Notes')}</Table.Head>
      {props.map((prop, i) => (
        <Table.Row key={i} index={i}>
          <Table.Col>{prop[0]}</Table.Col>
          <Table.Col>{prop[1]}</Table.Col>
          <Table.Col addClassName="text-center">{prop[2]}</Table.Col>
          <Table.Col>{prop[3]}</Table.Col>
        </Table.Row>
      ))}
    </Table>
  );
};