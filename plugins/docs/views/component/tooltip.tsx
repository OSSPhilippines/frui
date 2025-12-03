//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';

//frui
import Button from 'components/Button.js';
import Tooltip from 'components/Tooltip.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/component/tooltip';
const title = 'Tooltip Component';
const description = 
  'Tooltip display informative text when users hover '
  + 'over, focus on, or tap an element.';

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
  <Button color="#333333">Submit</Button>
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
`<Tooltip text="Submit Curved" curved hover>
  <Button color="#333333" curved>Submit Curved</Button>
</Tooltip>`,
//8
`<Tooltip text="Submit Rounded" rounded hover>
  <Button color="#333333" warning rounded>Submit Rounded</Button>
</Tooltip>`,
//9
`<Tooltip text="Submit Pill" pill hover>
  <Button color="#333333" success pill>Submit Pill</Button>
</Tooltip>`,
//10
`<Tooltip text="Submit" arrow hover>
  <Button color="#333333">Submit</Button>
</Tooltip>`,
//11
`<Tooltip text="Submit" opacity={50} hover>
  <Button color="#333333">Submit</Button>
</Tooltip>`,
//12
`<Tooltip text="top-right" top right hover>
  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
    topRight
  </Button>
</Tooltip>`,
//13
`const [ show, setShow ] = useState(false);
return (
  <Tooltip text="Party Time!" show={show}>
    <Button color="#333333" onClick={() => setShow(show => !show)}>
      Click Me
    </Button>
  </Tooltip>
);`
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
          {_('Tooltip')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#placements">{_('Placements')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#controlled">{_('Controlled State')}</a>
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
        title="Basic Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit" hover>
              <Button color="#333333">Submit</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>
      {/* Info Example */}
      <Preview 
        title="Info Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit info" info hover>
              <Button info>Submit info</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[1]}</Preview.Code>
      </Preview>
      {/* Warning Example */}
      <Preview 
        title="Warning Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit warning" warning hover>
              <Button warning>Submit warning</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[2]}</Preview.Code>
      </Preview>
      {/* Success Example */}
      <Preview 
        title="Success Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit success" success hover>
              <Button success>Submit success</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[3]}</Preview.Code>
      </Preview>
      {/* Error Example */}
      <Preview 
        title="Error Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit error" error hover>
              <Button error>Submit error</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[4]}</Preview.Code>
      </Preview>
      {/* Muted Example */}
      <Preview 
        title="Muted Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit muted" muted hover>
              <Button muted>Submit muted</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[5]}</Preview.Code>
      </Preview>
      {/* Custom Color Example */}
      <Preview 
        title="Custom Color Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit custom" color="salmon" hover>
              <Button color="salmon">Submit custom</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[6]}</Preview.Code>
      </Preview>
      {/* Curved Example */}
      <Preview 
        title="Curved Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit curved" curved hover>
              <Button color="#333333">Submit curved</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[7]}</Preview.Code>
      </Preview>
      {/* Rounded Example */}
      <Preview 
        title="Rounded Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit rounded" rounded hover>
              <Button color="#333333">Submit rounded</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[8]}</Preview.Code>
      </Preview>
      {/* Pill Example */}
      <Preview 
        title="Pill Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit pill" pill hover>
              <Button color="#333333">Submit pill</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[9]}</Preview.Code>
      </Preview>
      {/* Arrow Example */}
      <Preview 
        title="Arrow Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit" arrow hover>
              <Button color="#333333">Submit arrow</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[10]}</Preview.Code>
      </Preview>
      {/* Opaque Example */}
      <Preview 
        title="Opaque Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Tooltip text="Submit" opacity={50} hover>
              <Button color="#333333">Submit</Button>
            </Tooltip>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[11]}</Preview.Code>
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
  const [ show, setShow ] = useState(false);
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Tooltip')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<Tooltip>" /> component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Tooltip from 'frui/Tooltip';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples of <C value="Tooltip" /> component.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="placements" className="uppercase font-bold text-lg mt-8">
        {_('Placements')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Tooltip can be placed in different positions around the
            target element using the <C value="top" />, <C value="bottom" />,
            <C value="left" />, and <C value="right" /> props. The default 
            placement is top.
          </Translate>
        </p>
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

      <h2 id="controlled" className="uppercase font-bold text-lg mt-8">
        {_('Controlled State')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Tooltip can be placed in different positions around the
            target element using the <C value="top" />, <C value="bottom" />,
            <C value="left" />, and <C value="right" /> props. The default 
            placement is top.
          </Translate>
        </p>
        <Preview 
          title="Basic Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <div className="text-center">
              <Tooltip text="Party Time!" show={show}>
                <Button color="#333333" onClick={() => setShow(show => !show)}>
                  Click Me
                </Button>
              </Tooltip>
            </div>
          </Preview.Example>
          <Preview.Code>{examples[13]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use the <C value="frui-tooltip" /> CSS class to
          globally theme tooltip.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Tooltip>" /> component can be passed the 
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
