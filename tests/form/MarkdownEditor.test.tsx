//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent, ReactNode } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import MarkdownEditor, {
  useMarkdownEditor
} from '../../src/form/MarkdownEditor.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Textarea.js', () => ({
  __esModule: true,
  default: ({
    onUpdate,
    rows,
    value
  }: {
    onUpdate?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    rows?: number,
    value?: string
  }) => (
    <textarea
      data-testid="mock-textarea"
      onChange={onUpdate}
      rows={rows}
      value={value ?? ''}
    />
  )
}));

vi.mock('../../src/base/Button.js', () => ({
  __esModule: true,
  default: ({
    children,
    muted,
    onClick
  }: {
    children?: ReactNode,
    muted?: boolean,
    onClick?: () => void
  }) => (
    <button
      data-muted={muted}
      data-testid="mock-button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}));

vi.mock('markdown-to-jsx', () => ({
  __esModule: true,
  default: ({ children }: { children?: ReactNode }) => (
    <div data-testid="mock-markdown">{children}</div>
  )
}));

//--------------------------------------------------------------------//
// Helpers

function renderHookWithState<T>(hook: () => T): { current: T } {
  let currentValue: T;
  function TestHook() {
    currentValue = hook();
    return null;
  }
  render(<TestHook />);
  return { current: currentValue! };
}

//--------------------------------------------------------------------//
// Tests

describe('useMarkdownEditor()', () => {
  it('initializes in edit mode and toggles correctly', () => {
    const state = renderHookWithState(() =>
      useMarkdownEditor({})
    );
    expect(state.current.mode).toBe('edit');
    act(() => state.current.handlers.mode('preview'));
    expect(typeof state.current.handlers.mode).toBe('function');
  });

  it('calls onUpdate when update handler runs', () => {
    const onUpdate = vi.fn();
    const state = renderHookWithState(() =>
      useMarkdownEditor({ onUpdate })
    );
    act(() => state.current.handlers.update('changed text'));
    expect(onUpdate).toHaveBeenCalledWith('changed text');
  });
});

describe('<MarkdownEditor />', () => {
  it('renders textarea and toggle buttons', () => {
    render(<MarkdownEditor />);
    const textarea = screen.getByTestId('mock-textarea');
    const buttons = screen.getAllByTestId('mock-button');
    expect(textarea).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });

  it('switches to preview mode on toggle click', () => {
    render(<MarkdownEditor defaultValue="**bold text**" />);
    const buttons = screen.getAllByTestId('mock-button');
    const previewFrame = document.querySelector(
      '.frui-form-markdown-editor-preview'
    ) as HTMLIFrameElement;
    expect(previewFrame).toHaveStyle({ display: 'none' });
    act(() => {
      fireEvent.click(buttons[ 1 ]);
    });
    expect(previewFrame).toHaveStyle({ display: 'block' });
  });

  it('calls onUpdate when editing content', () => {
    const onUpdate = vi.fn();
    render(<MarkdownEditor onUpdate={onUpdate} />);
    const textarea = screen.getByTestId('mock-textarea');
    act(() => {
      fireEvent.change(textarea, {
        target: { value: 'Updated markdown content' }
      });
    });
    expect(onUpdate).toHaveBeenCalledWith(
      'Updated markdown content'
    );
  });

  it('renders markdown preview content', () => {
    render(<MarkdownEditor defaultValue="Hello *Markdown*" />);
    const iframe = document.querySelector(
      '.frui-form-markdown-editor-preview'
    ) as HTMLIFrameElement;
    expect(iframe).toHaveAttribute('srcdoc');
    expect(iframe.getAttribute('srcdoc')).toContain('Hello');
  });
});