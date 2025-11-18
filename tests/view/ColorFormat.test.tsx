// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Color } from '../../components/view/ColorFormat'

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Color />', () => {
  it('applies custom className and style', () => {
    render(<Color value="#abc" className="extra" style={{ margin: '8px' }} />)

    const wrapper = document.querySelector('.frui-format-color') as HTMLElement
    expect(wrapper).toHaveClass('extra')
    expect(wrapper).toHaveStyle({ margin: '8px' })
  })

  it('renders both box and text by default', () => {
    render(<Color value="#ff0000" />)

    const wrapper = document.querySelector('.frui-format-color') as HTMLElement
    const box = wrapper.querySelector('.frui-format-color-box') as HTMLElement
    const text = wrapper.querySelector('.frui-format-color-text') as HTMLElement

    expect(wrapper).toHaveClass('frui-format-color')
    expect(box).toHaveStyle({ backgroundColor: '#ff0000' })
    expect(text).toHaveTextContent('#ff0000')
  })

  it('renders only the color box when text is false', () => {
    render(<Color value="#00ff00" text={false} />)
    const box = document.querySelector('.frui-format-color-box') as HTMLElement

    expect(box).toBeInTheDocument()
    expect(box).toHaveStyle({ backgroundColor: '#00ff00' })
  })

  it('renders only text when box is false', () => {
    render(<Color value="#0000ff" box={false} />)
    const text = document.querySelector('.frui-format-color-text') as HTMLElement

    expect(text).toHaveTextContent('#0000ff')
    expect(text).toHaveClass('frui-format-color-text')
  })

  it('uses correct sizes for sm, md, and lg props', () => {
    const { rerender } = render(<Color value="#123" sm />)
    let box = document.querySelector('.frui-format-color-box') as HTMLElement
    expect(box).toHaveStyle({ width: '8px', height: '8px' })

    rerender(<Color value="#123" md />)
    box = document.querySelector('.frui-format-color-box') as HTMLElement
    expect(box).toHaveStyle({ width: '12px', height: '12px' })

    rerender(<Color value="#123" lg />)
    box = document.querySelector('.frui-format-color-box') as HTMLElement
    expect(box).toHaveStyle({ width: '16px', height: '16px' })
  })
})  