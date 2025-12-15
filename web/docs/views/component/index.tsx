//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage } from 'r22n';
//frui
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Bread,
  Carousel,
  Loader,
  Table,
  Tooltip,
  Tabs,
  Pager,
  Progress,
  Dialog,
  Notifier,
} from 'src/base/index.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/component';
const title = 'Components';
const description = 'Components in FRUI, are compounded interfaces '
  + 'built on top of ReactJS native components and HTML elements.';

//--------------------------------------------------------------------//
// Components

/**
 * Documentation body component
 */
export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 px-3 pt-3 '
        + 'pb-5 h-full overflow-auto'
    }>
      <h1 className="flex items-center uppercase font-bold text-xl">
        {_('Base Components')}
      </h1>
      <p className="py-3">
        Thanks to our sponsors, contributors, and users. The 
        following components have been unlocked and are free to use.
      </p>
      <div className="flex flex-wrap mt-4">
        <div 
          className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = '/component/accordion'} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3 text-left">
              <Accordion 
                className="w-full"
                content="p-1 border theme-bc-2 text-sm"
                defaultValue="item1"
                label="p-1 border theme-bc-3 font-bold theme-bg-2 text-xs uppercase"
              >
                <Accordion.Item value="item1">
                  <Accordion.Label>Item 1</Accordion.Label>
                  <Accordion.Content>Content for Item 1</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item2">
                  <Accordion.Label>Item 2</Accordion.Label>
                  <Accordion.Content>Content for Item 2</Accordion.Content>
                </Accordion.Item>
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
                <Alert curved success className="w-full text-center">
                  <i className="fas fa-check-circle mr-2"></i>
                  {_('Success')}
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
              <Badge info>99</Badge>
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
            <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3 text-xs">
              <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
                <Bread.Slicer />
                <Bread.Crumb icon="folder">Crumb 1</Bread.Crumb>
                <Bread.Crumb icon="file">Crumb 2</Bread.Crumb>
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
                <Button error rounded outline className="text-xs">
                  {_('Error')}
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
          onClick={() => window.location.href = '/component/carousel'} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[100px] w-full theme-bg-1">
              <div className="w-[180px] m-auto">
                <Carousel auto repeat>
                  <Carousel.Prev asChild>
                    <Button info sm>&lt;</Button>
                  </Carousel.Prev>
                  <Carousel.Frame className="w-[60px]">
                    <img src="https://images.wsj.net/im-580612/8SR" />
                  </Carousel.Frame>
                  <Carousel.Frame className="w-[60px]">
                    <img src="https://images.wsj.net/im-580612/8SR" />
                  </Carousel.Frame>
                  <Carousel.Frame className="w-[60px]">
                    <img src="https://images.wsj.net/im-580612/8SR" />
                  </Carousel.Frame>
                  <Carousel.Frame className="w-[60px]">
                    <img src="https://images.wsj.net/im-580612/8SR" />
                  </Carousel.Frame>
                  <Carousel.Frame className="w-[60px]">
                    <img src="https://images.wsj.net/im-580612/8SR" />
                  </Carousel.Frame>
                  <Carousel.Next asChild>
                    <Button info sm>&gt;</Button>
                  </Carousel.Next>
                </Carousel>
              </div>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Carousel')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = '/component/dialog'} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[100px] w-full theme-bg-1">
              <div className="relative w-full h-full">
                <Dialog 
                  overlay={{ absolute: true }}
                  open={true} 
                  className="theme-bg-0 theme-bc-1 rounded-lg overflow-hidden shadow-lg w-[180px]"
                >
                  <header className="flex items-center p-1 theme-bg-2">
                    <h3 className="text-xs flex-grow font-semibold uppercase">
                      Are you sure?
                    </h3>
                  </header>
                  <p className="p-1 text-sm">Yes I am.</p>
                  <footer className="border-t theme-bc-1 p-1 flex justify-end">
                    <Dialog.Close className="inline-block theme-error">
                      <Button error sm pill>Close</Button>
                    </Dialog.Close>
                  </footer>
                </Dialog>
              </div>
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
              <Loader info slice={1} className="m-2">Loading...</Loader>
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
                  Notifier.notify('info', 'Loading...');
                  setTimeout(() => {
                    window.location.href = '/component/notifier';
                  }, 2000);
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
                radius={1}
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
                <Progress width={50} info pill bgc="#EFEFEF" txc="white">50%</Progress>
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
            <div className="flex items-center justify-center h-[100px] w-full theme-bg-1 px-3">
              <div className="overflow-auto w-full">
                <Table className="w-full text-xs">
                  <Table.Head className="theme-bg-2 text-left text-white py-1">{_('ID')}</Table.Head>
                  <Table.Head className="theme-bg-2 text-left text-white py-1">{_('Name')}</Table.Head>
                  <Table.Row>
                    <Table.Col className="theme-bg-1 text-left py-1">1</Table.Col>
                    <Table.Col className="theme-bg-1 text-left py-1">John</Table.Col>
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
                  defaultValue="tab1"
                  tab={({ active }) => active
                    ? 'border border-b-0 px-3 py-1 text-xs theme-bc-2 theme-bg-2 font-semibold'
                    : 'border border-b-0 px-3 py-1 text-xs theme-bc-2 cursor-pointer'
                  }
                  content="border theme-bc-2 p-2 text-xs"
                >
                  <Tabs.Head className="flex">
                    <Tabs.Label value="tab1">{_('Tab 1')}</Tabs.Label>
                    <Tabs.Label value="tab2">{_('Tab 2')}</Tabs.Label>
                    <Tabs.Label value="tab3">{_('Tab 3')}</Tabs.Label>
                  </Tabs.Head>
                  <Tabs.Body>
                    <Tabs.Content value="tab1">{_('Content 1')}</Tabs.Content>
                    <Tabs.Content value="tab2">{_('Content 2')}</Tabs.Content>
                    <Tabs.Content value="tab3">{_('Content 3')}</Tabs.Content>
                  </Tabs.Body>
                </Tabs>
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
              <Tooltip warning text="This is a tooltip" hover arrow>
                <Button black outline>Hover</Button>
              </Tooltip>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Tooltip')}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <Docs.Head
      uri={uri}
      title={title}
      description={description}
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <Docs pathname={uri}>
      <Body />
    </Docs>
  );
};

//defaults to page
export default Page;