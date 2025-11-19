// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Text, Overflow } from '../../components/view/TextFormat' 

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Text />', () => {

  it('renders value with no format', () => {
    render(<Text value="Hello World" />)
    const el = screen.getByText('Hello World')
    expect(el).toBeInTheDocument()
    expect(el.style.textTransform).toBe('')
  })

  it('renders value in uppercase', () => {
    render(<Text value="Hello World" format="uppercase" />)
    const el = screen.getByText('Hello World')
    expect(el.style.textTransform).toBe('uppercase')
  })

  it('renders value in lowercase', () => {
    render(<Text value="Hello World" format="lowercase" />)
    const el = screen.getByText('Hello World')
    expect(el.style.textTransform).toBe('lowercase')
  })

  it('renders value capitalized', () => {
    render(<Text value="hello world" format="capitalize" />)
    const el = screen.getByText('hello world')
    expect(el.style.textTransform).toBe('capitalize')
  })

})

// --------------------------------------------------------------------
// Overflow Component Tests
// --------------------------------------------------------------------
describe('<Overflow />', () => {

  it('renders full text if length not exceeded', () => {
    render(<Overflow value="Hello World" length={20} />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('truncates text by characters', () => {
    render(<Overflow value="Hello World" length={5} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('truncates text by characters with ellipsis', () => {
    render(<Overflow value="Hello World" length={5} hellip />)
    expect(screen.getByText('Hello…')).toBeInTheDocument()
  })

  it('truncates by words', () => {
    render(<Overflow value="Hello World from Vitest" words length={2} />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('truncates by words with ellipsis', () => {
    render(<Overflow value="Hello World from Vitest" words length={2} hellip />)
    expect(screen.getByText('Hello World…')).toBeInTheDocument()
  })

  it('renders full text when words option is true but under count', () => {
    render(<Overflow value="Hello World" words length={5} />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('handles string length as string type', () => {
    render(<Overflow value="Hello World" length="5" />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders full text if length prop is invalid string', () => {
    render(<Overflow value="Hello World" length="abc" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
