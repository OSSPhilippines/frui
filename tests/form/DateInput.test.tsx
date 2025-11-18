
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import DateInputDefault, { toDate, toDateString } from '../../components/form/DateInput'

// Get the component from default export
const DateInput = DateInputDefault

// --------------------------------------------------------------------
// Mocks
// --------------------------------------------------------------------
interface MockInputProps {
  className?: string
  onUpdate?: (val?: string) => void
  type?: string
  value?: string
  [key: string]: unknown
}

vi.mock('../../components/form/Input.js', () => ({
  __esModule: true,
  default: (props: unknown) => {
    const { className, onUpdate, type, value, ...rest } = props as MockInputProps
    return (
      <input
        {...rest}
        className={className}
        data-testid="date-input"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onUpdate?.(e.target.value)
        }}
        type={type}
        value={value}
      />
    )
  },
}))

// --------------------------------------------------------------------
// Tests
// --------------------------------------------------------------------
describe('Date helper functions', () => {
  it('toDate converts different input types correctly', () => {
    const date = new Date('2024-01-01')
    expect(toDate(date)).toEqual(date)
    expect(toDate('2024-02-05')?.getFullYear()).toBe(2024)
    expect(toDate(1700000000000)).toBeInstanceOf(Date)
    expect(toDate(undefined)).toBeUndefined()
  })

  it('toDateString formats valid Date objects as yyyy-mm-dd', () => {
    const date = new Date('2024-05-10T00:00:00Z')
    const result = toDateString(date)
    expect(result).toBe('2024-05-10')
  })

  it('toDateString returns undefined for invalid Date', () => {
    expect(toDateString(new Date('invalid'))).toBeUndefined()
  })
})

describe('<DateInput />', () => {
  it('adds custom className when provided', () => {
    render(<DateInput className="custom-class" />)
    const input = screen.getByTestId('date-input')
    expect(input).toHaveClass('frui-form-date-input', 'custom-class')
  })

  it('calls onUpdate when the date changes', () => {
    const mockUpdate = vi.fn()
    render(<DateInput onUpdate={mockUpdate} />)
    const input = screen.getByTestId('date-input')
    fireEvent.change(input, { target: { value: '2024-06-01' } })
    expect(mockUpdate).toHaveBeenCalledTimes(1)
    expect(mockUpdate).toHaveBeenCalledWith(expect.any(Date))
  })

  it('renders basic date input with correct class and type', () => {
    render(<DateInput />)
    const input = screen.getByTestId('date-input')
    expect(input).toHaveAttribute('type', 'date')
    expect(input).toHaveClass('frui-form-date-input')
  })

  it('renders with provided defaultValue', () => {
    render(<DateInput defaultValue="2024-05-15" />)
    const input = screen.getByTestId('date-input') as HTMLInputElement
    expect(input.value).toBe('2024-05-15')
  })

  it('updates when controlled value prop changes', async () => {
    const { rerender } = render(<DateInput value="2024-04-01" />)
    const input = screen.getByTestId('date-input') as HTMLInputElement
    expect(input.value).toBe('2024-04-01')
    rerender(<DateInput value="2024-07-01" />)
    await waitFor(() => {
      expect(input.value).toBe('2024-07-01')
    })
  })
})