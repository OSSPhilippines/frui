//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';
//frui
import Button from 'src/base/Button.js';
import PhoneInput from 'src/form/PhoneInput.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/form/phone-input';
const title = 'Phone Input Field';
const description = 'Phone input is a field component that wraps the standard '
  + 'HTML input element for phone number values.';

const props = [
  [ 'name', 'string', 'No', 'Used for form submission. Hidden input generates value like `+11234567890`.' ],
  [ 'initialValue', 'string', 'No', 'Initial value of the phone input. Can include dial code (e.g. "+14155552671").' ],
  [ 'placeholder', 'string', 'No', 'Placeholder text for the phone number input.' ],
  [ 'searchable', 'boolean', 'No', 'Whether the country dropdown should include a search filter (default: true).' ],
  [ 'error', 'boolean', 'No', 'If true, applies error styling via frui-phone-input-error class.' ],
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
          {_('Phone Input')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#basic">{_('Basics')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#form">{_('Hidden Form Value')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#errors">{_('Errors')}</a>
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
  //functions
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const phoneValue = formData.get('phone');
    alert(`Form submitted! Phone: ${phoneValue}`);
  };
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Phone Input')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<PhoneInput>" /> field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import PhoneInput from 'frui/form/PhoneInput';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The basic usage of <C value="<PhoneInput>" /> includes a 
            number field prefixed with a country dial code.
          </Translate>
        </p>
        <Preview 
          title="Basic Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <PhoneInput 
              placeholder="Enter phone number..." 
              defaultCountry="PH" 
              defaultValue="+000 4155552671" 
              searchable
              append="#dropdown-root"
            />
          </Preview.Example>
          <Preview.Code>
            {'<PhoneInput placeholder="Enter phone number..." />'}
          </Preview.Code>
        </Preview>
      </div>

      <h2 id="form" className="uppercase font-bold text-lg mt-8">
        {_('Hidden Form Value')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The <C value="name" /> prop ensures that the full number 
            (dial code + phone number) is included as a hidden input in forms.
          </Translate>
        </p>
        <Preview 
          title="With Events" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <form onSubmit={handleFormSubmit}>
              <PhoneInput name="phone" defaultValue="+14155552671" />
              <Button type="submit" info md className="w-full mt-2">
                {_('Submit')}
              </Button>
            </form>
          </Preview.Example>
          <Preview.Code>
            {''}
          </Preview.Code>
        </Preview>
      </div>

      <h2 id="errors" className="uppercase font-bold text-lg mt-8">
        {_('Errors')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The <C value="error" /> prop applies the 
            <C value="frui-phone-input-error" /> class to the wrapper, 
            highlighting the PhoneInput with error styling:
          </Translate>
        </p>
        <Preview 
          title="Error Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <PhoneInput 
              error 
              placeholder="Error state" 
              defaultValue="+14155552671"
            />
          </Preview.Example>
          <Preview.Code>
            {'<PhoneInput className="w-full" error defaultValue="+14155552671" />'}
          </Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can also add your own custom class 
          to <C value="<PhoneInput>" /> components or use any 
          combination of 
          <C l value="frui-form-phone-input" />, 
          <C l value="frui-form-phone-input-control" />, 
          <C l value="frui-form-phone-input-error" />, 
          <C l value="frui-form-phone-input-flag" />, 
          <C l value="frui-form-phone-input-tel" />, and
          <C l value="frui-form-phone-input-direction" /> CSS classes.
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<PhoneInput>" /> field accepts all props of a 
            standard HTML Input element. See <a 
              className="theme-2 underline"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
              target="_blank"
            >Moz</a> for standard input attributes.
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