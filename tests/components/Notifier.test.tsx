// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { toast } from 'react-toastify'
import {
  configure,
  cookie,
  defaults,
  dismiss,
  flash,
  Notifier,
  NotifierContext,
  NotifierProvider,
  notify,
  unload,
  useNotifier,
} from '../../components/Notifier'

// -------------------------------------------------------------------
// Mock external libraries
// -------------------------------------------------------------------
vi.mock('react-toastify', () => ({
  __esModule: true,
  ToastContainer: () => <div data-testid="toast-container" />,
  toast: {
    dismiss: vi.fn(),
    error: vi.fn(() => 'toast-id'),
    info: vi.fn(() => 'toast-id'),
    success: vi.fn(() => 'toast-id'),
    warn: vi.fn(() => 'toast-id'),
  },
}))

vi.mock('universal-cookie', () => ({
  __esModule: true,
  default: class {
    get = vi.fn()
    remove = vi.fn()
    set = vi.fn()
  },
}))

// -------------------------------------------------------------------
// Lifecycle hooks
// -------------------------------------------------------------------
beforeEach(() => vi.clearAllMocks())
afterEach(() => vi.restoreAllMocks())

// -------------------------------------------------------------------
// Component Tests
// -------------------------------------------------------------------
describe('<Notifier />', () => {
  it('calls notify on mount and dismiss on unmount', async () => {
    const { unmount } = render(<Notifier info>Hello</Notifier>)
    await waitFor(() => expect(vi.mocked(toast.info)).toHaveBeenCalled())
    unmount()
    await waitFor(() => expect(vi.mocked(toast.dismiss)).toHaveBeenCalled())
  })
})

describe('<NotifierProvider />', () => {
  it('renders children and ToastContainer', async () => {
    render(
      <NotifierProvider>
        <button>Child</button>
      </NotifierProvider>
    )
    expect(screen.getByText('Child')).toBeInTheDocument()
    expect(screen.getByTestId('toast-container')).toBeInTheDocument()
  })
})

describe('configure()', () => {
  it('merges custom options with defaults', () => {
    const result = configure({ name: 'custom', path: '/x' })
    expect(result.name).toBe('custom')
    expect(result.cookie.path).toBe('/x')
  })
})

describe('dismiss()', () => {
  it('calls toast.dismiss with provided key', () => {
    dismiss('key')
    expect(vi.mocked(toast.dismiss)).toHaveBeenCalledWith('key')
  })
})

describe('flash()', () => {
  it('uses global cookie.set with payload', () => {
    flash('info', 'Hi', { name: 'flash' })
    expect(vi.mocked(cookie.set)).toHaveBeenCalledTimes(1)
    const [name, value] = vi.mocked(cookie.set).mock.calls[0]
    expect(name).toBe('flash')
    const parsed = JSON.parse(value as string)
    expect(parsed.type).toBe('info')
    expect(parsed.message).toBe('Hi')
  })
})

describe('notify()', () => {
  it('invokes correct toast methods', () => {
    notify('info', 'i')
    notify('success', 's')
    notify('error', 'e')
    notify('warning', 'w')
    expect(vi.mocked(toast.info)).toHaveBeenCalled()
    expect(vi.mocked(toast.success)).toHaveBeenCalled()
    expect(vi.mocked(toast.error)).toHaveBeenCalled()
    expect(vi.mocked(toast.warn)).toHaveBeenCalled()
  })
})

describe('unload()', () => {
  it('removes cookie and triggers toast', () => {
    vi.mocked(cookie.get).mockReturnValue(
      JSON.stringify({ type: 'info', message: 'Hi', config: {} })
    )
    unload()
    expect(vi.mocked(cookie.get)).toHaveBeenCalled()
    expect(vi.mocked(cookie.remove)).toHaveBeenCalled()
    expect(vi.mocked(toast.info)).toHaveBeenCalled()
  })

  it('returns null when no cookie value', () => {
    vi.mocked(cookie.get).mockReturnValue(undefined)
    const result = unload()
    expect(result).toBeNull()
    expect(vi.mocked(cookie.get)).toHaveBeenCalled()
  })
})

describe('useNotifier()', () => {
  it('provides notifier API', () => {
    let api: unknown
    const Demo = () => {
      api = useNotifier()
      return null
    }
    render(
      <NotifierContext.Provider value={defaults}>
        <Demo />
      </NotifierContext.Provider>
    )
    expect(api.config.name).toBe(defaults.name)
    expect(api).toMatchObject({
      dismiss: expect.any(Function),
      flash: expect.any(Function),
      notify: expect.any(Function),
      unload: expect.any(Function),
    })
  })
})