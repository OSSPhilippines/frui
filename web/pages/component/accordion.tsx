import React from 'react';
import { useLanguage } from 'r22n';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Code from 'modules/components/Code';
import Props from 'modules/components/Props';
import Link from 'next/link';

import { Accordion, AccordionSummary, AccordionDetails } from 'frui/element/Accordion';

//Mock Icons
const ExpandMoreIcon = () => <span>▼</span>;
const ArrowDownwardIcon = () => <span>↓</span>;
const ArrowForwardIosSharpIcon = () => <span>▼</span>;

export default function AccordionPage() {
  const { _ } = useLanguage();

  // State for the controlled/grouped accordion example
  const [groupedExpanded, setGroupedExpanded] = React.useState<string | false>('group-panel1');

  const handleGroupedChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setGroupedExpanded(isExpanded ? panel : false);
  };

  const crumbs = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Accordion' },
  ];

  // --- Code Snippets for Documentation (Updated Imports) ---

  const simpleAccordionCode = `
  <Accordion id="simple1">
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      Simple Accordion 1
    </AccordionSummary>
    <AccordionDetails>
      Content for Accordion 1.
    </AccordionDetails>
  </Accordion>
  {/* ... other accordions */}
  `.trim();

   const defaultExpandedCode = `
<Accordion id="default-expanded" defaultExpanded>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    Expanded by Default
  </AccordionSummary>
  <AccordionDetails>
    This content is visible initially because of defaultExpanded.
  </AccordionDetails>
</Accordion>
  `.trim();

 const disabledAccordionCode = `
<Accordion id="disabled-accordion" disabled>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    Disabled Accordion
  </AccordionSummary>
  <AccordionDetails>
    This content will not be shown as the accordion is disabled.
  </AccordionDetails>
</Accordion>
 `.trim();

  const groupedAccordionCode = `
    <Accordion
      id="group-panel1"
      expanded={groupedExpanded === 'group-panel1'}
      onChange={handleGroupedChange('group-panel1')}
    >
      <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon />}>
         Group Item #1
      </AccordionSummary>
      <AccordionDetails>
        Content for group item 1. Only one item in this group can be open.
      </AccordionDetails>
    </Accordion>

    <Accordion
      id="group-panel2"
      expanded={groupedExpanded === 'group-panel2'}
      onChange={handleGroupedChange('group-panel2')}
    >
      {/* ... summary and details ... */}
    </Accordion>
  `.trim();

  const customIconCode = `
<Accordion id="custom-icon">
  <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
    Custom Expand Icon
  </AccordionSummary>
  <AccordionDetails>
    The icon in the summary can be any React node.
  </AccordionDetails>
</Accordion>
  `.trim();



  const accordionProps = [
     [_('id'), _('string'), _('No'), _('Unique identifier. Auto-generated if omitted, but recommended.')],
     [_('children'), _('ReactNode'), _('Yes'), _('Should contain AccordionSummary and AccordionDetails.')],
     [_('expanded'), _('boolean'), _('No'), _('Controls the expanded state (controlled component).')],
     [_('defaultExpanded'), _('boolean'), _('No'), _('Sets the initial expanded state (uncontrolled component). Default: false')],
     [_('disabled'), _('boolean'), _('No'), _('Disables the accordion. Default: false')],
     [_('onChange'), _('(event, isExpanded) => void'), _('No'), _('Callback fired when state changes. Required for controlled component.')],
     [_('className'), _('string'), _('No'), _('Custom CSS class for the accordion container.')],
     [_('style'), _('CSSProperties'), _('No'), _('Inline styles for the accordion container.')],
   ];

   const accordionSummaryProps = [
     [_('children'), _('ReactNode'), _('Yes'), _('The content/title of the summary (header).')],
     [_('expandIcon'), _('ReactNode'), _('No'), _('Icon displayed, rotates on expansion.')],
     [_('className'), _('string'), _('No'), _('Custom CSS class for the summary button.')],
     [_('style'), _('CSSProperties'), _('No'), _('Inline styles for the summary button.')],
   ];

   const accordionDetailsProps = [
      [_('children'), _('ReactNode'), _('Yes'), _('The content displayed when the accordion is expanded.')],
      [_('className'), _('string'), _('No'), _('Custom CSS class for the details container.')],
      [_('style'), _('CSSProperties'), _('No'), _('Inline styles for the details container.')],
   ];

  return (
    <LayoutPanel
      uri="/component/accordion"
      title="Accordion Component"
      description="Collapsible content sections (Accordion)."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
             <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
               {_('Contents')}
             </h4>
             <div className="p-3">
                <Link className="block pb-1" href="#top">Accordion</Link>
                <ul className="list-disc pl-3">
                  <li className="pl-3 pb-1"><Link href="#props">{_('Props')}</Link></li>
                  <li className="pl-3 pb-1"><Link href="#simple-example">{_('Simple Usage')}</Link></li>
                  <li className="pl-3 pb-1"><Link href="#default-expanded">{_('Default Expanded')}</Link></li>
                  <li className="pl-3 pb-1"><Link href="#disabled-example">{_('Disabled')}</Link></li>
                  <li className="pl-3 pb-1"><Link href="#grouped-example">{_('Controlled / Grouped')}</Link></li>
                  <li className="pl-3 pb-1"><Link href="#custom-icon">{_('Custom Icon')}</Link></li>
                  <li className="pl-3 pb-1"><Link href="#code">{_('Code Snippets')}</Link></li>
                </ul>
              </div>
           </aside>

          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Accordion')}
            </h1>
            <Code language="typescript" className="mt-2">
               {`import { Accordion, AccordionSummary, AccordionDetails } from 'frui/element/Accordion';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">{_('Props')}</h2>
            <h3 className="font-bold mt-4">{_('Accordion Props')}</h3>
            <Props props={accordionProps} />
            <h3 className="font-bold mt-4">{_('AccordionSummary Props')}</h3>
            <Props props={accordionSummaryProps} />
            <h3 className="font-bold mt-4">{_('AccordionDetails Props')}</h3>
            <Props props={accordionDetailsProps} />

             <h2 id="simple-example" className="uppercase font-bold text-lg mt-8">{_('Simple Usage')}</h2>
             <p className="py-4">{_('Basic accordions expand independently.')}</p>
             <div className="curved overflow-hidden border border-b1">
               <div className="p-4 bg-b1 space-y-2">
                 <Accordion id="simple1">
                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {_("Simple Accordion 1")}
                   </AccordionSummary>
                   <AccordionDetails>
                      {_("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")}
                   </AccordionDetails>
                 </Accordion>
                 <Accordion id="simple2">
                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {_("Simple Accordion 2")}
                   </AccordionSummary>
                   <AccordionDetails>
                      {_("Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.")}
                   </AccordionDetails>
                 </Accordion>
               </div>
             </div>

            <h2 id="default-expanded" className="uppercase font-bold text-lg mt-8">{_('Default Expanded')}</h2>
            <p className="py-4">{_('Using the `defaultExpanded` prop for uncontrolled components.')}</p>
            <div className="curved overflow-hidden border border-b1">
              <div className="p-4 bg-b1 space-y-2">
                 <Accordion id="default-expanded" defaultExpanded>
                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {_("Expanded by Default")}
                   </AccordionSummary>
                   <AccordionDetails>
                      {_("This content is visible initially because defaultExpanded is true.")}
                   </AccordionDetails>
                 </Accordion>
                  <Accordion id="default-not-expanded">
                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {_("Not Expanded by Default")}
                   </AccordionSummary>
                   <AccordionDetails>
                      {_("This content is hidden initially.")}
                   </AccordionDetails>
                 </Accordion>
              </div>
            </div>

            <h2 id="disabled-example" className="uppercase font-bold text-lg mt-8">{_('Disabled')}</h2>
            <p className="py-4">{_('Using the `disabled` prop on the Accordion.')}</p>
            <div className="curved overflow-hidden border border-b1">
              <div className="p-4 bg-b1">
                 <Accordion id="disabled-accordion" disabled>
                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {_("Disabled Accordion")}
                   </AccordionSummary>
                   <AccordionDetails>
                      {_("This content area won't be reachable.")}
                   </AccordionDetails>
                 </Accordion>
              </div>
            </div>

            <h2 id="grouped-example" className="uppercase font-bold text-lg mt-8">{_('Controlled / Grouped')}</h2>
            <p className="py-4">{_('Using `expanded` and `onChange` props for controlled behavior. Only one item can be open.')}</p>
            <div className="curved overflow-hidden border border-b1">
              <div className="p-4 bg-b1 space-y-2">
                 <Accordion
                    id="group-panel1"
                    expanded={groupedExpanded === 'group-panel1'}
                    onChange={handleGroupedChange('group-panel1')}
                  >
                    <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon />}>
                       {_("Collapsible Group Item #1")}
                    </AccordionSummary>
                    <AccordionDetails>
                       {_("Content for group item 1. Clicking another item header will close this one.")}
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    id="group-panel2"
                    expanded={groupedExpanded === 'group-panel2'}
                    onChange={handleGroupedChange('group-panel2')}
                  >
                    <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon />}>
                       {_("Collapsible Group Item #2")}
                    </AccordionSummary>
                    <AccordionDetails>
                       {_("Content for group item 2.")}
                    </AccordionDetails>
                  </Accordion>

                   <Accordion
                    id="group-panel3"
                    expanded={groupedExpanded === 'group-panel3'}
                    onChange={handleGroupedChange('group-panel3')}
                  >
                    <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon />}>
                      {_("Collapsible Group Item #3")}
                    </AccordionSummary>
                    <AccordionDetails>
                      {_("Content for group item 3.")}
                    </AccordionDetails>
                  </Accordion>
              </div>
            </div>

            <h2 id="custom-icon" className="uppercase font-bold text-lg mt-8">{_('Custom Icon')}</h2>
            <p className="py-4">{_('Providing a custom React node to the `expandIcon` prop.')}</p>
            <div className="curved overflow-hidden border border-b1">
              <div className="p-4 bg-b1">
                 <Accordion id="custom-icon">
                   <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                      {_("Custom Expand Icon (Down Arrow)")}
                   </AccordionSummary>
                   <AccordionDetails>
                      {_("Any component or element can be used as the expand icon.")}
                   </AccordionDetails>
                 </Accordion>
              </div>
            </div>

            <h2 id="code" className="uppercase font-bold text-lg mt-8">{_('Code Snippets')}</h2>
             <h3 className="font-bold mt-4">{_('Simple Usage Code')}</h3>
             <Code language="jsx">{simpleAccordionCode}</Code>
             <h3 className="font-bold mt-4">{_('Default Expanded Code')}</h3>
             <Code language="jsx">{defaultExpandedCode}</Code>
             <h3 className="font-bold mt-4">{_('Disabled Code')}</h3>
             <Code language="jsx">{disabledAccordionCode}</Code>
             <h3 className="font-bold mt-4">{_('Controlled / Grouped Code')}</h3>
             <Code language="jsx">{groupedAccordionCode}</Code>
             <h3 className="font-bold mt-4">{_('Custom Icon Code')}</h3>
             <Code language="jsx">{customIconCode}</Code>

              <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/component">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Component')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/component/alert">
                {_('Alert')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
              </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}