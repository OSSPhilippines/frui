//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/Bread.js';
import Pager from 'components/Pager.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/component/pager';
const title = 'Pager Component';
const description = 'Pager allows for easy navigation between pages '
  + 'of content.';

const props = [
  [ 'className', 'string | Function', 'No', 'Standard HTML class names' ],
  [ 'end', 'false | JSX.Element', 'No', 'Custom end button. If false, the end button will not be shown' ],
  [ 'next', 'false | JSX.Element', 'No', 'Custom next button. If false, the next button will not be shown' ],
  [ 'onUpdate', 'Function', 'No', 'Function that is called when a page is clicked. The function receives the new skip value as its only argument' ],
  [ 'prev', 'false | JSX.Element', 'No', 'Custom previous button. If false, the previous button will not be shown' ],
  [ 'radius', 'number', 'No', 'Number of pages to show around the current page (default: 2)' ],
  [ 'skip', 'number', 'No', 'Number of items to skip' ],
  [ 'start', 'false | JSX.Element', 'No', 'Custom start button. If false, the start button will not be shown' ],
  [ 'style', 'CSSProperties | Function', 'No', 'Standard CSS input' ],
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
  className={({ active }) => active 
    ? 'w-8 h-8 font-normal!' 
    : 'w-8 h-8 text-blue-600'
  } 
  total={300} 
  skip={100} 
  take={50} 
/>`,
//5
`<Pager 
  className={({ active }) => active 
    ? 'w-8 h-8 font-normal!' 
    : 'w-8 h-8 text-blue-600'
  } 
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

const { C, Code, Props, Preview } = Docs;

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
      <Bread.Slicer />
      <Bread.Crumb icon="icons" href="/component">
        Components
      </Bread.Crumb>
      <Bread.Crumb>Pagers</Bread.Crumb>
    </Bread>
  );
};

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
        <a className="block pb-1 font-bold" href="#top">
          {_('Pagers')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#basic">{_('Basic Example')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#radius">{_('Radius')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#controls">{_('Controls')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#active">{_('Active')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#events">{_('Events')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#styles">{_('Global Styles')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#api">{_('API Reference')}</a>
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
        {_('Pagers')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the pager component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Pager from 'frui/Pager';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basic Example')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following example shows how to setup the basic pager component.
          </Translate>
        </p>
        <Preview 
          height={100}
          title="Basic Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Pager className="w-8 h-8" total={100} skip={20} take={10} />
          </Preview.Example>
          <Preview.Code>
            {`<Pager className="w-8 h-8" total={100} skip={20} take={10} />`}
          </Preview.Code>
        </Preview>
      </div>

      <h2 id="radius" className="uppercase font-bold text-lg mt-8">
        {_('Radius')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can limit the number of pages shown by using the <C value="radius" /> prop.
          </Translate>
        </p>
        <Preview 
          height={100}
          title="Radius Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Pager className="w-8 h-8" total={1000} skip={300} take={50} radius={3} />
          </Preview.Example>
          <Preview.Code>
            {`<Pager className="w-8 h-8" total={1000} skip={300} take={50} radius={3} />`}
          </Preview.Code>
        </Preview>
      </div>

      <h2 id="controls" className="uppercase font-bold text-lg mt-8">
        {_('Controls')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can add start, previous, next, and end controls by using 
            the <C value="start" />, <C value="prev" />, <C value="next" />, 
            and <C value="end" /> props.
          </Translate>
        </p>
        <Preview 
          height={100}
          title="Radius Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
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
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>

        <p className="pb-4">
          <Translate>
            You can also use custom elements for the controls.
          </Translate>
        </p>

        <Preview 
          height={100}
          title="Custom Radius Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
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
          </Preview.Example>
          <Preview.Code>{examples[3]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="active" className="uppercase font-bold text-lg mt-8">
        {_('Active')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can change the active page button styles by using 
            the <C value="activeClass" /> prop.
          </Translate>
        </p>
        <Preview 
          height={100}
          title="Active Class Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Pager 
              className={({ active }) => active 
                ? 'w-8 h-8 font-normal!' 
                : 'w-8 h-8 text-blue-600'
              } 
              total={300} 
              skip={100} 
              take={50} 
            />
          </Preview.Example>
          <Preview.Code>{examples[4]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The pager component can be made reactive by using 
            the <C value="onClick" /> prop.
          </Translate>
        </p>
        <Preview 
          height={100}
          title="Events Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Pager 
              className={({ active }) => active 
                ? 'w-8 h-8 font-normal!' 
                : 'w-8 h-8 text-blue-600'
              } 
              total={10000} 
              skip={skip} 
              onUpdate={skip => setSkip(skip)}  
              take={50} 
              radius={3}
              prev
              next
              start
              end
            />
          </Preview.Example>
          <Preview.Code>{examples[5]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-2">
        <Translate>
          You can use 
          the <C value="frui-pager" />, <C value="frui-pager-start" />, <C value="frui-pager-prev" />, <C value="frui-pager-page" />, <C value="frui-pager-active" />, <C value="frui-pager-next" />, 
          and <C value="frui-pager-end" /> CSS classes to globally 
          theme pagers.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Pager>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component/notifier">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Notifiers')}
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
    <Docs.Head
      uri={uri}
      title={title}
      description={description}
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <Docs pathname={uri}>
      <Menu />
      <Body />
    </Docs>
  );
};

//defaults to page
export default Page;
