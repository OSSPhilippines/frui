//modules
import { R22nProvider } from 'r22n';
//frui
import type { ChildrenProps } from 'components/types.js';
import Notifier from 'components/element/Notifier.js';
import Dialog from 'components/element/Dialog.js';
//plugins
import { useTheme } from '../theme/hooks.js';
import ThemeProvider from '../theme/ThemeProvider.js';

export function DialogProvider({ children }: ChildrenProps) {
  const { theme, mode } = useTheme();
  return (
    <Dialog.Provider className={`${theme}-${mode}`}>
      {children}
    </Dialog.Provider>
  );
};

export default function LayoutProvider(props: ChildrenProps) {
  const { children } = props;
  //TODO: add r22n locale provider
  return (
    <ThemeProvider>
      <R22nProvider>
        <Notifier.Provider>
          <DialogProvider>
            {children}
          </DialogProvider>
        </Notifier.Provider>
      </R22nProvider>
    </ThemeProvider>
  );
};