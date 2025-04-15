// Types
import type { Crumb } from 'modules/components/Crumbs';
// Hooks
import { useLanguage } from 'r22n';
import { useState } from 'react';
// Components
import Link from 'next/link';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code from 'modules/components/Code';
import Toast from 'frui/element/Toast';
import type { ToastProps as BaseToastProps } from 'frui/element/Toast';

type ToastProps = BaseToastProps & {
  id: number;
  stackable: boolean;
}

type PropDataRow = [string, string, string, string];

export default function Page() {
  const { _ } = useLanguage();
  // State for the array of toasts
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Define the maximum number of toasts allowed
  const MAX_TOASTS = 3;

  // Function to add a toast (handles stacking logic)
  const showToast = (config: BaseToastProps & { stackable?: boolean }) => {
    const { stackable = false, ...restConfig } = config; // Default stackable to false

    const newToast: ToastProps = {
      ...restConfig,
      id: Date.now(),
      stackable: stackable,
    };

    setToasts(currentToasts => {
      let updatedToasts;

      if (stackable) {
        updatedToasts = [newToast, ...currentToasts];
      } else {
        const existingStackable = currentToasts.filter(t => t.stackable);
        updatedToasts = [newToast, ...existingStackable];
      }

      const limitedToasts = updatedToasts.slice(0, MAX_TOASTS);
      return limitedToasts;
    });
  };

  const hideToast = (id: number) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  };

  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Toast' }
  ];

  const propsData: PropDataRow[] = [
    [_('className'), _('string'), _('No'), _('Standard HTML class names')],
    [_('message'), _('ReactNode'), _('Yes'), _('Toast message content')],
    [_('type'), _('string'), _('No'), _('Toast type: success, error, warning, info, muted')],
    [_('color'), _('string'), _('No'), _('Custom background color (overrides type style)')],
    [_('duration'), _('number'), _('No'), _('Auto-hide duration (ms). 0 for persistent')],
    [_('style'), _('CSSProperties'), _('No'), _('Custom CSS styles')],
    [_('closable'), _('boolean'), _('No'), _('Allows manual close')],
    [_('onClose'), _('function'), _('No'), _('Callback when closed')],
  ];

  const codeImport = `import Toast from 'frui/element/Toast';`.trim();

  const codeSuccess = `
<button onClick={() => showToast({
  message: _('Successful! Your action was completed.'),
  type: 'success',
  duration: 3000,
  closable: false 
})}>
  {_('Show Success Toast')}
</button>`.trim();

  const codeError = `
<button onClick={() => showToast({
  message: _('An error occurred. Please try again.'),
  type: 'error',
  duration: 3000,
  closable: false 
})}>
  {_('Show Error Toast')}
</button>`.trim();

  const codeInfo = `
<button onClick={() => showToast({
  message: _('For your information, this page contains valuable content!'),
  type: 'info',
  duration: 5000,
  closable: true
})}>
  {_('Show Info Toast')}
</button>`.trim();

  const codeWarning = `
const handleWarningClose = () => {
  alert(_('Warning toast was closed manually.'));
};

<button onClick={() => showToast({
  message: _('This action might have unintended consequences.'),
  type: 'warning',
  duration: 0, // does not close automatically
  closable: true,
  onClose: handleWarningClose // custom onClose
})}>
  {_('Show Persistent Warning')}
</button>`.trim();

 const codeStacking = `
<button onClick={() => showToast({
  message: \`Stacked Toast #\${Date.now().toString().slice(-4)}\`, // displays a random hashtag number ID
  type: 'muted',
  duration: 3000,
  closable: true,
  stackable: true // Allows this toast to stack
})}>
  {_('Add Toast to Stack')}
</button>`.trim();

  return (
    <LayoutPanel
        uri="/component/toast"
        title="Toast Component"
        description="Toast notifications in FRUI, are ReactJS components that display brief messages."
    >
      {/* Toast Container */}
      <div
        className="toast-stack-container"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1050,
          display: 'flex', 
          flexDirection: 'column', // Stacks from bottom up
          gap: '10px', 
        }}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast}
            onClose={() => {
              if (toast.onClose) {
                toast.onClose();
              }
              hideToast(toast.id);
            }}
          />
        ))}
      </div>

      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold"><Link href="#top">{_('Toast')}</Link></h4>
            <ul className="list-disc py-3 pr-3 pl-6">
                <li className="pl-3 pb-1"><Link href="#props">{_('Props')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#example-success">{_('Success Example')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#example-error">{_('Error Example')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#example-info">{_('Info Example')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#example-warning">{_('Warning Example')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#example-stacking">{_('Stacking Example')}</Link></li>
            </ul>
          </aside>

          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">{_('Toast')}</h1>
            <Code language="typescript" className="mt-2">
              {codeImport}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">{_('Props')}</h2>
            <Props props={propsData} />

            {/* Example 1: Success */}
            <h2 id="example-success" className="uppercase font-bold text-lg mt-8">{_('Success Example')}</h2>
            <p className="py-4">Demonstrates a simple success notification. Clicking again replaces the current toast (if not stacking).</p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <button className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => showToast({
                    message: _('Successful! Your action was completed.'),
                    type: 'success',
                    duration: 3000,
                    closable: false 
                  })}
                >{_('Show Success Toast')}</button>
              </div>
              <Code language="typescript">
                {codeSuccess}
              </Code>
            </div>

            {/* Example 2: Error */}
            <h2 id="example-error" className="uppercase font-bold text-lg mt-8">{_('Error Example')}</h2>
            <p className="py-4">Shows an error notification. Clicking again replaces the current toast (if not stacking).</p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <button className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => showToast({
                    message: _('An error occurred. Please try again.'),
                    type: 'error',
                    duration: 3000,
                    closable: false 
                    })}
                  >{_('Show Error Toast')}</button>
              </div>
              <Code language="typescript">
                {codeError}
              </Code>
            </div>

            {/* Example 3: Info */}
             <h2 id="example-info" className="uppercase font-bold text-lg mt-8">{_('Info Example')}</h2>
             <p className="py-4">Presents an informational notification. Clicking again replaces the current toast (if not stacking).</p>
             <div className="curved overflow-hidden">
               <div className="p-3 bg-b1">
                 <button className="px-4 py-2 bg-blue-500 text-white rounded"
                   onClick={() => showToast({
                     message: _('For your information, this page contains valuable content!'),
                     type: 'info',
                     duration: 5000,
                     closable: true
                   })}
                 >{_('Show Info Toast')}</button>
               </div>
               <Code language="typescript">
                 {codeInfo}
               </Code>
             </div>

            {/* Example 4: Warning */}
            <h2 id="example-warning" className="uppercase font-bold text-lg mt-8">{_('Warning Example')}</h2>
            <p className="py-4">Illustrates a persistent warning notification (duration 0). Clicking again replaces the current toast (if not stacking).</p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                  <button className="px-4 py-2 bg-yellow-500 text-yellow-900 rounded"
                    onClick={() => showToast({
                      message: _('This action might have unintended consequences.'),
                      type: 'warning',
                      duration: 0, // does not close automatically
                      closable: true,
                      onClose: () => { alert(_('Warning toast was closed manually.')); }
                    })}
                  >{_('Show Persistent Warning')}</button>
              </div>
              <Code language="typescript">
                {codeWarning}
              </Code>
            </div>

            {/* Example 5: Stacking Demo */}
            <h2 id="example-stacking" className="uppercase font-bold text-lg mt-8">{_('Stacking Example')}</h2>
            <p className="py-4">Click the button multiple times quickly to see toasts stack up (maximum {MAX_TOASTS}). Requires `stackable: true`.</p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                  <button className="px-4 py-2 bg-purple-500 text-white rounded"
                    onClick={() => showToast({
                      message: `${_('Stacked Toast')} #${Date.now().toString().slice(-4)}`,
                      type: 'muted',
                      duration: 3000, 
                      closable: true,
                      stackable: true // Allows stacking
                    })}
                  >
                    {_('Add Toast to Stack')}
                  </button>
              </div>
              <Code language="typescript">
                {codeStacking}
              </Code>
            </div>

            {/* Navigation */}
            <div className="flex items-center border-t border-b1 my-8 py-8">
                <Link className="text-t2" href="/component/table"><i className="fas fa-arrow-left mr-2"></i>{_('Table')}</Link>
                <div className="flex-grow"></div>
                <Link className="text-t2" href="/field">{_('Fields')}<i className="fas fa-arrow-right ml-2"></i></Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}