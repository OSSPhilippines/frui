//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Button from 'components/form/Button.js';
import Dialog from 'components/element/Dialog.js';

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

//--------------------------------------------------------------------//
// Constants

const props = [
  //dialog
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'defaultOpen', 'boolean', 'No', 'Whether the dialog is open by default' ],
    [ 'onClose', 'Function', 'No', 'Function triggered when the dialog is closed' ],
    [ 'onOpen', 'Function', 'No', 'Function triggered when the dialog is opened' ],
    [ 'open', 'boolean', 'No', 'Whether the dialog is open or not (controlled)' ],
    [ 'overlayClassName', 'string', 'No', 'Overlay class names' ],
    [ 'overlayClose', 'boolean', 'No', 'Whether to close the dialog when clicking outside' ],
    [ 'overlayStyle', 'CSSProperties', 'No', 'Overlay styles' ],
    [ 'style', 'CSSProperties', 'No', 'Standard HTML styles' ]
  ],
  //dialog provider
  [
    [ 'id', 'string', 'No', 'ID of the dialog container' ],
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'CSSProperties', 'No', 'Standard HTML styles' ]
  ],
  //dialog close
  [
    [ 'onClose', 'Function', 'No', 'Function triggered when the dialog is closed' ]
  ]
];

const examples = [
//0
`const [ open, setOpen ] = useState(false);
return (
  <div>
    <Button info onClick={() => setOpen(true)}>Open Dialog</Button>
    <Dialog 
      open={open} 
      onClose={() => setOpen(false)}
      className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
    >
      <header className="flex items-center p-3 theme-bg-2">
        <h3 className="flex-grow font-semibold uppercase">Basic Example</h3>
        <Dialog.Close className="text-2xl theme-error cursor-pointer">
          &times;
        </Dialog.Close>
      </header>
      <p className="px-3 py-6">This is a basic dialog example.</p>
      <footer className="border-t theme-bc-1 p-3 flex justify-end">
        <Dialog.Close className="inline-block theme-error">
          <Button error>Close</Button>
        </Dialog.Close>
      </footer>
    </Dialog>
  </div>
);`,
//1
`const [ open, setOpen ] = useState(false);
return (
  <div>
    <Button info onClick={() => setOpen(true)}>Open Dialog</Button>
    <Dialog 
      open={open} 
      onClose={() => setOpen(false)}
      className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
      overlayClose
    >
      <header className="flex items-center p-3 theme-bg-2">
        <h3 className="flex-grow font-semibold uppercase">Close With Overlay</h3>
        <Dialog.Close className="text-2xl theme-error cursor-pointer">
          &times;
        </Dialog.Close>
      </header>
      <p className="px-3 py-6">Clicking the overlay will close the dialog.</p>
      <footer className="border-t theme-bc-1 p-3 flex justify-end">
        <Dialog.Close className="inline-block theme-error">
          <Button error>Close</Button>
        </Dialog.Close>
      </footer>
    </Dialog>
  </div>
);`,
//2
`const [ step, setStep ] = useState('step0');
return (
  <div>
    <Button info onClick={() => setStep('step1')}>Open Wizard</Button>
    <Dialog 
      open={step === 'step1'} 
      className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
    >
      <header className="flex items-center p-3 theme-bg-2">
        <h3 className="flex-grow font-semibold uppercase">Step 1</h3>
        <Dialog.Close 
          className="text-2xl theme-error cursor-pointer"
          onClose={() => setStep('step0')}
        >
          &times;
        </Dialog.Close>
      </header>
      <p className="px-3 py-6">This is step one.</p>
      <footer className="border-t theme-bc-1 p-3 flex justify-end">
        <Button info onClick={() => setStep('step2')}>Next</Button>
      </footer>
    </Dialog>
    <Dialog 
      open={step === 'step2'} 
      className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
    >
      <header className="flex items-center p-3 theme-bg-2">
        <h3 className="flex-grow font-semibold uppercase">Step 2</h3>
        <Dialog.Close 
          className="text-2xl theme-error cursor-pointer"
          onClose={() => setStep('step0')}
        >
          &times;
        </Dialog.Close>
      </header>
      <p className="px-3 py-6">This is step two.</p>
      <footer className="border-t theme-bc-1 p-3 flex justify-end">
        <Button info onClick={() => setStep('step1')}>Back</Button>
      </footer>
    </Dialog>
  </div>
);`,
//3
`const [ step, setStep ] = useState('step0');
const [ value, input ] = useState('');
return (
  <div>
    <Button info onClick={() => setStep('step1')}>Open Wizard</Button>
    <Dialog 
      open={step === 'step1'} 
      className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
    >
      <header className="flex items-center p-3 theme-bg-2">
        <h3 className="flex-grow font-semibold uppercase">Step 1</h3>
        <Dialog.Close 
          className="text-2xl theme-error cursor-pointer"
          onClose={() => setStep('step0')}
        >
          &times;
        </Dialog.Close>
      </header>
      <p className="px-3 pt-6">This is step one. Enter your name:</p>
      <div className="p-3">
        <input className="p-2" value={value} onChange={e => input(e.target.value)} />
      </div>
      <footer className="border-t theme-bc-1 p-3 flex justify-end">
        <Button info onClick={() => setStep('step2')}>Next</Button>
      </footer>
    </Dialog>
    <Dialog 
      open={step === 'step2'} 
      className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
    >
      <header className="flex items-center p-3 theme-bg-2">
        <h3 className="flex-grow font-semibold uppercase">Step 2</h3>
        <Dialog.Close 
          className="text-2xl theme-error cursor-pointer"
          onClose={() => setStep('step0')}
        >
          &times;
        </Dialog.Close>
      </header>
      <p className="px-3 py-6">This is step two. Go back and check your input.</p>
      <footer className="border-t theme-bc-1 p-3 flex justify-end">
        <Button info onClick={() => setStep('step1')}>Back</Button>
      </footer>
    </Dialog>
  </div>
);`,
//4
`<Dialog.Provider id="custom-dialog-root">
  <App />
</Dialog.Provider>`
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
      <Bread.Crumb>Dialogs</Bread.Crumb>
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
          {_('Dialogs')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#provider">{_('Provider')}</a>
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
  const [ opened, open ] = useState(false);
  const [ overlayed, overlay ] = useState(false);
  const [ step, setStep ] = useState('step0');
  const [ formStep, setFormStep ] = useState('step0');
  const [ value, input ] = useState('');
  return (
    <div className="flex items-start rmd-block flex-wrap gap-4">
      {/* Basic Example */}
      <Preview 
        height={200}
        title="Basic Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info onClick={() => open(true)}>Open Dialog</Button>
          </div>
          <Dialog 
            open={opened} 
            onClose={() => open(false)}
            className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
          >
            <header className="flex items-center p-3 theme-bg-2">
              <h3 className="flex-grow font-semibold uppercase">Basic Example</h3>
              <Dialog.Close className="text-2xl theme-error cursor-pointer">
                &times;
              </Dialog.Close>
            </header>
            <p className="px-3 py-6">This is a basic dialog.</p>
            <footer className="border-t theme-bc-1 p-3 flex justify-end">
              <Dialog.Close className="inline-block theme-error">
                <Button error>Close</Button>
              </Dialog.Close>
            </footer>
          </Dialog>
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>
      {/* Overlay Close Example */}
      <Preview 
        height={200}
        title="Overlay Close Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info onClick={() => overlay(true)}>Open Dialog</Button>
          </div>
          <Dialog 
            open={overlayed} 
            onClose={() => overlay(false)}
            overlayClose
            className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
          >
            <header className="flex items-center p-3 theme-bg-2">
              <h3 className="flex-grow font-semibold uppercase">Close With Overlay</h3>
              <Dialog.Close className="text-2xl theme-error cursor-pointer">
                &times;
              </Dialog.Close>
            </header>
            <p className="px-3 py-6">Clicking the overlay will close the dialog.</p>
            <footer className="border-t theme-bc-1 p-3 flex justify-end">
              <Dialog.Close className="inline-block theme-error">
                <Button error>Close</Button>
              </Dialog.Close>
            </footer>
          </Dialog>
        </Preview.Example>
        <Preview.Code>{examples[1]}</Preview.Code>
      </Preview>
      {/* Wizard Example */}
      <Preview 
        height={200}
        title="Wizard Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info onClick={() => setStep('step1')}>Open Wizard</Button>
          </div>
          <Dialog 
            open={step === 'step1'} 
            className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
          >
            <header className="flex items-center p-3 theme-bg-2">
              <h3 className="flex-grow font-semibold uppercase">Step 1</h3>
              <Dialog.Close 
                className="text-2xl theme-error cursor-pointer"
                onClose={() => setStep('step0')}
              >
                &times;
              </Dialog.Close>
            </header>
            <p className="px-3 py-6">This is step one.</p>
            <footer className="border-t theme-bc-1 p-3 flex justify-end">
              <Button info onClick={() => setStep('step2')}>Next</Button>
            </footer>
          </Dialog>
          <Dialog 
            open={step === 'step2'} 
            className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
          >
            <header className="flex items-center p-3 theme-bg-2">
              <h3 className="flex-grow font-semibold uppercase">Step 2</h3>
              <Dialog.Close 
                className="text-2xl theme-error cursor-pointer"
                onClose={() => setStep('step0')}
              >
                &times;
              </Dialog.Close>
            </header>
            <p className="px-3 py-6">This is step two.</p>
            <footer className="border-t theme-bc-1 p-3 flex justify-end">
              <Button info onClick={() => setStep('step1')}>Back</Button>
            </footer>
          </Dialog>
        </Preview.Example>
        <Preview.Code>{examples[2]}</Preview.Code>
      </Preview>
      {/* Form Wizard Example */}
      <Preview 
        height={200}
        title="Form Wizard Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info onClick={() => setFormStep('step1')}>Open Wizard</Button>
          </div>
          <Dialog 
            open={formStep === 'step1'} 
            className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
          >
            <header className="flex items-center p-3 theme-bg-2">
              <h3 className="flex-grow font-semibold uppercase">Step 1</h3>
              <Dialog.Close 
                className="text-2xl theme-error cursor-pointer"
                onClose={() => setFormStep('step0')}
              >
                &times;
              </Dialog.Close>
            </header>
            <p className="px-3 pt-6">This is step one. Enter your name:</p>
            <div className="p-3">
              <input className="p-2" value={value} onChange={e => input(e.target.value)} />
            </div>
            <footer className="border-t theme-bc-1 p-3 flex justify-end">
              <Button info onClick={() => setFormStep('step2')}>Next</Button>
            </footer>
          </Dialog>
          <Dialog 
            open={formStep === 'step2'} 
            className="theme-bg-0 theme-bc-1 px-w-320 rounded-lg overflow-hidden shadow-lg"
          >
            <header className="flex items-center p-3 theme-bg-2">
              <h3 className="flex-grow font-semibold uppercase">Step 2</h3>
              <Dialog.Close 
                className="text-2xl theme-error cursor-pointer"
                onClose={() => setFormStep('step0')}
              >
                &times;
              </Dialog.Close>
            </header>
            <p className="px-3 py-6">This is step two. Go back and check your input.</p>
            <footer className="border-t theme-bc-1 p-3 flex justify-end">
              <Button info onClick={() => setFormStep('step1')}>Back</Button>
            </footer>
          </Dialog>
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
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Dialogs')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the dialog component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Dialog from 'frui/Dialog';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples of dialogs.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="provider" className="uppercase font-bold text-lg mt-8">
        {_('Provider')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Dialogs won't work without a provider closest to the root 
            container.  The <C value="<Dialog.Provider>" /> component 
            allows you to set a container for dialogs to be rendered 
            into.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">
          {examples[4]}
        </Code>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can add use 
            the <C value="frui-dialog" />, <C value="frui-dialog-container" />, 
            and <C value="frui-dialog-overflow" /> CSS classes to 
            globally theme dialogs.
          </Translate>
        </p>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following section describes the props for each dialog 
            component.
          </Translate>
        </p>

        <h3 className="font-semibold mt-4">{_('Root')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Dialog>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[0]} />

        <h3 className="font-semibold mt-4">{_('Provider')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Dialog.Provider>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[1]} />

        <h3 className="font-semibold mt-4">{_('Close')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Dialog.Close>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[2]} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component/button">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Buttons')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/loader">
          {_('Loaders')}
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
      uri="/component/dialog"
      title="Dialog Component"
      description={
        'Dialogs allow users to display modal windows with '
        + 'internal state management.'
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
      <LayoutPanel pathname="/component/dialog">
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