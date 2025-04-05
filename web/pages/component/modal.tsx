//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
import { useState } from 'react';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Button from 'frui/form/Button';
import Modal, { useModal } from 'frui/element/Modal';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const codeBasic = `
<Modal opened absolute color="salmon" title="Delete Item" className="text-white">
  <div className="p-3 bg-white text-black">
    Are you sure you want to delete this item ?
  </div>
</Modal>`.trim();
const codeCurved = `
<Modal curved opened absolute color="salmon" title="Delete Item" className="text-white">
  <div className="p-3 bg-white text-black">
    Are you sure you want to delete this item ?
  </div>
</Modal>`.trim();
const codeRounded = `
<Modal rounded opened absolute color="salmon" title="Delete Item" className="text-white">
  <div className="p-3 bg-white text-black">
    Are you sure you want to delete this item ?
  </div>
</Modal>`.trim();
const codeOpen = `
import { useState } from 'react';

function Page() {
  const [ opened, open ] = useState(false);
  return (
    <Button warning onClick={() => open(true)}>Open Modal</Button>
    <Modal curved opened={opened} absolute color="salmon" title="Delete Item" className="text-white" onClose={() => open(false)}>
      <div className="bg-white p-3 text-black">
        Are you sure you want to delete this item ?
      </div>
    </Modal>
  );
}
`.trim();
const codeFixed = `
<Modal fixed opened={opened} color="salmon" title="Delete Item" className="text-white" onClose={() => open(false)}>
  <div className="bg-white p-3 text-black">
    Are you sure you want to delete this item ?
  </div>
</Modal>`.trim();
const codeApp = `
//app.js
import { ModalProvider } from 'frui/Modal';

export default function App({ children }) {
  return (
    <ModalProvider color="salmon" rounded className="text-white">
      {children}
    </ModalProvider>
  );
}`.trim();
const codePage = `
//page.js
import { useModal } from 'frui/Modal';
import Button from 'frui/Button';

function ModalBody() {
  return (
    <div className="bg-white p-3 text-black">
      Are you sure you want to delete this item ?
    </div>
  );
}

export default function Page() {
  const modal = useModal();
  const body = (<ModalBody />);
  const open = () => {
    modal.title('Delete Item');
    modal.body(body);
    modal.open(true);
  };

  return (
    <Button warning onClick={open}>Open Modal</Button>
  );
}
`.trim();

function ModalBody() {
  return (
    <div className="bg-white p-3 text-black">
      Are you sure you want to delete this item ?
    </div>
  );
}

export default function Page() {
  //hooks
  const { _ } = useLanguage();
  const modal = useModal();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Modal' }
  ];

  const props = [
    [ _('absolute'), _('boolean'), _('No'), _('Absolute position') ],
    [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
    [ _('color'), _('string'), _('No'), _('Custom CSS hex or name for the modal header') ],
    [ _('curved'), _('boolean'), _('No'), _('Slightly curved modal') ],
    [ _('fixed'), _('boolean'), _('No'), _('Fixed position') ],
    [ _('opened'), _('boolean'), _('No'), _('Whether to open the modal or not') ],
    [ _('rounded'), _('boolean'), _('No'), _('Rounded modal') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS input') ],
    [ _('title'), _('string'), _('Yes'), _('Title of modal') ],
  ];

  const [ opened, setOpened ] = useState(false);
  const [ openedF, setOpenedF ] = useState(false);

  const body = (<ModalBody />);
  const open = () => {
    modal.title('Delete Item');
    modal.body(body);
    modal.open(true);
  };
  //render
  return (
    <LayoutPanel 
      uri="/component/modal"
      title="Modal Component"
      description="Modals in FRUI, are ReactJS components that popup allowing users to interact with."
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
              <Link className="block pb-1" href="#top">Modal</Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <Link href="#props">
                    {_('Props')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#basic">
                    {_('Basic')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#rounded">
                    {_('Rounded')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#open">
                    {_('Open & Close')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#fixed">
                    {_('Absolute & Fixed')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#global">
                    {_('Glboal Modal')}
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
              {_('Modal')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Modal from 'frui/Modal';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basic')}
            </h2>
            <p className="py-4">
              <Translate>
                By default, modal wont show until <C value="opened" r /> 
                is set to <C value="true" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1 relative h-48">
                <Modal opened absolute color="salmon" title="Delete Item" className="text-white">
                  <div className="bg-white p-3 text-black">
                    Are you sure you want to delete this item ?
                  </div>
                </Modal>
              </div>
              <Code language="typescript">
                {codeBasic}
              </Code>
            </div>

            <h2 id="rounded" className="uppercase font-bold text-lg mt-8">
              {_('Rounded')}
            </h2>
            <p className="py-4">
              <Translate>
                Modals can be rounded in three ways: <C value="curved" />, 
                and <C value="rounded" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1 relative h-48">
                <Modal curved opened absolute color="salmon" title="Delete Item" className="text-white">
                  <div className="bg-white p-3 text-black">
                    Are you sure you want to delete this item ?
                  </div>
                </Modal>
              </div>
              <Code language="typescript">{codeCurved}</Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1 relative h-48">
                <Modal rounded opened absolute color="salmon" title="Delete Item" className="text-white">
                  <div className="bg-white p-3 text-black">
                    Are you sure you want to delete this item ?
                  </div>
                </Modal>
              </div>
              <Code language="typescript">{codeRounded}</Code>
            </div>

            <h2 id="open" className="uppercase font-bold text-lg mt-8">
              {_('Open & Close')}
            </h2>
            <p className="py-4">
              <Translate>
                To open and close modals, you can use <C value="useState" r /> 
                from react, then pass the <C value="opened" />, and the 
                <C l value="open" /> function to the modal like the 
                following code example.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <Code language="typescript">{codeOpen}</Code>
              <div className="flex items-center justify-center p-3 bg-b1 relative h-48">
                <Button warning onClick={() => setOpened(true)}>Open Modal</Button>
                <Modal curved opened={opened} absolute color="salmon" title="Delete Item" className="text-white" onClose={() => setOpened(false)}>
                  <div className="bg-white p-3 text-black">
                    Are you sure you want to delete this item ?
                  </div>
                </Modal>
              </div>
            </div>

            <h2 id="fixed" className="uppercase font-bold text-lg mt-8">
              {_('Absolute & Fixed')}
            </h2>
            <p className="py-4">
              <Translate>
                Absolute modals shows within the container closest to 
                position <C value="relative" /> in your HTML. Fixed 
                modals shows on a page level. You can toggle between 
                the two by adding <C value="fixed" />, or 
                <C l value="absolute" /> in the modal like the following 
                code example. By default modals are fixed.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <Code language="typescript">{codeFixed}</Code>
              <div className="flex items-center justify-center p-3 bg-b1 relative">
                <Button warning onClick={() => setOpenedF(true)}>Open Modal</Button>
                <Modal fixed opened={openedF} color="salmon" title="Delete Item" className="text-white" onClose={() => setOpenedF(false)}>
                  <div className="bg-white p-3 text-black">
                    Are you sure you want to delete this item ?
                  </div>
                </Modal>
              </div>
            </div>

            <h2 id="global" className="uppercase font-bold text-lg mt-8">
              {_('Global Modal')}
            </h2>
            <p className="py-4">
              <Translate>
                Most of the time you want one modal up at a time. To do 
                this we need to first setup a global modal provider in
                the project <C value="App" /> page.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <Code language="typescript">{codeApp}</Code>
            </div>
            <p className="py-4">
              <Translate>
                Then in your page, import <C value="useModal" />, define 
                a <C value="ModelBody" />, and then connect it all in 
                your <C value="Page" /> component. The following shows 
                how this can be done.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <Code language="typescript">{codePage}</Code>
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button warning onClick={open}>Open Modal</Button>
              </div>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to the modal component 
                or set any combination of the following CSS classes: 
                <C l value="frui-modal" />, 
                <C l value="frui-modal-overlay" />, 
                <C l value="frui-modal-head" />, 
                <C l value="frui-modal-title" />, 
                <C l value="frui-modal-body" />
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/component/loader">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Loaders')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/component/table">
                {_('Tables')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
