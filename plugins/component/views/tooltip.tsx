//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';
import Tooltip from 'components/element/Tooltip.js';
import Button from 'components/form/Button.js';

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
  { label: 'Tooltip' }
];

const props = [
  ['arrow', 'boolean', 'No', 'Displays an arrow on the tooltip'],
  ['bottom', 'boolean', 'No', 'Places in bottom'],
  ['children', 'ReactNode', 'Yes', 'Content that triggers tooltip'],
  ['className', 'string', 'No', 'Standard HTML class names'],
  ['color', 'string', 'No', 'Custom CSS hex or name'],
  ['curved', 'boolean', 'No', 'Slight curved corners'],
  ['error', 'boolean', 'No', 'Red tooltip'],
  ['hover', 'boolean', 'No', 'Displays on hover'],
  ['info', 'boolean', 'No', 'Blue tooltip'],
  ['muted', 'boolean', 'No', 'Gray tooltip'],
  ['left', 'boolean', 'No', 'Places in left'],
  ['opacity', 'string | number', 'No', 'Adjust the transparency [0-100]'],
  ['pill', 'boolean', 'No', 'Max rounded corners'],
  ['right', 'boolean', 'No', 'Places in right'],
  ['rounded', 'boolean', 'No', 'Rounded corners'],
  ['show', 'boolean', 'No', 'Show the tooltip'],
  ['style', 'CSS Object', 'No', 'Standard CSS input'],
  ['success', 'boolean', 'No', 'Green tooltip'],
  ['text', 'string', 'Yes', 'Text displayed inside the tooltip'],
  ['top', 'boolean', 'No', 'Places in top (default)'],
  ['warning', 'boolean', 'No', 'Orange tooltip']
];

const examples = [
//0
`<Tooltip text="Submit" hover>
  <Button color="#333">Submit</Button>
</Tooltip>`,
//1
`<Tooltip text="Submit info" info hover>
  <Button info>Submit info</Button>
</Tooltip>`,
//2
`<Tooltip text="Submit warning" warning hover>
  <Button warning>Submit Warning</Button>
</Tooltip>`,
//3
`<Tooltip text="Submit success" success hover>
  <Button success>Submit Success</Button>
</Tooltip>`,
//4
`<Tooltip text="Submit Error" error hover>
  <Button error>Submit Error</Button>
</Tooltip>`,
//5
`<Tooltip text="Submit Muted" muted hover>
  <Button muted>Submit Muted</Button>
</Tooltip>`,
//6
`<Tooltip text="Submit Custom" color="salmon" hover>
  <Button color="salmon">Submit Custom</Button>
</Tooltip>`,
//7
`<Tooltip text="Submit Curved" info curved hover>
  <Button info curved>Submit Curved</Button>
</Tooltip>`,
//8
`<Tooltip text="Submit Rounded" warning rounded hover>
  <Button warning rounded>Submit Rounded</Button>
</Tooltip>`,
//9
`<Tooltip text="Submit Pill" success pill hover>
  <Button success pill>Submit Pill</Button>
</Tooltip>`,
//10
`<Tooltip text="Submit" arrow hover>
  <Button color="#333">Submit</Button>
</Tooltip>`,
//11
`<Tooltip text="top-right" top right hover>
  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
    topRight
  </Button>
</Tooltip>`,
//12
`<Tooltip text="Submit" padding={20} arrow hover>
  <Button color="#333" rounded>Submit</Button>
</Tooltip>`,
//13
`<Tooltip text="Submit" opacity={50} hover>
  <Button color="#333">Submit</Button>
</Tooltip>`
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
        <a className="block pb-1" href="#top">{_('Tooltip')}</a>
        <ul className="list-disc pl-3">
          <li className="pl-3 pb-1">
            <a href="#props">{_('Props')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#basic">{_('Basic Example')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#types">{_('Types')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#custom">{_('Custom Color')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#arrow">{_('Arrow')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#placements">{_('Placements')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#rounded">{_('Rounded')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#opacity">{_('Opacity')}</a>
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
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Tooltip')}
      </h1>
      <Code language="typescript" className="mt-2">
        {`import Tooltip from 'frui/Tooltip';`}
      </Code>

      <h2 id="props" className="uppercase font-bold text-lg mt-8">
        {_('Props')}
      </h2>
      <Props props={props} />

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basic Example')}
      </h2>
      <p className="py-4">
        <Translate>
          Tooltips are interactive ReactJS components that display 
          informative text when users hover over, focus on, or 
          tap an element.
        </Translate>
      </p>
      <div>
        <Tooltip text="Submit" hover>
          <Button color="black">Submit</Button>
        </Tooltip>
        <Code language="typescript" className="mt-4">
          {examples[0]}
        </Code>
      </div>

      <h2 id="types" className="uppercase font-bold text-lg mt-8">
        {_('Types')}
      </h2>
      <p className="py-4">
        <Translate>
          Tooltips have the following types: default, <C value="info" />,
          <C l value="warning" />, <C value="success" />,
          <C l value="error" />, and <C value="muted" />.
        </Translate>
      </p>
      <div>
        <Tooltip text="Submit info" info hover>
          <Button info>Submit info</Button>
        </Tooltip>
        <Code language="typescript" className="my-4">
          {examples[1]}
        </Code>
        
        <Tooltip text="Submit warning" warning hover>
          <Button warning>Submit Warning</Button>
        </Tooltip>
        <Code language="typescript" className="my-4">
          {examples[2]}
        </Code>
        
        <Tooltip text="Submit success" success hover>
          <Button success>Submit Success</Button>
        </Tooltip>
        <Code language="typescript" className="my-4">
          {examples[3]}
        </Code>
        
        <Tooltip text="Submit Error" error hover>
          <Button error>Submit Error</Button>
        </Tooltip>
        <Code language="typescript" className="my-4">
          {examples[4]}
        </Code>
        
        <Tooltip text="Submit Muted" muted hover>
          <Button muted>Submit Muted</Button>
        </Tooltip>
        <Code language="typescript" className="mt-4">
          {examples[5]}
        </Code>
      </div>

      <h2 id="custom" className="uppercase font-bold text-lg mt-8">
        {_('Custom Color')}
      </h2>
      <p className="py-4">
        <Translate>
          You can have custom CSS compatible colors which includes
          hex and color names using the <C value="color" /> prop.
        </Translate>
      </p>
      <div>
        <Tooltip text="Submit Custom" color="salmon" hover>
          <Button color="salmon">Submit Custom</Button>
        </Tooltip>
        <Code language="typescript" className="mt-4">
          {examples[6]}
        </Code>
      </div>

      <h2 id="arrow" className="uppercase font-bold text-lg mt-8">
        {_('Arrow')}
      </h2>
      <p className="py-4">
        <Translate>
          You can display an arrow on the tooltip using 
          the <C value="arrow" /> prop.
        </Translate>
      </p>
      <div>
        <Tooltip text="Submit" arrow hover>
          <Button color="black">Submit</Button>
        </Tooltip>
        <Code language="typescript" className="mt-4">
          {examples[10]}
        </Code>
      </div>

      <h2 id="place" className="uppercase font-bold text-lg mt-8">
        {_('Placements')}
      </h2>
      <p className="py-4">
        <Translate>
          Tooltips can be placed in different positions around the
          target element using the <C value="top" />, <C value="bottom" />,
          <C value="left" />, and <C value="right" /> props. The default 
          placement is top.
        </Translate>
      </p>
      <div>
        <Tooltip text="top" top arrow hover>
          <Button className="mr-2" muted>top</Button>
        </Tooltip>
        <Tooltip text="right" right arrow hover>
          <Button className="mr-2" muted>right</Button>
        </Tooltip>
        <Tooltip text="bottom" bottom arrow hover>
          <Button className="mr-2" muted>bottom</Button>
        </Tooltip>
        <Tooltip text="left" left arrow hover>
          <Button className="mr-2" muted>left</Button>
        </Tooltip>

        <Tooltip text="top-right" top right arrow hover>
          <Button className="mr-2 w-32" muted>top right</Button>
        </Tooltip>
        <Tooltip text="bottom-right" bottom right arrow hover>
          <Button className="mr-2 w-32" muted>bottom right</Button>
        </Tooltip>
        <Tooltip text="top-left" top left arrow hover>
          <Button className="mr-2 w-32" muted>top left</Button>
        </Tooltip>
        <Tooltip text="bottom-left" bottom left arrow hover>
          <Button className="mr-2 w-32" muted>bottom left</Button>
        </Tooltip>

        <Code language="typescript" className="mt-4">
          {examples[11]}
        </Code>
      </div>

      <h2 id="rounded" className="uppercase font-bold text-lg mt-8">
        {_('Rounded')}
      </h2>
      <p className="py-4">
        <Translate>
          Tooltips can have different corner styles using the
          <C value="curved" />, <C value="rounded" />, and 
          <C value="pill" /> props.
        </Translate>
      </p>
      <div>
        <Tooltip text="Submit Curved" info curved arrow show={true}>
          <Button info curved>Submit Curved</Button>
        </Tooltip>
        <Code language="typescript" className="my-4">
          {examples[7]}
        </Code>

        <Tooltip text="Submit Rounded" warning rounded arrow hover>
          <Button warning rounded>Submit Rounded</Button>
        </Tooltip>
        <Code language="typescript" className="my-4">
          {examples[8]}
        </Code>

        <Tooltip text="Submit Pill" success pill arrow hover>
          <Button success pill>Submit Pill</Button>
        </Tooltip>
        <Code language="typescript" className="mt-4">
          {examples[9]}
        </Code>
      </div>

      <h2 id="opacity" className="uppercase font-bold text-lg mt-8">
        {_('Opacity')}
      </h2>
      <p className="py-4">
        <Translate>
          You can adjust the tooltip transparency using 
          the <C value="opacity" /> prop which accepts values 
          from 0 to 100.
        </Translate>
      </p>
      <div>
        <Tooltip text="Submit" opacity={50} hover>
          <Button color="#333">Submit</Button>
        </Tooltip>
        <Code language="typescript" className="mt-4">
          {examples[13]}
        </Code>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Custom Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can add your own custom class to the tooltip component or 
          use the <C value="frui-tooltip" /> CSS class.
        </Translate>
      </p>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component/tabs">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Tabs')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/field">
          {_('Fields')}
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
      uri="/component/tooltip"
      title="Tooltip Component"
      description={
        'Tooltips in FRUI are interactive ReactJS components that '
        + 'display informative text when users hover over, focus on, '
        + 'or tap an element.'
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
      <LayoutPanel pathname="/component/tooltip">
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
