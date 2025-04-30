//types
import type { Crumb } from 'modules/components/Crumbs';
import type { PaginationProps } from 'frui/element/Pagination';

//hooks
import { useState } from 'react';
import { useLanguage } from 'r22n';

//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Pagination from 'frui/element/Pagination';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

//constants
const codeBasic = `
const [currentPage, setCurrentPage] = useState(1);
<Pagination
  total={500}
  start={(currentPage - 1) * 100}
  range={100}
  page={(p) => setCurrentPage(p)}
/>
`.trim();

const codeMinimal = `
const [currentPage, setCurrentPage] = useState(1);
<Pagination
  total={300}
  start={(currentPage - 1) * 50}
  range={50}
  prev
  next
  radius={1}
  page={(p) => setCurrentPage(p)}
/>
`.trim();

const codeControls = `
const [currentPage, setCurrentPage] = useState(1);
<Pagination
  total={500}
  start={(currentPage - 1) * 100}
  range={100}
  rewind
  prev
  next
  forward
  page={(p) => setCurrentPage(p)}
/>
`.trim();

const codeDisabled = `
const [currentPage, setCurrentPage] = useState(1);
<Pagination
  total={250}
  start={(currentPage - 1) * 50}
  range={50}
  rewind
  prev
  next
  forward
  md
  page={(p) => setCurrentPage(p)}
/>
`.trim();

const codeSquare = `
const [currentPage, setCurrentPage] = useState(1);
<Pagination
  total={400}
  start={(currentPage - 1) * 80}
  range={80}
  square={30}
  border={false}
  radius={3}
  prev
  next
  page={(p) => setCurrentPage(p)}
/>
`.trim();

const codeColors = `
<Pagination total={500} start={0} range={100} white />
<Pagination total={500} start={100} range={100} black />
<Pagination total={500} start={200} range={100} info />
<Pagination total={500} start={300} range={100} warning />
<Pagination total={500} start={400} range={100} success />
<Pagination total={500} start={0} range={100} error />
<Pagination total={500} start={100} range={100} muted />
<Pagination total={500} start={200} range={100} primary />
<Pagination total={500} start={300} range={100} secondary />
<Pagination total={500} start={400} range={100} color="purple" />
`.trim();

const codeSizes = `
<Pagination total={500} start={0} range={100} xs />
<Pagination total={500} start={0} range={100} sm />
<Pagination total={500} start={0} range={100} md />
<Pagination total={500} start={0} range={100} lg />
<Pagination total={500} start={0} range={100} xl />
<Pagination total={500} start={0} range={100} xl2 />
<Pagination total={500} start={0} range={100} xl3 />
<Pagination total={500} start={0} range={100} xl4 />
<Pagination total={500} start={0} range={100} xl5 />
<Pagination total={500} start={0} range={100} size="custom-size" style={{ fontSize: '28px', minWidth: '48px', height: '48px' }} />
`.trim();

const codeCustomColors = `
const [currentPage, setCurrentPage] = useState(1);
<Pagination
  total={600}
  start={(currentPage - 1) * 120}
  range={120}
  radius={2}
  prev
  next
  link
  control
  color="teal"
  size="custom-teal"
  style={{ fontSize: '17.6px', minWidth: '40px', height: '40px' }}
  page={(p) => setCurrentPage(p)}
/>
`.trim();

const codeCustom = `
const [currentPage, setCurrentPage] = useState(1);
<Pagination
  total={1000}
  start={(currentPage - 1) * 200}
  range={200}
  radius={3}
  rewind
  prev
  next
  forward
  lg
  success
  square={40}
  link
  control
  border={false}
  background={false}
  className="custom-pagination"
  style={{ padding: '8px', backgroundColor: '#E6F5ED', fontFamily: 'Arial' }}
  page={(p) => setCurrentPage(p)}
/>

// In your CSS file:
.custom-pagination .frui-pagination-btn:hover:not(.control) {
  background-color: #D0E8D9;
  color: #00A352;
}
`.trim();

//functions
function PaginationExample({ total = 500, range = 100, ...props }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Pagination
      total={total}
      range={range}
      start={(currentPage - 1) * range}
      page={(p) => setCurrentPage(p)}
      {...props}
    />
  );
}

export default function PaginationPage() {
  //hooks
  const { _ } = useLanguage();

  //variables
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Pagination' },
  ];

  const props = [
    [_('total'), 'number', 'No', 'Total items (default: 0)'],
    [_('start'), 'number', 'No', 'Starting index (default: 0)'],
    [_('range'), 'number', 'No', 'Items per page (default: 50)'],
    [_('radius'), '0 | 1 | 2 | 3 | 4', 'No', 'Pages shown before/after current (default: 2)'],
    [_('next'), 'boolean', 'No', 'Show next button (disabled on last page)'],
    [_('prev'), 'boolean', 'No', 'Show previous button (disabled on first page)'],
    [_('rewind'), 'boolean', 'No', 'Show first page button (disabled on first page)'],
    [_('forward'), 'boolean', 'No', 'Show last page button (disabled on last page)'],
    [_('link'), 'boolean', 'No', 'Render page numbers as links (default: false)'],
    [_('control'), 'boolean', 'No', 'Style control buttons differently (default: false)'],
    [_('border'), 'boolean', 'No', 'Show button borders (default: true)'],
    [_('background'), 'boolean', 'No', 'Show button backgrounds (default: true)'],
    [_('square'), 'number', 'No', 'Set square size in pixels (default: 0)'],
    [_('size'), 'string', 'No', 'Custom size class (e.g., "custom-size")'],
    [_('xs'), 'boolean', 'No', '12px button size'],
    [_('sm'), 'boolean', 'No', '14px button size'],
    [_('md'), 'boolean', 'No', '16px button size (default)'],
    [_('lg'), 'boolean', 'No', '18px button size'],
    [_('xl'), 'boolean', 'No', '20px button size'],
    [_('xl2'), 'boolean', 'No', '24px button size'],
    [_('xl3'), 'boolean', 'No', '30px button size'],
    [_('xl4'), 'boolean', 'No', '36px button size'],
    [_('xl5'), 'boolean', 'No', '48px button size'],
    [_('color'), 'string', 'No', 'Custom color (e.g., "purple")'],
    [_('white'), 'boolean', 'No', 'White active color'],
    [_('black'), 'boolean', 'No', 'Black active color'],
    [_('info'), 'boolean', 'No', 'Blue active color'],
    [_('warning'), 'boolean', 'No', 'Orange active color'],
    [_('success'), 'boolean', 'No', 'Green active color'],
    [_('error'), 'boolean', 'No', 'Red active color'],
    [_('muted'), 'boolean', 'No', 'Gray active color'],
    [_('primary'), 'boolean', 'No', 'Primary blue active color'],
    [_('secondary'), 'boolean', 'No', 'Secondary gray active color'],
    [_('page'), '(page: number) => void', 'No', 'Callback for page selection'],
    [_('className'), 'string', 'No', 'Additional CSS classes'],
    [_('style'), 'CSSProperties', 'No', 'Inline CSS styles'],
  ];

  //render
  return (
    <LayoutPanel
      uri="/component/pagination"
      title="Pagination Component"
      description="Pagination component in FRUI for navigating through pages with customizable controls."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <Link className="block pb-1" href="#top">Pagination</Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1"><Link href="#props">{_('Props')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#basic">{_('Basic Usage')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#minimal">{_('Minimal Navigation')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#controls">{_('Full Controls')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#disabled">{_(' Yorum: Disabled Controls')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#square">{_('Square Layout')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#colors">{_('Colors')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#sizes">{_('Sizes')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#custom-colors">{_('Custom Colors and Sizes')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#custom">{_('Custom Styling')}</Link></li>
              </ul>
            </div>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Pagination')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Pagination from 'frui/Pagination';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basic Usage')}
            </h2>
            <p className="py-4">
              <Translate>Simple pagination with page numbers only.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <PaginationExample total={500} range={100} />
              </div>
              <Code language="typescript">
                {codeBasic}
              </Code>
            </div>

            <h2 id="minimal" className="uppercase font-bold text-lg mt-8">
              {_('Minimal Navigation')}
            </h2>
            <p className="py-4">
              <Translate>Pagination with just prev and next buttons.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <PaginationExample total={300} range={50} prev next radius={1} />
              </div>
              <Code language="typescript">
                {codeMinimal}
              </Code>
            </div>

            <h2 id="controls" className="uppercase font-bold text-lg mt-8">
              {_('Full Controls')}
            </h2>
            <p className="py-4">
              <Translate>Pagination with rewind, prev, next, and forward controls.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <PaginationExample total={500} range={100} rewind prev next forward />
                  </div>
              <Code language="typescript">
                {codeControls}
              </Code>
            </div>

            <h2 id="disabled" className="uppercase font-bold text-lg mt-8">
              {_('Disabled Controls')}
            </h2>
            <p className="py-4">
              <Translate>Pagination with controls disabled on first and last pages.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <PaginationExample total={250} range={50} rewind prev next forward md />
              </div>
              <Code language="typescript">
                {codeDisabled}
              </Code>
            </div>

            <h2 id="square" className="uppercase font-bold text-lg mt-8">
              {_('Square Layout')}
            </h2>
            <p className="py-4">
              <Translate>Pagination with square buttons and no borders.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <PaginationExample total={400} range={80} square={30} border={false} radius={3} prev next />
              </div>
              <Code language="typescript">
                {codeSquare}
              </Code>
            </div>

            <h2 id="colors" className="uppercase font-bold text-lg mt-8">
              {_('Colors')}
            </h2>
            <p className="py-4">
              <Translate>All color variants for active page.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1 flex flex-col gap-2">
                <Pagination total={500} start={0} range={100} white />
                <Pagination total={500} start={100} range={100} black />
                <Pagination total={500} start={200} range={100} info />
                <Pagination total={500} start={300} range={100} warning />
                <Pagination total={500} start={400} range={100} success />
                <Pagination total={500} start={0} range={100} error />
                <Pagination total={500} start={100} range={100} muted />
                <Pagination total={500} start={200} range={100} primary />
                <Pagination total={500} start={300} range={100} secondary />
                <Pagination total={500} start={400} range={100} color="purple" />
              </div>
              <Code language="typescript">
                {codeColors}
              </Code>
            </div>

            <h2 id="sizes" className="uppercase font-bold text-lg mt-8">
              {_('Sizes')}
            </h2>
            <p className="py-4">
              <Translate>All size variants from xs to xl5, plus custom size.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1 flex flex-col gap-2">
                <Pagination total={500} start={0} range={100} xs />
                <Pagination total={500} start={0} range={100} sm />
                <Pagination total={500} start={0} range={100} md />
                <Pagination total={500} start={0} range={100} lg />
                <Pagination total={500} start={0} range={100} xl />
                <Pagination total={500} start={0} range={100} xl2 />
                <Pagination total={500} start={0} range={100} xl3 />
                <Pagination total={500} start={0} range={100} xl4 />
                <Pagination total={500} start={0} range={100} xl5 />
                <Pagination total={500} start={0} range={100} size="custom-size" style={{ fontSize: '28px', minWidth: '48px', height: '48px' }} />
              </div>
              <Code language="typescript">
                {codeSizes}
              </Code>
            </div>

            <h2 id="custom-colors" className="uppercase font-bold text-lg mt-8">
              {_('Custom Colors and Sizes')}
            </h2>
            <p className="py-4">
              <Translate>Pagination with custom color and size, plus link and control styling.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <PaginationExample
                  total={600}
                  range={120}
                  radius={2}
                  prev
                  next
                  link
                  control
                  color="teal"
                  size="custom-teal"
                  style={{ fontSize: '17.6px', minWidth: '40px', height: '40px' }}
                />
              </div>
              <Code language="typescript">
                {codeCustomColors}
              </Code>
            </div>

            <h2 id="custom" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styling')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to the pagination component or use any combination of the following CSS classes: <C value="frui-pagination" />, <C value="frui-pagination-btn" />, <C value="frui-pagination-span" /> to fully customize the appearance.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <PaginationExample
                  total={1000}
                  range={200}
                  radius={3}
                  rewind
                  prev
                  next
                  forward
                  lg
                  success
                  square={40}
                  link
                  control
                  border={false}
                  background={false}
                  className="custom-pagination"
                  style={{ padding: '8px', backgroundColor: '#E6F5ED', fontFamily: 'Arial' }}
                />
              </div>
              <Code language="typescript">
                {codeCustom}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/component/breadcrumb">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Breadcrumb')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/component/table">
                {_('Table')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
}