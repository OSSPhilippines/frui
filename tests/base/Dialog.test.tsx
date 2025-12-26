//--------------------------------------------------------------------//
// Imports

//frui
import Dialog, {
  DialogClose,
  DialogContext,
  DialogOverlay,
  useDialog,
  useDialogContext
} from '../../src/base/Dialog.js';
//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { 
  afterEach, 
  describe, 
  expect, 
  it, 
  vi 
} from 'vitest';

//--------------------------------------------------------------------//
// Helpers

const HookConsumer = ({
  defaultOpen = false,
  onOpen,
  onClose
}: {
  defaultOpen?: boolean,
  onOpen?: () => void,
  onClose?: () => void
}) => {
  const { dialogOpened, handlers } = useDialog({
    defaultOpen,
    onOpen,
    onClose
  });
  return (
    <div>
      <button onClick={handlers.openDialog}>Open Dialog</button>
      <button onClick={handlers.closeDialog}>Close Dialog</button>
      <span data-testid="status">
        {dialogOpened ? 'open' : 'closed'}
      </span>
    </div>
  );
};

const ControlledHookConsumer = ({
  open,
  onOpen,
  onClose
}: {
  open?: boolean,
  onOpen?: () => void,
  onClose?: () => void
}) => {
  const { dialogOpened } = useDialog({
    open,
    onOpen,
    onClose
  });
  return (
    <span data-testid="status">
      {dialogOpened ? 'open' : 'closed'}
    </span>
  );
};

const PortalConsumer = ({
  append
}: {
  append?: string
}) => {
  const { handlers } = useDialog({ append });
  return (
    <div>
      {handlers.portal(<div>portal content</div>)}
    </div>
  );
};

//--------------------------------------------------------------------//
// Tests

describe('Dialog', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('is closed by default', () => {
    render(<Dialog>body</Dialog>);
    expect(document.querySelector('.frui-dialog')).toBeNull();
  });

  it('shows dialog when open={true}', () => {
    render(<Dialog open>popup</Dialog>);
    expect(screen.getByText('popup')).toBeInTheDocument();
    expect(document.querySelector('.frui-dialog')).toBeInTheDocument();
  });

  it('closes when open toggles to false', () => {
    const { rerender } = render(<Dialog open>test</Dialog>);
    expect(screen.getByText('test')).toBeInTheDocument();
    rerender(<Dialog open={false}>test</Dialog>);
    expect(document.querySelector('.frui-dialog')).toBeNull();
  });

  it('applies custom className and style', () => {
    render(
      <Dialog
        open
        className="custom-class"
        style={{ zIndex: 999 }}
      >
        styled
      </Dialog>
    );
    const dialog = document.querySelector('.frui-dialog');
    expect(dialog).toHaveClass('custom-class');
    expect(dialog).toHaveStyle({ zIndex: 999 });
  });

  it('closes when overlay clicked with close={true}', () => {
    render(
      <Dialog open overlay={{ close: true }}>
        inner
      </Dialog>
    );
    const overlay = document.querySelector('.frui-dialog-overlay');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay as Element);
    expect(document.querySelector('.frui-dialog')).toBeNull();
  });

  it('does not close when overlay clicked without close', () => {
    render(
      <Dialog open overlay={{ close: false }}>
        inner
      </Dialog>
    );
    const overlay = document.querySelector('.frui-dialog-overlay');
    fireEvent.click(overlay as Element);
    expect(
      document.querySelector('.frui-dialog')
    ).toBeInTheDocument();
  });

  it('does not close when dialog content clicked', () => {
    render(
      <Dialog open overlay={{ close: true }}>
        <div>content</div>
      </Dialog>
    );
    const content = screen.getByText('content');
    fireEvent.click(content);
    expect(
      document.querySelector('.frui-dialog')
    ).toBeInTheDocument();
  });

  it('renders without overlay when overlay={false}', () => {
    render(
      <Dialog open overlay={false}>
        no overlay
      </Dialog>
    );
    expect(screen.getByText('no overlay')).toBeInTheDocument();
    expect(
      document.querySelector('.frui-dialog-overlay')
    ).toBeNull();
  });

  it('renders in portal when append selector provided', () => {
    const container = document.createElement('div');
    container.id = 'portal-root';
    document.body.appendChild(container);

    render(
      <Dialog open append="#portal-root">
        portal content
      </Dialog>
    );

    expect(
      container.querySelector('.frui-dialog')
    ).toBeInTheDocument();
    expect(screen.getByText('portal content')).toBeInTheDocument();
  });

  it('renders without portal when append not found', () => {
    render(
      <Dialog open append="#nonexistent">
        fallback
      </Dialog>
    );
    expect(document.querySelector('.frui-dialog')).toBeNull();
  });

  it('applies overlay props correctly', () => {
    render(
      <Dialog
        open
        overlay={{
          className: 'custom-overlay',
          absolute: true
        }}
      >
        test
      </Dialog>
    );
    const overlay = document.querySelector('.frui-dialog-overlay');
    expect(overlay).toHaveClass('custom-overlay');
    expect(overlay).toHaveClass('frui-absolute');
    expect(overlay).not.toHaveClass('frui-fixed');
  });

  it('uses fixed position by default for overlay', () => {
    render(<Dialog open>test</Dialog>);
    const overlay = document.querySelector('.frui-dialog-overlay');
    expect(overlay).toHaveClass('frui-fixed');
  });

  it('passes through HTML attributes', () => {
    render(
      <Dialog open data-testid="dialog-el" aria-label="modal">
        test
      </Dialog>
    );
    const dialog = screen.getByTestId('dialog-el');
    expect(dialog).toHaveAttribute('aria-label', 'modal');
  });
});

describe('DialogClose', () => {
  it('calls closeDialog from context', () => {
    const closeDialog = vi.fn();
    render(
      <DialogContext.Provider
        value={{
          closeDialog,
          dialogOpened: true,
          openDialog: vi.fn()
        }}
      >
        <DialogClose>close</DialogClose>
      </DialogContext.Provider>
    );
    fireEvent.click(screen.getByText('close'));
    expect(closeDialog).toHaveBeenCalled();
  });

  it('calls onClose prop when clicked', () => {
    const onClose = vi.fn();
    render(
      <DialogContext.Provider
        value={{
          closeDialog: vi.fn(),
          dialogOpened: true,
          openDialog: vi.fn()
        }}
      >
        <DialogClose onClose={onClose}>close</DialogClose>
      </DialogContext.Provider>
    );
    fireEvent.click(screen.getByText('close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('applies custom className and style', () => {
    render(
      <DialogContext.Provider
        value={{
          closeDialog: vi.fn(),
          dialogOpened: true,
          openDialog: vi.fn()
        }}
      >
        <DialogClose
          className="custom"
          style={{ padding: '10px' }}
        >
          close
        </DialogClose>
      </DialogContext.Provider>
    );
    const closeBtn = screen.getByText('close');
    expect(closeBtn).toHaveClass('frui-dialog-close');
    expect(closeBtn).toHaveClass('custom');
    expect(closeBtn).toHaveStyle({ padding: '10px' });
  });
});

describe('DialogOverlay', () => {
  it('renders with default fixed class', () => {
    render(
      <DialogContext.Provider
        value={{
          closeDialog: vi.fn(),
          dialogOpened: true,
          openDialog: vi.fn()
        }}
      >
        <DialogOverlay>overlay</DialogOverlay>
      </DialogContext.Provider>
    );
    const overlay = screen.getByText('overlay');
    expect(overlay).toHaveClass('frui-dialog-overlay');
    expect(overlay).toHaveClass('frui-fixed');
  });

  it('uses absolute position when absolute={true}', () => {
    render(
      <DialogContext.Provider
        value={{
          closeDialog: vi.fn(),
          dialogOpened: true,
          openDialog: vi.fn()
        }}
      >
        <DialogOverlay absolute>overlay</DialogOverlay>
      </DialogContext.Provider>
    );
    const overlay = screen.getByText('overlay');
    expect(overlay).toHaveClass('frui-absolute');
    expect(overlay).not.toHaveClass('frui-fixed');
  });

  it('closes dialog when clicked with close={true}', () => {
    const closeDialog = vi.fn();
    render(
      <DialogContext.Provider
        value={{
          closeDialog,
          dialogOpened: true,
          openDialog: vi.fn()
        }}
      >
        <DialogOverlay close>overlay</DialogOverlay>
      </DialogContext.Provider>
    );
    fireEvent.click(screen.getByText('overlay'));
    expect(closeDialog).toHaveBeenCalled();
  });

  it('does not close when clicked without close prop', () => {
    const closeDialog = vi.fn();
    render(
      <DialogContext.Provider
        value={{
          closeDialog,
          dialogOpened: true,
          openDialog: vi.fn()
        }}
      >
        <DialogOverlay>overlay</DialogOverlay>
      </DialogContext.Provider>
    );
    fireEvent.click(screen.getByText('overlay'));
    expect(closeDialog).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(
      <DialogContext.Provider
        value={{
          closeDialog: vi.fn(),
          dialogOpened: true,
          openDialog: vi.fn()
        }}
      >
        <DialogOverlay className="custom">overlay</DialogOverlay>
      </DialogContext.Provider>
    );
    expect(screen.getByText('overlay')).toHaveClass('custom');
  });

  it('passes through HTML attributes', () => {
    render(
      <DialogContext.Provider
        value={{
          closeDialog: vi.fn(),
          dialogOpened: true,
          openDialog: vi.fn()
        }}
      >
        <DialogOverlay data-testid="overlay-el">
          overlay
        </DialogOverlay>
      </DialogContext.Provider>
    );
    expect(screen.getByTestId('overlay-el')).toBeInTheDocument();
  });
});

describe('useDialog', () => {
  it('starts closed by default', () => {
    render(<HookConsumer />);
    expect(screen.getByTestId('status').textContent).toBe('closed');
  });

  it('toggles open state through openDialog handler', () => {
    render(<HookConsumer />);
    const button = screen.getByText('Open Dialog');
    const status = screen.getByTestId('status');
    expect(status.textContent).toBe('closed');
    act(() => {
      fireEvent.click(button);
    });
    expect(status.textContent).toBe('open');
  });

  it('toggles closed state through closeDialog handler', () => {
    render(<HookConsumer defaultOpen={true} />);
    const button = screen.getByText('Close Dialog');
    const status = screen.getByTestId('status');
    expect(status.textContent).toBe('open');
    act(() => {
      fireEvent.click(button);
    });
    expect(status.textContent).toBe('closed');
  });

  it('respects controlled open prop', () => {
    const { rerender } = render(
      <ControlledHookConsumer open={false} />
    );
    expect(screen.getByTestId('status').textContent).toBe('closed');
    rerender(<ControlledHookConsumer open={true} />);
    expect(screen.getByTestId('status').textContent).toBe('open');
  });

  it('triggers onOpen callback', async () => {
    const onOpen = vi.fn();
    const { rerender } = render(
      <ControlledHookConsumer open={false} onOpen={onOpen} />
    );
    rerender(
      <ControlledHookConsumer open={true} onOpen={onOpen} />
    );
    await waitFor(() => {
      expect(onOpen).toHaveBeenCalled();
    });
  });

  it('triggers onClose callback', async () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <ControlledHookConsumer open={true} onClose={onClose} />
    );
    rerender(
      <ControlledHookConsumer open={false} onClose={onClose} />
    );
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('does not trigger onClose on first render', () => {
    const onClose = vi.fn();
    render(<HookConsumer defaultOpen={false} onClose={onClose} />);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not reclose if already closed', () => {
    render(<HookConsumer />);
    const button = screen.getByText('Close Dialog');
    act(() => {
      fireEvent.click(button);
    });
    expect(screen.getByTestId('status').textContent).toBe('closed');
  });

  it('returns portal when append selector exists', () => {
    const container = document.createElement('div');
    container.id = 'test-portal';
    document.body.appendChild(container);

    render(<PortalConsumer append="#test-portal" />);
    expect(
      container.querySelector('div')?.textContent
    ).toBe('portal content');
  });

  it('returns null when append selector not found', () => {
    render(<PortalConsumer append="#nonexistent" />);
    expect(document.body.textContent).toBe('');
  });
});

describe('useDialogContext', () => {
  it('returns context values', () => {
    const ctxValue = {
      closeDialog: vi.fn(),
      dialogOpened: true,
      openDialog: vi.fn()
    };
    let result: ReturnType<typeof useDialogContext> | undefined;
    const Demo = () => {
      result = useDialogContext();
      return null;
    };
    render(
      <DialogContext.Provider value={ctxValue}>
        <Demo />
      </DialogContext.Provider>
    );
    expect(result?.dialogOpened).toBe(true);
    expect(result?.closeDialog).toBe(ctxValue.closeDialog);
    expect(result?.openDialog).toBe(ctxValue.openDialog);
  });

  it('returns default context when no provider', () => {
    let result: ReturnType<typeof useDialogContext> | undefined;
    const Demo = () => {
      result = useDialogContext();
      return null;
    };
    render(<Demo />);
    expect(result?.dialogOpened).toBe(false);
    expect(typeof result?.closeDialog).toBe('function');
    expect(typeof result?.openDialog).toBe('function');
  });
});