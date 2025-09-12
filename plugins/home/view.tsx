//plugins
import type { PageProps } from '../app/types.js';
import ThemeHead from '../app/theme/ThemeHead.js';
import ThemeProvider from '../app/theme/ThemeProvider.js';
import { ModalProvider } from '../../components/element/Modal.js';

export function Body(props: PageProps) {
  return (
    <div>Hello</div>
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