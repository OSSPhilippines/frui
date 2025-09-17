import { useLanguage, Translate } from 'r22n';

import type { PageProps } from '../../app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C 
} from '../../app/index.js';
import type { Crumb } from '../../../components/element/Crumbs.js';
import Crumbs from '../../../components/element/Crumbs.js';
import List from '../../../components/format/List.js';

const crumbs: Crumb[] = [
  { icon: 'text-height', label: 'Formats', href: '/format' },
  { label: 'List' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'ordered', 'boolean', 'No', 'Show ordered list' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'Yes', 'Default value' ]
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/format/list">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <a href="#top">{_('List')}</a>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
              <li className="pl-3 pb-1">
                <a href="#props">
                  {_('Props')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#basic">
                  {_('Basics')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#customize">
                  {_('Customize')}
                </a>
              </li>
            </ul>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('List')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import List from 'frui/formats/List';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <List value={['electronics', 'laptops']} />
              </div>
              <Code language="typescript">
                {`<List value={['electronics', 'laptops']} />`}
              </Code>
            </div>

            <h2 id="customize" className="uppercase font-bold text-lg mt-8">
              {_('Customize')}
            </h2>
            <p className="py-4">
              <Translate>
                You can use the <C l value="ordered" /> prop to show an 
                ordered list.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <List ordered value={['electronics', 'laptops']} />
              </div>
              <Code language="typescript">
                {`<List ordered value={['electronics', 'laptops']} />`}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <a className="text-t2" href="/format/link">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Link')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/format/markdown">
                {_('Markdown')}
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}

export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/format/list"
      title="List Format"
      description="List formats in FRUI, are ReactJS components that convert values to order or unordered lists."
      styles={styles}
    />
  );
}

export default function Page() {
  return (
    <LayoutProvider>
      <Body />
    </LayoutProvider>
  );
}
