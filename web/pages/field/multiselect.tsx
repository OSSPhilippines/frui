import MultiSelect from 'frui/field/MultiSelect';
import Link from 'next/link';
import Crumbs, { Crumb } from 'modules/components/Crumbs';
import { LayoutPanel } from 'modules/theme';
import { Translate, useLanguage } from 'r22n';
import Code, { InlineCode as C } from 'modules/components/Code';
import Props from 'modules/components/Props';

export default function Home() {
    const { _ } = useLanguage();

    const crumbs: Crumb[] = [
        { icon: 'rectangle-list', label: 'Fields', href: '/field' },
        { label: 'Multi Select' }
    ];

    const props = [
        [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
        [ _('options'), _('string[]'), _('Yes'), _('An array of strings') ],
        [ _('custom'), _('boolean'), _('No'), _('Allow users to add custom options.') ],
        [ _('searchable'), _('boolean'), _('No'), _('Allow users to search for options.') ],
        [ _('name'), _('string'), _('No'), _('Used for react server components.') ],
        [ _('placeholder'), _('string'), _('No'), _('Placeholder text to be displayed.') ],
        [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object') ],
    ];

    return (
        <LayoutPanel>
            <main className='flex flex-col h-full w-full'>
                <div className='p-3 bg-b2'>
                    <Crumbs crumbs={crumbs}/>
                </div>
                <div className='flex-grow relative h-full'>
                    <aside className="hidden lg:block absolute top-0 bottom-0 
                        right-0 z-1 w-56 border-l border-b1 text-sm"
                    >
                        <h4 
                            className="p-3 border-b border-b1 bg-b1 uppercase 
                            font-semibold"
                        >
                            <Link href="#top" >{_('Multi Select')}</Link>
                        </h4>
                        <ul className="list-disc py-3 pr-3 pl-6">
                            <li className="pl-3 pb-1">
                                <Link href="#props">
                                {_('Props')}
                                </Link>
                            </li>
                            <li className="pl-3 pb-1">
                                <Link href="#styles">
                                {_('Styles')}
                                </Link>
                            </li>
                            <li className="pl-3 pb-1">
                                <Link href="#basic">
                                {_('Basics')}
                                </Link>
                            </li>
                            <li className="pl-3 pb-1">
                                <Link href="#custom-options">
                                {_('Custom Options')}
                                </Link>
                            </li>
                        </ul>
                    </aside>
                    <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
                        <h1 id="top" className="flex items-center uppercase font-bold text-xl">
                        {_('Multi Select')}
                        </h1>
                        <Code language="typescript" className="mt-2">
                        {`import MultiSelect from 'frui/field/MultiSelect';`}
                        </Code>
                        
                        <h2 id="props" className="uppercase font-bold text-lg mt-8">
                        {_('Props')}
                        </h2>
                        <p>
                        <Translate>
                            MultiSelect accepts the following props:
                        </Translate>
                        </p>
                        <Props props={props} />

                        <h2 id="styles" className="uppercase font-bold text-lg mt-8">
                            {_('Styles')}
                        </h2>
                        <p>
                        <Translate>
                            The styles for the MultiSelect component are defined in 
                            <C value="styles/fields/multiselect.css" />. You can customize the styles by overriding the CSS classes.
                        </Translate>
                        </p>
                        <Code language="css">
                            {`.frui-field-multiselect /* Container for the entire MultiSelect component */
                            .frui-field-multiselect-control /* Area displaying tags or placeholder */
                            .frui-field-multiselect-placeholder /* Placeholder text when no tags are selected */
                            .frui-field-multiselect-tag /* Individual selected tag */
                            .frui-field-multiselect-tag-remove /* Button to remove a tag */
                            .frui-field-multiselect-dropdown /* Dropdown menu container */
                            .frui-field-multiselect-search /* Search input container in dropdown */
                            .frui-field-multiselect-search-control /* Search input field */
                            .frui-field-multiselect-options /* List of available options */
                            .frui-field-multiselect-option /* Individual option in dropdown */
                            // ...`}
                        </Code>

                        <h2 id="basic" className="uppercase font-bold text-lg mt-8">
                        {_('Basic')}
                        </h2>
                        <p className="py-4">
                        <Translate>
                            The MultiSelect component allows users to select multiple options from a dropdown. 
                            It supports search functionality and custom options.
                        </Translate>
                        </p>
                        <div className="curved">
                            <div className="flex items-center justify-center p-3 bg-b1">
                                <MultiSelect name="options"  options={['Option 1', 'Option 2', 'Option 3']} />
                            </div>
                            <Code language="typescript">
                                {`<MultiSelect options={['Option 1', 'Option 2', 'Option 3']} name="options" />`}
                            </Code>
                        </div>

                        <h2 id="searchable" className="uppercase font-bold text-lg mt-8">
                        {_('Searchable')}
                        </h2>
                        <p className="py-4">
                        <Translate>
                            You can enable the <C value="searchable" /> prop to allow users to search for options.
                        </Translate>
                        </p>
                        <div className="curved">
                            <div className="flex items-center justify-center p-3 bg-b1">
                                <MultiSelect name="options" searchable options={['Option 1', 'Option 2', 'Option 3']} />
                            </div>
                            <Code language="typescript">
                                {`<MultiSelect options={['Option 1', 'Option 2', 'Option 3']} searchable name="options" />`}
                            </Code>
                        </div>

                        <h2 id="custom-options" className="uppercase font-bold text-lg mt-8">
                            {_('Custom Options')}
                        </h2>
                        <p className="py-4">
                        <Translate>
                            You can enable the <C value="custom" /> prop to allow users to add their own options.
                             Press &apos;Enter&apos; or &apos;Tab&apos; to add a custom option.
                        </Translate>
                        </p>
                        <div className="curved">
                            <div className="flex items-center justify-center p-3 bg-b1">
                                <MultiSelect name="options" searchable custom options={['Option 1', 'Option 2', 'Option 3']} />
                            </div>
                            <Code language="typescript">
                                {`<MultiSelect options={['Option 1', 'Option 2', 'Option 3']} custom />`}
                            </Code>
                        </div>

                        <div className="flex items-center border-t border-b2 mt-8 pt-4">
                            <Link className="text-t2" href="/field/metadata">
                                <i className="fas fa-arrow-left mr-2"></i>
                                {_('Metadata')}
                            </Link>
                        <div className="flex-grow"></div>
                            <Link className="text-t2" href="/field/number">
                                {_('Number')}
                                <i className="fas fa-arrow-right ml-2"></i>
                            </Link>
                        </div>
                    </div>
                </div>  
            </main>
        </LayoutPanel>
    )
}