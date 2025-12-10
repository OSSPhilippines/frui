//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Film from 'src/view/Film.js';

//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/view/film';
const title = 'Film';
const description = 'Image film converts a list of strings '
  + 'into an image film';

const examples = [
//0
`<Film className="flex" value={[
  'https://images.wsj.net/im-580612/8SR', 
  'https://images.wsj.net/im-580612/8SR'
]} width="50" />`,
 //1
`<Film className="flex" wrapper="py-3" image="mx-3" value={[
  'https://images.wsj.net/im-580612/8SR', 
  'https://images.wsj.net/im-580612/8SR'
]} width="50" />`
];

const props = [
  [ 'alt', 'string', 'No', 'Alt text for image' ],
  [ 'className', 'string', 'No', 'Standard HTML class names applied to all images' ],
  [ 'image' , 'SlotStyleProp', 'No', 'Class/style to apply to each image element' ],
  [ 'height', 'string|number', 'No', 'Height of image' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object applied to all images' ],
  [ 'value', 'string[]', 'Yes', 'Default value' ],
  [ 'width', 'string|number', 'No', 'Width of image' ],
  [ 'wrapper' , 'SlotStyleProp', 'No', 'Class/style to apply to each wrapper element' ]
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
          {_('Image Film')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#slots">{_('Slots')}</a>
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
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Image Film')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<Film>" /> component as shown below.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Film from 'frui/view/Film';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following example shows how to setup a basic image 
            film.
          </Translate>
        </p>
        <Preview title="Basic Example" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <Film className="flex" value={[
              'https://images.wsj.net/im-580612/8SR', 
              'https://images.wsj.net/im-580612/8SR'
            ]} width="50" />
          </Preview.Example>
          <Preview.Code>{examples[0]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="slots" className="uppercase font-bold text-lg mt-8">
        {_('Slots')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Use the <C value="wrapper" />, and <C value="image" /> prop 
            to style each image.
          </Translate>
        </p>
        <Preview title="Slot Example" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <Film className="flex" wrapper="py-3" image="inline-block mx-3" value={[
              'https://images.wsj.net/im-580612/8SR', 
              'https://images.wsj.net/im-580612/8SR'
            ]} width="50" />
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can add use 
            the <C value="frui-view-film" />, 
            <C l value="frui-view-film-wrapper" />,
            and <C value="frui-view-film-image" /> CSS classes to 
            globally theme films.
          </Translate>
        </p>
      </div>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Film>" /> format can be passed the 
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
