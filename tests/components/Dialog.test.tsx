// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'

import {
  Dialog,
  DialogClose,
  DialogContext,
  DialogOverlay,
  DialogProvider,
  DialogProviderContext,
  useDialog,
  useDialogContext,
} from '../../components/Dialog'

// -------------------------------------------------------------------
// Helper component for hook testing
// -------------------------------------------------------------------
const HookConsumer = () => {
  const { dialogOpened, handlers } = useDialog({ defaultOpen: false })
  return (
    <div>
      <button onClick={handlers.openDialog}>open</button>
      <span data-testid="status">{dialogOpened ? 'open' : 'closed'}</span>
    </div>
  )
}

// -------------------------------------------------------------------
// Component Tests
// -------------------------------------------------------------------
describe('<Dialog />', () => {
  it('closes when open toggles to false', () => {
    const { rerender } = render(
      <DialogProvider>
        <Dialog open>body</Dialog>
      </DialogProvider>
    )
    expect(screen.getByText('body')).toBeInTheDocument()
    rerender(
      <DialogProvider>
        <Dialog open={false}>body</Dialog>
      </DialogProvider>
    )
    expect(document.querySelector('.frui-dialog')).toBeNull()
  })

  it('closes when overlay.close = true and overlay clicked', () => {
    render(
      <DialogProvider>
        <Dialog open overlay={{ close: true }}>
          popup
        </Dialog>
      </DialogProvider>
    )
    fireEvent.click(document.querySelector('.frui-dialog-overlay')!)
    expect(document.querySelector('.frui-dialog')).toBeNull()
  })

  it('is closed by default', () => {
    render(
      <DialogProvider>
        <Dialog>content</Dialog>
      </DialogProvider>
    )
    expect(document.querySelector('.frui-dialog')).toBeNull()
  })

  it('shows dialog when open={true}', () => {
    render(
      <DialogProvider>
        <Dialog open>inside</Dialog>
      </DialogProvider>
    )
    expect(screen.getByText('inside')).toBeInTheDocument()
  })
})

describe('<DialogClose />', () => {
  it('calls context.closeDialog and its onClose prop', () => {
    const closeDialog = vi.fn()
    const onClose = vi.fn()
    render(
      <DialogProviderContext.Provider value={{ containerId: 'dialog-root' }}>
        <DialogContext.Provider value={{ closeDialog, dialogOpened: true, openDialog: vi.fn() }}>
          <DialogClose onClose={onClose}>close</DialogClose>
        </DialogContext.Provider>
      </DialogProviderContext.Provider>
    )
    fireEvent.click(screen.getByText('close'))
    expect(closeDialog).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })
})

describe('<DialogOverlay />', () => {
  it('renders children with correct base class', () => {
    render(<DialogOverlay>overlay</DialogOverlay>)
    expect(screen.getByText('overlay')).toHaveClass('frui-dialog-overlay')
  })
})

describe('<DialogProvider />', () => {
  it('renders #dialog-root container with correct class', () => {
    render(<DialogProvider>child</DialogProvider>)
    const container = document.getElementById('dialog-root')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('frui-dialog-container')
  })
})

describe('Hooks', () => {
  it('useDialog toggles dialogOpened when handlers used', () => {
    render(
      <DialogProviderContext.Provider value={{ containerId: 'dialog-root' }}>
        <HookConsumer />
      </DialogProviderContext.Provider>
    )
    const status = screen.getByTestId('status')
    const btn = screen.getByText('open')
    expect(status).toHaveTextContent('closed')
    act(() => fireEvent.click(btn))
    expect(status).toHaveTextContent('open')
  })

  it('useDialogContext merges provider and dialog contexts', () => {
    let captured: unknown
    const Demo = () => {
      captured = useDialogContext()
      return null
    }
    const dialogCtx = {
      closeDialog: vi.fn(),
      dialogOpened: true,
      openDialog: vi.fn(),
    }
    render(
      <DialogProviderContext.Provider value={{ containerId: 'root-id' }}>
        <DialogContext.Provider value={dialogCtx}>
          <Demo />
        </DialogContext.Provider>
      </DialogProviderContext.Provider>
    )
    expect(captured.containerId).toBe('root-id')
    expect(captured.dialogOpened).toBe(true)
  })
})