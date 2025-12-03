import { useLanguage } from 'r22n';

import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead
} from 'plugins/app/index.js';
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Bread,
  Loader,
  Table,
  Tooltip,
  Tabs,
  Pager,
  Progress,
  Dialog,
  Notifier,
} from 'components/index.js';

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/component">
      <main className="flex flex-col h-full w-full">
        <section className="flex-grow relative h-full">
          <h1 className="flex items-center uppercase font-bold text-xl">
            {_('Components')}
          </h1>
          <p className="px-3 pt-3">
            Thanks to our sponsors, contributors, and users. The 
            following components have been unlocked and are free to use.
          </p>
          <div className="flex flex-wrap mt-4">
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/accordion'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
                  <Accordion 
                    defaultValue="1"
                    className="w-full text-sm"
                  >
                    <Accordion.Bellow value="1">
                      <Accordion.Label className="px-2 py-1 cursor-pointer border theme-bc-2 flex items-center justify-between">
                        {({ active }) => (
                          <>
                            <span>{_('Item 1')}</span>
                            <i className={`fas fa-chevron-${active ? 'up' : 'down'}`}></i>
                          </>
                        )}
                      </Accordion.Label>
                      <Accordion.Content className="px-2 py-1 text-xs border border-t-0 theme-bc-2">
                        {_('Item 1 content')}
                      </Accordion.Content>
                    </Accordion.Bellow>
                    <Accordion.Bellow value="2">
                      <Accordion.Label className="px-2 py-1 cursor-pointer border border-t-0 theme-bc-2 flex items-center justify-between">
                        {({ active }) => (
                          <>
                            <span>{_('Item 2')}</span>
                            <i className={`fas fa-chevron-${active ? 'up' : 'down'}`}></i>
                          </>
                        )}
                      </Accordion.Label>
                      <Accordion.Content className="px-2 py-1 text-xs border border-t-0 theme-bc-2">
                        {_('Item 2 content')}
                      </Accordion.Content>
                    </Accordion.Bellow>
                  </Accordion>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Accordion')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/alert'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
                  <div className="w-full space-y-2">
                    <Alert curved success className="w-full text-sm py-2 px-3">
                      <i className="fas fa-check-circle mr-2"></i>
                      {_('Success')}
                    </Alert>
                    <Alert curved warning className="w-full text-sm py-2 px-3">
                      <i className="fas fa-exclamation-triangle mr-2"></i>
                      {_('Warning')}
                    </Alert>
                    <Alert curved error className="w-full text-sm py-2 px-3">
                      <i className="fas fa-times-circle mr-2"></i>
                      {_('Error')}
                    </Alert>
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Alert')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/badge'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1">
                  <Badge success pill className="text-xs my-3 inline-block">99</Badge>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Badge')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/bread'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
                  <Bread className="w-full text-sm">
                    <Bread.Crumb 
                      href="#" 
                      className="text-info hover:underline"
                    >
                      {_('Home')}
                    </Bread.Crumb>
                    <Bread.Slicer className="mx-2">/</Bread.Slicer>
                    <Bread.Crumb 
                      href="#" 
                      className="text-info hover:underline"
                    >
                      {_('Library')}
                    </Bread.Crumb>
                    <Bread.Slicer className="mx-2">/</Bread.Slicer>
                    <Bread.Crumb className="theme-color-1 font-semibold">
                      {_('Data')}
                    </Bread.Crumb>
                  </Bread>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Bread Crumbs')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/button'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1">
                  <div className="flex gap-2">
                    <Button success rounded className="text-xs">
                      {_('Success')}
                    </Button>
                    <Button error rounded className="text-xs">
                      {_('Error')}
                    </Button>
                    <Button info outline rounded className="text-xs">
                      {_('Info')}
                    </Button>
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Button')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/dialog'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1">
                  <Dialog overlay={{ close: true }}>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">Dialog Title</h3>
                      <p>This is a sample dialog content.</p>
                      <Dialog.Close className="mt-4 px-3 py-1 bg-error text-white rounded cursor-pointer">
                        Close
                      </Dialog.Close>
                    </div>
                  </Dialog>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Dialog')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/fieldset'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1">
                  TODO
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Fieldset')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/loader'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1">
                  <Loader show={true} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Loader')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/notifier'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
                  <Button
                    info
                    rounded
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      Notifier.notify('success', 'This is a success message!');
                    }}
                  >
                    {_('Click to Notify')}
                  </Button>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Notifier')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/pager'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
                  <Pager
                    total={500}
                    skip={100}
                    take={50}
                    radius={2}
                    start
                    end
                    prev
                    next
                    className={({ active }) => `
                      px-2 py-1 mx-1 text-sm cursor-pointer rounded
                      ${active ? 'theme-bg-2 font-bold' : 'border theme-bc-2'}
                    `}
                  />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Pager')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/progress'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
                  <div className="w-full space-y-2">
                    <Progress 
                      style={{ width: '75%' }}
                      height={8}
                      bg="info"
                      rounded
                      container={{ bg: "muted" }}
                    />
                    <Progress 
                      style={{ width: '50%' }}
                      height={8}
                      bg="success"
                      rounded
                      container={{ bg: "muted" }}
                    />
                    <Progress 
                      style={{ width: '25%' }}
                      height={8}
                      bg="warning"
                      rounded
                      container={{ bg: "muted" }}
                    />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Progress Bar')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/table'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-auto">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <div className="overflow-auto w-full">
                    <Table>
                      <Table.Head className="theme-bg-2 text-left text-white !py-2">{_('ID')}</Table.Head>
                      <Table.Head className="theme-bg-2 text-left text-white !py-2">{_('Name')}</Table.Head>
                      <Table.Row>
                        <Table.Col className="theme-bg-1 text-left !py-2">1</Table.Col>
                        <Table.Col className="theme-bg-1 text-left !py-2">Jacob</Table.Col>
                      </Table.Row>
                    </Table>
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Table')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/tabs'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-auto">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
                  <div className="overflow-auto w-full">
                    <Tabs 
                      tabs={[
                        { 
                          label: (
                            <div className="p-2 border border-b-0 theme-bc-2">
                              Tab 1
                            </div>
                          ), 
                          active: (
                            <div className="p-2 border border-b-0 theme-bc-2 theme-bg-2">
                              Tab 1
                            </div>
                          ), 
                          content: (
                            <div className="p-2 border theme-bc-2">
                              Content for Tab 1
                            </div>
                          )
                        },
                        { 
                          label: (
                            <div className="p-2 border border-b-0 theme-bc-2">
                              Tab 2
                            </div>
                          ), 
                          active: (
                            <div className="p-2 border border-b-0 theme-bc-2 theme-bg-2">
                              Tab 2
                            </div>
                          ), 
                          content: (
                            <div className="p-2 border theme-bc-2">
                              Content for Tab 2
                            </div>
                          )
                        }
                      ]}  
                      className="flex items-center" 
                    />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Tabs')}                
                </h2>
              </div>
            </div>
            <div
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/tooltip'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1">
                  <Tooltip text="Hello World">
                    <Button warning rounded className="my-1">
                      Hover over me
                    </Button>
                  </Tooltip>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Tooltip')}
                </h2>
              </div>
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
      uri="/component"
      title="Components"
      description="Components in FRUI, are compounded interfaces built on top of ReactJS native components and HTML elements."
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
