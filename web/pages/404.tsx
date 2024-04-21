//hooks
import { useRouter } from 'next/router';
import { useLanguage } from 'r22n';
//components
import Button from 'frui/dist/Button';
import { LayoutHome } from 'modules/theme';

export default function Page() {
  //hooks
  const router = useRouter();
  const { _ } = useLanguage();
  return (
    <LayoutHome 
      uri="/404"
      title="Page Not Found"
      description="FRUI is a suite of free react components you can use without the commitments."
    >
      <main className="max-w-lg m-auto flex flex-col h-full relative justify-center items-center">
        <div className="p-8 bg-b2 w-full overflow-auto text-center mb-4">
          <h1 className="text-2xl mb-4">
            {_('Page Not Found')}
          </h1>
          <p>
            {_('Sorry the page you are looking for is not available.')}
          </p>
          <Button info className="mt-4" onClick={() => router.back()}>
            {_('Go Back')}
          </Button>
        </div>
      </main>
    </LayoutHome>
  );
}