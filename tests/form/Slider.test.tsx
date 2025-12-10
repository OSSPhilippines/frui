//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import {
  Slider,
  SliderConnection,
  SliderContext,
  SliderHandle,
  SliderTrack,
  clamp,
  toNumber,
  toValues,
  useSlider
} from '../../src/form/Slider';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
    type = 'number',
    className
  }: {
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    className?: string;
  }) => (
    <input
      data-testid="mock-input"
      type={type}
      className={className}
      value={value ?? ''}
      onChange={(e) =>
        onChange?.(e as React.ChangeEvent<HTMLInputElement>)
      }
    />
  )
}));
vi.mock('../../helpers/tools/ColorTool.js', () => ({
  __esModule: true,
  default: {
    get: () => ({
      getClassStyles: ({ classes }: { classes: string[] }) => {
        classes.push('color-class');
      },
      config: {}
    })
  }
}));
vi.mock('../../helpers/tools/BackgroundColorTool.js', () => ({
  __esModule: true,
  default: {
    get: () => ({
      toColorProps: () => ({})
    })
  }
}));
vi.mock('../../helpers/getSlotStyles.js', () => ({
  __esModule: true,
  default: () => ({})
}));

//--------------------------------------------------------------------//
// Helpers

describe('Helper functions', () => {
  it('clamp bounds value within range', () => {
    expect(clamp(15, 0, 10, 2)).toBe(10);
    expect(clamp(-5, 0, 10, 1)).toBe(0);
  });

  it('toNumber converts string to number or uses default', () => {
    expect(toNumber('5')).toBe(5);
    expect(toNumber('xyz', 3)).toBe(3);
  });

  it('toValues returns correct value pairs', () => {
    expect(toValues(5, false, 0)).toEqual([0, 5]);
    expect(toValues([2, 9], true, 0)).toEqual([2, 9]);
  });
});

//--------------------------------------------------------------------//
// Hooks

describe('useSlider()', () => {
  function renderUseSlider(config: Parameters<typeof useSlider>[0]) {
    let hookValue: ReturnType<typeof useSlider> | undefined;
    const TestComponent = () => {
      hookValue = useSlider(config);
      return null;
    };
    render(<TestComponent />);
    return () => hookValue!;
  }

  it('initializes with default values', () => {
    const getHook = renderUseSlider({ defaultValue: 5 });
    const hook = getHook();
    expect(hook.values[1]).toBe(5);
  });

  it('calls onUpdate when values change', () => {
    const onUpdate = vi.fn();
    const getHook = renderUseSlider({ defaultValue: 0, onUpdate });
    const hook = getHook();
    act(() => {
      hook.handlers.update([0, 5]);
    });
    expect(onUpdate).toHaveBeenCalledWith(5);
  });
});

//--------------------------------------------------------------------//
// Tests

describe('<Slider />', () => {
  it('renders a basic non-range slider structure', () => {
    render(<Slider defaultValue={5} />);
    expect(document.querySelector('.frui-form-slider')).toBeInTheDocument();
    expect(document.querySelector('.frui-form-slider-track')).toBeInTheDocument();
    expect(document.querySelector('.frui-form-slider-handle')).toBeInTheDocument();
    expect(document.querySelector('.frui-form-slider-input')).toBeInTheDocument();
  });

  it('renders a range slider when range=true', () => {
    render(<Slider range defaultValue={[2, 8]} />);
    expect(document.querySelectorAll('.frui-form-slider-handle')).toHaveLength(2);
    expect(document.querySelectorAll('.frui-form-slider-input')).toHaveLength(2);
  });

  it('renders connection when connect=true', () => {
    render(<Slider range defaultValue={[2, 8]} connect />);
    const connection = document.querySelector('.frui-form-slider-connection');
    expect(connection).toBeInTheDocument();
  });

  it('triggers onUpdate when input changes', () => {
    const onUpdate = vi.fn();
    render(<Slider defaultValue={5} onUpdate={onUpdate} />);
    const input = screen.getByTestId('mock-input');
    act(() => {
      fireEvent.change(input, { target: { value: '7' } });
    });
    expect(onUpdate).toHaveBeenCalled();
  });
});
describe('<SliderHandle />', () => {
  it('renders handle using context', () => {
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
      angle: 0
    };

    render(
      <SliderContext.Provider value={ctx}>
        <SliderHandle index={1} />
      </SliderContext.Provider>
    );

    const handle = document.querySelector('.frui-form-slider-handle');
    expect(handle).toBeInTheDocument();
    fireEvent.mouseDown(handle!);
  });
});
describe('<SliderConnection />', () => {
  it('renders connection with correct context', () => {
    const ctx = {
      values: [2, 8] as [number, number],
      min: 0,
      max: 10,
      step: 1,
      asc: false,
      desc: false,
      update: vi.fn(),
      track: { current: null },
      range: true,
      angle: 0
    };

    render(
      <SliderContext.Provider value={ctx}>
        <SliderConnection />
      </SliderContext.Provider>
    );

    const connection = document.querySelector('.frui-form-slider-connection');
    expect(connection).toBeInTheDocument();
    expect(connection?.getAttribute('style')).toContain('left');
  });
});
describe('<SliderTrack />', () => {
  it('renders track element correctly', () => {
    const ref = { current: null };
    render(<SliderTrack ref={ref} />);
    expect(document.querySelector('.frui-form-slider-track')).toBeInTheDocument();
  });
});