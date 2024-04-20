//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Crumbs from 'modules/components/Crumbs';
import { LayoutPanel } from 'modules/theme';
import Loader from 'frui/dist/Loader';
import Code, { InlineCode as C } from 'modules/components/Code';

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Loader' }
  ];
  //render
  return (
    <LayoutPanel>
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow px-3 pt-3 pb-5 overflow-auto">
          <h1 className="flex items-center uppercase font-bold text-xl">
            {_('Loader')}
          </h1>
          <p className="py-4">
            <Translate>
              By default, loaders wont show until <C value="show" /> is 
              set to <C value="true" />.
            </Translate>
          </p>
          <div className="curved overflow-hidden">
            <div className="flex items-center justify-center p-3 bg-b1">
              <Loader show={true} />
            </div>
            <Code language="typescript">
              {`<Loader show={true} />`}
            </Code>
          </div>

          <h2 className="uppercase font-bold text-lg mt-8">
            {_('Custom Color')}
          </h2>
          <p className="py-4">
            <Translate>
              Loaders can have custom CSS compatible colors which 
              includes hex and color names.
            </Translate>
          </p>
          <div className="curved overflow-hidden">
            <div className="flex items-center justify-center p-3 bg-b1">
              <Loader show={true} color="salmon" />
            </div>
            <Code language="typescript">
              {`<Loader show={true} color="salmon" />`}
            </Code>
          </div>

          <h2 className="uppercase font-bold text-lg mt-8">
            {_('Custom Styles')}
          </h2>
          <p className="py-4">
            <Translate>
              You can add your own custom class to the loader component 
              or use the <C value="frui-loader" /> CSS class.
            </Translate>
          </p>

          <div className="flex items-center border-t border-b2 mt-8 pt-4">
            <Link className="text-t2" href="/component/button">
              <i className="fas fa-arrow-left mr-2"></i>
              {_('Buttons')}
            </Link>
            <div className="flex-grow"></div>
            <Link className="text-t2" href="/component/modal">
              {_('Modals')}
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
