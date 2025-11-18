// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Image } from '../../components/view/Image'

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Image />', () => {
  it('renders an image element', () => {
    render(<Image value="logo.png" alt="logo" />)
    const image = screen.getByRole('img')
    expect(image.tagName.toLowerCase()).toBe('img')
  })

  it('sets src attribute from value prop', () => {
    render(<Image value="path/to/photo.jpg" alt="photo" />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'path/to/photo.jpg')
  })

  it('applies additional props such as alt and className', () => {
    render(<Image value="image.png" alt="sample" className="custom" width={100} />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'sample')
    expect(image).toHaveClass('custom')
    expect(image).toHaveAttribute('width', '100')
  })

  it('renders safely when value is empty', () => {
    render(<Image value="" alt="empty" />)
    const image = screen.getByRole('img')

    // React drops empty string attributes -> ensure element exists and src is omitted
    expect(image).toBeInTheDocument()
    expect(image.getAttribute('src')).toBeNull()
  })
})