//modules
import { useLanguage } from 'r22n';
//frui
import Mask from '../../../components/field/Mask.js';
import Country from '../../../components/field/Country.js';
import Switch from '../../../components/field/Switch.js';
import Control from '../../../components/form/Control.js';
import Button from '../../../components/form/Button.js';
import Alert from '../../../components/element/Alert.js';
import { 
  Table, 
  Thead, 
  Trow, 
  Tcol 
} from '../../../components/element/Table.js';
//src
import type { PageProps } from '../../app/types.js';
import { LayoutProvider, LayoutHome, ThemeHead } from '../../app';

export function Body() {
  const { _ } = useLanguage();
  return (
    <LayoutHome>
      <main className="border-t theme-bc-1 w-full h-full">
        <section className="md:flex items-center theme-bc-1 border-y h-full">
          <div className="basis-1/2 px-8 h-full flex flex-col justify-center text-center">
            <h1 className="font-bold text-4xl uppercase">
              {_('Just React Components')}
            </h1>
            <p className="my-4">
              {_('No layouts, no grids, no themes, no style engine, no design system. FRUI offers a comprehensive suite of free react components to use without the commitments.')}
            </p>
            <Button curved info xl2 className="!px-24" href="/start">
              {_('Get Started')}
            </Button>
          </div>
          <div className="basis-1/2 pt-3 px-3 hidden md:flex flex-col justify-center theme-bg-1 theme-bc-1 border-l w-full h-full overflow-hidden">
            <Alert curved info>
              <i className="fas fa-info-circle mr-2"></i>
              {_('You are good to go!')}
            </Alert>
            <Control label="Enter ID" className="mt-2">
              <Mask mask="999.999.999-99" className="!theme-bc-1" />
            </Control>
            <Control label="Choose a Country" className="mt-2 relative z-50">
              <Country className="!theme-bc-1 text-black" />
            </Control>
            <div className="my-2">
              <Switch ridge checkex rounded label={_('Get Started')} />
            </div>
            <h3 className="border-t theme-bc-3 pt-3 mt-3mt-2 text-xl font-bold uppercase">{_('Results')}</h3>
            <div className="overflow-auto w-full">
              <Table className="mt-2">
                <Thead className="theme-bg-3 text-left text-white" stickyLeft stickyTop>{_('ID')}</Thead>
                <Thead className="theme-bg-3 text-left text-white" wrap3 stickyTop>{_('Name')}</Thead>
                <Thead className="theme-bg-3 text-left text-white" stickyTop>{_('Active')}</Thead>
                <Thead className="theme-bg-3 text-left text-white" wrap2 stickyTop>{_('Created')}</Thead>
                <Thead className="theme-bg-3 text-left text-white" wrap2 stickyTop>{_('Updated')}</Thead>
                <Trow>
                  <Tcol className="theme-bg-1" stickyLeft noWrap>10000101</Tcol>
                  <Tcol className="theme-bg-1" noWrap>John Jacob Jingleheimer Schmidt</Tcol>
                  <Tcol className="theme-bg-1" noWrap>{_('Yes')}</Tcol>
                  <Tcol className="theme-bg-1" noWrap>01 January 2024 12:00 AM</Tcol>
                  <Tcol className="theme-bg-1" noWrap>01 January 2024 12:00 AM</Tcol>
                </Trow>
                <Trow>
                  <Tcol className="theme-bg-2" stickyLeft noWrap>10000102</Tcol>
                  <Tcol className="theme-bg-2" noWrap>Jacob John Jingleheimer Schmidt</Tcol>
                  <Tcol className="theme-bg-2" noWrap>{_('No')}</Tcol>
                  <Tcol className="theme-bg-2" noWrap>02 January 2024 04:00 PM</Tcol>
                  <Tcol className="theme-bg-2" noWrap>04 February 2024 08:22 AM</Tcol>
                </Trow>
                <Trow>
                  <Tcol className="theme-bg-1" stickyLeft noWrap>10000103</Tcol>
                  <Tcol className="theme-bg-1" noWrap>John Jacob Jingleheimer Schmidt</Tcol>
                  <Tcol className="theme-bg-1" noWrap>{_('Yes')}</Tcol>
                  <Tcol className="theme-bg-1" noWrap>01 January 2024 12:00 AM</Tcol>
                  <Tcol className="theme-bg-1" noWrap>01 January 2024 12:00 AM</Tcol>
                </Trow>
                <Trow>
                  <Tcol className="theme-bg-2" stickyLeft noWrap>10000104</Tcol>
                  <Tcol className="theme-bg-2" noWrap>Jacob John Jingleheimer Schmidt</Tcol>
                  <Tcol className="theme-bg-2" noWrap>{_('No')}</Tcol>
                  <Tcol className="theme-bg-2" noWrap>02 January 2024 04:00 PM</Tcol>
                  <Tcol className="theme-bg-2" noWrap>04 February 2024 08:22 AM</Tcol>
                </Trow>
              </Table>
            </div>
          </div>
        </section>
      </main>
    </LayoutHome>
  );
}

export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/"
      title="Frui"
      description="The React Framework for Building Modern Web Apps"
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