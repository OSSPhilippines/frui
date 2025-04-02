//styles
import 'styles/globals.css';
import 'frui/frui.css';
import 'react-toastify/dist/ReactToastify.css';
//types
import type { AppProps } from 'next/app';
//components
import { ModalProvider } from 'frui/element/Modal';
import { ThemeProvider } from 'modules/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ModalProvider color="salmon" rounded className="text-white">
        <Component {...pageProps} />
      </ModalProvider>
    </ThemeProvider>
  );
}
