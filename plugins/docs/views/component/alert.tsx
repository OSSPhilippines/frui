//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Alert from 'components/Alert.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/component/alert';
const title = 'Alert Component';
const description = 
  'Alerts convey important information, warnings, or notifications '
   + 'to users.';

const props = [
  [ 'align', 'string', 'No', 'Custom text align value to apply to the alert' ],
  [ 'ba', 'string | number', 'No', 'Border all sides size value to apply to the alert' ],
  [ 'bb', 'string | number', 'No', 'Border bottom size value to apply to the alert' ],
  [ 'bdStyle', 'string', 'No', 'Custom border style value to apply to the alert' ],
  [ 'bl', 'string | number', 'No', 'Border left size value to apply to the alert' ],
  [ 'black', 'boolean', 'No', 'If true, applies the black color to the alert' ],
  [ 'block', 'boolean', 'No', 'If true, sets display to block' ],
  [ 'br', 'string | number', 'No', 'Border right size value to apply to the alert' ],
  [ 'bt', 'string | number', 'No', 'Border top size value to apply to the alert' ],
  [ 'bx', 'string | number', 'No', 'Border horizontal size value to apply to the alert' ],
  [ 'by', 'string | number', 'No', 'Border vertical size value to apply to the alert' ],
  [ 'center', 'boolean', 'No', 'If true, centers text inside the alert' ],
  [ 'children', 'ReactNode', 'No', 'Child elements to be rendered inside the alert' ],
  [ 'className', 'string', 'No', 'Additional class names to apply to the alert' ],
  [ 'color', 'string', 'No', 'Custom color value to apply to the alert' ],
  [ 'curved', 'boolean', 'No', 'If true, applies curved border radius to the alert' ],
  [ 'dashed', 'boolean', 'No', 'If true, applies dashed border style to the alert' ],
  [ 'display', 'string', 'No', 'Custom display value to apply to the alert' ],
  [ 'dotted', 'boolean', 'No', 'If true, applies dotted border style to the alert' ],
  [ 'error', 'boolean', 'No', 'If true, applies the error color to the alert' ],
  [ 'fill', 'boolean', 'No', 'If true, makes the alert take the full width of its container' ],
  [ 'flex', 'boolean', 'No', 'If true, sets display to flex' ],
  [ 'grid', 'boolean', 'No', 'If true, sets display to grid' ],
  [ 'h', 'string | number', 'No', 'Height value to apply to the alert' ],
  [ 'hidden', 'boolean', 'No', 'If true, hides the alert' ],
  [ 'iblock', 'boolean', 'No', 'If true, sets display to inline-block' ],
  [ 'iflex', 'boolean', 'No', 'If true, sets display to inline-flex' ],
  [ 'igrid', 'boolean', 'No', 'If true, sets display to inline-grid' ],
  [ 'info', 'boolean', 'No', 'If true, applies the info color to the alert' ],
  [ 'inline', 'boolean', 'No', 'If true, sets display to inline' ],
  [ 'justify', 'boolean', 'No', 'If true, justifies text inside the alert' ],
  [ 'left', 'boolean', 'No', 'If true, aligns text to the left inside the alert' ],
  [ 'lg', 'boolean', 'No', 'If true, applies large size to the alert' ],
  [ 'ma', 'string | number', 'No', 'Margin all sides size value to apply to the alert' ],
  [ 'maxh', 'string | number', 'No', 'Maximum height value to apply to the alert' ],
  [ 'maxw', 'string | number', 'No', 'Maximum width value to apply to the alert' ],
  [ 'mb', 'string | number', 'No', 'Margin bottom size value to apply to the alert' ],
  [ 'md', 'boolean', 'No', 'If true, applies medium size to the alert' ],
  [ 'minh', 'string | number', 'No', 'Minimum height value to apply to the alert' ],
  [ 'minw', 'string | number', 'No', 'Minimum width value to apply to the alert' ],
  [ 'ml', 'string | number', 'No', 'Margin left size value to apply to the alert' ],
  [ 'mr', 'string | number', 'No', 'Margin right size value to apply to the alert' ],
  [ 'mt', 'string | number', 'No', 'Margin top size value to apply to the alert' ],
  [ 'muted', 'boolean', 'No', 'If true, applies the muted color to the alert' ],
  [ 'mx', 'string | number', 'No', 'Margin horizontal size value to apply to the alert' ],
  [ 'my', 'string | number', 'No', 'Margin vertical size value to apply to the alert' ],
  [ 'outline', 'boolean', 'No', 'If true, applies an outline style to the alert' ],
  [ 'pa', 'string | number', 'No', 'Padding all sides size value to apply to the alert' ],
  [ 'pb', 'string | number', 'No', 'Padding bottom size value to apply to the alert' ],
  [ 'pill', 'boolean', 'No', 'If true, applies pill border radius to the alert' ],
  [ 'pl', 'string | number', 'No', 'Padding left size value to apply to the alert' ],
  [ 'pr', 'string | number', 'No', 'Padding right size value to apply to the alert' ],
  [ 'primary', 'boolean', 'No', 'If true, applies the primary color to the alert' ],
  [ 'pt', 'string | number', 'No', 'Padding top size value to apply to the alert' ],
  [ 'px', 'string | number', 'No', 'Padding horizontal size value to apply to the alert' ],
  [ 'py', 'string | number', 'No', 'Padding vertical size value to apply to the alert' ],
  [ 'radius', 'string | number', 'No', 'Custom border radius value to apply to the alert' ],
  [ 'right', 'boolean', 'No', 'If true, aligns text to the right inside the alert' ],
  [ 'rounded', 'boolean', 'No', 'If true, applies rounded border radius to the alert' ],
  [ 'secondary', 'boolean', 'No', 'If true, applies the secondary color to the alert' ],
  [ 'sm', 'boolean', 'No', 'If true, applies small size to the alert' ],
  [ 'solid', 'boolean', 'No', 'If true, applies solid border style to the alert' ],
  [ 'style', 'CSSProperties', 'No', 'Inline styles to apply to the alert' ],
  [ 'success', 'boolean', 'No', 'If true, applies the success color to the alert' ],
  [ 'tertiary', 'boolean', 'No', 'If true, applies the tertiary color to the alert' ],
  [ 'txs', 'string | number', 'No', 'Text size value to apply to the alert' ],
  [ 'w', 'string | number', 'No', 'Width value to apply to the alert' ],
  [ 'warning', 'boolean', 'No', 'If true, applies the warning color to the alert' ],
  [ 'white', 'boolean', 'No', 'If true, applies the white color to the alert' ],
  [ 'xl', 'boolean', 'No', 'If true, applies extra large size to the alert' ],
  [ 'xl2', 'boolean', 'No', 'If true, applies 2x extra large size to the alert' ],
  [ 'xl3', 'boolean', 'No', 'If true, applies 3x extra large size to the alert' ],
  [ 'xl4', 'boolean', 'No', 'If true, applies 4x extra large size to the alert' ],
  [ 'xl5', 'boolean', 'No', 'If true, applies 5x extra large size to the alert' ],
  [ 'xs', 'boolean', 'No', 'If true, applies extra small size to the alert' ]
];

const examples = [ 
//0
`<Alert info className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  Something interesting happened!
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
`<Alert info outline className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  Something interesting happened!
</Alert>`,
//7
`<Alert warning outline className="flex items-center">
  <i className="fas fa-exclamation-triangle mr-2"></i>
  Are you sure ?
</Alert>`,
//8
`<Alert success outline className="flex items-center">
  <i className="fas fa-check-circle mr-2"></i>
  Successfully saved !
</Alert>`,
//9
`<Alert error outline className="flex items-center">
  <i className="fas fa-exclamation-circle mr-2"></i>
  Could not save
</Alert>`,
//10
`<Alert muted outline className="flex items-center">
  I am disabled
</Alert>`,
//11
`<Alert color="salmon" outline className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  Who likes salmon?
</Alert>`,
//12
`<Alert info curved className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  No results found
</Alert>`,
//13
`<Alert warning rounded className="flex items-center">
  <i className="fas fa-exclamation-triangle mr-2"></i>
  Are you sure ?
</Alert>`,
//14
`<Alert success pill outline className="flex items-center">
  <i className="fas fa-check-circle mr-2"></i>
  Successfully saved !
</Alert>`
];

//--------------------------------------------------------------------//
// Components

const { C, Code, Props, Preview } = Docs;

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
          {_('Alerts')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
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
 * Examples component
 */
export function Examples() {
  return (
    <div className="flex items-start rmd-block flex-wrap gap-4">
      {/* Info Example */}
      <Preview 
        height={100}
        title="Info Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert info className="flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            Something interesting happened!
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>
      {/* Warning Example */}
      <Preview 
        height={100}
        title="Warning Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert warning className="flex items-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Are you sure ?
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[1]}</Preview.Code>
      </Preview>
      {/* Success Example */}
      <Preview 
        height={100}
        title="Success Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert success className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            Successfully saved !
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[2]}</Preview.Code>
      </Preview>
      {/* Error Example */}
      <Preview 
        height={100}
        title="Error Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert error className="flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            Could not save
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[3]}</Preview.Code>
      </Preview>
      {/* Muted Example */}
      <Preview 
        height={100}
        title="Muted Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert muted className="flex items-center">
            I am disabled
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[4]}</Preview.Code>
      </Preview>
      {/* Custom Color Example */}
      <Preview 
        height={100}
        title="Custom Color Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert color="salmon" className="flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            Who likes salmon?
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[5]}</Preview.Code>
      </Preview>
      {/* Info Outline Example */}
      <Preview 
        height={100}
        title="Info Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert info outline className="flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            Something interesting happened!
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[6]}</Preview.Code>
      </Preview>
      {/* Warning Outline Example */}
      <Preview 
        height={100}
        title="Warning Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert warning outline className="flex items-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Are you sure ?
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[7]}</Preview.Code>
      </Preview>
      {/* Success Outline Example */}
      <Preview 
        height={100}
        title="Success Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert success outline className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            Successfully saved !
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[8]}</Preview.Code>
      </Preview>
      {/* Error Outline Example */}
      <Preview 
        height={100}
        title="Error Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert error outline className="flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            Could not save
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[9]}</Preview.Code>
      </Preview>
      {/* Muted Outline Example */}
      <Preview 
        height={100}
        title="Muted Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert muted outline className="flex items-center">
            I am disabled
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[10]}</Preview.Code>
      </Preview>
      {/* Custom Color Outline Example */}
      <Preview 
        height={100}
        title="Custom Color Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert color="salmon" outline className="flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            Who likes salmon?
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[11]}</Preview.Code>
      </Preview>
      {/* Curved Example */}
      <Preview 
        height={100}
        title="Curved Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert info curved className="flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            No results found
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[12]}</Preview.Code>
      </Preview>
      {/* Rounded Example */}
      <Preview 
        height={100}
        title="Rounded Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert warning rounded className="flex items-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Are you sure ?
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[7]}</Preview.Code>
      </Preview>
      {/* Pill Example */}
      <Preview 
        height={100}
        title="Pill Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert success pill outline className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            Successfully saved !
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[14]}</Preview.Code>
      </Preview>
    </div>
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
        {_('Alerts')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the alert component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Alert from 'frui/Alert';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples of alerts.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use the <C value="frui-alert" /> CSS class to 
          globally theme alerts.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Alert>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <Docs.Foot />
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
