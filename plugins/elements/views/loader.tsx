import type { PageProps } from '../../app/types.js';
import { LayoutProvider, ThemeHead } from '../../app';
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
  const uri = '/';
  const title  = 'Frui';
  const description = 'The React Framework for Building Modern Web Apps';
  return (
    <ThemeHead
      uri={uri}
      title={title}
      description={description}
      styles={styles}
    />
  );
};

export default function Page(props: PageProps) {
  return (
    <LayoutProvider>
      <Body {...props} />
    </LayoutProvider>
  );
};