import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'

import { Alert } from '../../components/Alert'

// -------------------------------------------------------------------
// Mock utilities (simulate tool behaviors based on props)
// -------------------------------------------------------------------
vi.mock('./helpers/tools/BackgroundColorTool.js', () => ({
  default: class {
    static get(props: any) {
      return {
        getClassStyles: ({ styles }: any) => {
          if (props.color && !props.outline) {
            styles.backgroundColor = props.color
          }
        },
      }
    }
  },
}))

vi.mock('./helpers/tools/BorderColorTool.js', () => ({
  default: class {
    static get(props: any) {
      return {
        getClassStyles: ({ styles }: any) => {
          if (props.outline && props.color) {
            styles.borderColor = props.color
          }
        },
      }
    }
  },
}))

vi.mock('./helpers/tools/BorderRadiusTool.js', () => ({
  default: class {
    static get() {
      return {
        getClassStyles: ({ classes }: any) => {
          classes.push('radius-class')
        },
      }
    }
  },
}))

vi.mock('./helpers/tools/FillTool.js', () => ({
  default: class {
    static get(props: any) {
      return {
        getClassStyles: ({ classes }: any) => {
          if (props.outline) {
            classes.push('frui-solid', 'frui-thin')
          }
        },
      }
    }
  },
}))

vi.mock('./helpers/tools/TextAlignTool.js', () => ({
  default: class {
    static get() {
      return {
        getClassStyles: () => {},
      }
    }
  },
}))

vi.mock('./helpers/tools/TextColorTool.js', () => ({
  default: class {
    static get(props: any) {
      return {
        getClassStyles: ({ classes, styles }: any) => {
          if (props.outline && props.color) {
            styles.color = props.color
          } else {
            classes.push('frui-tx-white')
          }
        },
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
describe('<Alert />', () => {
  it('adds a custom className when provided', () => {
    render(<Alert className="custom">message</Alert>)
    expect(screen.getByText('message')).toHaveClass('frui-alert', 'custom')
  })

  it('applies outline layout with border and text color', () => {
    render(
      <Alert color="blue" outline>
        outlined
      </Alert>
    )
    const el = screen.getByText('outlined')
    expect(el).toHaveClass('frui-alert', 'frui-solid', 'frui-thin')
    expect(el.style.borderColor).toBe('blue')
    expect(el.style.color).toBe('blue')
  })

  it('applies solid layout by default with background color', () => {
    render(<Alert color="red">solid</Alert>)
    const el = screen.getByText('solid')
    expect(el).toHaveClass('frui-alert', 'frui-tx-white')
    expect(el.style.backgroundColor).toBe('red')
  })

  it('merges inline styles with generated ones', () => {
    render(
      <Alert color="green" style={{ padding: '10px' }}>
        styled
      </Alert>
    )
    const el = screen.getByText('styled')
    expect(el.style.padding).toBe('10px')
    expect(el.style.backgroundColor).toBe('green')
  })

  it('renders with base class', () => {
    const { container } = render(<Alert>content</Alert>)
    const alert = container.firstChild as HTMLElement
    expect(alert).toHaveClass('frui-alert', 'frui-tx-white')
    expect(alert.textContent).toBe('content')
  })
})