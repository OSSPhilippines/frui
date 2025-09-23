//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';

//frui
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';
import Pager from 'components/element/Pager.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Code, 
  C, 
  Props
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Pager' }
];

const props = [
  [ 'activeClass', 'string', 'No', 'Class name to apply to the active page button' ],
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'end', 'false | JSX.Element', 'No', 'Custom end button. If false, the end button will not be shown' ],
  [ 'next', 'false | JSX.Element', 'No', 'Custom next button. If false, the next button will not be shown' ],
  [ 'onClick', 'Function', 'No', 'Function that is called when a page is clicked. The function receives the new skip value as its only argument' ],
  [ 'prev', 'false | JSX.Element', 'No', 'Custom previous button. If false, the previous button will not be shown' ],
  [ 'radius', 'number', 'No', 'Number of pages to show around the current page (default: 2)' ],
  [ 'skip', 'number', 'No', 'Number of items to skip' ],
  [ 'start', 'false | JSX.Element', 'No', 'Custom start button. If false, the start button will not be shown' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
  [ 'take', 'number', 'No', 'Number of items to take' ],
  [ 'total', 'number', 'No', 'Total number of items' ]
];

const examples = [
//0
`<Pager className="w-8 h-8" total={1000} skip={100} take={50} />`,
//1
`<Pager className="w-8 h-8" total={1000} skip={300} take={50} radius={3} />`,
//2
`<Pager className="w-8 h-8" total={1000} skip={300} take={50} radius={3} prev next start end />`,
//3
`<Pager 
  className="w-8 h-8 text-blue-600" 
  total={10000} 
  skip={300} 
  take={50} 
  radius={3} 
  prev={<i className="fas fa-fw fa-backward text-black"></i>}
  next={<i className="fas fa-fw fa-forward text-black"></i>}
  start={<i className="fas fa-fw fa-backward-fast text-black"></i>}
  end={<i className="fas fa-fw fa-forward-fast text-black"></i>}
/>`,
//4
`<Pager 
  className="w-8 h-8 text-blue-600" 
  activeClass="w-8 h-8 font-normal!" 
  total={300} 
  skip={100} 
  take={50} 
/>`,
//5
`<Pager 
  className="w-8 h-8 text-blue-600" 
  activeClass="w-8 h-8 font-normal!"
  total={10000} 
  skip={skip} 
  onClick={skip => setSkip(skip)}  
  take={50} 
  radius={3}
  prev
  next
  start
  end
/>`
];

//--------------------------------------------------------------------//
// Components

/**
 * Aside right menu component
 */
export function Menu() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <aside className={
      'hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 '
      + 'border-l theme-bc-1 text-sm'
    }>
      <h4 className={
        'p-3 border-b theme-bc-1 theme-bg-1 text-sm uppercase '
        + 'font-semibold'
      }>
        {_('Contents')}
      </h4>
      <div className="p-3">
        <a className="block pb-1" href="#top">{_('Pager')}</a>
        <ul className="list-disc pl-3">
          <li className="pl-3 pb-1">
            <a href="#props">{_('Props')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#basic">{_('Basic Example')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#radius">{_('Radius')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#controls">{_('Controls')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#active">{_('Active')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#events">{_('Events')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#styles">{_('Custom Styles')}</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

/**
 * Documentation body component
 */
export function Body() {
  //hooks
  const { _ } = useLanguage();
  const [ skip, setSkip ] = useState<number>(300);
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Pager')}
      </h1>
      <p className="py-2">
        <Translate>
          Import the pager component like the following.
        </Translate>
      </p>
      <Code language="typescript" className="mt-2">
        {`import Pager from 'frui/Pager';`}
      </Code>

      <h2 id="props" className="uppercase font-bold text-lg mt-8">
        {_('Props')}
      </h2>
      <p className="py-2">
        <Translate>
          The <C value="Pager" /> component can be passed the following props.
        </Translate>
      </p>
      <Props props={props} />

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basic Example')}
      </h2>
      <p className="py-2">
        <Translate>
          The following example shows how to setup the basic pager component.
        </Translate>
      </p>
      <div>
        <Pager className="w-8 h-8" total={1000} skip={100} take={50} />
        <Code className="mt-2 mb-8" language="typescript">
          {examples[0]}
        </Code>
      </div>

      <h2 id="radius" className="uppercase font-bold text-lg mt-8">
        {_('Radius')}
      </h2>
      <p className="py-2">
        <Translate>
          You can limit the number of pages shown by using the <C value="radius" /> prop.
        </Translate>
      </p>
      <div>
        <Pager className="w-8 h-8" total={1000} skip={300} take={50} radius={3} />
        <Code className="mt-2 mb-8" language="typescript">
          {examples[1]}
        </Code>
      </div>

      <h2 id="controls" className="uppercase font-bold text-lg mt-8">
        {_('Controls')}
      </h2>
      <p className="py-2">
        <Translate>
          You can add start, previous, next, and end controls by using 
          the <C value="start" />, <C value="prev" />, <C value="next" />, 
          and <C value="end" /> props.
        </Translate>
      </p>
      <div>
        <Pager 
          className="w-8 h-8" 
          total={10000} 
          skip={300} 
          take={50} 
          radius={3} 
          prev
          next
          start
          end
        />
        <Code className="mt-2 mb-8" language="typescript">
          {examples[2]}
        </Code>

        <p className="pb-4">
          <Translate>
            You can also use custom elements for the controls.
          </Translate>
        </p>

        <Pager 
          className="w-8 h-8 text-blue-600" 
          total={10000} 
          skip={300} 
          take={50} 
          radius={3} 
          prev={<i className="fas fa-fw fa-backward text-black"></i>}
          next={<i className="fas fa-fw fa-forward text-black"></i>}
          start={<i className="fas fa-fw fa-backward-fast text-black"></i>}
          end={<i className="fas fa-fw fa-forward-fast text-black"></i>}
        />
        <Code className="mt-2 mb-8" language="typescript">
          {examples[3]}
        </Code>
      </div>

      <h2 id="active" className="uppercase font-bold text-lg mt-8">
        {_('Active')}
      </h2>
      <p className="py-2">
        <Translate>
          You can change the active page button styles by using 
          the <C value="activeClass" /> prop.
        </Translate>
      </p>
      <div>
        <Pager 
          className="w-8 h-8 text-blue-600" 
          activeClass="w-8 h-8 font-normal!" 
          total={300} 
          skip={100} 
          take={50} 
        />
        <Code className="mt-2 mb-8" language="typescript">
          {examples[4]}
        </Code>
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <p className="py-2">
        <Translate>
          The pager component can be made reactive by using 
          the <C value="onClick" /> prop.
        </Translate>
      </p>
      <div>
        <Pager 
          className="w-8 h-8 text-blue-600" 
          activeClass="w-8 h-8 font-normal!"
          total={10000} 
          skip={skip} 
          onClick={skip => setSkip(skip)}  
          take={50} 
          radius={3}
          prev
          next
          start
          end
        />
        <Code className="mt-2 mb-8" language="typescript">
          {examples[5]}
        </Code>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Custom Styles')}
      </h2>
      <p className="py-2">
        <Translate>
          You can add your own custom class to the tabs component or use 
          the <C value="frui-pager" />, <C value="frui-pager-start" />, <C value="frui-pager-prev" />, <C value="frui-pager-page" />, <C value="frui-pager-active" />, <C value="frui-pager-next" />, 
          and <C value="frui-pager-end" /> CSS class.
        </Translate>
      </p>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component/table">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Notify')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/tooltip">
          {_('Progress')}
          <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/component/pager"
      title="Pager Component"
      description={
        'Pager in FRUI is a React component that allows for easy '
        + 'navigation between pages of content.'
      }
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <LayoutProvider>
      <LayoutPanel pathname="/component/pager">
        <main className="flex flex-col h-full w-full">
          <div className="p-3 theme-bg-2">
            <Crumbs crumbs={crumbs} />
          </div>
          <section className="flex-grow relative h-full">
            <Menu />
            <Body />
          </section>
        </main>
      </LayoutPanel>
    </LayoutProvider>
  );
};

//defaults to page
export default Page;
