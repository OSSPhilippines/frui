//--------------------------------------------------------------------//
// Imports
//--------------------------------------------------------------------//
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TimeInput, toDate, toTimeInputString, toTimeString } from '../../src/form/TimeInput'

//--------------------------------------------------------------------//
// Mocks
//--------------------------------------------------------------------//
vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    className,
    onUpdate,
    type,
    value,
  }: {
    className?: string
    onUpdate?: (val: string) => void
    type?: string
    value: string
  }) => (
    <input
      data-testid="mock-input"
      className={className}
      onChange={(e) => {
        const evt = e as React.ChangeEvent<HTMLInputElement>
        onUpdate?.(evt.target.value)
      }}
      type={type}
      value={value}
    />
  ),
}))

//--------------------------------------------------------------------//
// Tests
//--------------------------------------------------------------------//
describe('Time helper functions', () => {
  it('toDate converts different input types correctly', () => {
    const d = new Date('2024-01-01T12:30:00')
    expect(toDate(d)).toEqual(d)
    expect(toDate('12:45')?.getHours()).toBe(12)
    expect(toDate(1700000000000)?.getTime()).toBe(1700000000000)
    expect(toDate(undefined)).toBeUndefined()
  })

  it('toTimeString formats valid Date objects as hh:mm:ss', () => {
    const d = new Date('2024-01-01T14:45:00')
    const result = toTimeString(d)
    expect(result).toBe('14:45:00')
  })

  it('toTimeString returns undefined for invalid Date', () => {
    expect(toTimeString(new Date('invalid'))).toBeUndefined()
  })

  it('toTimeInputString formats valid Date objects as hh:mm', () => {
    const d = new Date('2024-01-01T09:30:00')
    const result = toTimeInputString(d)
    expect(result).toBe('09:30')
  })

  it('toTimeInputString returns undefined for invalid Date', () => {
    expect(toTimeInputString(new Date('invalid'))).toBeUndefined()
  })
})

describe('<TimeInput />', () => {
  it('renders basic time input with correct class and type', () => {
    render(<TimeInput />)
    const input = screen.getByTestId('mock-input')
    expect(input).toHaveAttribute('type', 'time')
    expect(input).toHaveClass('frui-form-input-time')
  })

  it('renders with provided defaultValue', () => {
    render(<TimeInput defaultValue="13:45" />)
    const input = screen.getByTestId('mock-input') as HTMLInputElement
    expect(input.value).toBe('13:45')
  })

  it('calls onUpdate when the time changes', () => {
    const onUpdate = vi.fn()
    render(<TimeInput onUpdate={onUpdate} />)
    const input = screen.getByTestId('mock-input')
    fireEvent.change(input, { target: { value: '15:00' } })
    expect(onUpdate).toHaveBeenCalled()
    expect(onUpdate.mock.calls[0][0]).toBeInstanceOf(Date)
  })

  it('updates when controlled value prop changes', async () => {
    const { rerender } = render(<TimeInput value="10:30" />)
    const input = screen.getByTestId('mock-input') as HTMLInputElement
    expect(input.value).toBe('10:30')

    rerender(<TimeInput value="16:45" />)
    await waitFor(() => expect(input.value).toBe('16:45'))
  })

  it('adds custom className when provided', () => {
    render(<TimeInput className="custom-time" />)
    const input = screen.getByTestId('mock-input')
    expect(input).toHaveClass('frui-form-input-time', 'custom-time')
  })
})