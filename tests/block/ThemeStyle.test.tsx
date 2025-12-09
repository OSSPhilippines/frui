//--------------------------------------------------------------------//
// Imports
//--------------------------------------------------------------------//
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'

import ThemeStyle, { useThemeStyle } from '../../src/block/ThemeStyle'

//--------------------------------------------------------------------//
// Mocks
//--------------------------------------------------------------------//
vi.mock('../../helpers/removeThemeProps.js', () => ({
  __esModule: true,
  default: (cfg: unknown) => cfg,
}))

const mockTool = {
  get: vi.fn(() => ({
    getClassStyles: vi.fn(),
  })),
}

vi.mock('../../helpers/tools/BackgroundColorTool.js', () => ({ __esModule: true, default: mockTool }))
vi.mock('../../helpers/tools/BorderColorTool.js', () => ({ __esModule: true, default: mockTool }))
vi.mock('../../helpers/tools/BorderRadiusTool.js', () => ({ __esModule: true, default: mockTool }))
vi.mock('../../helpers/tools/BorderStyleTool.js', () => ({ __esModule: true, default: mockTool }))
vi.mock('../../helpers/tools/ColorTool.js', () => ({ __esModule: true, default: mockTool }))
vi.mock('../../helpers/tools/DisplayTool.js', () => ({ __esModule: true, default: mockTool }))
vi.mock('../../helpers/tools/FillTool.js', () => ({ __esModule: true, default: mockTool }))
vi.mock('../../helpers/tools/TextAlignTool.js', () => ({ __esModule: true, default: mockTool }))
vi.mock('../../helpers/tools/TextColorTool.js', () => ({ __esModule: true, default: mockTool }))
vi.mock('../../helpers/tools/TextSizeTool.js', () => ({ __esModule: true, default: mockTool }))

//--------------------------------------------------------------------//
// Tests
//--------------------------------------------------------------------//
describe('useThemeStyle hook', () => {
  it('returns merged default styles and class array', () => {
    const { styles, classes } = useThemeStyle({ style: { color: 'red' } }, 'base', { fontSize: '12px' })
    expect(styles).toMatchObject({ color: 'red', fontSize: '12px' })
    expect(classes).toContain('base')
  })

  it('includes custom className in returned classes', () => {
    const { classes } = useThemeStyle({ className: 'custom' })
    expect(classes).toContain('custom')
  })
})

describe('ThemeStyle component', () => {
  it('clones and applies attributes to its single child', () => {
    const { container } = render(
      <ThemeStyle className="parent-class" style={{ backgroundColor: 'blue' }}>
        <div data-testid="child">Child</div>
      </ThemeStyle>
    )
    const child = container.querySelector('[data-testid="child"]')
    expect(child).toHaveClass('parent-class')
    expect(child.style.backgroundColor).toBe('blue')
  })
})