// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getTooltipPosition, Tooltip, TooltipContainer } from '../../components/Tooltip'

// -------------------------------------------------------------------
// Mock tool utilities 
// -------------------------------------------------------------------
vi.mock('./helpers/tools/BorderRadiusTool.js', () => ({
  default: class {
    static get() {
      return {
        getClassStyles: vi.fn(),
      }
    }
  },
}))

vi.mock('./helpers/tools/ColorTool.js', () => ({
  default: class {
    static get() {
      return {
        getClassStyles: vi.fn(),
      }
    }
  },
}))

vi.mock('./helpers/removeThemeProps.js', () => ({
  default: (props: unknown) => props,
}))

// -------------------------------------------------------------------
// Reset spies before each test
// -------------------------------------------------------------------
beforeEach(() => vi.clearAllMocks())

// -------------------------------------------------------------------
// Component Tests
// -------------------------------------------------------------------
describe('<Tooltip />', () => {
  it('renders only children when not visible', () => {
    const { container } = render(<Tooltip text="Hello">HoverMe</Tooltip>)
    const outer = container.querySelector('.frui-tooltip-container')
    expect(outer).toBeInTheDocument()
    expect(outer).toHaveTextContent('HoverMe')
    expect(container.querySelector('.frui-tooltip')).not.toBeInTheDocument()
  })

  it('renders tooltip text when show=true', () => {
    render(<Tooltip show text="Visible tip">Target</Tooltip>)
    const tip = screen.getByText('Visible tip')
    expect(tip).toHaveClass('frui-tooltip')
  })

  it('shows tooltip when hover=true and mouseEnter triggers visible state', () => {
    const { container } = render(<Tooltip hover text="HoverText">Hover</Tooltip>)
    const outer = container.querySelector('.frui-tooltip-container') as HTMLElement
    expect(outer).toBeInTheDocument()
    fireEvent.mouseEnter(outer)
    expect(screen.getByText('HoverText')).toBeInTheDocument()
    fireEvent.mouseLeave(outer)
    expect(screen.queryByText('HoverText')).not.toBeInTheDocument()
  })
})

describe('<TooltipContainer />', () => {
  it('applies additional custom class names', () => {
    const { container } = render(
      <TooltipContainer className="extra">content</TooltipContainer>
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('frui-tooltip-container', 'extra')
  })

  it('renders with base class and children', () => {
    const { container } = render(<TooltipContainer>tip</TooltipContainer>)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('frui-tooltip-container')
    expect(el).toHaveTextContent('tip')
  })
})

describe('getTooltipPosition()', () => {
  it('returns correct bottom position and direction', () => {
    const container = document.createElement('div')
    const tooltip = document.createElement('div')
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 20,
      left: 0,
      right: 0,
      top: 0,
      width: 100,
    } as DOMRect)
    vi.spyOn(tooltip, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 10,
      left: 0,
      right: 0,
      top: 0,
      width: 50,
    } as DOMRect)
    const result = getTooltipPosition(container, tooltip, {
      bottom: true,
      left: false,
      right: false,
      top: false,
    })
    expect(result.direction).toBe('top')
    expect(result.y).toBe(25)
  })
})