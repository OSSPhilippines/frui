// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import TextEditor, { useTextEditor } from '../../components/form/TextEditor'

// --------------------------------------------------------------------
// Mocks
// --------------------------------------------------------------------
Object.defineProperty(window, 'getSelection', {
  writable: true,
  value: vi.fn(() => ({
    rangeCount: 0,
    removeAllRanges: vi.fn(),
    addRange: vi.fn(),
    getRangeAt: vi.fn(() => ({
      extractContents: vi.fn(() => document.createDocumentFragment()),
      insertNode: vi.fn(),
      deleteContents: vi.fn(),
      cloneContents: vi.fn(() => document.createDocumentFragment()),
    })),
  })),
})

// Polyfill for execCommand (type-safe)
Object.defineProperty(document, 'execCommand', {
  configurable: true,
  writable: true,
  value: vi.fn(() => true) as unknown as Document['execCommand'],
})

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('useTextEditor', () => {
  const setupHook = (config = {}) => {
    let result: ReturnType<typeof useTextEditor> | undefined
    const TestComponent = () => {
      result = useTextEditor(config)
      return null
    }
    render(<TestComponent />)
    return () => result!
  }

  it('initializes editor with default value', () => {
    const getHook = setupHook({ value: '<p>Hello</p>' })
    const hook = getHook()
    expect(hook.value).toBe('<p>Hello</p>')
  })

  it('calls onUpdate on execCommand calls', () => {
    const onUpdate = vi.fn()
    const getHook = setupHook({ value: 'text', onUpdate })
    const hook = getHook()

    hook.refs.editor.current = document.createElement('div')
    hook.refs.hidden.current = document.createElement('input')
    hook.refs.editor.current.innerHTML = 'sample content'

    act(() => {
      hook.handlers.execCommand('bold')
    })

    expect((document as any).execCommand).toHaveBeenCalledWith('bold', false, undefined)
    expect(onUpdate).toHaveBeenCalled()
  })

  it('runs input handler and triggers onChange/onUpdate', () => {
    const onChange = vi.fn()
    const onUpdate = vi.fn()
    const getHook = setupHook({ onChange, onUpdate })
    const hook = getHook()

    hook.refs.editor.current = document.createElement('div')
    hook.refs.hidden.current = document.createElement('input')
    hook.refs.editor.current.innerHTML = '<p>Typing example</p>'

    act(() => {
      hook.handlers.input()
    })

    expect(onChange).toHaveBeenCalledWith('<p>Typing example</p>')
    expect(onUpdate).toHaveBeenCalled()
  })

  it('switches code view correctly', () => {
    const onChange = vi.fn()
    const onUpdate = vi.fn()
    const getHook = setupHook({ onChange, onUpdate })
    const hook = getHook()
    const refs = hook.refs
    refs.editor.current = document.createElement('div')
    refs.textarea.current = document.createElement('textarea')
    refs.hidden.current = document.createElement('input')

    refs.editor.current.innerHTML = '<p>Some HTML</p>'
    refs.textarea.current.value = '<p>Some HTML</p>'

    act(() => {
      hook.blocks.codeViewToggle()
    })
    expect(onChange).toHaveBeenCalled()
    expect(onUpdate).toHaveBeenCalled()
  })
})

describe('<TextEditor />', () => {
  it('renders correctly with default props', () => {
    render(<TextEditor />)
    const container = document.querySelector('.frui-form-text-editor')
    expect(container).toBeInTheDocument()
    const editable = document.querySelector('.frui-form-text-editor-editable')
    expect(editable).toBeInTheDocument()
  })

  it('renders with RTL direction', () => {
    render(<TextEditor dir="rtl" />)
    const container = document.querySelector('.frui-form-text-editor-rtl')
    expect(container).toBeInTheDocument()
  })

  it('renders toolbar buttons when props enabled', () => {
    render(<TextEditor history font size format paragraph blockquote style color highlight text list />)
    const toolbar = document.querySelector('.frui-form-text-editor-toolbar')
    expect(toolbar).toBeInTheDocument()
    expect(toolbar?.querySelectorAll('button').length).toBeGreaterThan(0)
  })

  it('triggers block actions for basic controls', () => {
    render(<TextEditor style />)
    const boldButton = screen.getByTitle('Bold')
    act(() => {
      fireEvent.click(boldButton)
    })
    expect((document as any).execCommand).toHaveBeenCalledWith('bold', false, undefined)
  })

  it('toggles show blocks class', () => {
    render(<TextEditor showblocks />)
    const button = screen.getByTitle('Show Blocks')
    const editorEl = document.querySelector('.frui-form-text-editor-editable') as HTMLDivElement
    act(() => {
      fireEvent.click(button)
    })
    expect(editorEl.classList.contains('frui-form-text-editor-show-block')).toBe(true)
  })

  it('renders textarea in code view toggle', () => {
    render(<TextEditor code />)
    const button = screen.getByLabelText('Switch to Code View')
    act(() => {
      fireEvent.click(button)
    })
    const textarea = document.querySelector('textarea')
    expect(textarea).toBeInTheDocument()
  })
})