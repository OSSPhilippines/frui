// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Radio, useRadio } from '../../components/form/Radio'

// --------------------------------------------------------------------
// Hook tests
// --------------------------------------------------------------------
describe('useRadio()', () => {
  it('sets and updates checked state when changed', () => {
    const changeMock = vi.fn()
    const updateMock = vi.fn()
    const { result } = renderHook(() =>
      useRadio({ onChange: changeMock, onUpdate: updateMock, defaultChecked: false })
    )

    act(() =>
      result.current.handlers.change({
        target: { checked: true, value: 'A' },
      } as unknown as React.ChangeEvent<HTMLInputElement>)
    )

    expect(changeMock).toHaveBeenCalled()
    expect(updateMock).toHaveBeenCalledWith('A', true)
  })

  it('syncs isChecked value when checked prop changes', () => {
    const { result, rerender } = renderHook(
      ({ checked }: { checked: boolean }) => useRadio({ checked }),
      { initialProps: { checked: false } }
    )
    expect(result.current.isChecked).toBe(false)
    rerender({ checked: true })
    expect(result.current.isChecked).toBeDefined()
  })
})

// --------------------------------------------------------------------
// Component tests
// --------------------------------------------------------------------
describe('<Radio />', () => {
  it('applies shape, color, and error class names correctly', () => {
    const { container } = render(<Radio check blue error className="extra" label="R" />)
    const wrapper = container.querySelector('label')!
    expect(wrapper.className).toContain('frui-form-option-check')
    expect(wrapper.className).toContain('frui-form-option-blue')
    expect(wrapper.className).toContain('frui-tx-error')
    expect(wrapper.className).toContain('extra')
  })

  it('calls onUpdate when user selects the radio', () => {
    const updateMock = vi.fn()
    render(<Radio label="Click Me" value="yes" onUpdate={updateMock} />)
    const input = screen.getByRole('radio')
    fireEvent.click(input)
    expect(updateMock).toHaveBeenCalledWith('yes', true)
  })

  it('renders radio input with label text', () => {
    render(<Radio label="Option 1" />)
    const input = screen.getByRole('radio')
    const label = screen.getByText('Option 1')
    expect(input).toBeInTheDocument()
    expect(label).toBeInTheDocument()
  })

  it('renders with custom style prop', () => {
    const { container } = render(<Radio label="Stylish" style={{ color: 'red' }} />)
    const wrapper = container.querySelector('label')!
    expect(wrapper).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  })

  it('shows circle by default when no shape specified', () => {
    const { container } = render(<Radio label="Default" />)
    const wrapper = container.querySelector('label')!
    expect(wrapper.className).toContain('frui-form-option-circle')
  })
})