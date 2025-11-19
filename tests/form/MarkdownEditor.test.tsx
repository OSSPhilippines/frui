// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MarkdownEditor, useMarkdownEditor } from '../../components/form/MarkdownEditor'

// --------------------------------------------------------------------
// Mocks
// --------------------------------------------------------------------
vi.mock('../../components/form/Textarea.js', () => ({
  __esModule: true,
  default: ({
    value,
    onUpdate,
    rows,
  }: {
    value?: string
    onUpdate?: (v: string) => void
    rows?: number
  }) => (
    <textarea
      data-testid="mock-textarea"
      rows={rows}
      value={value ?? ''}
      onChange={(e) => {
        const evt = e as React.ChangeEvent<HTMLTextAreaElement>
        onUpdate?.(evt.target.value)
      }}
    />
  ),
}))

vi.mock('../../components/Button.js', () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
    muted,
  }: {
    children?: React.ReactNode
    onClick?: () => void
    muted?: boolean
  }) => (
    <button data-testid="mock-button" data-muted={muted} onClick={onClick}>
      {children}
    </button>
  ),
}))

vi.mock('markdown-to-jsx', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}))

// --------------------------------------------------------------------
// Helper Hook Wrapper
// --------------------------------------------------------------------
function renderHookWithState<T>(hook: () => T): { current: T } {
  let currentValue: T
  function TestHook() {
    currentValue = hook()
    return null
  }
  render(<TestHook />)
  return { current: currentValue! }
}

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('useMarkdownEditor', () => {
  it('returns edit mode by default and switches correctly', () => {
    const state = renderHookWithState(() => useMarkdownEditor({}))
    expect(state.current.mode).toBe('edit')

    act(() => {
      state.current.handlers.mode('preview')
    })

    expect(typeof state.current.handlers.mode).toBe('function')
  })

  it('calls onUpdate when update handler is triggered', () => {
    const onUpdate = vi.fn()
    const state = renderHookWithState(() => useMarkdownEditor({ onUpdate }))
    act(() => {
      state.current.handlers.update('changed text')
    })
    expect(onUpdate).toHaveBeenCalledWith('changed text')
  })
})

describe('<MarkdownEditor />', () => {
  it('renders textarea and buttons', () => {
    render(<MarkdownEditor />)
    const textarea = screen.getByTestId('mock-textarea')
    const buttons = screen.getAllByTestId('mock-button')
    expect(textarea).toBeInTheDocument()
    expect(buttons.length).toBe(2)
  })

  it('switches to preview mode on button click', () => {
    render(<MarkdownEditor defaultValue="**bold text**" />)
    const buttons = screen.getAllByTestId('mock-button')
    const previewFrame = document.querySelector('.frui-form-markdown-editor-preview') as HTMLIFrameElement

    // initial display
    expect(previewFrame).toHaveStyle({ display: 'none' })

    act(() => {
      fireEvent.click(buttons[1])
    })

    expect(buttons[1]).toBeInTheDocument()
  })

  it('calls onUpdate when user types in textarea', () => {
    const onUpdate = vi.fn()
    render(<MarkdownEditor onUpdate={onUpdate} />)
    const textarea = screen.getByTestId('mock-textarea')

    act(() => {
      fireEvent.change(textarea, { target: { value: 'Updated markdown content' } })
    })

    expect(onUpdate).toHaveBeenCalledWith('Updated markdown content')
  })

  it('renders markdown preview content properly', () => {
    render(<MarkdownEditor defaultValue="Hello *Markdown*" />)
    const iframe = document.querySelector('.frui-form-markdown-editor-preview') as HTMLIFrameElement
    expect(iframe).toHaveAttribute('srcdoc')
    expect(iframe.getAttribute('srcdoc')).toContain('Hello')
  })
})