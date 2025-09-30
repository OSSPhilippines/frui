//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import PhoneInput from 'frui/field/PhoneInput';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';
import { Button } from 'frui/form';
import React from 'react';

export default function Home() {
  //hooks
  const { _ } = useLanguage();

  //breadcrumbs
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'PhoneInput' }
  ];

  //component props list
  const props = [
    [ _('name'), _('string'), _('No'), _('Used for form submission. Hidden input generates value like `+11234567890`.') ],
    [ _('initialValue'), _('string'), _('No'), _('Initial value of the phone input. Can include dial code (e.g. "+14155552671").') ],
    [ _('placeholder'), _('string'), _('No'), _('Placeholder text for the phone number input.') ],
    [ _('searchable'), _('boolean'), _('No'), _('Whether the country dropdown should include a search filter (default: true).') ],
    [ _('error'), _('boolean'), _('No'), _('If true, applies error styling via frui-phone-input-error class.') ],
  ];

  //functions
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const phoneValue = formData.get('phone');
    alert(`Form submitted! Phone: ${phoneValue}`);
  }

  //render
  return (
    <LayoutPanel 
      uri="/field/phoneinput"
      title="Phone Input"
      description="PhoneInput allows users to enter phone numbers with international country codes."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('PhoneInput')}</Link>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
              <li className="pl-3 pb-1"><Link href="#props">{_('Props')}</Link></li>
              <li className="pl-3 pb-1"><Link href="#basic">{_('Basics')}</Link></li>
              <li className="pl-3 pb-1"><Link href="#search">{_('Search')}</Link></li>
              <li className="pl-3 pb-1"><Link href="#form">{_('Hidden Form Value')}</Link></li>
              <li className="pl-3 pb-1"><Link href="#error">{_('Error State')}</Link></li>
              <li className="pl-3 pb-1"><Link href="#styles">{_('Custom Styles')}</Link></li>
            </ul>
          </aside>

          {/* Content */}
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            {/* Top Header */}
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('PhoneInput')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import PhoneInput from 'frui/field/PhoneInput';`}
            </Code>

            {/* Props */}
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p>
              <Translate>
                PhoneInput provides a country selector and phone number field, 
                with optional search functionality.
              </Translate>
            </p>
            <Props props={props} />

            {/* Basics Example */}
            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p className="py-4">
              <Translate>
                The basic usage of PhoneInput includes a number field prefixed 
                with a country dial code.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <PhoneInput placeholder="Enter phone number..." />
              </div>
              <Code language="typescript">
                {`<PhoneInput placeholder="Enter phone number..." />`}
              </Code>
            </div>

            {/* Search Example */}
            <h2 id="search" className="uppercase font-bold text-lg mt-8">
              {_('Search')}
            </h2>
            <p className="py-4">
              <Translate>
                By default, users can search for a country when selecting 
                from the dropdown. This can be disabled with <C value="searchable" /> prop.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <PhoneInput searchable={false} placeholder="Search disabled" />
              </div>
              <Code language="typescript">
                {`<PhoneInput searchable={false} placeholder="Search disabled" />`}
              </Code>
            </div>

            {/* Hidden Form Value Example */}
            <h2 id="form" className="uppercase font-bold text-lg mt-8">
              {_('Hidden Form Value')}
            </h2>
            <p className="py-4">
              <Translate>
                The <C value="name" /> prop ensures that the full number 
                (dial code + phone number) is included as a hidden input in forms.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <form onSubmit={handleFormSubmit}>
                  <PhoneInput name="phone" initialValue="+14155552671" />
                  <Button type="submit" info md className="w-full mt-2">
                    {_('Submit')}
                  </Button>
                </form>
              </div>
              <Code language="typescript">
{`<form>
  <PhoneInput name="phone" initialValue="+14155552671" />
  <button type="submit">Submit</button>
</form>`}
              </Code>
            </div>
            
            {/* Error */}
            <h2 id="error" className="uppercase font-bold text-lg mt-8">
              {_('Error')}
            </h2>
            <p className="py-4">
              <Translate>
                The <C value="error" /> prop applies the 
                <C value="frui-phone-input-error" /> class to the wrapper, 
                highlighting the PhoneInput with error styling:
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <PhoneInput 
                  error 
                  placeholder="Error state" 
                  initialValue="+14155552671"
                />
              </div>
              <Code language="typescript">
                {`<PhoneInput placeholder="Error state" error />`}
              </Code>
            </div>

            {/* Custom Styles */}
            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can also add your own custom class to <C value="PhoneInput" /> components 
                or use any combination of 
                <C value="frui-phone-input-wrapper" />, 
                <C value="frui-phone-input-container" />, 
                <C value="frui-phone-input-container-input" />, 
                <C value="frui-phone-input-select-btn" />, 
                <C value="frui-phone-input-flag" />, 
                <C value="frui-phone-input-dropdown-container" />, 
                <C value="frui-phone-input-dropdown" />, 
                <C value="frui-phone-input-dropdown-item" />, 
                <C value="frui-phone-input-dialcode" />, 
                <C value="frui-phone-input-search" />, and 
                <C value="frui-phone-input-error" /> CSS classes.
              </Translate>
            </p>

            {/* Navigation Footer */}
            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/field/knob">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Knob')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/input">
                {_('Input')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}