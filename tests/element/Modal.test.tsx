//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
//frui
import Modal, {
  ModalProvider,
  useModal
} from '../../frui/src/element/Modal.js';

//--------------------------------------------------------------------//
// Helpers

function TestComponent() {
  const { open, title, body } = useModal();

  return (
    <div>
      <button
        data-testid="open-modal"
        onClick={() => {
          title('Test Modal');
          body(<div>Test Content</div>);
          open(true);
        }}
      >
        Open Modal
      </button>
      <div data-testid="outside-content">Outside Content</div>
    </div>
  );
}

function renderHookWithModal<T>(hook: () => T) {
  let hookResult: T | undefined;

  function HookTestComponent() {
    hookResult = hook();
    return <div data-testid="hook-render" />;
  }

  render(<HookTestComponent />);
  return () => hookResult!;
}

//--------------------------------------------------------------------//
// Tests

describe('<Modal /> Component', () => {
  describe('Basic Rendering', () => {
    it('renders modal container even when closed', () => {
      render(<Modal>Test Content</Modal>);
      const modal = document.querySelector('.frui-modal');
      expect(modal).toBeInTheDocument();
    });

    it('renders when opened is true', () => {
      render(<Modal opened>Test Content</Modal>);
      const modal = screen.getByText('Test Content');
      expect(modal).toBeInTheDocument();
    });

    it('renders title when provided', () => {
      render(<Modal opened title="Test Title">Content</Modal>);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('applies fixed positioning by default', () => {
      render(<Modal opened>Content</Modal>);
      const modal = 
        screen.getByText('Content').closest('.frui-modal');
      expect(modal).toHaveClass('frui-modal-fixed');
    });

    it('applies absolute positioning if absolute', () => {
      render(<Modal absolute opened>Content</Modal>);
      const modal = 
        screen.getByText('Content').closest('.frui-modal');
      expect(modal).toHaveClass('frui-modal-absolute');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(
        <Modal className="custom-class" opened>Content</Modal>
      );
      const modal = 
        screen.getByText('Content').closest('.frui-modal');
      expect(modal).toHaveClass('custom-class');
    });

    it('applies inline styles', () => {
      render(
        <Modal opened style={{ padding: '20px' }}>Content</Modal>
      );
      const modal = 
        screen.getByText('Content').closest('.frui-modal');
      expect(modal).toHaveStyle({ padding: '20px' });
    });

    it('shows modal with display flex when opened', () => {
      render(
        <Modal opened>Content</Modal>
      );
      const modal = 
        screen.getByText('Content').closest('.frui-modal');
      expect(modal).toHaveStyle({ display: 'flex' });
    });

    it('applies curved border class', () => {
      render(<Modal curved opened>Content</Modal>);
      const overlay = screen
        .getByText('Content')
        .closest('.frui-modal')
        ?.querySelector('.frui-modal-overlay');
      expect(overlay).toHaveClass('frui-curved');
    });

    it('applies rounded border class', () => {
      render(<Modal rounded opened>Content</Modal>);
      const overlay = screen
        .getByText('Content')
        .closest('.frui-modal')
        ?.querySelector('.frui-modal-overlay');
      expect(overlay).toHaveClass('frui-rounded');
    });

    it('applies pill border class', () => {
      render(<Modal pill opened>Content</Modal>);
      const overlay = screen
        .getByText('Content')
        .closest('.frui-modal')
        ?.querySelector('.frui-modal-overlay');
      expect(overlay).toHaveClass('frui-pill');
    });

    it('applies custom header color', () => {
      render(
       <Modal color="#ff0000" opened title="Title">Content</Modal>
      );
      const header = screen
        .getByText('Title')
        .closest('.frui-modal-head');
      expect(header).toHaveStyle({ backgroundColor: '#ff0000' });
    });
  });

  describe('Close Functionality', () => {
    it('renders close button when onClose is provided', () => {
      const onClose = vi.fn();
      render(<Modal onClose={onClose} opened>Content</Modal>);
      const closeButton = screen.getByText('×');
      expect(closeButton).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
      const onClose = vi.fn();
      render(<Modal onClose={onClose} opened>Content</Modal>);
      const closeButton = screen.getByText('×');
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });

    it('no close button if no onClose', () => {
      render(<Modal opened>Content</Modal>);
      const closeButton = screen.queryByText('×');
      expect(closeButton).not.toBeInTheDocument();
    });
  });
});

describe('ModalProvider and useModal', () => {
  it('provides modal context values', () => {
    const getHook = renderHookWithModal(() => useModal());
    const hook = getHook();

    expect(hook).toHaveProperty('title');
    expect(hook).toHaveProperty('body');
    expect(hook).toHaveProperty('open');
    expect(hook).toHaveProperty('round');
    expect(hook).toHaveProperty('color');
    expect(hook).toHaveProperty('className');
  });

  it('renders modal when opened through context', async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    const openButton = screen.getByTestId('open-modal');
    fireEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  it('applies title from context', async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    const openButton = screen.getByTestId('open-modal');
    fireEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });
  });

  it('applies body content from context', async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    const openButton = screen.getByTestId('open-modal');
    fireEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  it('modal remains in DOM after close button click', async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    const openButton = screen.getByTestId('open-modal');
    fireEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    await waitFor(() => {
      const modal = document.querySelector('.frui-modal');
      expect(modal).toBeInTheDocument();
    });
  });
});