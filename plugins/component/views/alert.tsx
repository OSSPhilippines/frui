//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';
import Alert from 'components/element/Alert.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C 
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Alert' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'color', 'string', 'No', 'Custom CSS hex or name' ],
  [ 'curved', 'boolean', 'No', 'Slight curved corners' ],
  [ 'error', 'boolean', 'No', 'Red alert' ],
  [ 'info', 'boolean', 'No', 'Blue alert' ],
  [ 'muted', 'boolean', 'No', 'Gray alert' ],
  [ 'outline', 'boolean', 'No', 'Border and text with color' ],
  [ 'pill', 'boolean', 'No', 'Max rounded corners' ],
  [ 'rounded', 'boolean', 'No', 'Rounded corners' ],
  [ 'solid', 'boolean', 'No', 'Fills alert with color' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
  [ 'success', 'boolean', 'No', 'Green alert' ],
  [ 'warning', 'boolean', 'No', 'Orange alert' ]
];

const examples = [ 
//0
`<Alert info className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  No results found
</Alert>`,
//1
`<Alert warning className="flex items-center">
  <i className="fas fa-exclamation-triangle mr-2"></i>
  Are you sure ?
</Alert>`,
//2
`<Alert success className="flex items-center">
  <i className="fas fa-check-circle mr-2"></i>
  Successfully saved !
</Alert>`,
//3
`<Alert error className="flex items-center">
  <i className="fas fa-exclamation-circle mr-2"></i>
  Could not save
</Alert>`,
//4
`<Alert muted className="flex items-center">
  I am disabled
</Alert>`,
//5
`<Alert color="salmon" className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  Who likes salmon?
</Alert>`,
//6
`<Alert info curved className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  No results found
</Alert>`,
//7
`<Alert warning rounded className="flex items-center">
  <i className="fas fa-exclamation-triangle mr-2"></i>
  Are you sure ?
</Alert>`,
//8
`<Alert success pill className="flex items-center">
  <i className="fas fa-check-circle mr-2"></i>
  Successfully saved !
</Alert>`
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
        <a className="block pb-1" href="#top">{_('Alert')}</a>
        <ul className="list-disc pl-3">
          <li className="pl-3 pb-1">
            <a href="#props">{_('Props')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#types">{_('Types')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#custom">{_('Custom Color')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#rounded">{_('Rounded')}</a>
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
        {_('Alert')}
      </h1>
      <Code language="typescript" className="mt-2">
        {`import Alert from 'frui/Alert';`}
      </Code>

      <h2 id="props" className="uppercase font-bold text-lg mt-8">
        {_('Props')}
      </h2>
      <Props props={props} />

      <h2 id="types" className="uppercase font-bold text-lg mt-8">
        {_('Types')}
      </h2>
      <p className="py-4">
        <Translate>
          Alerts have the following types: <C value="info" />, 
          <C l value="warning" />, <C value="success" />, 
          <C l value="error" />, and <C value="muted" />.
        </Translate>
      </p>
      <div>
        <Alert info className="flex items-center">
          <i className="fas fa-info-circle mr-2"></i>
          {_('No results found')}
        </Alert>
        <Code language="typescript" className="mt-2">
          {examples[0]}
        </Code>
        <Alert warning className="flex items-center mt-5">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          {_('Are you sure ?')}
        </Alert>
        <Code language="typescript" className="mt-2">
          {examples[1]}
        </Code>
        <Alert success className="flex items-center mt-5">
          <i className="fas fa-check-circle mr-2"></i>
          {_('Successfully saved !')}
        </Alert>
        <Code language="typescript" className="mt-2">
          {examples[2]}
        </Code>
        <Alert error className="flex items-center mt-5">
          <i className="fas fa-exclamation-circle mr-2"></i>
          {_('Could not save')}
        </Alert>
        <Code language="typescript" className="mt-2">
          {examples[3]}
        </Code>
        <Alert muted className="flex items-center mt-5">
          {_('I am disabled')}
        </Alert>
        <Code language="typescript" className="mt-2">
          {examples[4]}
        </Code>
      </div>

      <h2 id="custom" className="uppercase font-bold text-lg mt-8">
        {_('Custom Color')}
      </h2>
      <p className="py-4">
        <Translate>
          Alerts can have custom CSS compatible colors which 
          includes hex and color names.
        </Translate>
      </p>
      <div>
        <Alert color="salmon" className="flex items-center">
          <i className="fas fa-info-circle mr-2"></i>
          {_('Who likes salmon?')}
        </Alert>
        <Code language="typescript" className="mt-2">
          {examples[5]}
        </Code>
      </div>

      <h2 id="rounded" className="uppercase font-bold text-lg mt-8">
        {_('Rounded')}
      </h2>
      <p className="py-4">
        <Translate>
          Alerts can be rounded in three ways: <C value="curved" />, 
          <C l value="rounded" />, and <C value="pill" />.
        </Translate>
      </p>
      <div>
        <Alert info curved className="flex items-center">
          <i className="fas fa-info-circle mr-2"></i>
          {_('No results found')}
        </Alert>
        <Code language="typescript" className="mt-2">
          {examples[6]}
        </Code>
        <Alert warning rounded className="flex items-center mt-5">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          {_('Are you sure ?')}
        </Alert>
        <Code language="typescript" className="mt-2">
          {examples[7]}
        </Code>
        <Alert success pill className="flex items-center mt-5">
          <i className="fas fa-check-circle mr-2"></i>
          {_('Successfully saved !')}
        </Alert>
        <Code language="typescript" className="mt-2">
          {examples[8]}
        </Code>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Custom Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can add your own custom class to the alert component 
          or use the <C value="frui-alert" /> CSS class.
        </Translate>
      </p>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Components')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/badge">
          {_('Badges')}
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
      uri="/component/alert"
      title="Alert Component"
      description={
        'Alerts in FRUI, are interactive ReactJS components that '
        + 'convey important information, warnings, or notifications '
        + 'to users.'
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
      <LayoutPanel pathname="/component/alert">
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
