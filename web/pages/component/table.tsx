//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
import useStripe from 'modules/hooks/useStripe';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Table, { Thead, Trow, Tcol } from 'frui/dist/Table';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Code from 'modules/components/Code';

const codeBasic = `
<Table className="w-full">
  <Thead className="bg-b3 text-left">ID</Thead>
  <Thead className="bg-b3 text-left">Name</Thead>
  <Thead className="bg-b3 text-center">Active</Thead>
  <Thead className="bg-b3 text-right">Created</Thead>
  <Thead className="bg-b3 text-right">Updated</Thead>
  <Trow>
    <Tcol className="bg-b2">1</Tcol>
    <Tcol className="bg-b2">John Doe</Tcol>
    <Tcol className="bg-b2 text-center">Yes</Tcol>
    <Tcol className="bg-b2 text-right">2021-01-01</Tcol>
    <Tcol className="bg-b2 text-right">2021-01-01</Tcol>
  </Trow>
  <Trow>
    <Tcol className="bg-b4">2</Tcol>
    <Tcol className="bg-b4">Jane Doe</Tcol>
    <Tcol className="bg-b4 text-center">No</Tcol>
    <Tcol className="bg-b4 text-right">2021-01-01</Tcol>
    <Tcol className="bg-b4 text-right">2021-01-01</Tcol>
  </Trow>
</Table>`.trim();

const codeWrap = `
<Table>
  <Thead className="bg-b3 text-left">ID</Thead>
  <Thead className="bg-b3 text-left">Name</Thead>
  <Thead className="bg-b3 text-center">Active</Thead>
  <Thead className="bg-b3 text-right">Created</Thead>
  <Thead className="bg-b3 text-right">Updated</Thead>
  <Trow>
    <Tcol className="bg-b2">1</Tcol>
    <Tcol wrap3 className="bg-b2">
      Duis id ante leo. Morbi orci ex, porttitor nec 
      turpis ac, rutrum laoreet tellus. Cras nulla 
      justo, consectetur eget ante non, faucibus 
      finibus velit. Phasellus mollis sapien egestas, 
      convallis magna id, egestas eros. Donec mauris 
      leo, cursus sit amet ullamcorper ac, pretium 
      vitae massa. Orci varius natoque penatibus et 
      magnis dis parturient montes, nascetur ridiculus 
      mus. Sed vitae orci felis. Etiam finibus, massa 
      vel semper sagittis, velit nulla hendrerit justo, 
      in ultrices lorem magna vitae quam.
    </Tcol>
    <Tcol className="bg-b2 text-center">Yes</Tcol>
    <Tcol noWrap className="bg-b2 text-right">2021-01-01</Tcol>
    <Tcol noWrap className="bg-b2 text-right">2021-01-01</Tcol>
  </Trow>
  <Trow>
    <Tcol className="bg-b4">2</Tcol>
    <Tcol wrap3 className="bg-b4">
      Maecenas enim nibh, tincidunt lacinia molestie 
      id, dictum vel felis. Cras laoreet laoreet arcu 
      eu tincidunt. Aenean hendrerit mi purus, id 
      vestibulum ligula tempus nec. Praesent 
      sollicitudin ligula et ipsum gravida viverra. 
      Cras pretium neque arcu, vitae mollis orci 
      iaculis et. Nullam egestas nec sem in mollis. 
      Vestibulum ante ipsum primis in faucibus orci 
      luctus et ultrices posuere cubilia curae; 
      Pellentesque habitant morbi tristique senectus 
      et netus et malesuada fames ac turpis egestas. 
      Quisque lobortis leo eu enim dapibus, at tempor 
      metus egestas. Aliquam in eros ut erat fermentum 
      volutpat ac in magna. Curabitur a magna at sem lacinia 
      tristique ac ut nibh. Nulla erat nulla, mollis at 
      finibus eget, mollis eu felis.</Tcol>
    <Tcol className="bg-b4 text-center">No</Tcol>
    <Tcol noWrap className="bg-b4 text-right">2021-01-01</Tcol>
    <Tcol noWrap className="bg-b4 text-right">2021-01-01</Tcol>
  </Trow>
</Table>`.trim();

const codeSticky = `
<div className="h-64 w-72 overflow-auto">
  <Table className="w-full">
    <Thead stickyTop stickyLeft className="bg-b3 text-left">ID</Thead>
    <Thead stickyTop noWrap className="bg-b3 text-left">First Name</Thead>
    <Thead stickyTop noWrap className="bg-b3 text-left">Last Name</Thead>
    <Thead stickyTop className="bg-b3 text-center">Active</Thead>
    <Thead stickyTop className="bg-b3 text-right">Created</Thead>
    <Thead stickyTop className="bg-b3 text-right">Updated</Thead>
    <Trow>
      <Tcol stickyLeft className="bg-b2">1</Tcol>
      <Tcol className="bg-b2">John</Tcol>
      <Tcol className="bg-b2">Doe</Tcol>
      <Tcol className="bg-b2 text-center">Yes</Tcol>
      <Tcol noWrap className="bg-b2 text-right">2021-01-01</Tcol>
      <Tcol noWrap className="bg-b2 text-right">2021-01-02</Tcol>
    </Trow>
    <Trow>
      <Tcol stickyLeft className="bg-b4">2</Tcol>
      <Tcol className="bg-b4">Jane</Tcol>
      <Tcol className="bg-b4">Doe</Tcol>
      <Tcol className="bg-b4 text-center">No</Tcol>
      <Tcol noWrap className="bg-b4 text-right">2021-02-03</Tcol>
      <Tcol noWrap className="bg-b4 text-right">2021-02-04</Tcol>
    </Trow>
    <Trow>
      <Tcol stickyLeft className="bg-b2">3</Tcol>
      <Tcol className="bg-b2">Jack</Tcol>
      <Tcol className="bg-b2">Doe</Tcol>
      <Tcol className="bg-b2 text-center">No</Tcol>
      <Tcol noWrap className="bg-b2 text-right">2021-03-05</Tcol>
      <Tcol noWrap className="bg-b2 text-right">2021-03-06</Tcol>
    </Trow>
    <Trow>
      <Tcol stickyLeft className="bg-b4">4</Tcol>
      <Tcol className="bg-b4">Jan</Tcol>
      <Tcol className="bg-b4">Doe</Tcol>
      <Tcol className="bg-b4 text-center">No</Tcol>
      <Tcol noWrap className="bg-b4 text-right">2021-04-07</Tcol>
      <Tcol noWrap className="bg-b4 text-right">2021-04-08</Tcol>
    </Trow>
    <Trow>
      <Tcol stickyLeft className="bg-b2">5</Tcol>
      <Tcol className="bg-b2">Jimmy</Tcol>
      <Tcol className="bg-b2">Doe</Tcol>
      <Tcol className="bg-b2 text-center">Yes</Tcol>
      <Tcol noWrap className="bg-b2 text-right">2021-05-09</Tcol>
      <Tcol noWrap className="bg-b2 text-right">2021-05-10</Tcol>
    </Trow>
    <Trow>
      <Tcol stickyLeft className="bg-b4">6</Tcol>
      <Tcol className="bg-b4">Jenny</Tcol>
      <Tcol className="bg-b4">Doe</Tcol>
      <Tcol className="bg-b4 text-center">No</Tcol>
      <Tcol noWrap className="bg-b4 text-right">2021-06-11</Tcol>
      <Tcol noWrap className="bg-b4 text-right">2021-06-12</Tcol>
    </Trow>
  </Table>
</div>`.trim();


export default function Home() {
  //hooks
  const { _ } = useLanguage();
  const stripe = useStripe('bg-b2', 'bg-b1');
  //variables
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Tables' }
  ];

  const props = [
    [ _('noWrap'), _('boolean'), 'Thead, Tfoot, Tcol',  _('No'), _('Keeps all text in one line') ],
    [ _('rowSpan'), _('boolean'), 'Tcol',  _('No'), _('How many rows this cell will cover') ],
    [ _('colSpan'), _('boolean'), 'Thead, Tfoot, Tcol',  _('No'), _('How many columns this cell will cover') ],
    [ _('stickyBottom'), _('boolean'), 'Tfoot',  _('No'), _('Always show on the bottom, even on overflow') ],
    [ _('stickyLeft'), _('boolean'), 'Thead, Tfoot, Tcol',  _('No'), _('Always show on the left, even on overflow') ],
    [ _('stickyRight'), _('boolean'), 'Thead, Tfoot, Tcol',  _('No'), _('Always show on the right, even on overflow') ],
    [ _('stickyTop'), _('boolean'), 'Thead',  _('No'), _('Always show on the top, even on overflow') ],
    [ _('wrap1'), _('boolean'), 'Thead, Tfoot, Tcol',  _('No'), _('Keeps the cell size a minimum of 100px') ],
    [ _('wrap2'), _('boolean'), 'Thead, Tfoot, Tcol',  _('No'), _('Keeps the cell size a minimum of 200px') ],
    [ _('wrap3'), _('boolean'), 'Thead, Tfoot, Tcol',  _('No'), _('Keeps the cell size a minimum of 300px') ],
    [ _('wrap4'), _('boolean'), 'Thead, Tfoot, Tcol',  _('No'), _('Keeps the cell size a minimum of 400px') ],
    [ _('wrap5'), _('boolean'), 'Thead, Tfoot, Tcol',  _('No'), _('Keeps the cell size a minimum of 500px') ],
    [ _('style'), _('CSS Object'), 'All',  _('No'), _('Standard CSS input') ],
    [ _('className'), _('string'), 'All',  _('No'), _('Standard class name input') ],
  ];
  //render
  return (
    <LayoutPanel>
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-52 border-l border-b1">
            <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <Link className="block pb-1" href="#top">Tables</Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <Link href="#props">
                    {_('Props')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#basic">
                    {_('Basic')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#wrap">
                    {_('Wrap & No Wrap')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#sticky">
                    {_('Sticky')}
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <div className="lg:absolute top-0 bottom-0 left-0 right-52 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Tables')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Table, { Thead, Trow, Tcol } from 'frui/Table';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <div className="w-full overflow-auto">
              <Table>
                <Thead className="text-left bg-b3">{_('Name')}</Thead>
                <Thead className="text-left bg-b3">{_('Type')}</Thead>
                <Thead noWrap className="text-left bg-b3">{_('For Element')}</Thead>
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
                    <Tcol className={`${stripe(i)}`}>
                      {prop[2]}
                    </Tcol>
                    <Tcol className={`${stripe(i)} text-center`}>
                      {prop[3]}
                    </Tcol>
                    <Tcol className={`${stripe(i)}`}>
                      {prop[4]}
                    </Tcol>
                  </Trow>
                
                ))}
              </Table>
            </div>

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basic')}
            </h2>
            <p className="py-4">
              <Translate>
                Tables do not need: <code 
                  className="text-sm text-t2"
                >`thead`</code>, and <code 
                  className="text-sm text-t2"
                >`tbody`</code> elements as in the following basic 
                example.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Table className="w-full">
                  <Thead className="bg-b3 text-left">ID</Thead>
                  <Thead className="bg-b3 text-left">Name</Thead>
                  <Thead className="bg-b3 text-center">Active</Thead>
                  <Thead className="bg-b3 text-right">Created</Thead>
                  <Thead className="bg-b3 text-right">Updated</Thead>
                  <Trow>
                    <Tcol className="bg-b2">1</Tcol>
                    <Tcol className="bg-b2">John Doe</Tcol>
                    <Tcol className="bg-b2 text-center">Yes</Tcol>
                    <Tcol className="bg-b2 text-right">2021-01-01</Tcol>
                    <Tcol className="bg-b2 text-right">2021-01-01</Tcol>
                  </Trow>
                  <Trow>
                    <Tcol className="bg-b4">2</Tcol>
                    <Tcol className="bg-b4">Jane Doe</Tcol>
                    <Tcol className="bg-b4 text-center">No</Tcol>
                    <Tcol className="bg-b4 text-right">2021-01-01</Tcol>
                    <Tcol className="bg-b4 text-right">2021-01-01</Tcol>
                  </Trow>
                </Table>
              </div>
              <Code language="typescript">
                {codeBasic}
              </Code>
            </div>

            <h2 id="wrap" className="uppercase font-bold text-lg mt-8">
              {_('Wrap & No Wrap')}
            </h2>
            <p className="py-4">
              <Translate>
                Headers and cell width can be manipulated using <code 
                  className="text-sm text-t2"
                >`noWrap`</code>, <code 
                  className="text-sm text-t2"
                >`wrap1`</code>, <code 
                  className="text-sm text-t2"
                >`wrap2`</code>, <code 
                  className="text-sm text-t2"
                >`wrap3`</code>, <code 
                  className="text-sm text-t2"
                >`wrap4`</code>, and <code 
                  className="text-sm text-t2"
                >`wrap5`</code>.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full overflow-auto">
                <Table className="w-full">
                  <Thead className="bg-b3 text-left">ID</Thead>
                  <Thead className="bg-b3 text-left">Name</Thead>
                  <Thead className="bg-b3 text-center">Active</Thead>
                  <Thead className="bg-b3 text-right">Created</Thead>
                  <Thead className="bg-b3 text-right">Updated</Thead>
                  <Trow>
                    <Tcol className="bg-b2">1</Tcol>
                    <Tcol wrap3 className="bg-b2">
                      Duis id ante leo. Morbi orci ex, porttitor nec 
                      turpis ac, rutrum laoreet tellus. Cras nulla 
                      justo, consectetur eget ante non, faucibus 
                      finibus velit. Phasellus mollis sapien egestas, 
                      convallis magna id, egestas eros. Donec mauris 
                      leo, cursus sit amet ullamcorper ac, pretium 
                      vitae massa. Orci varius natoque penatibus et 
                      magnis dis parturient montes, nascetur ridiculus 
                      mus. Sed vitae orci felis. Etiam finibus, massa 
                      vel semper sagittis, velit nulla hendrerit justo, 
                      in ultrices lorem magna vitae quam.
                    </Tcol>
                    <Tcol className="bg-b2 text-center">Yes</Tcol>
                    <Tcol noWrap className="bg-b2 text-right">2021-01-01</Tcol>
                    <Tcol noWrap className="bg-b2 text-right">2021-01-01</Tcol>
                  </Trow>
                  <Trow>
                    <Tcol className="bg-b4">2</Tcol>
                    <Tcol wrap3 className="bg-b4">
                      Maecenas enim nibh, tincidunt lacinia molestie 
                      id, dictum vel felis. Cras laoreet laoreet arcu 
                      eu tincidunt. Aenean hendrerit mi purus, id 
                      vestibulum ligula tempus nec. Praesent 
                      sollicitudin ligula et ipsum gravida viverra. 
                      Cras pretium neque arcu, vitae mollis orci 
                      iaculis et. Nullam egestas nec sem in mollis. 
                      Vestibulum ante ipsum primis in faucibus orci 
                      luctus et ultrices posuere cubilia curae; 
                      Pellentesque habitant morbi tristique senectus 
                      et netus et malesuada fames ac turpis egestas. 
                      Quisque lobortis leo eu enim dapibus, at tempor 
                      metus egestas. Aliquam in eros ut erat fermentum 
                      volutpat ac in magna. Curabitur a magna at sem lacinia 
                      tristique ac ut nibh. Nulla erat nulla, mollis at 
                      finibus eget, mollis eu felis.</Tcol>
                    <Tcol className="bg-b4 text-center">No</Tcol>
                    <Tcol noWrap className="bg-b4 text-right">2021-01-01</Tcol>
                    <Tcol noWrap className="bg-b4 text-right">2021-01-01</Tcol>
                  </Trow>
                </Table>
                </div>
              </div>
              <Code language="typescript">
                {codeWrap}
              </Code>
            </div>

            <h2 id="sticky" className="uppercase font-bold text-lg mt-8">
              {_('Sticky')}
            </h2>
            <p className="py-4">
              <Translate>
                Headers and cells can use a combination of <code 
                  className="text-sm text-t2"
                >`stickLeft`</code>, <code 
                  className="text-sm text-t2"
                >`stickyTop`</code>, <code 
                  className="text-sm text-t2"
                >`stickyBottom`</code>, <code 
                  className="text-sm text-t2"
                >`stickyRight`</code> to make tables in the mobile view 
                responsive.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="h-64 w-72 overflow-auto">
                  <Table className="w-full">
                    <Thead stickyTop stickyLeft className="bg-b3 text-left">ID</Thead>
                    <Thead stickyTop noWrap className="bg-b3 text-left">First Name</Thead>
                    <Thead stickyTop noWrap className="bg-b3 text-left">Last Name</Thead>
                    <Thead stickyTop className="bg-b3 text-center">Active</Thead>
                    <Thead stickyTop className="bg-b3 text-right">Created</Thead>
                    <Thead stickyTop className="bg-b3 text-right">Updated</Thead>
                    <Trow>
                      <Tcol stickyLeft className="bg-b2">1</Tcol>
                      <Tcol className="bg-b2">John</Tcol>
                      <Tcol className="bg-b2">Doe</Tcol>
                      <Tcol className="bg-b2 text-center">Yes</Tcol>
                      <Tcol noWrap className="bg-b2 text-right">2021-01-01</Tcol>
                      <Tcol noWrap className="bg-b2 text-right">2021-01-02</Tcol>
                    </Trow>
                    <Trow>
                      <Tcol stickyLeft className="bg-b4">2</Tcol>
                      <Tcol className="bg-b4">Jane</Tcol>
                      <Tcol className="bg-b4">Doe</Tcol>
                      <Tcol className="bg-b4 text-center">No</Tcol>
                      <Tcol noWrap className="bg-b4 text-right">2021-02-03</Tcol>
                      <Tcol noWrap className="bg-b4 text-right">2021-02-04</Tcol>
                    </Trow>
                    <Trow>
                      <Tcol stickyLeft className="bg-b2">3</Tcol>
                      <Tcol className="bg-b2">Jack</Tcol>
                      <Tcol className="bg-b2">Doe</Tcol>
                      <Tcol className="bg-b2 text-center">No</Tcol>
                      <Tcol noWrap className="bg-b2 text-right">2021-03-05</Tcol>
                      <Tcol noWrap className="bg-b2 text-right">2021-03-06</Tcol>
                    </Trow>
                    <Trow>
                      <Tcol stickyLeft className="bg-b4">4</Tcol>
                      <Tcol className="bg-b4">Jan</Tcol>
                      <Tcol className="bg-b4">Doe</Tcol>
                      <Tcol className="bg-b4 text-center">No</Tcol>
                      <Tcol noWrap className="bg-b4 text-right">2021-04-07</Tcol>
                      <Tcol noWrap className="bg-b4 text-right">2021-04-08</Tcol>
                    </Trow>
                    <Trow>
                      <Tcol stickyLeft className="bg-b2">5</Tcol>
                      <Tcol className="bg-b2">Jimmy</Tcol>
                      <Tcol className="bg-b2">Doe</Tcol>
                      <Tcol className="bg-b2 text-center">Yes</Tcol>
                      <Tcol noWrap className="bg-b2 text-right">2021-05-09</Tcol>
                      <Tcol noWrap className="bg-b2 text-right">2021-05-10</Tcol>
                    </Trow>
                    <Trow>
                      <Tcol stickyLeft className="bg-b4">6</Tcol>
                      <Tcol className="bg-b4">Jenny</Tcol>
                      <Tcol className="bg-b4">Doe</Tcol>
                      <Tcol className="bg-b4 text-center">No</Tcol>
                      <Tcol noWrap className="bg-b4 text-right">2021-06-11</Tcol>
                      <Tcol noWrap className="bg-b4 text-right">2021-06-12</Tcol>
                    </Trow>
                  </Table>
                </div>
              </div>
              <Code language="typescript">
                {codeSticky}
              </Code>
            </div>

            <div className="flex items-center border-t border-b1 my-8 py-8">
              <Link className="text-t2" href="/component/modal">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Modals')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field">
                {_('Fields')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
}