//--------------------------------------------------------------------//
// Imports
//--------------------------------------------------------------------//
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Badge from '../../src/Badge'

//--------------------------------------------------------------------//
// Mocks
//--------------------------------------------------------------------//
vi.mock('../../src/helpers/removeThemeProps.js', () => ({
  __esModule: true,
  default: (props: unknown) => props,
}))

vi.mock('../../src/helpers/tools/BackgroundColorTool.js', () => ({
  __esModule: true,
  default: {
    get: () => ({
      getClassStyles: ({ styles }: { styles: Record<string, unknown> }) => {
        styles.backgroundColor = 'red'
      },
    }),
  },
}))

vi.mock('../../src/helpers/tools/BorderColorTool.js', () => ({
  __esModule: true,
  default: {
    get: () => ({
      getClassStyles: ({ styles }: { styles: Record<string, unknown> }) => {
        styles.borderColor = 'blue'
      },
    }),
  },
}))

vi.mock('../../src/helpers/tools/BorderRadiusTool.js', () => ({
  __esModule: true,
  default: {
    get: () => ({
      getClassStyles: ({ classes }: { classes: string[] }) => {
        classes.push('radius')
      },
    }),
  },
}))

vi.mock('../../src/helpers/tools/FillTool.js', () => ({
  __esModule: true,
  default: {
    get: () => ({
      getClassStyles: ({
        classes,
      }: {
        classes: string[]
        styles: Record<string, unknown>
        key: string
      }) => {
        classes.push('fill')
      },
    }),
  },
}))

vi.mock('../../src/helpers/tools/TextAlignTool.js', () => ({
  __esModule: true,
  default: {
    get: () => ({
      getClassStyles: (_: { classes: string[]; styles: Record<string, unknown> }) => undefined,
    }),
  },
}))

vi.mock('../../src/helpers/tools/TextColorTool.js', () => ({
  __esModule: true,
  default: {
    get: () => ({
      getClassStyles: ({ styles }: { styles: Record<string, unknown> }) => {
        styles.color = 'white'
      },
    }),
  },
}))

//--------------------------------------------------------------------//
// Tests
//--------------------------------------------------------------------//
describe('Badge', () => {
  it('renders children content correctly', () => {
    render(<Badge>Sample</Badge>)
    expect(screen.getByText('Sample')).toBeInTheDocument()
  })

  it('includes default class and applied generated ones', () => {
    render(<Badge>Badge</Badge>)
    const badge = screen.getByText('Badge')
    expect(badge).toHaveClass('frui-badge')
    expect(badge).toHaveClass('radius')
    expect(badge).toHaveClass('fill')
  })

  it('applies inline styles from tools', () => {
    render(<Badge>Styled</Badge>)
    const badge = screen.getByText('Styled')
    expect(badge.style.backgroundColor).toBe('red')
    expect(badge.style.borderColor).toBe('blue')
    expect(badge.style.color).toBe('white')
  })

  it('merges provided className with generated ones', () => {
    render(
      <Badge className="custom">
        Combined
      </Badge>
    )
    const badge = screen.getByText('Combined')
    expect(badge).toHaveClass('custom')
    expect(badge).toHaveClass('frui-badge')
  })

  it('applies passed style props and preserves them with generated styles', () => {
    render(<Badge style={{ padding: '10px' }}>StyledBadge</Badge>)
    const el = screen.getByText('StyledBadge')
    expect(el.style.padding).toBe('10px')
    expect(el.style.backgroundColor).toBe('red')
  })
})