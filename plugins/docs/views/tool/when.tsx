//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Button from 'components/Button.js';
import { When, Otherwise } from 'components/block/When.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/format/email';
const title = 'Email Format';
const description = 
  'Email formats convert values to clickable email displays.'

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'Yes', 'Default value' ],
];

const examples = [
//0
`<When condition={step === 0}>
  <div>Get Started. Hit Next.</div>
  <When condition={step === 1} />
  <h3>Welcome to Step 1</h3>
  <p>In this step, we will cover the basics of using the When tool.</p>
  <When condition={step === 2} />
  <h3>Welcome to Step 2</h3>
  <p>In this step, we will cover some advanced features of the When tool.</p>
  <When condition={step === 3} />
  <h3>Final Step</h3>
  <p>Congratulations! You've reached the final step.</p>
  <Otherwise />
  <h3>Uh oh....</h3>
  <p className="theme-error">Looks like you gone too far. Step: {step}</p>
</When>`,
//1
`<When condition={step === 0}>
  <div>Get Started. Hit Next.</div>
  <When condition={step === 1}>
    <h3>Welcome to Step 1</h3>
    <p>In this step, we will cover the basics of using the When tool.</p>
  </When>
  <When condition={step === 2}>
    <h3>Welcome to Step 2</h3>
    <p>In this step, we will cover some advanced features of the When tool.</p>
  </When>
  <When condition={step === 3}>
    <h3>Final Step</h3>
    <p>Congratulations! You've reached the final step.</p>
  </When>
  <Otherwise>
    <h3>Uh oh....</h3>
    <p className="theme-error">Looks like you gone too far. Step: {step}</p>
  </Otherwise>
</When>`,
//2
`<When condition={step === 0}>
  <div>Get Started. Hit Next.</div>
  <When condition={step === 1}>
    <h3>Welcome to Step 1</h3>
    <p>In this step, we will cover the basics of using the When tool.</p>
  </When>
  <When condition={step === 2}>
    <h3>Welcome to Step 2</h3>
    <p>In this step, we will cover some advanced features of the When tool.</p>
  </When>
  <When condition={step === 3}>
    <h3>Final Step</h3>
    <p>Congratulations! You've reached the final step.</p>
  </When>
  <Otherwise>
    <When condition={step === 10}>
      <h3>Secret Step</h3>
      <p className="theme-success">You unlocked secret step ten!</p>
      <Otherwise>
        <h3>Uh oh....</h3>
        <p className="theme-error">Looks like you gone too far. Step: {step}</p>
      </Otherwise>
    </When>
  </Otherwise>
</When>`
];

//--------------------------------------------------------------------//
// Components

const { C, Code, Props, Preview } = Docs;

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
      <Bread.Slicer />
      <Bread.Crumb icon="screwdriver-wrench" href="/tool">
        Tools
      </Bread.Crumb>
      <Bread.Crumb>When</Bread.Crumb>
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
          {_('When')}
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
 * Documentation body component
 */
export function Body() {
  //hooks
  const { _ } = useLanguage();
  const [ step, setStep ] = useState(0);
  const prev = () => setStep(step => Math.max(step - 1, 0));
  const next = () => setStep(step + 1);
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('When')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the when tool like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import When from 'frui/tool/When';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<When>" /> tool allows you to conditionally
            render components based on the value of a condition. You can use
            multiple <C value="<When>" /> components to create complex
            conditional rendering logic. The <C value="<Otherwise>" /> tool
            can be used to provide a fallback when no conditions are met.
          </Translate>
        </p>
        <Preview 
          title="Basic Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <div>
              <Button muted onClick={prev}>Back</Button>
              <Button info onClick={next}>Next</Button>
            </div>
            <When condition={step === 0}>
              <div>Get Started. Hit Next.</div>
              <When condition={step === 1} />
              <h3>Welcome to Step 1</h3>
              <p>In this step, we will cover the basics of using the When tool.</p>
              <When condition={step === 2} />
              <h3>Welcome to Step 2</h3>
              <p>In this step, we will cover some advanced features of the When tool.</p>
              <When condition={step === 3} />
              <h3>Final Step</h3>
              <p>Congratulations! You've reached the final step.</p>
              <Otherwise />
              <h3>Uh oh....</h3>
              <p className="theme-error">Looks like you gone too far. Step: {step}</p>
            </When>
          </Preview.Example>
          <Preview.Code>{examples[0]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="nested" className="uppercase font-bold text-lg mt-8">
        {_('Nested Conditions')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can nest <C value="<When>" /> components to create more
            complex conditional rendering logic. This allows you to handle
            multiple conditions at different levels of your component tree.
          </Translate>
        </p>
        <Preview 
          title="Nested Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <div>
              <Button muted onClick={prev}>Back</Button>
              <Button info onClick={next}>Next</Button>
            </div>
            <When condition={step === 0}>
              <div>Get Started. Hit Next.</div>
              <When condition={step === 1}>
                <h3>Welcome to Step 1</h3>
                <p>In this step, we will cover the basics of using the When tool.</p>
              </When>
              <When condition={step === 2}>
                <h3>Welcome to Step 2</h3>
                <p>In this step, we will cover some advanced features of the When tool.</p>
              </When>
              <When condition={step === 3}>
                <h3>Final Step</h3>
                <p>Congratulations! You've reached the final step.</p>
              </When>
              <Otherwise>
                <h3>Uh oh....</h3>
                <p className="theme-error">Looks like you gone too far. Step: {step}</p>
              </Otherwise>
            </When>
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="nested" className="uppercase font-bold text-lg mt-8">
        {_('Deep Nested Conditions')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can nest <C value="<When>" /> components to create more
            complex conditional rendering logic. This allows you to handle
            multiple conditions at different levels of your component tree.
          </Translate>
        </p>
        <Preview 
          title="Deep Nested Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <div>
              <Button muted onClick={prev}>Back</Button>
              <Button info onClick={next}>Next</Button>
            </div>
            <When condition={step === 0}>
              <div>Get Started. Hit Next.</div>
              <When condition={step === 1}>
                <h3>Welcome to Step 1</h3>
                <p>In this step, we will cover the basics of using the When tool.</p>
              </When>
              <When condition={step === 2}>
                <h3>Welcome to Step 2</h3>
                <p>In this step, we will cover some advanced features of the When tool.</p>
              </When>
              <When condition={step === 3}>
                <h3>Final Step</h3>
                <p>Congratulations! You've reached the final step.</p>
              </When>
              <Otherwise>
                <When condition={step === 10}>
                  <h3>Secret Step</h3>
                  <p className="theme-success">You unlocked secret step ten!</p>
                  <Otherwise>
                    <h3>Uh oh....</h3>
                    <p className="theme-error">Looks like you gone too far. Step: {step}</p>
                  </Otherwise>
                </When>
              </Otherwise>
            </When>
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Email>" /> format can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="theme-2" href="/format/date">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Date')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/format/formula">
          {_('Formula')}
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
