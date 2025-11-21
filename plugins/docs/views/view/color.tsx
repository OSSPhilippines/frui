//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Color from 'components/view/Color.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/view/color';
const title = 'Color Format';
const description = 'Color formats convert values to color displays.';

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
          {_('Color')}
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
          TODO
        </Preview.Example>
        <Preview.Code>{''}</Preview.Code>
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
        {_('Color')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the color format like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Color from 'frui/view/Color';`}
        </Code>
      </div>

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

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Color>" /> format can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <Docs.Foot/>
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
