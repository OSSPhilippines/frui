// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Separated } from '../../components/view/Separate' 

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Separated />', () => {

  it('renders values joined by default space separator', () => {
    render(<Separated value={['A', 'B', 'C']} />)
    expect(screen.getByText('A B C')).toBeInTheDocument()
  })

  it('renders values joined by a custom separator', () => {
    render(<Separated value={['A', 'B', 'C']} separator="-" />)
    expect(screen.getByText('A-B-C')).toBeInTheDocument()
  })

  it('renders each value on a separate line if separator="line"', () => {
    render(<Separated value={['A', 'B', 'C']} separator="line" />)
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()

    const divs = screen.getByText('A').parentElement?.children
    expect(divs?.length).toBe(3)
  })

  it('applies className to the container', () => {
    const { container } = render(<Separated value={['A', 'B']} className="my-class" />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('my-class')
  })

it('applies style to the container', () => {
  const style = { color: 'red', fontWeight: 'bold' }
  const { container } = render(<Separated value={['X', 'Y']} style={style} />)
  const span = container.querySelector('span')
  expect(span).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  expect(span).toHaveStyle({ fontWeight: 'bold' })
})

})
