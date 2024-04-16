//styles
import 'styles/globals.css';
import 'frui/src/utils/frui.css';
import 'react-toastify/dist/ReactToastify.css';
//types
import type { AppProps } from 'next/app';
//components
import { ThemeProvider } from 'modules/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
