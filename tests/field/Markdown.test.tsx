//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import Markdown, { useMarkdown } from '../../frui/src/field/Markdown.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/field/Textarea.js', () => ({
  __esModule: true,
  default: ({
    rows,
    value,
    defaultValue,
    onUpdate
  }: {
    rows?: number,
    value?: string,
    defaultValue?: string,
    onUpdate?: (value: string) => void
  }) => (
    <textarea
      className="frui-field-textarea"
      rows={rows}
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => onUpdate?.(e.target.value)}
    />
  )
}));

vi.mock('../../frui/src/form/Button.js', () => ({
  __esModule: true,
  default: ({
    children,
    muted,
    onClick
  }: {
    children?: string,
    muted?: boolean,
    onClick?: () => void
  }) => (
    <button
      onClick={onClick}
      data-muted={muted}
      style={{ opacity: muted ? 0.5 : 1 }}
    >
      {children}
    </button>
  )
}));

vi.mock('markdown-to-jsx', () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => (
    <div>{children}</div>
  )
}));

vi.mock('react-dom/server', () => ({
  renderToStaticMarkup: () => '<div>rendered markdown</div>'
}));

//--------------------------------------------------------------------//
// Helpers

function renderHookWithState<T>(hook: () => T) {
  let result: T;
  function TestComponent() {
    result = hook();
    return null;
  }
  const { rerender } = render(<TestComponent />);
  return {
    get current() {
      return result!;
    },
    rerender: () => rerender(<TestComponent />)
  };
}

//--------------------------------------------------------------------//
// Tests

describe('useMarkdown Hook', () => {
  it('initializes in edit mode', () => {
    const hook = renderHookWithState(() => useMarkdown({}));
    expect(hook.current.mode).toBe('edit');
  });

  it('calls onUpdate when update handler is called', () => {
    const onUpdate = vi.fn();
    const hook = renderHookWithState(() => useMarkdown({ onUpdate }));

    act(() => {
      hook.current.handlers.update('test content');
    });
    expect(onUpdate).toHaveBeenCalledWith('test content');
  });

  it('changes mode when mode handler is called', () => {
    const hook = renderHookWithState(() => useMarkdown({}));

    expect(hook.current.mode).toBe('edit');

    act(() => {
      hook.current.handlers.mode('preview');
    });

    hook.rerender();
    expect(hook.current.mode).toBe('preview');
  });
});

describe('<Markdown /> Component', () => {
  it('renders textarea in edit mode by default', () => {
    render(<Markdown />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea.parentElement).toHaveStyle({ display: 'block' });

    const editButton = screen.getByText('✎');
    expect(editButton).toHaveAttribute('data-muted', 'true');
    expect(editButton).toHaveStyle({ opacity: '0.5' });

    const previewButton = screen.getByText('⚎');
    expect(previewButton).toHaveAttribute('data-muted', 'false');
    expect(previewButton).toHaveStyle({ opacity: '1' });
  });

  it('switches to preview mode when preview button clicked', () => {
    render(<Markdown defaultValue="# Test" />);

    const previewButton = screen.getByText('⚎');
    fireEvent.click(previewButton);

    expect(previewButton).toHaveAttribute('data-muted', 'true');
    expect(previewButton).toHaveStyle({ opacity: '0.5' });

    const editButton = screen.getByText('✎');
    expect(editButton).toHaveAttribute('data-muted', 'false');
    expect(editButton).toHaveStyle({ opacity: '1' });

    const iframe = document.querySelector('iframe');
    expect(iframe).toHaveStyle({ display: 'block' });
  });

  it('passes value and defaultValue to textarea', () => {
    const { container: defaultContainer } = render(
      <Markdown defaultValue="test content" />
    );
    const defaultTextarea = defaultContainer.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    expect(defaultTextarea.defaultValue).toBe('test content');

    const { container: valueContainer } = render(
      <Markdown value="controlled content" />
    );
    const valueTextarea = valueContainer.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    expect(valueTextarea.value).toBe('controlled content');
  });

  it('calls onUpdate when textarea changes', () => {
    const onUpdate = vi.fn();
    render(<Markdown onUpdate={onUpdate} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'new content' } });

    expect(onUpdate).toHaveBeenCalledWith('new content');
  });

  it('applies custom rows to textarea', () => {
    render(<Markdown rows={5} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('shows iframe with markdown content in preview mode', () => {
    render(<Markdown defaultValue="# Test" />);

    const previewButton = screen.getByText('⚎');
    fireEvent.click(previewButton);

    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe?.getAttribute('srcdoc')).toBe(
      '<div>rendered markdown</div>'
    );
  });

  it('switches back to edit mode when edit button clicked', () => {
    render(<Markdown defaultValue="# Test" />);

    expect(screen.getByRole('textbox').parentElement).toHaveStyle({
      display: 'block'
    });

    const previewButton = screen.getByText('⚎');
    fireEvent.click(previewButton);

    const iframe = document.querySelector('iframe');
    expect(iframe).toHaveStyle({ display: 'block' });

    const editButton = screen.getByText('✎');
    fireEvent.click(editButton);

    expect(screen.getByRole('textbox').parentElement).toHaveStyle({
      display: 'block'
    });
    expect(iframe).toHaveStyle({ display: 'none' });
    expect(editButton).toHaveAttribute('data-muted', 'true');
  });

  it('renders with children prop', () => {
    render(<Markdown>Children content</Markdown>);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });
});