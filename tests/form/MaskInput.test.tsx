import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import MaskInput from '../../src/form/MaskInput'

//--------------------------------------------------------------------//
// Mocks 
//--------------------------------------------------------------------//
const mockMaskMethod = vi.fn()

// Constructable mock for Inputmask
function MockInputmask(this: unknown, _options?: Record<string, unknown>) {
  return { mask: mockMaskMethod }
}

// Make it globally available for new Inputmask(...)
Object.defineProperty(globalThis, 'Inputmask', {
  value: MockInputmask,
  writable: true,
})

// Mock nested Input component
vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    className,
    type,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      data-testid="mock-input"
      className={className}
      type={type ?? 'text'}
    />
  ),
}))

//--------------------------------------------------------------------//
// Tests
//--------------------------------------------------------------------//
describe('<MaskInput />', () => {
  it('renders basic input element', () => {
    render(<MaskInput />)
    const input = screen.getByTestId('mock-input')
    expect(input).toBeInTheDocument()
    expect(input.tagName.toLowerCase()).toBe('input')
  })

  it('creates a new Inputmask instance and calls mask()', () => {
    const onReady = vi.fn()
    render(<MaskInput mask="9999" alias="numeric" onReady={onReady} />)
    expect(mockMaskMethod).toHaveBeenCalled()
    expect(onReady).toHaveBeenCalledWith(expect.objectContaining({ mask: expect.any(Function) }))
  })
})