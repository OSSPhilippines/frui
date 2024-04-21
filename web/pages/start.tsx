//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useState } from 'react';
import { useLanguage } from 'r22n';
//components
import { Translate } from 'r22n';
import Crumbs from 'modules/components/Crumbs';
import Code from 'modules/components/Code';
import Terminal from 'modules/components/Terminal';
import { LayoutPanel } from 'modules/theme';

export default function Page() {
  //hooks
  const { _ } = useLanguage();
  const [ install, setInstall ] = useState('npm');
  //variables
  const crumbs: Crumb[] = [
    { icon: 'compass', label: 'Getting Started' }
  ];
  //render
  return (
    <LayoutPanel 
      uri="/start"
      title="Getting Started"
      description="Learn how to install and easily setup FRUI, a suite of free react components."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow px-3 pt-3 pb-5 overflow-auto">
          <h1 className="flex items-center uppercase font-bold text-xl">
            {_('Getting Started')}
          </h1>
          <p className="my-3">
            <Translate>
              To use FRUI in your project, run one of the 
              following commands in your terminal:
            </Translate>
          </p>
          <div className="rounded-md overflow-auto">
            <header className="bg-b1">
              <span 
                className={`inline-block py-1 px-6 ${install === 'npm' ? 'bg-b2' : 'bg-b1'}`}
                onClick={() => setInstall('npm')}
              >
                <i className="fab fa-npm text-2xl"></i>
              </span>
              <span 
                className={`inline-block py-1 px-6 ${install === 'yarn' ? 'bg-b2' : 'bg-b1'}`}
                onClick={() => setInstall('yarn')}
              >
                <i className="fab fa-yarn text-2xl"></i>
              </span>
            </header>
            <Terminal className={install === 'npm' ? '': 'hidden'}>
              npm install frui
            </Terminal> 
            <Terminal className={install === 'yarn' ? '': 'hidden'}>
              yarn add frui
            </Terminal> 
          </div>
          <h2 className="flex items-center uppercase font-bold text-lg mt-4">
            {_('Peer Dependencies')}
          </h2>
          <p className="my-3">
            <Translate>
              Please note that <a 
                className="text-t-info"
                href="https://www.npmjs.com/package/react" 
                target="_blank"
              >react</a> and <a 
                className="text-t-info"
                href="https://www.npmjs.com/package/react-dom" 
                target="_blank"
              >react-dom</a> are peer dependencies, 
              meaning you should ensure they are installed before 
              installing FRUI.
            </Translate>
          </p>
          <Code language="json">{JSON.stringify({
            "peerDependencies": {
              "react": "^18.0.0",
              "react-dom": "^18.0.0"
            }
          }, null, 2)}</Code>
          <h2 className="flex items-center uppercase font-bold text-lg mt-4">
            {_('Add FRUI to Your CSS')}
          </h2>
          <p className="py-3">
            <Translate>
              Add FRUI to your css file by importing the 
              following line:
            </Translate>
          </p>
          <Code language="css">{`@import url('frui/frui.css')`}</Code>
          <h2 className="flex items-center uppercase font-bold text-lg mt-4">
            {_('Icons')}
          </h2>
          <p className="py-3">
            <Translate>
              You can use any icon library you like, but a lot of the 
              examples in this documentation uses <a 
                href="https://fontawesome.com/" 
                target="_blank" 
                className="text-t-info"
              >Font Awesome</a>. You can add it to your css by importing
              the following line:
            </Translate>
          </p>
          <Code language="css">{
            `@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css")`
          }</Code>

          <h2 className="flex items-center uppercase font-bold text-lg mt-4">
            {_('Style Engine')}
          </h2>
          <p className="py-3">
            <Translate>
              You can use any style engine you like (or none at all), 
              but a lot of the examples in this documentation uses <a 
                href="https://tailwindcss.com/docs/installation" 
                target="_blank" 
                className="text-t-info"
              >Tailwind CSS</a>. 
            </Translate>
          </p>
        </div>
      </main>
    </LayoutPanel>
  );
}
