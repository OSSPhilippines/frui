//--------------------------------------------------------------------//
// Imports

//modules
import { toast } from 'react-toastify';

//tests
import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitFor
} from '@testing-library/react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';

//frui
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
  useNotifier
} from '../../src/base/Notifier.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('react-toastify', () => ({
  __esModule: true,
  ToastContainer: () => <div data-testid="toast-container" />,
  toast: {
    dismiss: vi.fn(),
    error: vi.fn(() => 'toast-id'),
    info: vi.fn(() => 'toast-id'),
    success: vi.fn(() => 'toast-id'),
    warn: vi.fn(() => 'toast-id')
  }
}));

vi.mock('universal-cookie', () => ({
  __esModule: true,
  default: class {
    get = vi.fn();
    remove = vi.fn();
    set = vi.fn();
  }
}));

//--------------------------------------------------------------------//
// Tests

describe('Notifier', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('<Notifier />', () => {
    it('calls notify on mount with info type', async () => {
      render(<Notifier info>Hello</Notifier>);
      await waitFor(() => {
        expect(vi.mocked(toast.info)).toHaveBeenCalled();
      });
    });

    it('calls notify on mount with warning type', async () => {
      render(<Notifier warning>Warning</Notifier>);
      await waitFor(() => {
        expect(vi.mocked(toast.warn)).toHaveBeenCalled();
      });
    });

    it('calls notify on mount with error type', async () => {
      render(<Notifier error>Error</Notifier>);
      await waitFor(() => {
        expect(vi.mocked(toast.error)).toHaveBeenCalled();
      });
    });

    it('calls notify on mount with success type', async () => {
      render(<Notifier success>Success</Notifier>);
      await waitFor(() => {
        expect(vi.mocked(toast.success)).toHaveBeenCalled();
      });
    });

    it('defaults to info when no type specified', async () => {
      render(<Notifier>Default</Notifier>);
      await waitFor(() => {
        expect(vi.mocked(toast.info)).toHaveBeenCalled();
      });
    });

    it('calls dismiss on unmount', async () => {
      const { unmount } = render(<Notifier info>Hello</Notifier>);
      await waitFor(() => {
        expect(vi.mocked(toast.info)).toHaveBeenCalled();
      });
      unmount();
      await waitFor(() => {
        expect(vi.mocked(toast.dismiss)).toHaveBeenCalled();
      });
    });

    it('passes options to notify', async () => {
      render(
        <Notifier info autoClose={3000} position="top-right">
          Custom
        </Notifier>
      );
      await waitFor(() => {
        expect(vi.mocked(toast.info)).toHaveBeenCalled();
      });
    });

    it('renders null', () => {
      const { container } = render(<Notifier info>Test</Notifier>);
      expect(container.firstChild).toBeNull();
    });

    it('does not notify when no children', () => {
      render(<Notifier info />);
      expect(vi.mocked(toast.info)).not.toHaveBeenCalled();
    });
  });

  describe('<NotifierProvider />', () => {
    it('renders children and ToastContainer', () => {
      render(
        <NotifierProvider>
          <button>Child</button>
        </NotifierProvider>
      );
      expect(screen.getByText('Child')).toBeInTheDocument();
      expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    });

    it('provides custom config to context', () => {
      let contextValue: any;
      function TestComponent() {
        contextValue = useNotifier();
        return null;
      }
      render(
        <NotifierProvider name="custom-flash" autoClose={8000}>
          <TestComponent />
        </NotifierProvider>
      );
      expect(contextValue.config.name).toBe('custom-flash');
      expect(contextValue.config.toast.autoClose).toBe(8000);
    });
  });

  describe('configure()', () => {
    it('returns defaults when no options provided', () => {
      const result = configure();
      expect(result.name).toBe(defaults.name);
      expect(result.toast.position).toBe(defaults.position);
    });

    it('merges custom options with defaults', () => {
      const result = configure({ name: 'custom', path: '/x' });
      expect(result.name).toBe('custom');
      expect(result.cookie.path).toBe('/x');
    });

    it('separates toast and cookie configs', () => {
      const result = configure({
        autoClose: 3000,
        position: 'top-left',
        domain: '.example.com',
        secure: true
      });
      expect(result.toast.autoClose).toBe(3000);
      expect(result.toast.position).toBe('top-left');
      expect(result.cookie.domain).toBe('.example.com');
      expect(result.cookie.secure).toBe(true);
    });

    it('includes all toast options', () => {
      const result = configure({
        autoClose: 1000,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        rtl: true,
        theme: 'light'
      });
      expect(result.toast.autoClose).toBe(1000);
      expect(result.toast.closeOnClick).toBe(false);
      expect(result.toast.draggable).toBe(false);
      expect(result.toast.hideProgressBar).toBe(true);
      expect(result.toast.pauseOnFocusLoss).toBe(true);
      expect(result.toast.pauseOnHover).toBe(false);
      expect(result.toast.rtl).toBe(true);
      expect(result.toast.theme).toBe('light');
    });

    it('includes all cookie options', () => {
      const expires = new Date('2025-12-31');
      const result = configure({
        domain: '.test.com',
        expires,
        httpOnly: true,
        maxAge: 3600,
        path: '/app',
        partitioned: true,
        priority: 'high',
        sameSite: 'strict',
        secure: true
      });
      expect(result.cookie.domain).toBe('.test.com');
      expect(result.cookie.expires).toBe(expires);
      expect(result.cookie.httpOnly).toBe(true);
      expect(result.cookie.maxAge).toBe(3600);
      expect(result.cookie.path).toBe('/app');
      expect(result.cookie.partitioned).toBe(true);
      expect(result.cookie.priority).toBe('high');
      expect(result.cookie.sameSite).toBe('strict');
      expect(result.cookie.secure).toBe(true);
    });
  });

  describe('dismiss()', () => {
    it('calls toast.dismiss with provided key', () => {
      dismiss('key');
      expect(vi.mocked(toast.dismiss)).toHaveBeenCalledWith('key');
    });

    it('calls toast.dismiss without key', () => {
      dismiss();
      expect(vi.mocked(toast.dismiss)).toHaveBeenCalledWith(undefined);
    });
  });

  describe('flash()', () => {
    it('sets cookie with payload', () => {
      flash('info', 'Hi', { name: 'flash' });
      expect(vi.mocked(cookie.set)).toHaveBeenCalledTimes(1);
      const [ name, value ] = vi.mocked(cookie.set).mock.calls[0];
      expect(name).toBe('flash');
      const parsed = JSON.parse(value as string);
      expect(parsed.type).toBe('info');
      expect(parsed.message).toBe('Hi');
    });

    it('uses default name when not specified', () => {
      flash('success', 'Done');
      const [ name ] = vi.mocked(cookie.set).mock.calls[0];
      expect(name).toBe(defaults.name);
    });

    it('includes custom options in payload', () => {
      flash('warning', 'Alert', { autoClose: 10000 });
      const [ , value ] = vi.mocked(cookie.set).mock.calls[0];
      const parsed = JSON.parse(value as string);
      expect(parsed.config.autoClose).toBe(10000);
    });

    it('uses cookie options for cookie.set', () => {
      flash('info', 'Test', { path: '/custom', secure: true });
      const [ , , options ] = vi.mocked(cookie.set).mock.calls[0];
      expect(options?.path).toBe('/custom');
      expect(options?.secure).toBe(true);
    });
  });

  describe('notify()', () => {
    it('invokes toast.info for info type', () => {
      notify('info', 'Information');
      expect(vi.mocked(toast.info)).toHaveBeenCalledWith(
        'Information',
        expect.any(Object)
      );
    });

    it('invokes toast.success for success type', () => {
      notify('success', 'Success');
      expect(vi.mocked(toast.success)).toHaveBeenCalledWith(
        'Success',
        expect.any(Object)
      );
    });

    it('invokes toast.error for error type', () => {
      notify('error', 'Error');
      expect(vi.mocked(toast.error)).toHaveBeenCalledWith(
        'Error',
        expect.any(Object)
      );
    });

    it('invokes toast.warn for warning type', () => {
      notify('warning', 'Warning');
      expect(vi.mocked(toast.warn)).toHaveBeenCalledWith(
        'Warning',
        expect.any(Object)
      );
    });

    it('returns null for unknown type', () => {
      const result = notify('unknown', 'Message');
      expect(result).toBeNull();
    });

    it('passes options to toast', () => {
      notify('info', 'Test', { autoClose: 2000 });
      expect(vi.mocked(toast.info)).toHaveBeenCalledWith(
        'Test',
        expect.objectContaining({ autoClose: 2000 })
      );
    });

    it('accepts JSX element as message', () => {
      const element = <div>JSX Message</div>;
      notify('info', element);
      expect(vi.mocked(toast.info)).toHaveBeenCalledWith(
        element,
        expect.any(Object)
      );
    });
  });

  describe('unload()', () => {
    it('retrieves cookie and triggers toast', () => {
      vi.mocked(cookie.get).mockReturnValue(
        JSON.stringify({ type: 'info', message: 'Hi', config: {} })
      );
      unload();
      expect(vi.mocked(cookie.get)).toHaveBeenCalled();
      expect(vi.mocked(cookie.remove)).toHaveBeenCalled();
      expect(vi.mocked(toast.info)).toHaveBeenCalled();
    });

    it('handles cookie value as object', () => {
      vi.mocked(cookie.get).mockReturnValue({
        type: 'success',
        message: 'Done',
        config: {}
      });
      unload();
      expect(vi.mocked(toast.success)).toHaveBeenCalledWith(
        'Done',
        expect.any(Object)
      );
    });

    it('returns null when no cookie value', () => {
      vi.mocked(cookie.get).mockReturnValue(undefined);
      const result = unload();
      expect(result).toBeNull();
      expect(vi.mocked(cookie.get)).toHaveBeenCalled();
      expect(vi.mocked(cookie.remove)).not.toHaveBeenCalled();
    });

    it('uses custom name when provided', () => {
      vi.mocked(cookie.get).mockReturnValue(
        JSON.stringify({ type: 'info', message: 'Hi', config: {} })
      );
      unload(undefined, 'custom-name');
      expect(vi.mocked(cookie.get)).toHaveBeenCalledWith('custom-name');
      expect(vi.mocked(cookie.remove)).toHaveBeenCalledWith(
        'custom-name',
        expect.any(Object)
      );
    });

    it('uses cookie options for removal', () => {
      vi.mocked(cookie.get).mockReturnValue(
        JSON.stringify({ type: 'info', message: 'Hi', config: {} })
      );
      unload({ path: '/custom' });
      expect(vi.mocked(cookie.remove)).toHaveBeenCalledWith(
        defaults.name,
        expect.objectContaining({ path: '/custom' })
      );
    });

    it('triggers correct toast type from cookie', () => {
      vi.mocked(cookie.get).mockReturnValue(
        JSON.stringify({ type: 'error', message: 'Failed', config: {} })
      );
      unload();
      expect(vi.mocked(toast.error)).toHaveBeenCalledWith(
        'Failed',
        expect.any(Object)
      );
    });
  });

  describe('useNotifier()', () => {
    it('provides notifier API', () => {
      let api: ReturnType<typeof useNotifier> | undefined;
      function Demo() {
        api = useNotifier();
        return null;
      }
      render(
        <NotifierContext.Provider value={defaults}>
          <Demo />
        </NotifierContext.Provider>
      );
      expect(api!.config.name).toBe(defaults.name);
      expect(api).toMatchObject({
        dismiss: expect.any(Function),
        flash: expect.any(Function),
        notify: expect.any(Function),
        unload: expect.any(Function)
      });
    });

    it('merges context config with defaults', () => {
      let api: ReturnType<typeof useNotifier> | undefined;
      function Demo() {
        api = useNotifier();
        return null;
      }
      render(
        <NotifierContext.Provider value={{ name: 'custom', autoClose: 7000 }}>
          <Demo />
        </NotifierContext.Provider>
      );
      expect(api!.config.name).toBe('custom');
      expect(api!.config.toast.autoClose).toBe(7000);
    });

    it('notify method merges options', () => {
      let api: ReturnType<typeof useNotifier> | undefined;
      function Demo() {
        api = useNotifier();
        return null;
      }
      render(
        <NotifierContext.Provider value={{ autoClose: 5000 }}>
          <Demo />
        </NotifierContext.Provider>
      );
      api!.notify('info', 'Test', { position: 'top-right' });
      expect(vi.mocked(toast.info)).toHaveBeenCalledWith(
        'Test',
        expect.objectContaining({
          autoClose: 5000,
          position: 'top-right'
        })
      );
    });

    it('flash method merges options', () => {
      let api: ReturnType<typeof useNotifier> | undefined;
      function Demo() {
        api = useNotifier();
        return null;
      }
      render(
        <NotifierContext.Provider
          value={{ name: 'test', autoClose: 6000, path: '/app' }}
        >
          <Demo />
        </NotifierContext.Provider>
      );
      api!.flash('info', 'Message', { secure: true });
      const [ name, , options ] = vi.mocked(cookie.set).mock.calls[0];
      expect(name).toBe('test');
      expect(options?.path).toBe('/app');
      expect(options?.secure).toBe(true);
    });

    it('unload method uses context config', () => {
      let api: ReturnType<typeof useNotifier> | undefined;
      function Demo() {
        api = useNotifier();
        return null;
      }
      render(
        <NotifierContext.Provider value={{ name: 'custom-flash' }}>
          <Demo />
        </NotifierContext.Provider>
      );
      vi.mocked(cookie.get).mockReturnValue(
        JSON.stringify({ type: 'info', message: 'Hi', config: {} })
      );
      api!.unload();
      expect(vi.mocked(cookie.get)).toHaveBeenCalledWith('custom-flash');
    });
  });

  describe('exports', () => {
    it('exports Notifier component', () => {
      expect(Notifier).toBeDefined();
    });

    it('exports NotifierProvider', () => {
      expect(NotifierProvider).toBe(NotifierProvider);
    });

    it('exports NotifierContext', () => {
      expect(NotifierContext).toBe(NotifierContext);
    });

    it('exports utility functions', () => {
      expect(notify).toBe(notify);
      expect(flash).toBe(flash);
      expect(unload).toBe(unload);
      expect(dismiss).toBe(dismiss);
    });

    it('exports useNotifier hook', () => {
      expect(useNotifier).toBe(useNotifier);
    });

    it('exports defaults', () => {
      expect(defaults).toBe(defaults);
    });
  });
});