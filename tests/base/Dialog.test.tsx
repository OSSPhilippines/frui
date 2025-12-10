//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import Dialog, {
  DialogClose,
  DialogContext,
  DialogOverlay,
  useDialog,
  useDialogContext
} from '../../src/base/Dialog';

//--------------------------------------------------------------------//
// Helpers

const HookConsumer = () => {
  const { dialogOpened, handlers } = useDialog({ defaultOpen: false });
  return (
    <div>
      <button onClick={handlers.openDialog}>open</button>
      <span data-testid="status">
        {dialogOpened ? 'open' : 'closed'}
      </span>
    </div>
  );
};

//--------------------------------------------------------------------//
// Tests

describe('<Dialog />', () => {
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

  it('closes when overlay.close = true and overlay clicked', () => {
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
});
describe('<DialogClose />', () => {
  it('calls closeDialog from context and onClose prop', () => {
    const closeDialog = vi.fn();
    const onClose = vi.fn();
    render(
      <DialogContext.Provider
        value={{
          closeDialog,
          dialogOpened: true,
          openDialog: vi.fn()
        }}
      >
        <DialogClose onClose={onClose}>close</DialogClose>
      </DialogContext.Provider>
    );
    fireEvent.click(screen.getByText('close'));
    expect(closeDialog).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
describe('<DialogOverlay />', () => {
  it('renders with default class', () => {
    render(<DialogOverlay>overlay</DialogOverlay>);
    const overlay = screen.getByText('overlay');
    expect(overlay).toHaveClass('frui-dialog-overlay');
  });
});

//--------------------------------------------------------------------//
// Hooks

describe('useDialog()', () => {
  it('toggles open state through handlers', () => {
    render(<HookConsumer />);
    const button = screen.getByText('open');
    const status = screen.getByTestId('status');
    expect(status.textContent).toBe('closed');
    act(() => {
      fireEvent.click(button);
    });
    expect(status.textContent).toBe('open');
  });
});
describe('useDialogContext()', () => {
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
  });
});