import { useLanguage } from 'r22n';

import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Code, 
  Props
} from 'plugins/app/index.js';
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';

import Table, { Thead, Trow, Tcol, useStripe } from 'components/element/Table.js';

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Table' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'colSpan', 'boolean', 'Thead, Tfoot, Tcol', 'No', 'How many columns this cell will cover' ],
  [ 'noWrap', 'boolean', 'Thead, Tfoot, Tcol', 'No', 'Keeps all text in one line' ],
  [ 'rowSpan', 'boolean', 'Tcol', 'No', 'How many rows this cell will cover' ],
  [ 'stickyBottom', 'boolean', 'Tfoot', 'No', 'Always show on the bottom, even on overflow' ],
  [ 'stickyLeft', 'boolean', 'Thead, Tfoot, Tcol', 'No', 'Always show on the left, even on overflow' ],
  [ 'stickyRight', 'boolean', 'Thead, Tfoot, Tcol', 'No', 'Always show on the right, even on overflow' ],
  [ 'stickyTop', 'boolean', 'Thead', 'No', 'Always show on the top, even on overflow' ],
  [ 'style', 'CSS Object', 'All', 'No', 'Standard CSS input' ],
  [ 'wrap1', 'boolean', 'Thead, Tfoot, Tcol', 'No', 'Keeps the cell size a minimum of 100px' ],
  [ 'wrap2', 'boolean', 'Thead, Tfoot, Tcol', 'No', 'Keeps the cell size a minimum of 200px' ],
  [ 'wrap3', 'boolean', 'Thead, Tfoot, Tcol', 'No', 'Keeps the cell size a minimum of 300px' ],
  [ 'wrap4', 'boolean', 'Thead, Tfoot, Tcol', 'No', 'Keeps the cell size a minimum of 400px' ],
  [ 'wrap5', 'boolean', 'Thead, Tfoot, Tcol', 'No', 'Keeps the cell size a minimum of 500px' ]
];

const examples = [
//0
`<Table className="w-full">
  <Thead className="theme-bg-3 text-left">ID</Thead>
  <Thead className="theme-bg-3 text-left">Name</Thead>
  <Thead className="theme-bg-3 text-center">Active</Thead>
  <Thead className="theme-bg-3 text-right">Created</Thead>
  <Thead className="theme-bg-3 text-right">Updated</Thead>
  <Trow>
    <Tcol className="theme-bg-1">1</Tcol>
    <Tcol className="theme-bg-1">John Doe</Tcol>
    <Tcol className="theme-bg-1 text-center">Yes</Tcol>
    <Tcol className="theme-bg-1 text-right">2021-01-01</Tcol>
    <Tcol className="theme-bg-1 text-right">2021-01-01</Tcol>
  </Trow>
  <Trow>
    <Tcol className="theme-bg-2">2</Tcol>
    <Tcol className="theme-bg-2">Jane Doe</Tcol>
    <Tcol className="theme-bg-2 text-center">No</Tcol>
    <Tcol className="theme-bg-2 text-right">2021-01-01</Tcol>
    <Tcol className="theme-bg-2 text-right">2021-01-01</Tcol>
  </Trow>
</Table>`,
//1
`<Table>
  <Thead className="theme-bg-3 text-left">ID</Thead>
  <Thead className="theme-bg-3 text-left">Name</Thead>
  <Thead className="theme-bg-3 text-center">Active</Thead>
  <Thead className="theme-bg-3 text-right">Created</Thead>
  <Thead className="theme-bg-3 text-right">Updated</Thead>
  <Trow>
    <Tcol className="theme-bg-1">1</Tcol>
    <Tcol wrap3 className="theme-bg-1">Duis id ante leo...</Tcol>
    <Tcol className="theme-bg-1 text-center">Yes</Tcol>
    <Tcol noWrap className="theme-bg-1 text-right">2021-01-01</Tcol>
    <Tcol noWrap className="theme-bg-1 text-right">2021-01-01</Tcol>
  </Trow>
</Table>`,
//2
`<div className="h-64 w-72 overflow-auto">
  <Table className="w-full">
    <Thead stickyTop stickyLeft className="theme-bg-3 text-left">ID</Thead>
    <Thead stickyTop noWrap className="theme-bg-3 text-left">First Name</Thead>
    <Thead stickyTop noWrap className="theme-bg-3 text-left">Last Name</Thead>
    <Thead stickyTop className="theme-bg-3 text-center">Active</Thead>
    <Thead stickyTop className="theme-bg-3 text-right">Created</Thead>
    <Thead stickyTop className="theme-bg-3 text-right">Updated</Thead>
    <Trow>
      <Tcol stickyLeft className="theme-bg-1">1</Tcol>
      <Tcol className="theme-bg-1">John</Tcol>
      <Tcol className="theme-bg-1">Doe</Tcol>
      <Tcol className="theme-bg-1 text-center">Yes</Tcol>
      <Tcol noWrap className="theme-bg-1 text-right">2021-01-01</Tcol>
      <Tcol noWrap className="theme-bg-1 text-right">2021-01-02</Tcol>
    </Trow>
  </Table>
</div>`
];

export function Body() {
  const { _ } = useLanguage();
  const stripe = useStripe('theme-bg-2', 'theme-bg-1');
  return (
    <LayoutPanel pathname="/component/table">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <h1 id="top" className="flex items-center uppercase font-bold text-xl">
            {_('Table')}
          </h1>
          <Code language="typescript" className="mt-2">
            {`import Table, { Thead, Trow, Tcol } from 'frui/Table';`}
          </Code>

          <h2 id="props" className="uppercase font-bold text-lg mt-8">
            {_('Props')}
          </h2>
          <Props props={props} />

          <div className="w-full overflow-auto">
            <Table>
              <Thead className="text-left theme-bg-3">{_('Name')}</Thead>
              <Thead className="text-left theme-bg-3">{_('Type')}</Thead>
              <Thead noWrap className="text-left theme-bg-3">{_('For Element')}</Thead>
              <Thead className="text-center theme-bg-3">{_('Required')}</Thead>
              <Thead className="text-left theme-bg-3">{_('Notes')}</Thead>
              {props.map((prop, i) => (
                <Trow key={i}>
                  <Tcol className={`${stripe(i)}`}>{prop[0]}</Tcol>
                  <Tcol className={`${stripe(i)}`}>{prop[1]}</Tcol>
                  <Tcol className={`${stripe(i)}`}>{prop[2]}</Tcol>
                  <Tcol className={`${stripe(i)} text-center`}>{prop[3]}</Tcol>
                  <Tcol className={`${stripe(i)}`}>{prop[4]}</Tcol>
                </Trow>
              ))}
            </Table>
          </div>

          <h2 id="basic" className="uppercase font-bold text-lg mt-8">
            {_('Basic')}
          </h2>
          <div className="curved overflow-hidden">
            <Table className="w-full">
              <Thead className="theme-bg-3 text-left">ID</Thead>
              <Thead className="theme-bg-3 text-left">Name</Thead>
              <Thead className="theme-bg-3 text-center">Active</Thead>
              <Thead className="theme-bg-3 text-right">Created</Thead>
              <Thead className="theme-bg-3 text-right">Updated</Thead>
              <Trow>
                <Tcol className="theme-bg-1">1</Tcol>
                <Tcol className="theme-bg-1">John Doe</Tcol>
                <Tcol className="theme-bg-1 text-center">Yes</Tcol>
                <Tcol className="theme-bg-1 text-right">2021-01-01</Tcol>
                <Tcol className="theme-bg-1 text-right">2021-01-01</Tcol>
              </Trow>
            </Table>
            <Code language="typescript">{examples[0]}</Code>
          </div>

          <h2 id="wrap" className="uppercase font-bold text-lg mt-8">
            {_('Wrap & No Wrap')}
          </h2>
          <div className="curved overflow-hidden">
            <Table className="w-full">
              <Thead className="theme-bg-3 text-left">ID</Thead>
              <Thead className="theme-bg-3 text-left">Name</Thead>
              <Thead className="theme-bg-3 text-center">Active</Thead>
              <Thead className="theme-bg-3 text-right">Created</Thead>
              <Thead className="theme-bg-3 text-right">Updated</Thead>
              <Trow>
                <Tcol className="theme-bg-1">1</Tcol>
                <Tcol wrap3 className="theme-bg-1">Duis id ante leo...</Tcol>
                <Tcol className="theme-bg-1 text-center">Yes</Tcol>
                <Tcol noWrap className="theme-bg-1 text-right">2021-01-01</Tcol>
                <Tcol noWrap className="theme-bg-1 text-right">2021-01-01</Tcol>
              </Trow>
            </Table>
            <Code language="typescript">{examples[1]}</Code>
          </div>

          <h2 id="sticky" className="uppercase font-bold text-lg mt-8">
            {_('Sticky')}
          </h2>
          <div className="curved overflow-hidden">
            <div className="h-64 w-72 overflow-auto">
              <Table className="w-full">
                <Thead stickyTop stickyLeft className="theme-bg-3 text-left">ID</Thead>
                <Thead stickyTop noWrap className="theme-bg-3 text-left">First Name</Thead>
                <Thead stickyTop noWrap className="theme-bg-3 text-left">Last Name</Thead>
                <Thead stickyTop className="theme-bg-3 text-center">Active</Thead>
                <Thead stickyTop className="theme-bg-3 text-right">Created</Thead>
                <Thead stickyTop className="theme-bg-3 text-right">Updated</Thead>
                <Trow>
                  <Tcol stickyLeft className="theme-bg-1">1</Tcol>
                  <Tcol className="theme-bg-1">John</Tcol>
                  <Tcol className="theme-bg-1">Doe</Tcol>
                  <Tcol className="theme-bg-1 text-center">Yes</Tcol>
                  <Tcol noWrap className="theme-bg-1 text-right">2021-01-01</Tcol>
                  <Tcol noWrap className="theme-bg-1 text-right">2021-01-02</Tcol>
                </Trow>
              </Table>
            </div>
            <Code language="typescript">{examples[2]}</Code>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
};

export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/component/table"
      title="Table Component"
      description="Tables in FRUI are ReactJS components used to display tabular information."
      styles={styles}
    />
  );
};

export default function Page() {
  return (
    <LayoutProvider>
      <Body />
    </LayoutProvider>
  );
};
