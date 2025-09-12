import type { PageProps } from '../../app/types.js';
import { ThemeProvider } from '../../app/theme';
import { ModalProvider } from '../../../components/element/Modal.js';
import Loader from '../../../components/element/Loader.js';

export function Body(props: PageProps) {
  return (
    <div>
      <Loader />
      <Loader show info dashed>
        <div style={{ marginLeft: '10px' }}>Loading...</div>
      </Loader>
      <Loader show warning dotted>
        <div style={{ marginLeft: '10px' }}>Loading...</div>
      </Loader>
      <Loader show error slice={1}>
        <div style={{ marginLeft: '10px' }}>Loading...</div>
      </Loader>
      <Loader show success slice={2}>
        <div style={{ marginLeft: '10px' }}>Loading...</div>
      </Loader>
      <Loader show info slice={3} />
      <Loader show info dashed size={10} speed={2000} thickness={10}>
        <div style={{ marginLeft: '20px' }}>Loading...</div>
      </Loader>
      <Loader show info dashed size={100} speed={10000} thickness={10}>
        <div style={{ marginLeft: '20px', fontSize: '100px' }}>Loading...</div>
      </Loader>
    </div>
  );
}

export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <>
      <title>Stackpress</title>
      <meta name="description" content="Stackpress" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="/styles/global.css" />
      {styles.map((href, index) => (
        <link key={index} rel="stylesheet" type="text/css" href={href} />
      ))}
    </>
  )
};

export default function Page(props: PageProps) {
  return (
    <ThemeProvider>
      <ModalProvider color="salmon" rounded className="text-white">
        <Body {...props} />
      </ModalProvider>
    </ThemeProvider>
  );
};