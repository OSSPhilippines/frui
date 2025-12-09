//--------------------------------------------------------------------//
// Imports
//--------------------------------------------------------------------//
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import PasswordInput from '../../src/form/PasswordInput'

//--------------------------------------------------------------------//
// Mock helpers and Input component
//--------------------------------------------------------------------//
vi.mock('../../src/helpers/getClassStyles.js', () => ({
  __esModule: true,
  default: ({ classes }: { classes: string[] }) => ({ classes, styles: {} }),
}))

vi.mock('../../src/helpers/getSlotStyles.js', () => ({
  __esModule: true,
  default: () => ({}),
}))

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    type,
    className,
    error,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) => (
    <input data-testid="password-input" type={type} className={className} {...props} />
  ),
}))

//--------------------------------------------------------------------//
// Tests
//--------------------------------------------------------------------//
describe('<PasswordInput />', () => {
  it('renders wrapper and base input', () => {
    render(<PasswordInput />)
    const input = screen.getByTestId('password-input')
    const wrapper = input.closest('div')
    expect(wrapper).toHaveClass('frui-form-input-password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('renders toggle element with default symbol', () => {
    render(<PasswordInput />)
    const toggle = screen.getByText('A')
    expect(toggle).toBeInTheDocument()
    expect(toggle).toHaveClass('frui-form-input-password-toggle')
  })

  it('switches input type on toggle click', async () => {
    const user = userEvent.setup()
    render(<PasswordInput />)
    const input = screen.getByTestId('password-input') as HTMLInputElement
    const toggle = screen.getByText('A')
    expect(input.type).toBe('password')
    await user.click(toggle)
    expect(input.type).toBe('text')
    await user.click(screen.getByText('✷'))
    expect(input.type).toBe('password')
  })

  it('applies custom className when provided', () => {
    render(<PasswordInput className="custom-class" />)
    const wrapper = screen.getByTestId('password-input').closest('div') as HTMLDivElement
    expect(wrapper).toHaveClass('frui-form-input-password', 'custom-class')
  })

  it('renders error state correctly', () => {
    render(<PasswordInput error />)
    const input = screen.getByTestId('password-input')
    expect(input).toHaveAttribute('type', 'password')
  })
})