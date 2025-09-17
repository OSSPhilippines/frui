import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';

import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C 
} from 'plugins/app/index.js';
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';

import Button from 'components/form/Button.js';
import Modal, { useModal } from 'components/element/Modal.js';

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Modal' }
];

const props = [
  [ 'absolute', 'boolean', 'No', 'Absolute position' ],
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'color', 'string', 'No', 'Custom CSS hex or name for the modal header' ],
  [ 'curved', 'boolean', 'No', 'Slightly curved modal' ],
  [ 'fixed', 'boolean', 'No', 'Fixed position' ],
  [ 'opened', 'boolean', 'No', 'Whether to open the modal or not' ],
  [ 'rounded', 'boolean', 'No', 'Rounded modal' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
  [ 'title', 'string', 'Yes', 'Title of modal' ]
];

const examples = [
//0
`<Modal opened absolute color="salmon" title="Delete Item" className="text-white">
  <div className="p-3 bg-white text-black">
    Are you sure you want to delete this item ?
  </div>
</Modal>`,
//1
`<Modal curved opened absolute color="salmon" title="Delete Item" className="text-white">
  <div className="p-3 bg-white text-black">
    Are you sure you want to delete this item ?
  </div>
</Modal>`,
//2
`<Modal rounded opened absolute color="salmon" title="Delete Item" className="text-white">
  <div className="p-3 bg-white text-black">
    Are you sure you want to delete this item ?
  </div>
</Modal>`,
//3
`import { useState } from 'react';

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
}`,
//4
`<Modal fixed opened={opened} color="salmon" title="Delete Item" className="text-white" onClose={() => open(false)}>
  <div className="bg-white p-3 text-black">
    Are you sure you want to delete this item ?
  </div>
</Modal>`,
//5
`//app.js
import { ModalProvider } from 'frui/Modal';

export default function App({ children }) {
  return (
    <ModalProvider color="salmon" rounded className="text-white">
      {children}
    </ModalProvider>
  );
}`,
//6
`//page.js
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
}`
];

function ModalBody() {
  return (
    <div className="bg-white p-3 text-black">
      Are you sure you want to delete this item ?
    </div>
  );
}

export function Body() {
  //hooks
  const { _ } = useLanguage();
  const modal = useModal();
  //variables
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
    <LayoutPanel pathname="/component/modal">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l theme-bc-1 text-sm">
            <h4 className="p-3 border-b theme-bc-1 theme-bg-1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <a className="block pb-1" href="#top">Modal</a>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <a href="#props">
                    {_('Props')}
                  </a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#basic">
                    {_('Basic')}
                  </a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#rounded">
                    {_('Rounded')}
                  </a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#open">
                    {_('Open & Close')}
                  </a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#fixed">
                    {_('Absolute & Fixed')}
                  </a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#global">
                    {_('Glboal Modal')}
                  </a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#styles">
                    {_('Custom Styles')}
                  </a>
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
              <div className="flex items-center justify-center p-3 theme-bg-1 relative h-48">
                <Modal opened absolute color="salmon" title="Delete Item" className="text-white">
                  <div className="bg-white p-3 text-black">
                    Are you sure you want to delete this item ?
                  </div>
                </Modal>
              </div>
              <Code language="typescript">
                {examples[0]}
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
              <div className="flex items-center justify-center p-3 theme-bg-1 relative h-48">
                <Modal curved opened absolute color="salmon" title="Delete Item" className="text-white">
                  <div className="bg-white p-3 text-black">
                    Are you sure you want to delete this item ?
                  </div>
                </Modal>
              </div>
              <Code language="typescript">{examples[1]}</Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1 relative h-48">
                <Modal rounded opened absolute color="salmon" title="Delete Item" className="text-white">
                  <div className="bg-white p-3 text-black">
                    Are you sure you want to delete this item ?
                  </div>
                </Modal>
              </div>
              <Code language="typescript">{examples[2]}</Code>
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
              <Code language="typescript">{examples[3]}</Code>
              <div className="flex items-center justify-center p-3 theme-bg-1 relative h-48">
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
              <Code language="typescript">{examples[4]}</Code>
              <div className="flex items-center justify-center p-3 theme-bg-1 relative">
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
              <Code language="typescript">{examples[5]}</Code>
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
              <Code language="typescript">{examples[6]}</Code>
              <div className="flex items-center justify-center p-3 theme-bg-1">
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

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/component/loader">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Loaders')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/component/table">
                {_('Tables')}
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
};

export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/component/modal"
      title=""
      description=""
      styles={styles}
    />
  );
};

export default function Page() {
  return (
    <LayoutProvider>
      <Body />
    </LayoutProvider>
  );
};
