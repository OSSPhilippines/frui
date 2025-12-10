//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage } from 'r22n';
//frui
import { Box, Button, Card } from 'src/base/index.js';
import { Scope, When, Otherwise } from 'src/tool/index.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/tool';
const title = 'Tools';
const description = 'Low level utility components and primitives for FRUI.';

//--------------------------------------------------------------------//
// Components

export function ColoredFruit() {
  const { key, value } = Scope.useContext<string, string>();
  return (
    <div>a {value} {key}</div>
  );
};

/**
 * Documentation body component
 */
export function Body() {
  //hooks
  const { _ } = useLanguage();

  const [ step, setStep ] = useState(0);
  const prev = () => setStep(step => Math.max(step - 1, 0));
  const next = () => setStep(step + 1);
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 px-3 pt-3 '
        + 'pb-5 h-full overflow-auto'
    }>
      <h1 className="flex items-center uppercase font-bold text-xl">
        {_('Tools')}
      </h1>
      <div className="flex flex-wrap mt-4">
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/tool/box')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Box info fill pa="md">Info</Box>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Box')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/tool/card')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Card ba="xs" solid bdc="black" left curved pa="2xl">
                <Card.Title h2 bold>Card Title</Card.Title>
                <Card.Description py="2xl">
                  This is a card description.
                </Card.Description>
                <Button info>Action</Button>
              </Card>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Card')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/tool/scope')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <div>
                <Scope hash={{ apple: 'red', banana: 'yellow', cherry: 'red' }}>
                  <ColoredFruit />
                </Scope>
              </div>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Scope')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/tool/when')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <div>
                <div>
                  <Button muted onClick={prev}>Back</Button>
                  <Button info onClick={next}>Next</Button>
                </div>
                <When condition={step === 0}>
                  <div>Get Started. Hit Next.</div>
                  <When condition={step === 1} />
                  <h3>Welcome to Step 1</h3>
                  <p>In this step, we will cover the basics of using the When tool.</p>
                  <When condition={step === 2} />
                  <h3>Welcome to Step 2</h3>
                  <p>In this step, we will cover some advanced features of the When tool.</p>
                  <When condition={step === 3} />
                  <h3>Final Step</h3>
                  <p>Congratulations! You've reached the final step.</p>
                  <Otherwise />
                  <h3>Uh oh....</h3>
                  <p className="theme-error">Looks like you gone too far. Step: {step}</p>
                </When>
              </div>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('When')}
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
