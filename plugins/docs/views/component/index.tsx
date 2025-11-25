import { useLanguage } from 'r22n';

import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead
} from 'plugins/app/index.js';
import {
  Alert,
  Badge,
  Loader,
  Table,
  Thead,
  Trow,
  Tcol,
  Tooltip,
  Tabs
} from 'components/index.js';
import Button from 'components/Button.js';

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
                  TODO
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
                  <Alert curved info className="w-full">
                    <i className="fas fa-check-circle mr-2"></i>
                    {_('Success')}
                  </Alert>
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
              onClick={() => window.location.href = '/component/crumbs'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
                  TODO
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
                  <Button error rounded className="my-1">Submit</Button>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Button')}
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
              onClick={() => window.location.href = '/component/modal'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <div className="rounded overflow-hidden w-full">
                    <header className="flex items-center theme-bg-1 p-2">
                      <h3 className="flex-grow uppercase font-semibold">Confirm</h3>
                      <a href="#" className="float-right font-bold">&times;</a>
                    </header>
                    <div className="theme-bg-2 p-2">Are You Sure?</div>
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Modal')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/accordion'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
                  TODO
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Notify')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/pagination'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
                  TODO
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Pagination')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = '/component/progress'} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
                  TODO
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
                      <Thead className="theme-bg-2 text-left text-white !py-2">{_('ID')}</Thead>
                      <Thead className="theme-bg-2 text-left text-white !py-2">{_('Name')}</Thead>
                      <Trow>
                        <Tcol className="theme-bg-1 text-left !py-2">1</Tcol>
                        <Tcol className="theme-bg-1 text-left !py-2">Jacob</Tcol>
                      </Trow>
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
