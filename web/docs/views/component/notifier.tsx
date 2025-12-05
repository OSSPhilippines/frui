//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';
//frui
import Button from 'src/base/Button.js';
import Notifier from 'src/base/Notifier.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/component/notifier';
const title = 'Notifier Component';
const description = 
  'Notifiers allow users to display notifications with '
  + 'internal state management.';

const props = [
  //Notifier props
  [
    [ 'info', 'boolean', 'No', 'Show an info notifier' ],
    [ 'warning', 'boolean', 'No', 'Show a warning notifier' ],
    [ 'error', 'boolean', 'No', 'Show an error notifier' ],
    [ 'success', 'boolean', 'No', 'Show a success notifier' ],
    [ 'autoClose', 'number | false', 'No', 'Time in milliseconds to close the toast automatically. Set to false to disable auto close' ],
    [ 'closeOnClick', 'boolean', 'No', 'Close the toast when clicked' ],
    [ 'draggable', 'boolean', 'No', 'Allow the toast to be draggable to dismiss it' ],
    [ 'hideProgressBar', 'boolean', 'No', 'Hide the progress bar' ],
    [ 'position', "'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'", 'No', 'Position of the toast container on the screen' ],
    [ 'pauseOnFocusLoss', 'boolean', 'No', 'Pause the timer when the window loses focus' ],
    [ 'pauseOnHover', 'boolean', 'No', 'Pause the timer when the toast is hovered' ],
    [ 'rtl', 'boolean', 'No', 'Set the direction of the toast to right-to-left' ],
    [ 'theme', "'light' | 'dark' | 'colored'", 'No', 'Theme of the toast' ]
  ],
  //Notifier.Provider props
  [
    [ 'autoClose', 'number | false', 'No', 'Time in milliseconds to close the toast automatically. Set to false to disable auto close' ],
    [ 'closeOnClick', 'boolean', 'No', 'Close the toast when clicked' ],
    [ 'draggable', 'boolean', 'No', 'Allow the toast to be draggable to dismiss it' ],
    [ 'hideProgressBar', 'boolean', 'No', 'Hide the progress bar' ],
    [ 'name', 'string', 'No', 'Name of the cookie to store flash messages' ],
    [ 'domain', 'string', 'No', 'Domain of the cookie to store flash messages' ],
    [ 'expires', 'Date', 'No', 'Expiration date of the cookie to store flash messages' ],
    [ 'httpOnly', 'boolean', 'No', 'Whether the cookie is HTTP only' ],
    [ 'maxAge', 'number', 'No', ' Max age of the cookie to store flash messages in seconds' ],
    [ 'path', 'string', 'No', 'Path of the cookie to store flash messages' ],
    [ 'partitioned', 'boolean', 'No', 'Whether the cookie is partitioned' ],
    [ 'priority', "'low' | 'medium' | 'high'", 'No', 'Priority of the cookie to store flash messages' ],
    [ 'sameSite', "boolean | 'lax' | 'strict' | 'none'", 'No', 'SameSite attribute of the cookie to store flash messages' ],
    [ 'secure', 'boolean', 'No', 'Whether the cookie is secure' ],
    [ 'position', "'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'", 'No', 'Position of the toast container on the screen' ],
    [ 'pauseOnFocusLoss', 'boolean', 'No', 'Pause the timer when the window loses focus' ],
    [ 'pauseOnHover', 'boolean', 'No', 'Pause the timer when the toast is hovered' ],
    [ 'rtl', 'boolean', 'No', 'Set the direction of the toast to right-to-left' ],
    [ 'theme', "'light' | 'dark' | 'colored'", 'No', 'Theme of the toast' ]
  ]
];

const examples = [
//0
`const { notify } = Notifier.useNotifier();
const callNotify = () => notify('info', 'Info Message from Hook');
return (
  <Button info onClick={callNotify}>Show Info from Hook</Button>
);`,
//1
`<Notifier.Provider>
  <App />
</Notifier.Provider>`,
//2
`import { useEffect } from 'react';
import Notifier from 'frui/Notifier';

const FlashMessageExample = () => {
  const { flash, unload } = Notifier.useNotifier();

  const submit = () => {
    flash('success', 'This is a flash message');
    window.location.reload();
  };

  useEffect(() => { unload() }, []);

  return (
    <button onClick={submit}>
      Just refresh the page to see the flash message.
    </button>
  );
};`,
//3
`import Cookies from 'universal-cookie';

const cookies = new Cookies(req.headers.cookie, { path: '/' });
const flash = { 
  type: 'success', 
  message: 'This is a flash message',
  config: {/* toast configuration options */}
};
cookies.set('flash', JSON.stringify(flash), {/* cookie options */});`,
//4
`/* toast configuration options */
{
  autoClose: 5000,
  closeOnClick: true,
  draggable: true,
  hideProgressBar: false,
  name: 'flash',
  path: '/',
  position: 'bottom-center',
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  rtl: false,
  theme: 'dark'
}`
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
          {_('Notifiers')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#flash">{_('Flash Messages')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#provider">{_('Provider')}</a>
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
  const [ type, setNotifierType ] = useState('');
  const { notify } = Notifier.useNotifier();
  return (
    <div className="flex items-start rmd-block flex-wrap gap-4">
      {/* Info Example */}
      <Preview 
        height={100}
        title="Info Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info onClick={() => setNotifierType('info')}>Show Info</Button>
            {type ==='info' && (<Notifier info>Info Message</Notifier>)}
          </div>
        </Preview.Example>
        <Preview.Code>{`<Notifier info>Info Message</Notifier>`}</Preview.Code>
      </Preview>
      {/* Warning Example */}
      <Preview 
        height={100}
        title="Warning Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button warning onClick={() => setNotifierType('warning')}>Show Warning</Button>
            {type ==='warning' && (<Notifier warning>Warning Message</Notifier>)}
          </div>
        </Preview.Example>
        <Preview.Code>{`<Notifier warning>Warning Message</Notifier>`}</Preview.Code>
      </Preview>
      {/* Success Example */}
      <Preview 
        height={100}
        title="Success Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button success onClick={() => setNotifierType('success')}>Show Success</Button>
            {type ==='success' && (<Notifier success>Success Message</Notifier>)}
          </div>
        </Preview.Example>
        <Preview.Code>{`<Notifier success>Success Message</Notifier>`}</Preview.Code>
      </Preview>
      {/* Error Example */}
      <Preview 
        height={100}
        title="Error Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button error onClick={() => setNotifierType('error')}>Show Error</Button>
            {type ==='error' && (<Notifier error>Error Message</Notifier>)}
          </div>
        </Preview.Example>
        <Preview.Code>{`<Notifier error>Error Message</Notifier>`}</Preview.Code>
      </Preview>
      {/* Hook Example */}
      <Preview 
        height={100}
        title="Hook Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info onClick={() => notify('info', 'Info Message from Hook')}>
              Show Info from Hook
            </Button>
          </div>
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
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
  const { flash } = Notifier.useNotifier();
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Notifiers')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<Notifier>" /> component like the 
            following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Notifier from 'frui/Notifier';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples 
            of the <C value="<Notifier>" /> component.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="flash" className="uppercase font-bold text-lg mt-8">
        {_('Flash Messages')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Flash messages are notifications that appear on page load. 
            It uses cookies to store the messages and display them when 
            the page is loaded. This is useful for displaying messages 
            after a form submission or a redirect. The following example 
            shows how to use flash messages in a server-side rendered 
            application using a combination of <C value="flash()" />, 
            and <C value="unload()" />.
          </Translate>
        </p>
        <Preview 
          height={100}
          title="Flash Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <div className="text-center">
              <Button info onClick={() => {
                flash('success', 'This is a flash message');
                window.location.reload();
              }}>
                Refresh the page to see the flash message.
              </Button>
            </div>
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>
        <p className="py-2">
          <Translate>
            To set a flash message from the server, you can use the 
            following code. This example 
            uses <C value="universal-cookie" /> package to manage 
            cookies in a server-side rendered application.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {examples[3]}
        </Code>
        <p className="py-2">
          <Translate>
            This code sets a flash message that will be displayed on the
            next page load. The message is stored in a cookie and will
            be removed when it is read. The toast configuration options
            can be customized as needed.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {examples[4]}
        </Code>
      </div>

      <h2 id="provider" className="uppercase font-bold text-lg mt-8">
        {_('Provider')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Notifiers won't work without a provider closest to the root 
            container. The <C value="<Notifier.Provider>" /> component 
            allows you to set a container for notifiers to be rendered 
            into. 
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">
          {examples[1]}
        </Code>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following section describes the props for each notifier 
            component.
          </Translate>
        </p>

        <h3 className="font-semibold mt-4">{_('Root')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Notifier>" /> component can be 
            passed the following props.
          </Translate>
        </p>
        <Props props={props[0]} />

        <h3 className="font-semibold mt-4">{_('Provider')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Notifier.Provider>" /> component can be 
            passed the following props.
          </Translate>
        </p>
        <Props props={props[1]} />
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