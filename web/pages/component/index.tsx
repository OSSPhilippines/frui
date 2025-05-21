//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
import { useRouter } from 'next/router';
//components
import Crumbs from 'modules/components/Crumbs';
import { LayoutPanel } from 'modules/theme';
import Alert from 'frui/element/Alert';
import { Accordion, AccordionSummary, AccordionDetails } from 'frui/element/Accordion';
import Badge from 'frui/element/Badge';
import Button from 'frui/form/Button';
import Loader from 'frui/element/Loader';
import Table, { Thead, Trow, Tcol } from 'frui/element/Table';
import Tabs from 'frui/element/Tabs';
import Tooltip from 'frui/element/Tooltip';

const ExpandMoreIconPreview = () => <span style={{ fontSize: '0.8em' }}>▼</span>;

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  const router = useRouter();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components' }
  ];
  //render
  return (
    <LayoutPanel 
      uri="/component"
      title="Components"
      description="Components in FRUI, are compounded interfaces built on top of ReactJS native components and HTML elements."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow px-3 pt-3 pb-5 overflow-auto">
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
              onClick={() => router.push('/component/accordion')}
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  <div className="w-full">
                    <Accordion id="preview-accordion">
                      <AccordionSummary expandIcon={<ExpandMoreIconPreview />}>
                        {_("Accordion")}
                      </AccordionSummary>
                       <AccordionDetails>
                         {_("Content...")}
                       </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Accordion')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/component/alert')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
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
              onClick={() => router.push('/component/badge')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1">
                  <Badge success pill className="text-xs my-3 inline-block">99</Badge>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Badge')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/component/button')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1">
                  <Button error rounded className="my-1">Submit</Button>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Button')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/component/loader')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1">
                  <Loader show={true} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Loader')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/component/modal')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <div className="rounded overflow-hidden w-full">
                    <header className="flex items-center bg-b1 p-2">
                      <h3 className="flex-grow uppercase font-semibold">Confirm</h3>
                      <a href="#" className="float-right font-bold">&times;</a>
                    </header>
                    <div className="bg-b2 p-2">Are You Sure?</div>
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Modal')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/component/table')} 
            >
              <div className="m-2 border border-b2 rounded overflow-auto">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <div className="overflow-auto w-full">
                    <Table>
                      <Thead className="bg-b2 text-left text-white !py-2">{_('ID')}</Thead>
                      <Thead className="bg-b2 text-left text-white !py-2">{_('Name')}</Thead>
                      <Trow>
                        <Tcol className="bg-b1 text-left !py-2">1</Tcol>
                        <Tcol className="bg-b1 text-left !py-2">Jacob</Tcol>
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
              onClick={() => router.push('/component/tabs')} 
            >
              <div className="m-2 border border-b2 rounded overflow-auto">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  <div className="overflow-auto w-full">
                    <Tabs
                      tabs={[
                        { label: 'Tab 1' },
                        { label: 'Tab 2' },
                        { label: 'Tab 3' },
                      ]}
                      panels={[
                        <div key="1">{_('Content for Tab 1')}</div>,
                        <div key="2">{_('Content for Tab 2')}</div>,
                        <div key="3">{_('Content for Tab 3')}</div>,
                      ]}
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
              onClick={() => router.push('/component/tooltip')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1">
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
          <h2 className="px-3 flex items-center uppercase font-bold text-xl mt-4">
            <i className="fas fa-lock mr-2" />
            {_('Locked')}
          </h2>
          <p className="px-3 pt-3">
            The following components have are locked until enough there are 
            enough users and demand for such components.
          </p>
          <div className="flex flex-wrap mt-4">
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  Unlocks at 2,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Bread Crumb')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  Unlocks at 4,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Pagination')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  Unlocks at 6,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Progress Bar')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  Unlocks at 14,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Toast')}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
