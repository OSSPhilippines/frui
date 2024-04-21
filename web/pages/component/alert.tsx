//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Alert from 'frui/dist/Alert';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const codeInfo = `
<Alert info className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  No results found
</Alert>`.trim();
const codeWarn = `
<Alert warning className="flex items-center">
  <i className="fas fa-exclamation-triangle mr-2"></i>
  Are you sure ?
</Alert>`.trim();
const codeSuccess = `
<Alert success className="flex items-center">
  <i className="fas fa-check-circle mr-2"></i>
  Successfully saved !
</Alert>`.trim();
const codeError = `
<Alert error className="flex items-center">
  <i className="fas fa-exclamation-circle mr-2"></i>
  Could not save
</Alert>`.trim();
const codeMuted = `
<Alert muted className="flex items-center">
  I am disabled
</Alert>`.trim();
const codeCustom = `
<Alert color="salmon" className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  Who likes salmon?
</Alert>`.trim();
const codeCurved = `
<Alert info curved className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  No results found
</Alert>`.trim();
const codeRounded = `
<Alert warning rounded className="flex items-center">
  <i className="fas fa-exclamation-triangle mr-2"></i>
  Are you sure ?
</Alert>`.trim();
const codePill = `
<Alert success pill className="flex items-center">
  <i className="fas fa-check-circle mr-2"></i>
  Successfully saved !
</Alert>`.trim();

export default function Page() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Alert' }
  ];
  const props = [
    [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
    [ _('color'), _('string'), _('No'), _('Custom CSS hex or name') ],
    [ _('curved'), _('boolean'), _('No'), _('Slight curved corners') ],
    [ _('error'), _('boolean'), _('No'), _('Red alert') ],
    [ _('info'), _('boolean'), _('No'), _('Blue alert') ],
    [ _('muted'), _('boolean'), _('No'), _('Gray alert') ],
    [ _('outline'), _('boolean'), _('No'), _('Border and text with color') ],
    [ _('pill'), _('boolean'), _('No'), _('Max rounded corners') ],
    [ _('rounded'), _('boolean'), _('No'), _('Rounded corners') ],
    [ _('solid'), _('boolean'), _('No'), _('Fills alert with color') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS input') ],
    [ _('success'), _('boolean'), _('No'), _('Green alert') ],
    [ _('warning'), _('boolean'), _('No'), _('Orange alert') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/component/alert"
      title="Alert Component"
      description="Alerts in FRUI, are interactive ReactJS components that convey important information, warnings, or notifications to users."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <Link className="block pb-1" href="#top">Alert</Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <Link href="#props">
                    {_('Props')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#types">
                    {_('Types')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#custom">
                    {_('Custom Color')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#rounded">
                    {_('Rounded')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#styles">
                    {_('Custom Styles')}
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Alert')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Alert from 'frui/Alert';`}
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
                Alerts have the following types: <C value="info" />, 
                <C l value="warning" />, <C value="success" />, 
                <C l value="error" />, and <C value="muted" />.
              </Translate>
            </p>
            <div>
              <Alert info className="flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                {_('No results found')}
              </Alert>
              <Code language="typescript" className="mt-2">
                {codeInfo}
              </Code>
              <Alert warning className="flex items-center mt-5">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {_('Are you sure ?')}
              </Alert>
              <Code language="typescript" className="mt-2">
                {codeWarn}
              </Code>
              <Alert success className="flex items-center mt-5">
                <i className="fas fa-check-circle mr-2"></i>
                {_('Successfully saved !')}
              </Alert>
              <Code language="typescript" className="mt-2">
                {codeSuccess}
              </Code>
              <Alert error className="flex items-center mt-5">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {_('Could not save')}
              </Alert>
              <Code language="typescript" className="mt-2">
                {codeError}
              </Code>
              <Alert muted className="flex items-center mt-5">
                {_('I am disabled')}
              </Alert>
              <Code language="typescript" className="mt-2">
                {codeMuted}
              </Code>
            </div>

            <h2 id="custom" className="uppercase font-bold text-lg mt-8">
              {_('Custom Color')}
            </h2>
            <p className="py-4">
              <Translate>
                Alerts can have custom CSS compatible colors which 
                includes hex and color names.
              </Translate>
            </p>
            <div>
              <Alert color="salmon" className="flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                {_('Who likes salmon?')}
              </Alert>
              <Code language="typescript" className="mt-2">
                {codeCustom}
              </Code>
            </div>

            <h2 id="rounded" className="uppercase font-bold text-lg mt-8">
              {_('Rounded')}
            </h2>
            <p className="py-4">
              <Translate>
                Alerts can be rounded in three ways: <C value="curved" />, 
                <C l value="rounded" />, and <C value="pill" />.
              </Translate>
            </p>
            <div>
              <Alert info curved className="flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                {_('No results found')}
              </Alert>
              <Code language="typescript" className="mt-2">
                {codeCurved}
              </Code>
              <Alert warning rounded className="flex items-center mt-5">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {_('Are you sure ?')}
              </Alert>
              <Code language="typescript" className="mt-2">
                {codeRounded}
              </Code>
              <Alert success pill className="flex items-center mt-5">
                <i className="fas fa-check-circle mr-2"></i>
                {_('Successfully saved !')}
              </Alert>
              <Code language="typescript" className="mt-2">
                {codePill}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to the alert component 
                or use the <C value="frui-alert" /> CSS class.
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/component">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Components')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/component/badge">
                {_('Badges')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
}
