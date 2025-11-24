//--------------------------------------------------------------------//
// Imports
//--------------------------------------------------------------------//
import '@testing-library/jest-dom'
import {
  act,
  fireEvent,
  render,
  screen
} from '@testing-library/react'
import {
  describe,
  expect,
  it,
  vi
} from 'vitest'

//components
import Dialog, {
  DialogClose,
  DialogContext,
  DialogOverlay,
  useDialog,
  useDialogContext
} from '../../components/Dialog'

//--------------------------------------------------------------------//
// Helper Components
//--------------------------------------------------------------------//
const HookConsumer = () => {
  const { dialogOpened, handlers } = useDialog({ defaultOpen: false })
  return (
    <div>
      <button onClick={handlers.openDialog}>open</button>
      <span data-testid="status">
        {dialogOpened ? 'open' : 'closed'}
      </span>
    </div>
  )
}

//--------------------------------------------------------------------//
// <Dialog /> Component Tests
//--------------------------------------------------------------------//
describe('<Dialog />', () => {
  //------------------------------------------------------------------//
  // Default behaviour
  //------------------------------------------------------------------//
  it('is closed by default', () => {
    render(<Dialog>body</Dialog>)
    expect(document.querySelector('.frui-dialog')).toBeNull()
  })

  //------------------------------------------------------------------//
  // Opened state
  //------------------------------------------------------------------//
  it('shows dialog when open={true}', () => {
    render(<Dialog open>popup</Dialog>)
    expect(screen.getByText('popup')).toBeInTheDocument()
    expect(document.querySelector('.frui-dialog')).toBeInTheDocument()
  })

  //------------------------------------------------------------------//
  // Toggle behaviour
  //------------------------------------------------------------------//
  it('closes when open toggles to false', () => {
    const { rerender } = render(<Dialog open>test</Dialog>)
    expect(screen.getByText('test')).toBeInTheDocument()

    //simulate re-render with closed state
    rerender(<Dialog open={false}>test</Dialog>)
    expect(document.querySelector('.frui-dialog')).toBeNull()
  })

  //------------------------------------------------------------------//
  // Overlay click
  //------------------------------------------------------------------//
  it('closes when overlay.close = true and overlay clicked', () => {
    render(
      <Dialog open overlay={{ close: true }}>
        inner
      </Dialog>
    )

    const overlay = document.querySelector(
      '.frui-dialog-overlay'
    ) as HTMLElement
    expect(overlay).toBeInTheDocument()

    fireEvent.click(overlay)
    //if overlay clicked the dialog should close
    expect(document.querySelector('.frui-dialog')).toBeNull()
  })
})

//--------------------------------------------------------------------//
// <DialogClose /> Component Tests
//--------------------------------------------------------------------//
describe('<DialogClose />', () => {
  it('calls closeDialog from context and onClose prop', () => {
    const closeDialog = vi.fn()
    const onClose = vi.fn()

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
    )

    fireEvent.click(screen.getByText('close'))
    expect(closeDialog).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })
})

//--------------------------------------------------------------------//
// <DialogOverlay /> Component Tests
//--------------------------------------------------------------------//
describe('<DialogOverlay />', () => {
  it('renders with default class', () => {
    render(<DialogOverlay>overlay</DialogOverlay>)
    const overlay = screen.getByText('overlay')
    expect(overlay).toHaveClass('frui-dialog-overlay')
  })
})

//--------------------------------------------------------------------//
// Hooks Tests
//--------------------------------------------------------------------//
describe('Hooks', () => {
  //------------------------------------------------------------------//
  // useDialog
  //------------------------------------------------------------------//
  it('useDialog toggles open state through handlers', () => {
    render(<HookConsumer />)

    const button = screen.getByText('open')
    const status = screen.getByTestId('status')

    //initially closed
    expect(status.textContent).toBe('closed')

    //simulate click to open dialog
    act(() => {
      fireEvent.click(button)
    })

    expect(status.textContent).toBe('open')
  })

  //------------------------------------------------------------------//
  // useDialogContext
  //------------------------------------------------------------------//
  it('useDialogContext returns context values', () => {
    const ctxValue = {
      closeDialog: vi.fn(),
      dialogOpened: true,
      openDialog: vi.fn()
    }

    let result: ReturnType<typeof useDialogContext> | undefined

    const Demo = () => {
      result = useDialogContext()
      return null
    }

    render(
      <DialogContext.Provider value={ctxValue}>
        <Demo />
      </DialogContext.Provider>
    )

    //verify context data is returned
    expect(result?.dialogOpened).toBe(true)
    expect(result?.closeDialog).toBe(ctxValue.closeDialog)
  })
})