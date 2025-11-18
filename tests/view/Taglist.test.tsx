import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Taglist } from '../../components/view/Taglist'

// -------------------------------------------------------------------
// Component Tests
// -------------------------------------------------------------------
describe('<Taglist />', () => {
  it('applies className to all badges', () => {
    render(<Taglist className="my-class" value={['Tag1', 'Tag2', 123]} />)
    ;['Tag1', 'Tag2', '123'].forEach((val) =>
      expect(screen.getByText(val)).toHaveClass('my-class')
    )
  })

  it('applies style to all badges', () => {
    const style = { color: 'red', fontWeight: 'bold' }
    render(<Taglist style={style} value={['Tag1', 'Tag2', 123]} />)
    ;['Tag1', 'Tag2', '123'].forEach((val) =>
      expect(screen.getByText(val)).toHaveStyle({ color: 'rgb(255, 0, 0)', fontWeight: 'bold' })
    )
  })

  it('renders all badge values', () => {
    render(<Taglist value={['Tag1', 'Tag2', 123]} />)
    expect(screen.getByText('Tag1')).toBeInTheDocument()
    expect(screen.getByText('Tag2')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('renders empty value array without badges', () => {
    const { container } = render(<Taglist value={[]} />)
    expect(container.querySelectorAll('span.frui-format-taglist > *').length).toBe(0)
  })
  
  it('renders numeric values correctly as string', () => {
    render(<Taglist value={[42]} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })
})