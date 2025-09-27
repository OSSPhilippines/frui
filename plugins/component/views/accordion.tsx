//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Accordion from 'components/element/Accordion.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Code, 
  C, 
  Props,
  Preview
} from 'plugins/app/index.js';
import { useState } from 'react';

//--------------------------------------------------------------------//
// Constants

const props = [
  //accordion
  [
    [ 'activeClassStyle', 'string | React.CSSProperties', 'No', 'Class/style to apply to active label' ],
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'contentClassStyle', 'string | React.CSSProperties', 'No', 'Class/style to apply to each content' ],
    [ 'defaultValue', 'string', 'No', 'Default active accordion value' ],
    [ 'onChange', '(value: string) => void', 'No', 'Change value handler' ],
    [ 'labelClassStyle', 'string | React.CSSProperties', 'No', 'Class/style to apply to each label' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ],
    [ 'value', 'string', 'No', 'Controlled value' ],
  ],
  //accordion item
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ],
    [ 'value', 'string', 'Yes', 'Unique name for the accordion item' ]
  ],
  //accordion label
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'activeClassStyle', 'string | React.CSSProperties', 'No', 'Class/style to apply if active' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ]
  ],
  //accordion content
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ]
  ],
  //accordion active
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ],
  ],
  //accordion inactive
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ],
  ]
];

const examples = [
//0
`<Accordion 
  labelClassStyle="px-3 py-2 border theme-bc-3 font-bold theme-bg-2"
  contentClassStyle="px-3 py-4 border theme-bc-2"
  defaultValue="item1"
>
  <Accordion.Item value="item1">
    <Accordion.Label>Item 1</Accordion.Label>
    <Accordion.Content>Content for Item 1</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item2">
    <Accordion.Label>Item 2</Accordion.Label>
    <Accordion.Content>Content for Item 2</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item3">
    <Accordion.Label>Item 3</Accordion.Label>
    <Accordion.Content>Content for Item 3</Accordion.Content>
  </Accordion.Item>
</Accordion>`,
//1
`<Accordion 
  activeClassStyle="px-3 py-2 border theme-bc-3 font-bold theme-bg-2"
  labelClassStyle="px-3 py-2 border theme-bc-3 theme-bg-1"
  contentClassStyle="px-3 py-4 border theme-bc-2"
  defaultValue="item1"
>
  <Accordion.Item value="item1">
    <Accordion.Label>Item 1</Accordion.Label>
    <Accordion.Content>Content for Item 1</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item2">
    <Accordion.Label>Item 2</Accordion.Label>
    <Accordion.Content>Content for Item 2</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item3">
    <Accordion.Label>Item 3</Accordion.Label>
    <Accordion.Content>Content for Item 3</Accordion.Content>
  </Accordion.Item>
</Accordion>`,
//2
`<Accordion 
  labelClassStyle="px-3 py-2 border theme-bc-3 font-bold theme-bg-2"
  contentClassStyle="px-3 py-4 border theme-bc-2"
  defaultValue="item1"
>
  <Accordion.Item value="item1">
    <Accordion.Content>Content for Item 1</Accordion.Content>
    <Accordion.Label>Item 1</Accordion.Label>
  </Accordion.Item>
  <Accordion.Item value="item2">
    <Accordion.Content>Content for Item 2</Accordion.Content>
    <Accordion.Label>Item 2</Accordion.Label>
  </Accordion.Item>
  <Accordion.Item value="item3">
    <Accordion.Content>Content for Item 3</Accordion.Content>
    <Accordion.Label>Item 3</Accordion.Label>
  </Accordion.Item>
</Accordion>`,
//3
`<Accordion 
  labelClassStyle="flex items-center px-3 py-2 border theme-bc-3 font-bold theme-bg-2"
  contentClassStyle="px-3 py-4 border theme-bc-2"
  defaultValue="item1"
>
  <Accordion.Item value="item1">
    <Accordion.Label>
      <h3 className="flex-grow">Item 1</h3>
      <Accordion.Inactive>
        <i className="fas fa-caret-left"></i>
      </Accordion.Inactive>
      <Accordion.Active>
        <i className="fas fa-caret-down"></i>
      </Accordion.Active>
    </Accordion.Label>
    <Accordion.Content>Content for Item 1</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item2">
    <Accordion.Label>
      <h3 className="flex-grow">Item 2</h3>
      <Accordion.Inactive>
        <i className="fas fa-caret-left"></i>
      </Accordion.Inactive>
      <Accordion.Active>
        <i className="fas fa-caret-down"></i>
      </Accordion.Active>
    </Accordion.Label>
    <Accordion.Content>Content for Item 2</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item3">
    <Accordion.Label>
      <h3 className="flex-grow">Item 3</h3>
      <Accordion.Inactive>
        <i className="fas fa-caret-left"></i>
      </Accordion.Inactive>
      <Accordion.Active>
        <i className="fas fa-caret-down"></i>
      </Accordion.Active>
    </Accordion.Label>
    <Accordion.Content>Content for Item 3</Accordion.Content>
  </Accordion.Item>
</Accordion>`,
//4
`<Accordion defaultValue="item1">
  <Accordion.Item value="item1">
    <Accordion.Label className="px-3 py-2 border theme-bc-3 font-bold theme-bg-2">
      Item 1
    </Accordion.Label>
    <Accordion.Content className="px-3 py-4 border theme-bc-2">
      Content for Item 1
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item2">
    <Accordion.Label className="px-3 py-2 border theme-bc-3 font-bold theme-bg-2">
      Item 2
    </Accordion.Label>
    <Accordion.Content className="px-3 py-4 border theme-bc-2">
      Content for Item 2
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item3">
    <Accordion.Label className="px-3 py-2 border theme-bc-3 font-bold theme-bg-2">
      Item 3
    </Accordion.Label>
    <Accordion.Content className="px-3 py-4 border theme-bc-2">
      Content for Item 3
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`,
//5
`const items = [ 'item1', 'item2', 'item3' ];
const [ item, setItem ] = useState(0);
const next = () => setItem(item => (item + 1) % items.length);
const prev = () => setItem(item => (item - 1 + items.length) % items.length);

return (
  <Accordion 
    labelClassStyle="px-3 py-2 border theme-bc-3 font-bold theme-bg-2"
    contentClassStyle="px-3 py-4 border theme-bc-2"
    value={items[item]}
  >
    <Accordion.Item value="item1">
      <Accordion.Label>Item 1</Accordion.Label>
      <Accordion.Content>Content for Item 1</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item2">
      <Accordion.Label>Item 2</Accordion.Label>
      <Accordion.Content>Content for Item 2</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item3">
      <Accordion.Label>Item 3</Accordion.Label>
      <Accordion.Content>Content for Item 3</Accordion.Content>
    </Accordion.Item>
  </Accordion>
  <div className="flex items-center mt-4">
    <button
      className="px-3 py-1 border theme-bc-3 theme-bg-3 text-white"
      onClick={prev}
    >
      <i className="fas fa-arrow-left mr-2"></i>
      Previous
    </button>
    <div className="flex-grow text-center">
      Current item is <strong>{items[item]}</strong>.
    </div>
    <button
      className="px-3 py-1 border theme-bc-3 theme-bg-3 text-white"
      onClick={next}
    >
      Next
      <i className="fas fa-arrow-right ml-2"></i>
    </button>
  </div>
);`,
//6
`<Accordion.Item value="item1">
  <Accordion.Label>
    <h3 className="flex-grow">
      Item 1 (
        <Accordion.Inactive className="inline">Hiding</Accordion.Inactive>
        <Accordion.Active className="inline">Showing</Accordion.Active>
      )
    </h3>
    <Accordion.Inactive>
      <i className="fas fa-caret-left"></i>
    </Accordion.Inactive>
    <Accordion.Active>
      <i className="fas fa-caret-down"></i>
    </Accordion.Active>
  </Accordion.Label>
  <Accordion.Content>Content for Item 1</Accordion.Content>
</Accordion.Item>
<Accordion.Item value="item2">
  <Accordion.Label>
    <h3 className="flex-grow">
      Item 2 (
        <Accordion.Inactive className="inline">Hiding</Accordion.Inactive>
        <Accordion.Active className="inline">Showing</Accordion.Active>
      )
    </h3>
    <Accordion.Inactive>
      <i className="fas fa-caret-left"></i>
    </Accordion.Inactive>
    <Accordion.Active>
      <i className="fas fa-caret-down"></i>
    </Accordion.Active>
  </Accordion.Label>
  <Accordion.Content>Content for Item 2</Accordion.Content>
</Accordion.Item>
<Accordion.Item value="item3">
  <Accordion.Label>
    <h3 className="flex-grow">
      Item 3 (
        <Accordion.Inactive className="inline">Hiding</Accordion.Inactive>
        <Accordion.Active className="inline">Showing</Accordion.Active>
      )
    </h3>
    <Accordion.Inactive>
      <i className="fas fa-caret-left"></i>
    </Accordion.Inactive>
    <Accordion.Active>
      <i className="fas fa-caret-down"></i>
    </Accordion.Active>
  </Accordion.Label>
  <Accordion.Content>Content for Item 3</Accordion.Content>
</Accordion.Item>
</Accordion>`
];

//--------------------------------------------------------------------//
// Components

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumbClassStyle="font-normal" activeClassStyle="font-bold">
      <Bread.Slicer />
      <Bread.Crumb icon="icons" href="/component">
        Components
      </Bread.Crumb>
      <Bread.Crumb>Accordions</Bread.Crumb>
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
          {_('Accordions')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#managing">{_('Managing Styles')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#controls">{_('Controlling Accordion State')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#in-active">{_('In/Active Components')}</a>
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
      {/* Basic Example */}
      <Preview 
        height={200}
        title="Basic Accordion Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Accordion 
            labelClassStyle="px-3 py-2 border theme-bc-3 font-bold theme-bg-2"
            contentClassStyle="px-3 py-4 border theme-bc-2"
            defaultValue="item1"
          >
            <Accordion.Item value="item1">
              <Accordion.Label>Item 1</Accordion.Label>
              <Accordion.Content>Content for Item 1</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item2">
              <Accordion.Label>Item 2</Accordion.Label>
              <Accordion.Content>Content for Item 2</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item3">
              <Accordion.Label>Item 3</Accordion.Label>
              <Accordion.Content>Content for Item 3</Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>
      {/* Active Example */}
      <Preview 
        height={200}
        title="Active State Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Accordion 
            activeClassStyle="px-3 py-2 border theme-bc-3 font-bold theme-bg-2"
            labelClassStyle="px-3 py-2 border theme-bc-3 theme-bg-1"
            contentClassStyle="px-3 py-4 border theme-bc-2"
            defaultValue="item1"
          >
            <Accordion.Item value="item1">
              <Accordion.Label>Item 1</Accordion.Label>
              <Accordion.Content>Content for Item 1</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item2">
              <Accordion.Label>Item 2</Accordion.Label>
              <Accordion.Content>Content for Item 2</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item3">
              <Accordion.Label>Item 3</Accordion.Label>
              <Accordion.Content>Content for Item 3</Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Preview.Example>
        <Preview.Code>{examples[1]}</Preview.Code>
      </Preview>
      {/* Bottom Example */}
      <Preview 
        height={200}
        title="Bottom Accordion Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Accordion 
            labelClassStyle="px-3 py-2 border theme-bc-3 font-bold theme-bg-2"
            contentClassStyle="px-3 py-4 border theme-bc-2"
            defaultValue="item1"
          >
            <Accordion.Item value="item1">
              <Accordion.Content>Content for Item 1</Accordion.Content>
              <Accordion.Label>Item 1</Accordion.Label>
            </Accordion.Item>
            <Accordion.Item value="item2">
              <Accordion.Content>Content for Item 2</Accordion.Content>
              <Accordion.Label>Item 2</Accordion.Label>
            </Accordion.Item>
            <Accordion.Item value="item3">
              <Accordion.Content>Content for Item 3</Accordion.Content>
              <Accordion.Label>Item 3</Accordion.Label>
            </Accordion.Item>
          </Accordion>
        </Preview.Example>
        <Preview.Code>{examples[2]}</Preview.Code>
      </Preview>
      {/* Icon Example */}
      <Preview 
        height={200}
        title="Icon Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Accordion 
            labelClassStyle="flex items-center px-3 py-2 border theme-bc-3 font-bold theme-bg-2"
            contentClassStyle="px-3 py-4 border theme-bc-2"
            defaultValue="item1"
          >
            <Accordion.Item value="item1">
              <Accordion.Label>
                <h3 className="flex-grow">Item 1</h3>
                <Accordion.Inactive>
                  <i className="fas fa-caret-left"></i>
                </Accordion.Inactive>
                <Accordion.Active>
                  <i className="fas fa-caret-down"></i>
                </Accordion.Active>
              </Accordion.Label>
              <Accordion.Content>Content for Item 1</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item2">
              <Accordion.Label>
                <h3 className="flex-grow">Item 2</h3>
                <Accordion.Inactive>
                  <i className="fas fa-caret-left"></i>
                </Accordion.Inactive>
                <Accordion.Active>
                  <i className="fas fa-caret-down"></i>
                </Accordion.Active>
              </Accordion.Label>
              <Accordion.Content>Content for Item 2</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item3">
              <Accordion.Label>
                <h3 className="flex-grow">Item 3</h3>
                <Accordion.Inactive>
                  <i className="fas fa-caret-left"></i>
                </Accordion.Inactive>
                <Accordion.Active>
                  <i className="fas fa-caret-down"></i>
                </Accordion.Active>
              </Accordion.Label>
              <Accordion.Content>Content for Item 3</Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Preview.Example>
        <Preview.Code>{examples[3]}</Preview.Code>
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
  const items = [ 'item1', 'item2', 'item3' ];
  const [ item, setItem ] = useState(0);
  //handlers
  const next = () => setItem(item => (item + 1) % items.length);
  const prev = () => setItem(item => (item - 1 + items.length) % items.length);
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Accordions')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the accordion component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Accordion from 'frui/Accordion';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples of accordions.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="managing" className="uppercase font-bold text-lg mt-8">
        {_('Managing Styles')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can manage the styles of the labels by passing class names to
            the <C value="labelClassStyle" />, <C value="activeClassStyle" />, 
            and <C value="contentClassStyle" /> props in 
            the <C value="<Accordion>" /> component.
          </Translate>
        </p>
        <Code className="my-4" language="typescript">{examples[0]}</Code>
        <p className="py-2">
          <Translate>
            Or you can pass the class names to the
            individual <C value="<Accordion.Label>" />,
            and <C value="<Accordion.Content>" /> components.
            Classes here have the highest priority.
          </Translate>
        </p>
        <Code className="my-4" language="typescript">{examples[4]}</Code>
      </div>

      <h2 id="controls" className="uppercase font-bold text-lg mt-8">
        {_('Controlling Accordion State')}
      </h2>
      <div>
        <p className="py-2 mt-2">
          <Translate>
            You can control the accordion by setting
            the <C value="value" /> prop to a state in
            the <C value="<Accordion>" /> component.
          </Translate>
        </p>
        <Preview 
          title="Accordion Controls Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Accordion 
              labelClassStyle="px-3 py-2 border theme-bc-3 font-bold theme-bg-2"
              contentClassStyle="px-3 py-4 border theme-bc-2"
              value={items[item]}
            >
              <Accordion.Item value="item1">
                <Accordion.Label>Item 1</Accordion.Label>
                <Accordion.Content>Content for Item 1</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item2">
                <Accordion.Label>Item 2</Accordion.Label>
                <Accordion.Content>Content for Item 2</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item3">
                <Accordion.Label>Item 3</Accordion.Label>
                <Accordion.Content>Content for Item 3</Accordion.Content>
              </Accordion.Item>
            </Accordion>
            <div className="flex items-center mt-4">
              <button
                className="px-3 py-1 border theme-bc-3 theme-bg-3 text-white"
                onClick={prev}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Previous')}
              </button>
              <div className="flex-grow text-center">
                <Translate>
                  Current item is <strong>{items[item]}</strong>.
                </Translate>
              </div>
              <button
                className="px-3 py-1 border theme-bc-3 theme-bg-3 text-white"
                onClick={next}
              >
                {_('Next')}
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </Preview.Example>
          <Preview.Code>{examples[5]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="in-active" className="uppercase font-bold text-lg mt-8">
        {_('In/Active Components')}
      </h2>
      <div>
        <p className="py-2 mt-2">
          <Translate>
            You can use the <C value="<Accordion.Active>" />, 
            and <C value="<Accordion.Inactive>" /> components to show 
            different content depending if the accordion item is active 
            or not.
          </Translate>
        </p>
        <Preview 
          title="Active and Inactive Component Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Accordion 
              labelClassStyle="flex items-center px-3 py-2 border theme-bc-3 font-bold theme-bg-2"
              contentClassStyle="px-3 py-4 border theme-bc-2"
              defaultValue="item1"
            >
              <Accordion.Item value="item1">
                <Accordion.Label>
                  <h3 className="flex-grow">
                    Item 1 (
                      <Accordion.Inactive className="inline">Hiding</Accordion.Inactive>
                      <Accordion.Active className="inline">Showing</Accordion.Active>
                    )
                  </h3>
                  <Accordion.Inactive>
                    <i className="fas fa-caret-left"></i>
                  </Accordion.Inactive>
                  <Accordion.Active>
                    <i className="fas fa-caret-down"></i>
                  </Accordion.Active>
                </Accordion.Label>
                <Accordion.Content>Content for Item 1</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item2">
                <Accordion.Label>
                  <h3 className="flex-grow">
                    Item 2 (
                      <Accordion.Inactive className="inline">Hiding</Accordion.Inactive>
                      <Accordion.Active className="inline">Showing</Accordion.Active>
                    )
                  </h3>
                  <Accordion.Inactive>
                    <i className="fas fa-caret-left"></i>
                  </Accordion.Inactive>
                  <Accordion.Active>
                    <i className="fas fa-caret-down"></i>
                  </Accordion.Active>
                </Accordion.Label>
                <Accordion.Content>Content for Item 2</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item3">
                <Accordion.Label>
                  <h3 className="flex-grow">
                    Item 3 (
                      <Accordion.Inactive className="inline">Hiding</Accordion.Inactive>
                      <Accordion.Active className="inline">Showing</Accordion.Active>
                    )
                  </h3>
                  <Accordion.Inactive>
                    <i className="fas fa-caret-left"></i>
                  </Accordion.Inactive>
                  <Accordion.Active>
                    <i className="fas fa-caret-down"></i>
                  </Accordion.Active>
                </Accordion.Label>
                <Accordion.Content>Content for Item 3</Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Preview.Example>
          <Preview.Code>{examples[6]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can add use 
            the <C value="frui-accordion" />, <C value="frui-accordion-bellow" />, <C value="frui-accordion-label" />, 
            and <C value="frui-accordion-content" /> CSS classes to 
            globally theme accordions.
          </Translate>
        </p>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following section describes the props for each accordion 
            component.
          </Translate>
        </p>

        <h3 className="font-semibold mt-4">{_('Root')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Accordion>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[0]} />

        <h3 className="font-semibold mt-4">{_('Item')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Accordion.Item>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[1]} />

        <h3 className="font-semibold mt-4">{_('Label')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Accordion.Label>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[2]} />

        <h3 className="font-semibold mt-4">{_('Content')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Accordion.Content>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[3]} />

        <h3 className="font-semibold mt-4">{_('Active')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Accordion.Active>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[4]} />

        <h3 className="font-semibold mt-4">{_('Inactive')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Accordion.Inactive>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[5]} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/start">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Getting Started')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/alert">
          {_('Alerts')}
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
      uri="/component/accordion"
      title="Accordion Component"
      description={
        'Accordions in FRUI are React components that allow users to '
        + 'toggle the visibility of content panels with internal '
        + 'state management.'
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
      <LayoutPanel pathname="/component/accordion">
        <main className="flex flex-col h-full w-full">
          <div className="p-3 theme-bg-2">
            <Crumbs />
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