// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'

import { Progress, ProgressContainer } from '../../components/Progress'

// -------------------------------------------------------------------
// Mock tool utilities 
// -------------------------------------------------------------------
vi.mock('./helpers/tools/BackgroundColorTool.js', () => ({
  default: class {
    static get() {
      return {
        getClassStyles: () => {},
        toColorProps: () => ({}),
      }
    }
  },
}))

vi.mock('./helpers/tools/BorderRadiusTool.js', () => ({
  default: class {
    static get() {
      return {
        config: {},
        getClassStyles: () => {},
      }
    }
  },
}))

vi.mock('./helpers/tools/ColorTool.js', () => ({
  default: class {
    static get() {
      return {
        getClassStyles: () => {},
      }
    }
  },
}))

vi.mock('./helpers/removeThemeProps.js', () => ({
  default: (props: any) => props,
}))

// -------------------------------------------------------------------
// Component Tests
// -------------------------------------------------------------------
describe('<Progress />', () => {
  it('applies background color, radius, and height to bar', () => {
    render(<Progress bgcolor="blue" curved height={8}>label</Progress>)
    const bar = screen.getByText('label')
    expect(bar).toHaveClass('frui-progress')
    expect(bar.parentElement).toHaveClass('frui-progress-container')
  })

  it('passes container props and renders children', () => {
    const container = { className: 'custom-container' }
    render(<Progress container={container}>40%</Progress>)
    const bar = screen.getByText('40%')
    expect(bar).toHaveClass('frui-progress')
    expect(bar.parentElement).toHaveClass('frui-progress-container', 'custom-container')
  })
})

describe('<ProgressContainer />', () => {
  it('renders with base class and children', () => {
    render(<ProgressContainer>content</ProgressContainer>)
    const container = screen.getByText('content')
    expect(container).toHaveClass('frui-progress-container')
  })
})