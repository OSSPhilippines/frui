import { useLanguage, Translate } from 'r22n';

import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Code, 
  C, 
  Props
} from 'plugins/app/index.js';
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';

import Tooltip from 'components/element/Tooltip.js';
import Button from 'components/form/Button.js';

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
  ['info', 'boolean', 'No', 'Blue tooltip'],
  ['muted', 'boolean', 'No', 'Gray tooltip'],
  ['left', 'boolean', 'No', 'Places in left'],
  ['opacity', 'string | number', 'No', 'Adjust the transparency [0-100]'],
  ['pill', 'boolean', 'No', 'Max rounded corners'],
  ['right', 'boolean', 'No', 'Places in right'],
  ['rounded', 'boolean', 'No', 'Rounded corners'],
  ['style', 'CSS Object', 'No', 'Standard CSS input'],
  ['success', 'boolean', 'No', 'Green tooltip'],
  ['text', 'string', 'Yes', 'Text displayed inside the tooltip'],
  ['top', 'boolean', 'No', 'Places in top (default)'],
  ['warning', 'boolean', 'No', 'Orange tooltip']
];

const examples = [
//0
`<Tooltip text="Submit">
  <Button color="#333">Submit</Button>
</Tooltip>`,
//1
`<Tooltip text="Submit info" info>
  <Button info>Submit info</Button>
</Tooltip>`,
//2
`<Tooltip text="Submit warning" warning>
  <Button warning>Submit Warning</Button>
</Tooltip>`,
//3
`<Tooltip text="Submit success" success>
  <Button success>Submit Success</Button>
</Tooltip>`,
//4
`<Tooltip text="Submit Error" error>
  <Button error>Submit Error</Button>
</Tooltip>`,
//5
`<Tooltip text="Submit Muted" muted>
  <Button muted>Submit Muted</Button>
</Tooltip>`,
//6
`<Tooltip text="Submit Custom" color="salmon">
  <Button color="salmon">Submit Custom</Button>
</Tooltip>`,
//7
`<Tooltip text="Submit Curved" info curved>
  <Button info curved>Submit Curved</Button>
</Tooltip>`,
//8
`<Tooltip text="Submit Rounded" warning rounded>
  <Button warning rounded>Submit Rounded</Button>
</Tooltip>`,
//9
`<Tooltip text="Submit Pill" success pill>
  <Button success pill>Submit Pill</Button>
</Tooltip>`,
//10
`<Tooltip text="Submit" arrow>
  <Button color="#333">Submit</Button>
</Tooltip>`,
//11
`<Tooltip text="top-right" topRight>
  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
    topRight
  </Button>
</Tooltip>`,
//12
`<Tooltip text="Submit" padding={20}>
  <Button color="#333" rounded>Submit</Button>
</Tooltip>`,
//13
`<Tooltip text="Submit" opacity={50}>
  <Button color="#333">Submit</Button>
</Tooltip>`
];

export function Body() {
  const { _ } = useLanguage();
  return (
    <LayoutPanel pathname="/component/tooltip">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
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

          <div className="curved overflow-hidden">
            <Tooltip text="Submit">
              <Button color="#333">Submit</Button>
            </Tooltip>
            <Code language="typescript">{examples[0]}</Code>
          </div>

          <div className="curved overflow-hidden mt-5">
            <Tooltip text="Submit info" info>
              <Button info>Submit info</Button>
            </Tooltip>
            <Code language="typescript">{examples[1]}</Code>
          </div>

          <div className="curved overflow-hidden mt-5">
            <Tooltip text="Submit warning" warning>
              <Button warning>Submit Warning</Button>
            </Tooltip>
            <Code language="typescript">{examples[2]}</Code>
          </div>

          <div className="curved overflow-hidden mt-5">
            <Tooltip text="Submit success" success>
              <Button success>Submit Success</Button>
            </Tooltip>
            <Code language="typescript">{examples[3]}</Code>
          </div>

          <div className="curved overflow-hidden mt-5">
            <Tooltip text="Submit Error" error>
              <Button error>Submit Error</Button>
            </Tooltip>
            <Code language="typescript">{examples[4]}</Code>
          </div>

          <div className="curved overflow-hidden mt-5">
            <Tooltip text="Submit Muted" muted>
              <Button muted>Submit Muted</Button>
            </Tooltip>
            <Code language="typescript">{examples[5]}</Code>
          </div>

          <h2 id="arrow" className="uppercase font-bold text-lg mt-8">
            {_('Arrow')}
          </h2>
          <Tooltip text="Submit" arrow>
            <Button color="#333">Submit</Button>
          </Tooltip>
          <Code language="typescript">{examples[10]}</Code>

          <h2 id="place" className="uppercase font-bold text-lg mt-8">
            {_('Placements')}
          </h2>
          <Tooltip text="top-right" topRight>
            <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
              topRight
            </Button>
          </Tooltip>
          <Code language="typescript">{examples[11]}</Code>

          <h2 id="rounded" className="uppercase font-bold text-lg mt-8">
            {_('Rounded')}
          </h2>
          <Tooltip text="Submit Curved" info curved>
            <Button info curved>Submit Curved</Button>
          </Tooltip>
          <Code language="typescript">{examples[7]}</Code>

          <Tooltip text="Submit Rounded" warning rounded>
            <Button warning rounded>Submit Rounded</Button>
          </Tooltip>
          <Code language="typescript">{examples[8]}</Code>

          <Tooltip text="Submit Pill" success pill>
            <Button success pill>Submit Pill</Button>
          </Tooltip>
          <Code language="typescript">{examples[9]}</Code>

          <h2 id="padding" className="uppercase font-bold text-lg mt-8">
            {_('Padding')}
          </h2>
          <Tooltip text="Submit" padding={20}>
            <Button color="#333" rounded>Submit</Button>
          </Tooltip>
          <Code language="typescript">{examples[12]}</Code>

          <h2 id="opacity" className="uppercase font-bold text-lg mt-8">
            {_('Opacity')}
          </h2>
          <Tooltip text="Submit" opacity={50}>
            <Button color="#333">Submit</Button>
          </Tooltip>
          <Code language="typescript">{examples[13]}</Code>

          <h2 id="custom" className="uppercase font-bold text-lg mt-8">
            {_('Custom Color')}
          </h2>
          <Tooltip text="Submit Custom" color="salmon">
            <Button color="salmon">Submit Custom</Button>
          </Tooltip>
          <Code language="typescript">{examples[6]}</Code>

          <h2 id="styles" className="uppercase font-bold text-lg mt-8">
            {_('Custom Styles')}
          </h2>
          <p className="py-4">
            <Translate>
              You can add your own custom class to the tooltip component or use the <C value="frui-tooltip" /> CSS class.
            </Translate>
          </p>

          <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
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
        </section>
      </main>
    </LayoutPanel>
  );
};

export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/component/tooltip"
      title="Tooltip Component"
      description="Tooltips in FRUI are interactive ReactJS components that display informative text when users hover over, focus on, or tap an element."
      styles={styles}
    />
  );
};

export default function Page() {
  return (
    <LayoutProvider>
      <Body />
    </LayoutProvider>
  );
};
