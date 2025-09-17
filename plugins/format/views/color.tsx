import { useLanguage, Translate } from 'r22n';

import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C 
} from 'plugins/app/index.js';
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';

import Color from 'components/format/Color.js';

const crumbs: Crumb[] = [
  { icon: 'text-height', label: 'Formats', href: '/format' },
  { label: 'Color' }
];

const props = [
  [ 'box', 'boolean', 'No', 'Show color box' ],
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'lg', 'boolean', 'No', 'Show large color box' ],
  [ 'md', 'boolean', 'No', 'Show medium size color box' ],
  [ 'sm', 'boolean', 'No', 'Show small color box' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'text', 'boolean', 'No', 'Show color text' ],
  [ 'value', 'string', 'Yes', 'Default value' ]
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/format/color">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l theme-bc-1 text-sm">
            <h4 className="p-3 border-b theme-bc-1 theme-bg-1 uppercase font-semibold">
              <a href="#top">{_('Color')}</a>
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
              {_('Color')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Color from 'frui/formats/Color';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Color value="salmon" />
              </div>
              <Code language="typescript">
                {`<Color value="salmon" />`}
              </Code>
            </div>

            <h2 id="customize" className="uppercase font-bold text-lg mt-8">
              {_('Customize')}
            </h2>
            <p className="py-4">
              <Translate>
                You can apply different sizes to the 
                <C l value="Color" /> format.
              </Translate>
            </p>

            <h3 className="font-semibold text-md mt-8">
              {_('Box')}
            </h3>
            <p className="py-4">
              <Translate>
                Use <C value="box" /> prop to hide the color box.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Color box={false} value="salmon" />
              </div>
              <Code language="typescript">
                {`<Color box={false} value="salmon" />`}
              </Code>
            </div>

            <h3 className="font-semibold text-md mt-8">
              {_('Sizes')}
            </h3>
            <p className="py-4">
              <Translate>
                Use <C value="sm" />, <C value="md" />, or <C value="lg" r /> 
                props to change the size of the color box.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Color lg value="salmon" />
              </div>
              <Code language="typescript">
                {`<Color lg value="salmon" />`}
              </Code>
            </div>

            <p className="py-4">
              <Translate>
                You can also add your own custom class to 
                <C l value="Color" /> format or use any combination of 
                <C l value="frui-format-color" />, and
                <C l value="frui-format-color-box" /> CSS classes.
              </Translate>
            </p>

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/format/code">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Code')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/format/country">
                {_('Country')}
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
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
      uri="/format/color"
      title="Color Format"
      description="Color formats in FRUI, are ReactJS components that convert values to color displays."
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
