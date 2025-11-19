// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { act, renderHook } from '@testing-library/react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Textarea, { useTextarea } from '../../components/form/Textarea'
import type { ChangeEvent } from 'react'

// --------------------------------------------------------------------
// Hook Tests
// --------------------------------------------------------------------
describe('useTextarea()', () => {
  it('calls onChange and onUpdate with correct value', () => {
    const changeMock = vi.fn()
    const updateMock = vi.fn()
    const { result } = renderHook(() =>
      useTextarea({ onChange: changeMock, onUpdate: updateMock })
    )

    const mockEvent = { target: { value: 'hello world' } } as unknown as ChangeEvent<HTMLTextAreaElement>
    act(() => result.current.handlers.change(mockEvent))

    expect(changeMock).toHaveBeenCalledWith(mockEvent)
    expect(updateMock).toHaveBeenCalledWith('hello world')
  })

  it('does nothing if callbacks are not provided', () => {
    const { result } = renderHook(() => useTextarea({}))
    const mockEvent = { target: { value: 'test' } } as unknown as ChangeEvent<HTMLTextAreaElement>
    expect(() => {
      act(() => result.current.handlers.change(mockEvent))
    }).not.toThrow()
  })
})

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Textarea />', () => {
  it('renders with base class', () => {
    render(<Textarea />)
    const element = screen.getByRole('textbox')
    expect(element).toHaveClass('frui-form-textarea')
  })

  it('renders with custom class', () => {
    render(<Textarea className="custom-textarea" />)
    const element = screen.getByRole('textbox')
    expect(element).toHaveClass('custom-textarea')
  })

  it('applies error classes when error prop is true', () => {
    render(<Textarea error />)
    const element = screen.getByRole('textbox')
    expect(element).toHaveClass('frui-tx-error', 'frui-bd-error')
  })

  it('calls onUpdate with typed value', () => {
    const updateMock = vi.fn()
    render(<Textarea onUpdate={updateMock} />)
    const element = screen.getByRole('textbox') as HTMLTextAreaElement
    fireEvent.change(element, { target: { value: 'updated value' } })
    expect(updateMock).toHaveBeenCalledWith('updated value')
  })

  it('calls onChange with event', () => {
    const changeMock = vi.fn()
    render(<Textarea onChange={changeMock} />)
    const element = screen.getByRole('textbox')
    fireEvent.change(element, { target: { value: 'event test' } })
    expect(changeMock).toHaveBeenCalled()
  })

  it('forwards ref when passRef provided', () => {
    const ref = { current: null } as { current: HTMLTextAreaElement | null }
    render(<Textarea passRef={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })
})