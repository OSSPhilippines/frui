//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Button from 'src/base/Button.js';
import Carousel from 'src/base/Carousel.js';

//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/component/carousel';
const title = 'Carousel';
const description = 'Carousel aligns content side by side in order for it to slide.';

const examples = [
//0
`<Carousel>
  <Carousel.Frame className="w-[100px]">
    <img src="https://images.wsj.net/im-580612/8SR" />
  </Carousel.Frame>
  <Carousel.Frame className="w-[100px]">
    <img src="https://images.wsj.net/im-580612/8SR" />
  </Carousel.Frame>
  <Carousel.Frame className="w-[100px]">
    <img src="https://images.wsj.net/im-580612/8SR" />
  </Carousel.Frame>
</Carousel>`,
 //1
`<Carousel>
  <Carousel.Frame className="theme-bc-2 p-3 border">
    <h2 className="font-bold">First Frame</h2>
    <p>This is the content of the first frame.</p>
  </Carousel.Frame>
  <Carousel.Frame className="theme-bc-2 p-3 border">
    <h2 className="font-bold">Second Frame</h2>
    <p>This is the content of the second frame.</p>
  </Carousel.Frame>
</Carousel>`,
 //2
`<div className="w-[250px] m-auto">
  <Carousel auto>
    <Carousel.Frame className="w-[200px]">
      <img src="https://images.wsj.net/im-580612/8SR" />
    </Carousel.Frame>
    <Carousel.Frame className="w-[200px]">
      <img src="https://images.wsj.net/im-580612/8SR" />
    </Carousel.Frame>
    <Carousel.Frame className="w-[200px]">
      <img src="https://images.wsj.net/im-580612/8SR" />
    </Carousel.Frame>
    <Carousel.Frame className="w-[200px]">
      <img src="https://images.wsj.net/im-580612/8SR" />
    </Carousel.Frame>
    <Carousel.Frame className="w-[200px]">
      <img src="https://images.wsj.net/im-580612/8SR" />
    </Carousel.Frame>
  </Carousel>
</div>`,
 //3
`<div className="w-[336px] m-auto">
  <Carousel hidden repeat>
    <Carousel.Prev asChild>
      <Button info>Prev</Button>
    </Carousel.Prev>
    <Carousel.Frame className="w-[200px]">
      <img src="https://images.wsj.net/im-580612/8SR" width="200" />
    </Carousel.Frame>
    <Carousel.Frame className="w-[200px]">
      <img src="https://images.wsj.net/im-580612/8SR" width="200" />
    </Carousel.Frame>
    <Carousel.Frame className="w-[200px]">
      <img src="https://images.wsj.net/im-580612/8SR" width="200" />
    </Carousel.Frame>
    <Carousel.Frame className="w-[200px]">
      <img src="https://images.wsj.net/im-580612/8SR" width="200" />
    </Carousel.Frame>
    <Carousel.Frame className="w-[200px]">
      <img src="https://images.wsj.net/im-580612/8SR" width="200" />
    </Carousel.Frame>
    <Carousel.Next asChild>
      <Button info>Next</Button>
    </Carousel.Next>
  </Carousel>
</div>`,
//4
`<Carousel auto frame="w-[200px] overflow-hidden rounded-full">
  <Carousel.Frame>
    <img src="https://images.wsj.net/im-580612/8SR" />
  </Carousel.Frame>
  <Carousel.Frame>
    <img src="https://images.wsj.net/im-580612/8SR" />
  </Carousel.Frame>
  <Carousel.Frame>
    <img src="https://images.wsj.net/im-580612/8SR" />
  </Carousel.Frame>
  <Carousel.Frame>
    <img src="https://images.wsj.net/im-580612/8SR" />
  </Carousel.Frame>
  <Carousel.Frame>
    <img src="https://images.wsj.net/im-580612/8SR" />
  </Carousel.Frame>
</Carousel>`
];

const props = [
  [ 'alt', 'string', 'No', 'Alt text for image' ],
  [ 'className', 'string', 'No', 'Standard HTML class names applied to all images' ],
  [ 'image' , 'SlotStyleProp', 'No', 'Class/style to apply to each image element' ],
  [ 'height', 'string|number', 'No', 'Height of image' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object applied to all images' ],
  [ 'value', 'string[]', 'Yes', 'Default value' ],
  [ 'width', 'string|number', 'No', 'Width of image' ]
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
          {_('Image Carousel')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#basic">{_('Basics')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#scrolling">{_('Scrolling')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#nav">{_('Navigation')}</a>
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
        {_('Carousel')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<Carousel>" /> component as shown below.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Carousel from 'frui/Carousel';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following example shows how to setup a basic image 
            carousel.
          </Translate>
        </p>
        <Preview title="Basic Example" className="border border-2 theme-bc-3">
          <Preview.Example padding>
            <Carousel>
              <Carousel.Frame className="w-[100px]">
                <img src="https://images.wsj.net/im-580612/8SR" />
              </Carousel.Frame>
              <Carousel.Frame className="w-[100px]">
                <img src="https://images.wsj.net/im-580612/8SR" />
              </Carousel.Frame>
              <Carousel.Frame className="w-[100px]">
                <img src="https://images.wsj.net/im-580612/8SR" />
              </Carousel.Frame>
            </Carousel>
          </Preview.Example>
          <Preview.Code>{examples[0]}</Preview.Code>
        </Preview>
        <p className="py-2">
          <Translate>
            Carousel can also be used to layout content side by side.
          </Translate>
        </p>
        <Preview title="Hero" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <Carousel>
              <Carousel.Frame className="theme-bc-2 p-3 border">
                <h2 className="font-bold">First Frame</h2>
                <p>This is the content of the first frame.</p>
              </Carousel.Frame>
              <Carousel.Frame className="theme-bc-2 p-3 border">
                <h2 className="font-bold">Second Frame</h2>
                <p>This is the content of the second frame.</p>
              </Carousel.Frame>
            </Carousel>
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="scrolling" className="uppercase font-bold text-lg mt-8">
        {_('Scrolling')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can use <C value="scroll" />, <C value="auto" />, 
            and <C value="hidden" /> props to easily control the 
            scrolling behavior of the carousel frame.
          </Translate>
        </p>
        <Preview title="Scroll Auto" className="border border-2 theme-bc-3">
          <Preview.Example padding>
            <div className="w-[250px] m-auto">
              <Carousel auto>
                <Carousel.Frame className="w-[200px]">
                  <img src="https://images.wsj.net/im-580612/8SR" />
                </Carousel.Frame>
                <Carousel.Frame className="w-[200px]">
                  <img src="https://images.wsj.net/im-580612/8SR" />
                </Carousel.Frame>
                <Carousel.Frame className="w-[200px]">
                  <img src="https://images.wsj.net/im-580612/8SR" />
                </Carousel.Frame>
                <Carousel.Frame className="w-[200px]">
                  <img src="https://images.wsj.net/im-580612/8SR" />
                </Carousel.Frame>
                <Carousel.Frame className="w-[200px]">
                  <img src="https://images.wsj.net/im-580612/8SR" />
                </Carousel.Frame>
              </Carousel>
            </div>
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="nav" className="uppercase font-bold text-lg mt-8">
        {_('Navigation')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can use the <C value="<Carousel.Prev>" /> and 
            <C value="<Carousel.Next>" /> components to add 
            navigation to the carousel.
          </Translate>
        </p>
        <Preview title="Previous Next" className="border border-2 theme-bc-3">
          <Preview.Example padding>
            <div className="w-[336px] m-auto">
              <Carousel hidden repeat>
                <Carousel.Prev asChild>
                  <Button info>Prev</Button>
                </Carousel.Prev>
                <Carousel.Frame className="w-[200px]">
                  <img src="https://images.wsj.net/im-580612/8SR" width="200" />
                </Carousel.Frame>
                <Carousel.Frame className="w-[200px]">
                  <img src="https://images.wsj.net/im-580612/8SR" width="200" />
                </Carousel.Frame>
                <Carousel.Frame className="w-[200px]">
                  <img src="https://images.wsj.net/im-580612/8SR" width="200" />
                </Carousel.Frame>
                <Carousel.Frame className="w-[200px]">
                  <img src="https://images.wsj.net/im-580612/8SR" width="200" />
                </Carousel.Frame>
                <Carousel.Frame className="w-[200px]">
                  <img src="https://images.wsj.net/im-580612/8SR" width="200" />
                </Carousel.Frame>
                <Carousel.Next asChild>
                  <Button info>Next</Button>
                </Carousel.Next>
              </Carousel>
            </div>
          </Preview.Example>
          <Preview.Code>{examples[3]}</Preview.Code>
        </Preview>
        <p className="py-2">
          <Translate>
            An example of a hero slider using previous and next buttons
            could look like the following example.
          </Translate>
        </p>
        <Preview title="Hero Slider" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <div className="w-[336px] m-auto">
              <Carousel auto repeat>
                <Carousel.Prev asChild>
                  <Button info>Prev</Button>
                </Carousel.Prev>
                <Carousel.Frame className="w-[200px] theme-bc-2 p-3 border">
                  <h2 className="font-bold">First Frame</h2>
                  <p>This is the content of the first frame.</p>
                </Carousel.Frame>
                <Carousel.Frame className="w-[200px] theme-bc-2 p-3 border">
                  <h2 className="font-bold">Second Frame</h2>
                  <p>This is the content of the second frame.</p>
                </Carousel.Frame>
                <Carousel.Next asChild>
                  <Button info>Next</Button>
                </Carousel.Next>
              </Carousel>
            </div>
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
            Use the <C value="film" />, <C value="frame" />, 
            and <C l value="view" /> props to 
            style different carousel components.
          </Translate>
        </p>
        <Preview title="Slot Example" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <Carousel auto frame="w-[200px] overflow-hidden rounded-full">
              <Carousel.Frame>
                <img src="https://images.wsj.net/im-580612/8SR" />
              </Carousel.Frame>
              <Carousel.Frame>
                <img src="https://images.wsj.net/im-580612/8SR" />
              </Carousel.Frame>
              <Carousel.Frame>
                <img src="https://images.wsj.net/im-580612/8SR" />
              </Carousel.Frame>
              <Carousel.Frame>
                <img src="https://images.wsj.net/im-580612/8SR" />
              </Carousel.Frame>
              <Carousel.Frame>
                <img src="https://images.wsj.net/im-580612/8SR" />
              </Carousel.Frame>
            </Carousel>
          </Preview.Example>
          <Preview.Code>{examples[4]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can add use 
            the <C value="frui-view-carousel" />, 
            <C l value="frui-view-carousel-frame" />,
            <C l value="frui-view-carousel-film" />, 
            <C l value="frui-view-carousel-prev" />, 
            and <C value="frui-view-carousel-next" /> CSS classes to 
            globally theme carousels.
          </Translate>
        </p>
      </div>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Carousel>" /> format can be passed the 
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
