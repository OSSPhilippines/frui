import { useLanguage } from 'r22n';

import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code
} from 'plugins/app/index.js';
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';
import Imagelist from 'components/format/Imagelist.js';

const codeBasic = `
<Imagelist className="flex" value={[
  'https://images.wsj.net/im-580612/8SR', 
  'https://images.wsj.net/im-580612/8SR'
]} width="50" />`.trim();

const crumbs: Crumb[] = [
  { icon: 'text-height', label: 'Formats', href: '/format' },
  { label: 'Imagelist' }
];

const props = [
  [ 'alt', 'string', 'No', 'Alt text for image' ],
  [ 'className', 'string', 'No', 'Standard HTML class names applied to all images' ],
  [ 'height', 'string|number', 'No', 'Height of image' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object applied to all images' ],
  [ 'value', 'string[]', 'Yes', 'Default value' ],
  [ 'width', 'string|number', 'No', 'Width of image' ]
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/format/imagelist">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l theme-bc-1 text-sm">
            <h4 className="p-3 border-b theme-bc-1 theme-bg-1 uppercase font-semibold">
              <a href="#top">{_('Imagelist')}</a>
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
              {_('Imagelist')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Imagelist from 'frui/formats/Imagelist';`}
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
                <Imagelist className="flex" value={[
                  'https://images.wsj.net/im-580612/8SR', 
                  'https://images.wsj.net/im-580612/8SR'
                ]} width="50" />
              </div>
              <Code language="typescript">
                {codeBasic}
              </Code>
            </div>

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/format/image">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Image')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/format/json">
                {_('JSON')}
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
      uri="/format/imagelist"
      title="Image List Format"
      description="Image list formats in FRUI, are ReactJS components that convert values to a list of images."
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
