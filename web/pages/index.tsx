//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import Mask from 'frui/field/Mask';
import Country from 'frui/field/Country';
import Switch from 'frui/field/Switch';
import Control from 'frui/element/Control';
import Button from 'frui/element/Button';
import Alert from 'frui/element/Alert';
import Table, { Thead, Trow, Tcol } from 'frui/element/Table';
import { LayoutHome } from 'modules/theme';

export default function Page() {
  const { _ } = useLanguage();
  return (
    <LayoutHome 
      uri=""
      title="Free ReactJS UI - FRUI"
      description="FRUI is a suite of free react components you can use without the commitments."
    >
      <main className="border-t border-b1 w-full h-full">
        <section className="md:flex items-center border-b1 border-y h-full">
          <div className="basis-1/2 px-8 h-full flex flex-col justify-center text-center">
            <h1 className="font-bold text-4xl uppercase">
              {_('Just React Components')}
            </h1>
            <p className="my-4">
              {_('No layouts, no grids, no themes, no style engine, no design system. FRUI offers a comprehensive suite of free react components to use without the commitments.')}
            </p>
            <Link href="/start">
              <Button curved info xl2 className="!px-24">
                {_('Get Started')}
              </Button>
            </Link>
          </div>
          <div className="basis-1/2 pt-3 px-3 hidden md:flex flex-col justify-center bg-b1 border-b1 border-l w-full h-full overflow-hidden">
            <Alert curved info>
              <i className="fas fa-info-circle mr-2"></i>
              {_('You are good to go!')}
            </Alert>
            <Control label="Enter ID" className="mt-2">
              <Mask mask="999.999.999-99" className="!border-b1" />
            </Control>
            <Control label="Choose a Country" className="mt-2 relative z-50">
              <Country className="!border-b1 text-black" />
            </Control>
            <div className="my-2">
              <Switch ridge checkex rounded label={_('Get Started')} />
            </div>
            <h3 className="border-t border-b3 pt-3 mt-3mt-2 text-xl font-bold uppercase">{_('Results')}</h3>
            <div className="overflow-auto w-full">
              <Table className="mt-2">
                <Thead className="bg-b3 text-left text-white" stickyLeft stickyTop>{_('ID')}</Thead>
                <Thead className="bg-b3 text-left text-white" wrap3 stickyTop>{_('Name')}</Thead>
                <Thead className="bg-b3 text-left text-white" stickyTop>{_('Active')}</Thead>
                <Thead className="bg-b3 text-left text-white" wrap2 stickyTop>{_('Created')}</Thead>
                <Thead className="bg-b3 text-left text-white" wrap2 stickyTop>{_('Updated')}</Thead>
                <Trow>
                  <Tcol className="bg-b1" stickyLeft noWrap>10000101</Tcol>
                  <Tcol className="bg-b1" noWrap>John Jacob Jingleheimer Schmidt</Tcol>
                  <Tcol className="bg-b1" noWrap>{_('Yes')}</Tcol>
                  <Tcol className="bg-b1" noWrap>01 January 2024 12:00 AM</Tcol>
                  <Tcol className="bg-b1" noWrap>01 January 2024 12:00 AM</Tcol>
                </Trow>
                <Trow>
                  <Tcol className="bg-b2" stickyLeft noWrap>10000102</Tcol>
                  <Tcol className="bg-b2" noWrap>Jacob John Jingleheimer Schmidt</Tcol>
                  <Tcol className="bg-b2" noWrap>{_('No')}</Tcol>
                  <Tcol className="bg-b2" noWrap>02 January 2024 04:00 PM</Tcol>
                  <Tcol className="bg-b2" noWrap>04 February 2024 08:22 AM</Tcol>
                </Trow>
                <Trow>
                  <Tcol className="bg-b1" stickyLeft noWrap>10000103</Tcol>
                  <Tcol className="bg-b1" noWrap>John Jacob Jingleheimer Schmidt</Tcol>
                  <Tcol className="bg-b1" noWrap>{_('Yes')}</Tcol>
                  <Tcol className="bg-b1" noWrap>01 January 2024 12:00 AM</Tcol>
                  <Tcol className="bg-b1" noWrap>01 January 2024 12:00 AM</Tcol>
                </Trow>
                <Trow>
                  <Tcol className="bg-b2" stickyLeft noWrap>10000104</Tcol>
                  <Tcol className="bg-b2" noWrap>Jacob John Jingleheimer Schmidt</Tcol>
                  <Tcol className="bg-b2" noWrap>{_('No')}</Tcol>
                  <Tcol className="bg-b2" noWrap>02 January 2024 04:00 PM</Tcol>
                  <Tcol className="bg-b2" noWrap>04 February 2024 08:22 AM</Tcol>
                </Trow>
              </Table>
            </div>
          </div>
        </section>
      </main>
    </LayoutHome>
  );
}
