import { useLanguage } from 'r22n';

import type { PageProps } from '../../app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code
} from '../../app/index.js';
import type { Crumb } from '../../../components/element/Crumbs.js';
import Crumbs from '../../../components/element/Crumbs.js';
import Formula from '../../../components/format/Formula.js';

const crumbs: Crumb[] = [
  { icon: 'text-height', label: 'Formats', href: '/format' },
  { label: 'Formula' }
];

const props = [
  [ 'data', 'string', 'No', 'Variables of the formula' ],
  [ 'formula', 'string', 'Yes', 'Formula template' ],
  [ 'value', 'string', 'Yes', 'Default value' ]
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/format/formula">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <a href="#top">{_('Formula')}</a>
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
            </ul>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Formula')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Formula from 'frui/formats/Formula';`}
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
               <Formula value="29" formula="{x} + {this} + {y}" data={{ x: 4, y: 5 }} />
              </div>
              <Code language="typescript">
                {`<Formula value="29" formula="{x} + {this} + {y}" data={{ x: 4, y: 5 }} />`}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <a className="text-t2" href="/format">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Formats')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/format/country">
                {_('Country')}
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
      uri="/format/formula"
      title="Formula Format"
      description="Formula formats in FRUI, are ReactJS components that display an evaluated formula."
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
