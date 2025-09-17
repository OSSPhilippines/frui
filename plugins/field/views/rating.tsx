import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';

import type { PageProps } from '../../app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C 
} from '../../app/index.js';
import type { Crumb } from '../../../components/element/Crumbs.js';
import Crumbs from '../../../components/element/Crumbs.js';
import { Table, Thead, Trow, Tcol } from '../../../components/element/Table.js';

import Rating from '../../../components/field/Rating.js';

const crumbs: Crumb[] = [
  { icon: 'shapes', label: 'Components', href: '/component' },
  { label: 'Rating' }
];

const propsData: [string, string, string, string][] = [
  [ 'name', 'string', 'No', 'Name attribute for the radio inputs (form submission). Auto-generated if not provided.' ],
  [ 'value', 'number | null', 'No', 'The rating value for controlled mode.' ],
  [ 'defaultValue', 'number | null', 'No (Defaults to null)', 'The initial rating value for uncontrolled mode.' ],
  [ 'max', 'number', 'No (Defaults to 5)', 'The maximum rating value (number of icons).' ],
  [ 'onChange', 'Function', 'No', 'Callback fired when the value changes. `(event, value) => void`' ],
  [ 'onChangeActive', 'Function', 'No', 'Callback fired when the mouse hovers over a rating icon. `(event, value) => void`' ],
  [ 'readOnly', 'boolean', 'No (Defaults to false)', 'If true, the rating cannot be changed.' ],
  [ 'disabled', 'boolean', 'No (Defaults to false)', 'If true, the rating is disabled (visual state and interaction).' ],
  [ 'size', `'small' | 'medium' | 'large'`, 'No (Defaults to medium)', 'The size of the rating icons.' ],
  [ 'icon', 'ReactNode', 'No', 'The icon to display as the filled state.' ],
  [ 'emptyIcon', 'ReactNode', 'No', 'The icon to display as the empty state (defaults to faded filled icon).' ],
  [ 'getLabelText', 'Function', 'No', 'Generates aria-label text for accessibility. `(value) => string`' ],
  [ 'highlightSelectedOnly', 'boolean', 'No (Defaults to false)', 'If true, only the selected icon will be highlighted, not the preceding ones.' ],
  [ 'className', 'string', 'No', 'Standard HTML class names for the root span element.' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object for inline styles on the root span element.' ]
];

const examples = [
//0
`function ControlledRatingExample() {
  const [controlledValue, setControlledValue] = useState<number | null>(2);

  return (
    <Rating
      name="controlled-rating"
      value={controlledValue}
      onChange={(event, newValue) => {
        setControlledValue(newValue);
        console.log('Controlled Change:', newValue);
      }}
    />
  );
}`,
//1
`<Rating defaultValue={3} size="small" />
<Rating defaultValue={3} size="medium" />
<Rating defaultValue={3} size="large" />`,
//2
`// Define custom icons (examples)
const HeartIcon = (props) => (/* SVG code */);
const CircleIcon = (props) => (/* SVG code */);

// Use in Rating
<Rating
  defaultValue={3}
  icon={<HeartIcon />}
  emptyIcon={<HeartIcon style={{ opacity: 0.3 }} />}
  max={5}
/>

<Rating
  defaultValue={4}
  icon={<CircleIcon />}
  emptyIcon={<CircleIcon style={{ opacity: 0.3 }} />}
  max={6}
/>`,
//3
`{/* Default: Icons 1, 2, 3 are filled */}
<Rating defaultValue={3} />

{/* highlightSelectedOnly: Only icon 3 is filled */}
<Rating defaultValue={3} highlightSelectedOnly />`,
//4
`<Rating value={4} readOnly />
<Rating value={2} disabled />`,
//5
`<Rating
  name="event-rating"
  defaultValue={1}
  onChange={(event, value) => alert(\`onChange: Value \${value} selected!\`)}
  onChangeActive={(event, value) => console.log(\`onChangeActive: Hovered \${value}\`)}
/>`
];

// Example Custom Icons
const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" height="1em" width="1em" {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const CircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export function Body() {
  //hooks
  const { _ } = useLanguage();
  const [ controlledValue, setControlledValue ] = useState<number | null>(2);
  const [ hoverActiveValue, setHoverActiveValue ] = useState<number | null>(null);
  //render
  return (
    <LayoutPanel pathname="/field/rating">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <a href="#top">{_('Rating')}</a>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
              <li className="pl-3 pb-1">
                <a href="#props">
                  {_('Props')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#basic">
                  {_('Basics')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#controlled">
                  {_('Controlled')}
                </a>
              </li>
               <li className="pl-3 pb-1">
                <a href="#sizes">
                  {_('Sizes')}
                </a>
              </li>
               <li className="pl-3 pb-1">
                <a href="#icons">
                  {_('Custom Icons')}
                </a>
              </li>
               <li className="pl-3 pb-1">
                <a href="#highlight">
                  {_('Highlighting')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#read-only">
                  {_('Read Only & Disabled')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#events">
                  {_('Events')}
                </a>
              </li>
            </ul>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              <i className="fas fa-star mr-2"></i>
              {_('Rating')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Rating from 'frui/field/Rating';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p>
              <Translate>
                The Rating component wraps visually hidden radio inputs for accessibility and form integration.
                It accepts the following specific props:
              </Translate>
            </p>
            <Props props={propsData} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p className="py-4">
              <Translate>
                By default, the Rating component is uncontrolled. Use <C value="defaultValue" /> to set an initial value.
                It renders 5 stars.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Rating name="basic-rating" defaultValue={3} />
              </div>
              <Code language="typescript">
                {`<Rating name="basic-rating" defaultValue={3} />`}
              </Code>
            </div>

            <h2 id="controlled" className="uppercase font-bold text-lg mt-8">
              {_('Controlled')}
            </h2>
            <p className="py-4">
              <Translate>
                For a controlled component, use the <C value="value" />, 
                and <C value="onChange" r /> props, typically with React 
                state.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex flex-col items-center justify-center p-3 bg-b1 space-y-2">
                <Rating
                  name="controlled-rating"
                  value={controlledValue}
                  onChange={(_, newValue) => {
                    setControlledValue(newValue);
                    console.log('Controlled Change:', newValue);
                  }}
                />
                <span>{_('Current Value:')} {controlledValue ?? 'null'}</span>
              </div>
              <Code language="typescript">{examples[0]}</Code>
            </div>

            <h2 id="sizes" className="uppercase font-bold text-lg mt-8">
              {_('Sizes')}
            </h2>
            <p className="py-4">
              <Translate>
                Use the <C value="size" /> prop to adjust the icon size. 
                The sizes correspond to CSS 
                classes <C l value=".frui-rating-sizeSmall" />, <C l value=".frui-rating-sizeMedium" />, 
                and <C l value=".frui-rating-sizeLarge" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex flex-col space-y-2 items-start justify-center p-3 bg-b1">
                <div><C value="small" />: <Rating defaultValue={3} size="small" /></div>
                <div><C value="medium" /> (default): <Rating defaultValue={3} size="medium" /></div>
                <div><C value="large" />: <Rating defaultValue={3} size="large" /></div>
              </div>
              <Code language="typescript">{examples[1]}</Code>
            </div>

            <h2 id="icons" className="uppercase font-bold text-lg mt-8">
              {_('Custom Icons')}
            </h2>
            <p className="py-4">
              <Translate>
                Provide custom React nodes to the <C value="icon" /> (filled) 
                and <C value="emptyIcon" /> props. If <C value="emptyIcon" /> is 
                not provided, a faded version of the <C value="icon" /> is 
                used. Styles target <C l value=".frui-rating-icon-filled" />, 
                and <C l value=".frui-rating-icon-empty" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex flex-col space-y-2 items-start justify-center p-3 bg-b1">
                <Rating 
                  defaultValue={3.5} 
                  icon={<HeartIcon />} 
                  emptyIcon={<HeartIcon 
                  style={{ opacity: 0.3 }} />} 
                  max={5} 
                />
                <Rating 
                  defaultValue={4} 
                  icon={<CircleIcon />} 
                  emptyIcon={<CircleIcon 
                  style={{ opacity: 0.3 }} />} 
                  max={6} 
                />
              </div>
              <Code language="typescript">{examples[2]}</Code>
            </div>

            <h2 id="highlight" className="uppercase font-bold text-lg mt-8">
              {_('Highlighting')}
            </h2>
            <p className="py-4">
              <Translate>
                By default, all icons up to the selected/hovered 
                value are filled. Use <C value="highlightSelectedOnly" /> to 
                only fill the single selected/hovered icon.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex flex-col space-y-2 items-start justify-center p-3 bg-b1">
                <div>Default: <Rating defaultValue={3} /></div>
                <div>Highlight Selected Only: <Rating defaultValue={3} highlightSelectedOnly /></div>
              </div>
              <Code language="typescript">{examples[3]}</Code>
            </div>

            <h2 id="read-only" className="uppercase font-bold text-lg mt-8">
              {_('Read Only & Disabled')}
            </h2>
            <p className="py-4">
              <Translate>
                Use <C value="readOnly" /> to display a rating that 
                cannot be changed by the user (<C l value=".frui-rating-readOnly" /> class).
                Use <C value="disabled" /> to prevent interaction 
                and apply disabled styling (<C l value=".frui-rating-disabled" /> class).
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex flex-col space-y-2 items-start justify-center p-3 bg-b1">
                <div>Read Only: <Rating value={4} readOnly /></div>
                <div>Disabled: <Rating value={2} disabled /></div>
              </div>
              <Code language="typescript">{examples[4]}</Code>
            </div>

            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
            <p className="py-4">
              <Translate>
                The <C value="onChange" /> callback fires when a 
                rating is selected. The <C value="onChangeActive" r /> callback 
                fires when the mouse enters or leaves an icon, 
                providing the hovered value (or null). Hover styles 
                are mainly handled via CSS (<C l value=".frui-rating-icon-hover" />).
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex flex-col items-start justify-center p-3 bg-b1 space-y-2">
                <Rating
                  name="event-rating"
                  defaultValue={1}
                  onChange={(_, v) => alert(`onChange: Value ${v} selected!`)}
                  onChangeActive={(_, v) => setHoverActiveValue(v)}
                />
                <span>{_('Hovered Value (via onChangeActive):')} {hoverActiveValue ?? 'null'}</span>
              </div>
              <Code language="typescript">{examples[5]}</Code>
            </div>

            <h3 className="font-semibold text-md mt-8">
              {_('onChange')}
            </h3>
            <p className="py-4">
              <Translate>
                The <C value="onChange" /> event is triggered when the
                value has changed. The following arguments are passed
                to the event handler:
              </Translate>
            </p>
            <Table>
              <Thead className="bg-b3 text-left">{_('Name')}</Thead>
              <Thead className="bg-b3 text-left">{_('Type')}</Thead>
              <Thead className="bg-b3 text-left">{_('Description')}</Thead>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  <C value="event" />
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <C value="ChangeEvent<HTMLInputElement>" />
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('The change event on the underlying radio input.')}
                </Tcol>
              </Trow>
                <Trow>
                  <Tcol className="bg-b1 text-left">
                    <C value="value" />
                  </Tcol>
                  <Tcol className="bg-b1 text-left">
                    <C value="number | null" />
                  </Tcol>
                  <Tcol className="bg-b1 text-left">
                    {_('The newly selected rating value.')}
                  </Tcol>
              </Trow>
            </Table>

            <h3 className="font-semibold text-md mt-8">
              {_('onChangeActive')}
            </h3>
            <p className="py-4">
              <Translate>
                 The <C value="onChangeActive" /> event is triggered 
                 when the mouse pointer enters or leaves an icon. The 
                 following arguments are passed to the event handler:
              </Translate>
            </p>
            <Table>
                <Thead className="bg-b3 text-left">{_('Name')}</Thead>
                <Thead className="bg-b3 text-left">{_('Type')}</Thead>
                <Thead className="bg-b3 text-left">{_('Description')}</Thead>
                 <Trow>
                    <Tcol className="bg-b1 text-left"><C value="event" /></Tcol>
                    <Tcol className="bg-b1 text-left"><C value="MouseEvent" /></Tcol>
                    <Tcol className="bg-b1 text-left">{_('The native mouse event.')}</Tcol>
                </Trow>
                <Trow>
                    <Tcol className="bg-b1 text-left"><C value="value" /></Tcol>
                    <Tcol className="bg-b1 text-left"><C value="number | null" /></Tcol>
                    <Tcol className="bg-b1 text-left">{_('The value of the icon being hovered, or null if the mouse leaves the component.')}</Tcol>
                </Trow>
            </Table>

            <p className="py-4 mt-4">
              <Translate>
                You can add custom CSS classes via 
                the <C value="className" /> prop or inline styles via 
                the <C value="style" /> prop to the 
                root <C l value=".frui-rating-root" /> element. 
                Component-specific classes like <C l value=".frui-rating-icon" />, <C l value=".frui-rating-icon-filled" />, <C l value=".frui-rating-icon-empty" />, <C l value=".frui-rating-icon-hover" />, <C l value=".frui-rating-icon-active" />, 
                and size/state classes are available for more targeted styling.
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <a className="text-t2" href="/field/radio">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Radio')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/field/select">
                {_('Select')}
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
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
      uri="/field/rating"
      title="Rating Component"
      description="Rating components allow users to view and set ratings represented by icons."
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
