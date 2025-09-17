//modules
import type { ReactNode } from 'react';
import { R22nProvider } from 'r22n';
//src
import ThemeProvider from '../theme/ThemeProvider.js';
import { NotifyContainer } from 'components/element/Notify.js';
import { ModalProvider } from 'components/element/Modal.js';

export type LayoutProviderProps = { children: ReactNode };

export default function LayoutProvider(props: LayoutProviderProps) {
  const { children } = props;
  //TODO: add r22n locale provider
  return (
    <ThemeProvider>
      <R22nProvider>
        <ModalProvider className="text-white">
          {children}
          <NotifyContainer />
        </ModalProvider>
      </R22nProvider>
    </ThemeProvider>
  );
};