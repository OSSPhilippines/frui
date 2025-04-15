//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import ProgressBar from 'frui/element/ProgressBar';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

export default function Page() {
  //hooks
  const { _ } = useLanguage();

  //variables
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'ProgressBar' }
  ];

  const props = [
    [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
    [ _('color'), _('string'), _('No'), _('Custom CSS hex or name (e.g., "salmon", "#ff5733")') ],
    [ _('value'), _('number'), _('Yes'), _('Current progress value') ],
    [ _('max'), _('number'), _('No'), _('Maximum progress value, default is 100') ],
    [ _('style'), _('CSSProperties'), _('No'), _('Standard CSSProperties object') ], 
  ];

  const codeImport = `import ProgressBar from 'frui/element/ProgressBar';`.trim();

  const codeBasic = `
<div className="relative w-full h-4 bg-gray-300">
  <ProgressBar value={50} max={100} className="h-4" />
</div>`.trim();

  const codeCustom = `
<div className="relative w-full h-4 bg-gray-300 rounded">
  <ProgressBar value={85} max={100} color="salmon" className="h-4 rounded" />
</div>`.trim();

  const codeLabelPercent = `
<div className="relative w-full h-4 bg-gray-300 rounded-full">
  <ProgressBar value={65} max={100} color="green" className="h-4 rounded-full" />
  <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
    65%
  </span>
</div>`.trim();

  const codeLabelText = `
<div className="relative w-full h-4 bg-gray-300 rounded-md">
  <ProgressBar value={35} max={100} color="blue" className="h-4 rounded-md" />
  <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
    Loading...
  </span>
</div>`.trim();

  //render
  return (
    <LayoutPanel
      uri="/component/progressbar"
      title="ProgressBar Component"
      description="Progress bars in FRUI, are ReactJS components that display loading or completion status."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
        <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Progress Bar')}</Link>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
              <li className="pl-3 pb-1">
                <Link href="#props">
                  {_('Props')}
                </Link>
              </li>
              <li className="pl-3 pb-1">
                <Link href="#basics">
                  {_('Basics')}
                </Link>
              </li>
              <li className="pl-3 pb-1">
                <Link href="#customs">
                  {_('Customs')}
                </Link>
              </li>
              <li className="pl-3 pb-1">
                <Link href="#label">
                  {_('Label')}
                </Link>
              </li>
            </ul>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('ProgressBar')}
            </h1>
            <Code language="typescript" className="mt-2">
              {codeImport}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id="basics" className="uppercase font-bold text-lg mt-8">
              {_('Basic Usage')}
            </h2>
            <p className="py-4">
              A simple progress bar. The <C value="value" /> prop determines the progress relative to the <C value="max" /> prop (which defaults to 100). It's often useful to place it inside a container with a background color.
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <div className="relative w-full h-4 bg-gray-300">
                  <ProgressBar value={50} max={100} className="h-4" />
                </div>
              </div>
              <Code language="typescript">
                {codeBasic}
              </Code>
            </div>

            <h2 id="customs" className="uppercase font-bold text-lg mt-8">
              {_('Custom Color & Rounded')}
            </h2>
            <p className="py-4">
              Use the <C value="color" /> prop to set a custom color (CSS color names or hex codes). Apply utility classes like <C value="rounded" /> or <C value="rounded-full" /> via the <C value="className" /> prop for rounded edges. Ensure the container div has matching rounded corners if desired.
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <div className="relative w-full h-4 bg-gray-300 rounded">
                  <ProgressBar value={85} max={100} color="salmon" className="h-4 rounded" />
                </div>
              </div>
              <Code language="typescript">
                {codeCustom}
              </Code>
            </div>

            <h2 id="label" className="uppercase font-bold text-lg mt-8">
              {_('Centered Label')}
            </h2>
            <p className="py-4">
              To display a label (like percentage or text) over the progress bar, wrap the <C value="ProgressBar" /> in a container with <C value="position: relative" />. Then, add a <C value="span" /> (or other element) inside the container with <C value="position: absolute" /> and use flexbox utilities to center the text.
            </p>
            {/* Label Example 1: Percentage */}
            <div className="curved overflow-hidden mb-4">
              <div className="p-3 bg-b1 relative">
                <div className="relative w-full h-4 bg-gray-300 rounded-full">
                  <ProgressBar value={65} max={100} color="green" className="h-4 rounded-full" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
                    65%
                  </span>
                </div>
              </div>
              <Code language="typescript">
                {codeLabelPercent}
              </Code>
            </div>
            {/* Label Example 2: Text */}
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1 relative">
                <div className="relative w-full h-4 bg-gray-300 rounded-md">
                  <ProgressBar value={35} max={100} color="blue" className="h-4 rounded-md" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
                    Loading...
                  </span>
                </div>
              </div>
              <Code language="typescript">
                {codeLabelText}
              </Code>
            </div>

            {/* Navigation */}
            <div className="flex items-center border-t border-b1 my-8 py-8"> 
              <Link className="text-t2" href="/component/modal">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Modal')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/component/table">
                {_('Table')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}