//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Film from 'src/base/Film.js';

//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/tool/film';
const title = 'Film';
const description = 'Film layouts content side by side in a linear sequence.';

const examples = [
//0
`<Film className="flex">
  <Film.Frame>
    <img src="https://images.wsj.net/im-580612/8SR" width="50" />
  </Film.Frame>
  <Film.Frame>
    <img src="https://images.wsj.net/im-580612/8SR" width="50" />
  </Film.Frame>
</Film>`,
 //1
`<Film className="flex" frame="mx-3">
  <Film.Frame>
    <img src="https://images.wsj.net/im-580612/8SR" width="50" />
  </Film.Frame>
  <Film.Frame>
    <img src="https://images.wsj.net/im-580612/8SR" width="50" />
  </Film.Frame>
</Film>`
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names applied to all images' ],
  [ 'frame' , 'SlotStyleProp', 'No', 'Class/style to apply to each frame element' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object applied to all images' ]
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
          {_('Film')}
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
        {_('Film')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Films are a way to display a series of images or content 
            frames in a linear sequence. Import 
            the <C value="<Film>" /> component as shown below.
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
            <Film className="flex">
              <Film.Frame>
                <img src="https://images.wsj.net/im-580612/8SR" width="50" />
              </Film.Frame>
              <Film.Frame>
                <img src="https://images.wsj.net/im-580612/8SR" width="50" />
              </Film.Frame>
            </Film>
          </Preview.Example>
          <Preview.Code>{examples[0]}</Preview.Code>
        </Preview>
        <p className="py-2">
          <Translate>
            Film can also be used to layout content side by side.
          </Translate>
        </p>
        <Preview title="Hero Slider" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <Film className="flex">
              <Film.Frame className="theme-bc-2 p-3 border">
                <h2 className="font-bold">First Frame</h2>
                <p>This is the content of the first frame.</p>
              </Film.Frame>
              <Film.Frame className="theme-bc-2 p-3 border">
                <h2 className="font-bold">Second Frame</h2>
                <p>This is the content of the second frame.</p>
              </Film.Frame>
            </Film>
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
            Use the <C value="frame" /> prop to style each image.
          </Translate>
        </p>
        <Preview title="Slot Example" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <Film className="flex" frame="mx-3">
              <Film.Frame>
                <img src="https://images.wsj.net/im-580612/8SR" width="50" />
              </Film.Frame>
              <Film.Frame>
                <img src="https://images.wsj.net/im-580612/8SR" width="50" />
              </Film.Frame>
            </Film>
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
            the <C value="frui-film" />, 
            and <C value="frui-film-view" /> CSS classes to 
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
