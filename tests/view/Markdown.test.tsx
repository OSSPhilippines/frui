// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Markdown } from '../../components/view/Markdown'

// --------------------------------------------------------------------
// Mock markdown-to-jsx
// --------------------------------------------------------------------
// The real library is mocked to a simple component that renders a wrapper
// and outputs the received children text directly for verification.
vi.mock('markdown-to-jsx', () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => (
    <div data-testid="markdown-frame">{children}</div>
  ),
}))

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Markdown />', () => {
  it('renders markdown content through MarkdownFrame', () => {
    render(<Markdown value="# Heading" />)
    const wrapper = screen.getByTestId('markdown-frame')
    expect(wrapper).toHaveTextContent('# Heading')
  })

  it('renders plain text content without markdown syntax', () => {
    render(<Markdown value="Simple text value" />)
    expect(screen.getByText('Simple text value')).toBeInTheDocument()
  })

  it('renders wrapper element from markdown renderer', () => {
    render(<Markdown value="**Bold text**" />)
    const wrapper = screen.getByTestId('markdown-frame')
    expect(wrapper.tagName.toLowerCase()).toBe('div')
  })

  it('handles empty value gracefully', () => {
    render(<Markdown value="" />)
    const wrapper = screen.getByTestId('markdown-frame')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveTextContent('')
  })
})