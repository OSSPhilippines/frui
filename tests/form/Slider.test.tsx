//--------------------------------------------------------------------//
// Imports
//--------------------------------------------------------------------//
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  clamp,
  toNumber,
  toValues,
  useSlider,
  Slider,
  SliderHandle,
  SliderConnection,
  SliderTrack,
  SliderContext,
} from '../../src/form/Slider'

//--------------------------------------------------------------------//
// Mocks
//--------------------------------------------------------------------//
vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
    type = 'number',
    className,
  }: {
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    className?: string
  }) => (
    <input
      data-testid="mock-input"
      type={type}
      className={className}
      value={value ?? ''}
      onChange={(e) => onChange?.(e as React.ChangeEvent<HTMLInputElement>)}
    />
  ),
}))

vi.mock('../../helpers/tools/ColorTool.js', () => ({
  __esModule: true,
  default: {
    get: () => ({
      getClassStyles: ({ classes }: { classes: string[] }) => {
        classes.push('color-class')
      },
      config: {},
    }),
  },
}))

vi.mock('../../helpers/tools/BackgroundColorTool.js', () => ({
  __esModule: true,
  default: {
    get: () => ({
      toColorProps: () => ({}),
    }),
  },
}))

vi.mock('../../helpers/getSlotStyles.js', () => ({
  __esModule: true,
  default: () => ({}),
}))

//--------------------------------------------------------------------//
// Tests
//--------------------------------------------------------------------//
describe('Helper functions', () => {
  it('clamp keeps value within bounds and snaps correctly', () => {
    const result = clamp(15, 0, 10, 2)
    expect(result).toBe(10)
    expect(clamp(-5, 0, 10, 1)).toBe(0)
  })

  it('toNumber converts or defaults correctly', () => {
    expect(toNumber('5')).toBe(5)
    expect(toNumber('xyz', 3)).toBe(3)
  })

  it('toValues creates correct array from input', () => {
    expect(toValues(5, false, 0)).toEqual([0, 5])
    expect(toValues([2, 9], true, 0)).toEqual([2, 9])
  })
})

describe('useSlider hook', () => {
  function setupHook(config: Parameters<typeof useSlider>[0]) {
    let hookVal: ReturnType<typeof useSlider> | undefined
    const TestComponent = () => {
      hookVal = useSlider(config)
      return null
    }
    render(<TestComponent />)
    return () => hookVal!
  }

  it('initializes slider with default values', () => {
    const getHook = setupHook({ defaultValue: 5 })
    const hook = getHook()
    expect(hook.values[1]).toBe(5)
  })

  it('calls onUpdate when values change', () => {
    const onUpdate = vi.fn()
    const getHook = setupHook({ defaultValue: 0, onUpdate })
    const hook = getHook()

    act(() => {
      hook.handlers.update([0, 5])
    })

    expect(onUpdate).toHaveBeenCalledWith(5)
  })
})

describe('<Slider />', () => {
  it('renders a non-range slider with correct structure', () => {
    render(<Slider defaultValue={5} />)
    expect(document.querySelector('.frui-form-slider')).toBeInTheDocument()
    expect(document.querySelector('.frui-form-slider-track')).toBeInTheDocument()
    expect(document.querySelector('.frui-form-slider-handle')).toBeInTheDocument()
    expect(document.querySelector('.frui-form-slider-input')).toBeInTheDocument()
  })

  it('renders a range slider when range prop is true', () => {
    render(<Slider range defaultValue={[2, 8]} />)
    expect(document.querySelectorAll('.frui-form-slider-handle').length).toBe(2)
    expect(document.querySelectorAll('.frui-form-slider-input').length).toBe(2)
  })

  it('renders connection when connect is true', () => {
    render(<Slider range defaultValue={[2, 8]} connect />)
    const connection = document.querySelector('.frui-form-slider-connection')
    expect(connection).toBeInTheDocument()
  })

  it('invokes onUpdate when input value changes', () => {
    const onUpdate = vi.fn()
    render(<Slider defaultValue={5} onUpdate={onUpdate} />)
    const input = screen.getByTestId('mock-input')
    act(() => {
      fireEvent.change(input, { target: { value: '7' } })
    })
    expect(onUpdate).toHaveBeenCalled()
  })
})

describe('<SliderHandle />', () => {
  it('renders handle correctly with provided context', () => {
    const ctx = {
      values: [0, 5] as [number, number],
      min: 0,
      max: 10,
      step: 1,
      asc: false,
      desc: false,
      track: { current: null },
      update: vi.fn(),
      range: false,
      angle: 0,
    }
    render(
      <SliderContext.Provider value={ctx}>
        <SliderHandle index={1} />
      </SliderContext.Provider>,
    )
    const handle = document.querySelector('.frui-form-slider-handle') as HTMLDivElement
    expect(handle).toBeInTheDocument()
    fireEvent.mouseDown(handle)
  })
})

describe('<SliderConnection />', () => {
  it('renders connection correctly with provided context', () => {
    const ctx = {
      values: [2, 8] as [number, number],
      min: 0,
      max: 10,
      step: 1,
      asc: false,
      desc: false,
      update: vi.fn(),
      range: true,
      track: { current: null },
      angle: 0,
    }
    render(
      <SliderContext.Provider value={ctx}>
        <SliderConnection />
      </SliderContext.Provider>,
    )
    const connection = document.querySelector('.frui-form-slider-connection')
    expect(connection).toBeInTheDocument()
    expect(connection?.getAttribute('style')).toContain('left')
  })
})

describe('<SliderTrack />', () => {
  it('renders track container properly', () => {
    const ref = { current: null }
    render(<SliderTrack ref={ref} />)
    const track = document.querySelector('.frui-form-slider-track')
    expect(track).toBeInTheDocument()
  })
})