// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HTML } from '../../components/view/HTML'

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<HTML />', () => {
  it('renders plain text content', () => {
    render(<HTML value="Hello world" />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('renders HTML markup from string', () => {
    render(<HTML value="<p>Paragraph</p>" />)
    const paragraph = screen.getByText('Paragraph')
    expect(paragraph.tagName.toLowerCase()).toBe('p')
  })

  it('accepts and renders dangerous HTML as is', () => {
    render(<HTML value='<img src="x" alt="y" />' />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'y')
  })

  it('uses a div as the root element', () => {
    render(<HTML value="<span>test</span>" />)
    const container = screen.getByText('test').parentElement
    expect(container?.tagName.toLowerCase()).toBe('div')
  })
})