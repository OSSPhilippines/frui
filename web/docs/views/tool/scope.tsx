//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';
//frui
import Alert from 'src/base/Alert.js';
import Scope from 'src/tool/Scope.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/tool/scope';
const title = 'Scope Tool';
const description = 'The Scope tool allows conditional rendering based on specified conditions.';

const props = [
  [ 'list', 'unknown[]', 'optional', 'An array of values to create a scope for each item.' ],
  [ 'hash', 'Record<string, unknown>', 'optional', 'An object to create a scope for each key-value pair.' ],
  [ 'value', 'unknown', 'optional', 'A single value to create a scope.' ]
];

const examples = [
//0
`export function Fruit() {
  const { key, value } = Scope.use<number, string>();
  return (
    <div>Key: {key}, Value: {value}</div>
  );
};
export function MyComponent() {
  return (
    <Scope list={[ 'apple', 'banana', 'cherry' ]}>
      <Fruit />
    </Scope>
  );
};`,
//1
`export function ColoredFruit() {
  const { key, value } = Scope.use<string, string>();
  return (
    <div>a {value} {key}</div>
  );
};
export function MyComponent() {
  return (
    <Scope hash={{ apple: 'red', banana: 'yellow', cherry: 'red' }}>
      <ColoredFruit />
    </Scope>
  );
};`,
//2
`export function AllFruits() {
  const { value } = Scope.use<Record<string, string>>();
  return Object.entries(value).map(([key, value]) => (
    <div key={key}>a {value} {key}</div>
  ));
};
export function MyComponent() {
  return (
    <Scope value={{ apple: 'red', banana: 'yellow', cherry: 'red' }}>
      <AllFruits />
    </Scope>
  );
};`
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
          {_('Scope')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#basic">{_('Basics')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#basic">{_('Basics')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#nested">{_('Nested Conditions')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#deep">{_('Deep Conditions')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#api">{_('API Reference')}</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export function Fruit() {
  const { key, value } = Scope.useContext<string, number>();
  return (
    <div>Key: {key}, Value: {value}</div>
  );
};

export function ColoredFruit() {
  const { key, value } = Scope.useContext<string, string>();
  return (
    <div>a {value} {key}</div>
  );
};

export function AllFruits() {
  const { value } = Scope.useContext<Record<string, string>>();
  return Object.entries(value).map(([key, value]) => (
    <div key={key}>a {value} {key}</div>
  ));
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
        {_('Scope')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Scope>" /> tool allows you to create a 
            scope context for its children based on a list, hash, or 
            single value. Import the <C value="<Scope>" /> tool 
            component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Scope from 'frui/Scope';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can then use the <C r value="Scope.use()" /> 
            hook to access the current key and value within that scope.
            Instead of using <C value="map" /> in your components, you 
            can leverage the <C value="<Scope>" /> component to handle 
            iteration and context creation for you.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">
          {examples[0]}
        </Code>
        <p className="py-2">
          <Translate>
            In the above code, the <C value="<Fruit>" /> component uses 
            the <C value="Scope.use()" /> hook to access the current key 
            and value from the scope created by the <C r value="<Scope>" /> 
            component. The <C value="list" /> prop provides an array of 
            fruits, and for each fruit, a new scope is created with the 
            corresponding key and value. The rendered output would 
            look like the example below.
          </Translate>
        </p>
        <Preview className="border border-2 theme-bc-3" noCode>
          <Preview.Example center padding>
            <Scope list={[ 'apple', 'banana', 'cherry' ]}>
              <Fruit />
            </Scope>
          </Preview.Example>
        </Preview>

        <Alert warning className="my-4">
          <Translate>
            The <C bg="black" value="list" /> prop only accepts arrays.
          </Translate>
        </Alert>

        <p className="py-2">
          <Translate>
            You can also create a scope using a hash object with 
            the <C l value="hash" /> prop. In this case, the keys of 
            the hash become the scope keys, 
            and the corresponding values become 
            the scope values.
          </Translate>
        </p>

        <Code language="tsx" className="mt-2">
          {examples[1]}
        </Code>

        <p className="py-2">
          <Translate>
            The rendered output would look like the example below.
          </Translate>
        </p>
        <Preview className="border border-2 theme-bc-3" noCode>
          <Preview.Example center padding>
            <Scope hash={{ apple: 'red', banana: 'yellow', cherry: 'red' }}>
              <ColoredFruit />
            </Scope>
          </Preview.Example>
        </Preview>
        <Alert warning className="my-4">
          <Translate>
            The <C bg="black" value="hash" /> prop only accepts objects.
          </Translate>
        </Alert>
        <p className="py-2">
          <Translate>
            Finally, you can create a scope with a single value using 
            the <C value="value" /> prop. In this case, the entire value 
            is passed to the scope, and you can access it using 
            the <C value="Scope.use()" /> hook.
          </Translate>
        </p>

        <Code language="tsx" className="mt-2">
          {examples[2]}
        </Code>
        <p className="py-2">
          <Translate>
            The rendered output would look like the example below.
          </Translate>
        </p>
        <Preview className="border border-2 theme-bc-3" noCode>
          <Preview.Example center padding>
            <Scope value={{ apple: 'red', banana: 'yellow', cherry: 'red' }}>
              <AllFruits />
            </Scope>
          </Preview.Example>
        </Preview>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Scope>" /> format can be passed the 
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
