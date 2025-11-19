// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Slug, { slugify, camelfy, useSlug } from '../../components/form/SlugInput'

// --------------------------------------------------------------------
// Mocks
// --------------------------------------------------------------------
vi.mock('../../components/form/Input.js', () => ({
  __esModule: true,
  default: ({
    value,
    onBlur,
    onChange,
  }: {
    value?: string
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  }) => (
    <input
      data-testid="mock-input"
      value={value || ''}
      onBlur={(e) => onBlur?.(e as React.FocusEvent<HTMLInputElement>)}
      onChange={(e) => onChange?.(e as React.ChangeEvent<HTMLInputElement>)}
    />
  ),
}))

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('slugify', () => {
  it('converts string to slug with default options', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('converts with underscores when dash is disabled', () => {
    expect(slugify('my slug text', true, false)).toBe('my_slug_text')
  })

  it('trims leading and trailing dashes and underscores', () => {
    expect(slugify('-abc--def-')).toBe('abc-def')
  })
})

describe('camelfy', () => {
  it('converts string to camelCase', () => {
    expect(camelfy('hello world')).toBe('helloWorld')
  })

  it('removes special characters and spaces', () => {
    expect(camelfy(' test---slug_case')).toBe('testSlugCase')
  })
})

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
function renderUseSlug(config: Parameters<typeof useSlug>[0]) {
  let hookValue: ReturnType<typeof useSlug> | undefined
  const TestComponent = () => {
    hookValue = useSlug(config)
    return <input data-testid="mock" readOnly value={hookValue?.slug} />
  }
  render(<TestComponent />)
  return () => hookValue!
}

describe('useSlug', () => {
  it('initializes slug with defaultValue', () => {
    const getHook = renderUseSlug({ defaultValue: 'Hello World', value: undefined })
    const hook = getHook()
    expect(hook.slug).toBe('hello-world')
  })

  it('updates slug when value prop changes', () => {
    const getHook = renderUseSlug({ value: 'Updated Slug' })
    const hook = getHook()
    expect(hook.slug).toBe('updated-slug')
  })

  it('applies camel case transformation when camel=true', () => {
    const getHook = renderUseSlug({ value: 'camel case test', camel: true })
    const hook = getHook()
    expect(hook.slug).toBe('camelCaseTest')
  })
})

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Slug />', () => {
  it('renders input with initial slugified value', () => {
    render(<Slug defaultValue="Hello World" />)
    const input = screen.getByTestId('mock-input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('hello-world')
  })

  it('updates slug value on change event', () => {
    render(<Slug defaultValue="Hello" />)
    const input = screen.getByTestId('mock-input')
    fireEvent.change(input, { target: { value: 'Test Value' } })
    expect(input).toHaveValue('test-value')
  })

  it('calls onBlur and keeps unmodified display since slugification happens internally', () => {
    const onBlur = vi.fn()
    render(<Slug defaultValue="Test On Blur" onBlur={onBlur} />)
    const input = screen.getByTestId('mock-input')
    fireEvent.blur(input, { target: { value: 'New Test' } })
    expect(onBlur).toHaveBeenCalled()
    expect(input).toHaveValue('New Test')
  })

  it('handles camel case mode correctly', () => {
    render(<Slug defaultValue="Camel Case Value" camel />)
    const input = screen.getByTestId('mock-input')
    expect(input).toHaveValue('CamelCaseValue')
  })

  it('renders controlled value and responds to user input', () => {
    const onChange = vi.fn()
    render(<Slug value="Controlled Slug" onChange={onChange} />)
    const input = screen.getByTestId('mock-input')
    expect(input).toHaveValue('controlled-slug')

    fireEvent.change(input, { target: { value: 'Another' } })
    expect(onChange).toHaveBeenCalled()
  })
})