//modules
import type { ReactNode } from 'react';
//src
import ThemeProvider from '../theme/ThemeProvider.js';
import { NotifyContainer } from '../../../components/element/Notify.js';
import { ModalProvider } from '../../../components/element/Modal.js';

export type LayoutProviderProps = { children: ReactNode };

export default function LayoutProvider(props: LayoutProviderProps) {
  const { children } = props;
  return (
    <ThemeProvider>
      <ModalProvider className="text-white">
        {children}
        <NotifyContainer />
      </ModalProvider>
    </ThemeProvider>
  );
};