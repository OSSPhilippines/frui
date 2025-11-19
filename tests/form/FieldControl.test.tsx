// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import FieldControl from '../../components/form/FieldControl'

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<FieldControl />', () => {
  it('renders with default class', () => {
    render(<FieldControl />)
    const containers = document.querySelectorAll('.frui-form-field-control')
    expect(containers.length).toBe(1)
    expect(containers[0]).toHaveClass('frui-form-field-control')
  })

  it('renders label when provided', () => {
    render(<FieldControl label="Username" />)
    const label = screen.getByText('Username')
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass('frui-form-field-control-label')
  })

  it('renders error message when provided', () => {
    render(<FieldControl error="Required field" />)
    const error = screen.getByText('Required field')
    expect(error).toBeInTheDocument()
    expect(error).toHaveClass('frui-form-field-control-error')
  })

  it('renders children inside field container', () => {
    render(
      <FieldControl>
        <input data-testid="child-input" />
      </FieldControl>,
    )
    const child = screen.getByTestId('child-input')
    expect(child).toBeInTheDocument()

    const fieldContainer = document.querySelector('.frui-form-field-control-field')
    expect(fieldContainer).toBeInTheDocument()
  })

  it('applies custom className when passed', () => {
    render(<FieldControl className="custom-class" />)
    const container = document.querySelector('.frui-form-field-control') as HTMLElement
    expect(container).toHaveClass('frui-form-field-control', 'custom-class')
  })
})