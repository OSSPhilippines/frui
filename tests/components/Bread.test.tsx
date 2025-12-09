//--------------------------------------------------------------------//
// Imports
//--------------------------------------------------------------------//
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'

//--------------------------------------------------------------------//
// Mock React useId for deterministic rendering
//--------------------------------------------------------------------//
vi.mock('react', async () => {
  const actual: unknown = await vi.importActual('react')
  return { ...actual, useId: () => 'id1' }
})

//--------------------------------------------------------------------//
// Mock helpers
//--------------------------------------------------------------------//
vi.mock('components/helpers/getClassStyles', () => ({
  __esModule: true,
  default: vi.fn(({ classes }: unknown) => ({ classes, styles: {} })),
}))

vi.mock('components/helpers/getSlotStyles', () => ({
  __esModule: true,
  default: vi.fn(() => ({})),
}))

//--------------------------------------------------------------------//
// Imports after mocks
//--------------------------------------------------------------------//
import {
  Bread,
  BreadContext,
  BreadCrumb,
  BreadSlicer,
  buildBreadTrail,
  useBreadContext,
} from '../../src/Bread'

//--------------------------------------------------------------------//
// Tests
//--------------------------------------------------------------------//
describe('<Bread />', () => {
  it('renders base wrapper with class', () => {
    const { container } = render(<Bread>children</Bread>)
    expect(container.firstChild).toHaveClass('frui-bread')
  })

  it('renders children crumbs in order with separators', () => {
    const trail = buildBreadTrail([
      <BreadCrumb key="1">A</BreadCrumb>,
      <BreadSlicer key="2" value=">">/</BreadSlicer>,
      <BreadCrumb key="3">B</BreadCrumb>,
    ])
    const ctx = { click: vi.fn(), pop: vi.fn(), push: vi.fn(), trail: ['id1'] }
    const { container } = render(
      <BreadContext.Provider value={ctx}>
        <div>{trail}</div>
      </BreadContext.Provider>
    )
    expect(container.querySelectorAll('.frui-bread-crumb').length).toBe(2)
  })

  it('updates visible crumbs when using controlled value prop', () => {
    const value = [{ label: 'Home' }, { label: 'About' }]
    render(<Bread value={value} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })
})

describe('<BreadCrumb />', () => {
  const mockClick = vi.fn()
  const mockPop = vi.fn()
  const mockPush = vi.fn()
  const contextValue = { click: mockClick, pop: mockPop, push: mockPush, trail: ['id1'] }

  it('calls context.pop on click', () => {
    render(
      <BreadContext.Provider value={contextValue}>
        <BreadCrumb>ClickMe</BreadCrumb>
      </BreadContext.Provider>
    )
    const crumb = screen.getByText('ClickMe')
    fireEvent.click(crumb)
    expect(mockPop).toHaveBeenCalled()
  })

  it('renders a crumb with base class', () => {
    render(
      <BreadContext.Provider value={contextValue}>
        <BreadCrumb>Crumb1</BreadCrumb>
      </BreadContext.Provider>
    )
    const crumb = screen.getByText('Crumb1')
    expect(crumb).toHaveClass('frui-bread-crumb')
  })
})

describe('<BreadSlicer />', () => {
  it('renders separator when id is in trail', () => {
    const ctx = { click: vi.fn(), pop: vi.fn(), push: vi.fn(), trail: ['id1'] }
    const { container } = render(
      <BreadContext.Provider value={ctx}>
        <BreadSlicer value=">" />
      </BreadContext.Provider>
    )
    expect(container.querySelector('span')).toHaveClass('frui-bread-slicer')
  })

  it('returns null when not in trail', () => {
    const ctx = { click: vi.fn(), pop: vi.fn(), push: vi.fn(), trail: [] }
    const { container } = render(
      <BreadContext.Provider value={ctx}>
        <BreadSlicer value="/" />
      </BreadContext.Provider>
    )
    expect(container.firstChild).toBeNull()
  })
})

describe('useBreadContext()', () => {
  it('provides the same context value via hook', () => {
    let grabbed: unknown
    const Demo = () => {
      grabbed = useBreadContext()
      return null
    }
    const ctx = { click: vi.fn(), pop: vi.fn(), push: vi.fn(), trail: ['abc'] }
    render(
      <BreadContext.Provider value={ctx}>
        <Demo />
      </BreadContext.Provider>
    )
    expect(grabbed).toBe(ctx)
  })
})