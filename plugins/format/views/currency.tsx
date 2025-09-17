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
import Currency from '../../../components/format/Currency.js';

const crumbs: Crumb[] = [
  { icon: 'text-height', label: 'Formats', href: '/format' },
  { label: 'Currency' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'flag', 'boolean', 'No', 'Show flag' ],
  [ 'lg', 'boolean', 'No', 'Show large currency flag' ],
  [ 'md', 'boolean', 'No', 'Show medium size currency flag' ],
  [ 'sm', 'boolean', 'No', 'Show small currency flag' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'text', 'boolean', 'No', 'Show currency text' ],
  [ 'value', 'string', 'Yes', 'Default value' ]
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/format/currency">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <a href="#top">{_('Currency')}</a>
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
              {_('Currency')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Currency from 'frui/formats/Currency';`}
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
                <Currency value="USD" />
              </div>
              <Code language="typescript">
                {`<Currency value="USD" />`}
              </Code>
            </div>

            <h2 id="customize" className="uppercase font-bold text-lg mt-8">
              {_('Customize')}
            </h2>
            <p className="py-4">
              <Translate>
                You can apply different sizes to the 
                <C l value="Currency" /> format.
              </Translate>
            </p>

            <h3 className="font-semibold text-md mt-8">
              {_('Flag')}
            </h3>
            <p className="py-4">
              <Translate>
                Use <C value="flag" /> prop to hide the currency flag.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Currency flag={false} value="USD" />
              </div>
              <Code language="typescript">
                {`<Currency flag={false} value="USD" />`}
              </Code>
            </div>

            <h3 className="font-semibold text-md mt-8">
              {_('Sizes')}
            </h3>
            <p className="py-4">
              <Translate>
                Use <C value="sm" />, <C value="md" />, or <C value="lg" r /> 
                props to change the size of the currency flag.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Currency lg value="USD" />
              </div>
              <Code language="typescript">
                {`<Currency lg value="USD" />`}
              </Code>
            </div>

            <p className="py-4">
              <Translate>
                You can also add your own custom class to 
                <C l value="Currency" /> format or use any combination of 
                <C l value="frui-format-country" />, and
                <C l value="frui-format-country-flag" /> CSS classes.
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <a className="text-t2" href="/format/country">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Country')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/format/date">
                {_('Date')}
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
      uri="/format/currency"
      title="Currency Format"
      description="Currency formats in FRUI, are ReactJS components that convert values to currency displays."
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
