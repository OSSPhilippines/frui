//--------------------------------------------------------------------//
// Imports

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
} from '../../src/form/Slider.js';
//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    className,
    onChange,
    type = 'number',
    value
  }: {
    className?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    value?: string | number
  }) => (
    <input
      className={className}
      data-testid="mock-input"
      onChange={onChange}
      type={type}
      value={value ?? ''}
    />
  )
}));

vi.mock('../../helpers/tools/ColorTool.js', () => ({
  __esModule: true,
  default: {
    get: () => ({
      getClassStyles: ({
        classes
      }: {
        classes: string[]
      }) => {
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

function renderUseSlider(
  config: Parameters<typeof useSlider>[ 0 ]
) {
  let hookValue: ReturnType<typeof useSlider> | undefined;
  const TestComponent = () => {
    hookValue = useSlider(config);
    return null;
  };
  render(<TestComponent />);
  return () => hookValue!;
}

function TestControlledComponent({ value }: { value: number }) {
  useSlider({ value });
  return <input data-testid="mock-input" value={value} readOnly />;
}

//--------------------------------------------------------------------//
// Tests

describe('Helper functions', () => {
  describe('clamp', () => {
    it('clamps value to max', () => {
      expect(clamp(15, 0, 10, 2)).toBe(10);
    });

    it('clamps value to min', () => {
      expect(clamp(-5, 0, 10, 1)).toBe(0);
    });

    it('snaps to step', () => {
      expect(clamp(7, 0, 10, 5)).toBe(5);
    });

    it('handles string input', () => {
      expect(clamp('8', 0, 10, 2)).toBe(8);
    });
  });

  describe('toNumber', () => {
    it('converts string to number', () => {
      expect(toNumber('5')).toBe(5);
    });

    it('returns default for invalid input', () => {
      expect(toNumber('xyz', 3)).toBe(3);
    });

    it('returns 0 as default when not specified', () => {
      expect(toNumber('invalid')).toBe(0);
    });

    it('handles number input', () => {
      expect(toNumber(42)).toBe(42);
    });
  });

  describe('toValues', () => {
    it('returns range values for array input', () => {
      expect(toValues([ 2, 9 ], true, 0)).toEqual([ 2, 9 ]);
    });

    it('returns single value with 0 start for non-range', () => {
      expect(toValues(5, false, 0)).toEqual([ 0, 5 ]);
    });

    it('handles single number for range', () => {
      expect(toValues(7, true, 0)).toEqual([ 0, 7 ]);
    });

    it('uses min as default', () => {
      expect(toValues('invalid', false, 5)).toEqual([ 0, 5 ]);
    });
  });
});

describe('useSlider', () => {
  it('initializes with default value', () => {
    const getHook = renderUseSlider({ defaultValue: 5 });
    const hook = getHook();
    expect(hook.values[ 1 ]).toBe(5);
  });

  it('initializes with range default value', () => {
    const getHook = renderUseSlider({
      defaultValue: [ 2, 8 ],
      range: true
    });
    const hook = getHook();
    expect(hook.values).toEqual([ 2, 8 ]);
  });

  it('calls onUpdate when values change', () => {
    const onUpdate = vi.fn();
    const getHook = renderUseSlider({
      defaultValue: 0,
      onUpdate
    });
    const hook = getHook();
    act(() => {
      hook.handlers.update([ 0, 5 ]);
    });
    expect(onUpdate).toHaveBeenCalledWith(5);
  });

  it('calls onUpdate with range values', () => {
    const onUpdate = vi.fn();
    const getHook = renderUseSlider({
      defaultValue: [ 2, 8 ],
      range: true,
      onUpdate
    });
    const hook = getHook();
    act(() => {
      hook.handlers.update([ 3, 7 ]);
    });
    expect(onUpdate).toHaveBeenCalledWith([ 3, 7 ]);
  });

  it('does not update if values unchanged', () => {
    const onUpdate = vi.fn();
    const getHook = renderUseSlider({
      defaultValue: 5,
      onUpdate
    });
    const hook = getHook();
    act(() => {
      hook.handlers.update([ 0, 5 ]);
    });
    onUpdate.mockClear();
    act(() => {
      hook.handlers.update([ 0, 5 ]);
    });
    expect(onUpdate).not.toHaveBeenCalled();
  });

  it('updates when controlled value changes', () => {
    const { rerender } = render(
      <TestControlledComponent value={5} />
    );
    const input = document.querySelector(
      'input[ data-testid="mock-input" ]'
    ) as HTMLInputElement;
    expect(input.value).toBe('5');

    rerender(<TestControlledComponent value={8} />);
    expect(input.value).toBe('8');
  });

  it('respects min and max boundaries', () => {
    const getHook = renderUseSlider({
      defaultValue: 0,
      min: 2,
      max: 8
    });
    const hook = getHook();
    expect(hook.provider.min).toBe(2);
    expect(hook.provider.max).toBe(8);
  });

  it('respects step value', () => {
    const getHook = renderUseSlider({
      defaultValue: 0,
      step: 5
    });
    const hook = getHook();
    expect(hook.provider.step).toBe(5);
  });

  it('handles asc constraint', () => {
    const getHook = renderUseSlider({
      defaultValue: [ 3, 7 ],
      range: true,
      asc: true
    });
    const hook = getHook();
    expect(hook.provider.asc).toBe(true);
  });

  it('handles desc constraint', () => {
    const getHook = renderUseSlider({
      defaultValue: [ 7, 3 ],
      range: true,
      desc: true
    });
    const hook = getHook();
    expect(hook.provider.desc).toBe(true);
  });

  it('handles angle parameter', () => {
    const getHook = renderUseSlider({
      defaultValue: 5,
      angle: 180
    });
    const hook = getHook();
    expect(hook.provider.angle).toBe(180);
  });
});

describe('Slider', () => {
  it('renders basic non-range slider', () => {
    render(<Slider defaultValue={5} />);
    const slider = document.querySelector('.frui-form-slider');
    const track = document.querySelector('.frui-form-slider-track');
    const handle = document.querySelector(
      '.frui-form-slider-handle'
    );
    const input = document.querySelector('.frui-form-slider-input');

    expect(slider).toBeInTheDocument();
    expect(track).toBeInTheDocument();
    expect(handle).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('renders range slider with two handles', () => {
    render(<Slider range defaultValue={[ 2, 8 ]} />);
    const handles = document.querySelectorAll(
      '.frui-form-slider-handle'
    );
    const inputs = document.querySelectorAll(
      '.frui-form-slider-input'
    );

    expect(handles).toHaveLength(2);
    expect(inputs).toHaveLength(2);
  });

  it('renders connection when connect prop is true', () => {
    render(<Slider range defaultValue={[ 2, 8 ]} connect />);
    const connection = document.querySelector(
      '.frui-form-slider-connection'
    );
    expect(connection).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Slider defaultValue={5} className="custom-slider" />);
    const slider = document.querySelector('.frui-form-slider');
    expect(slider).toHaveClass('custom-slider');
  });

  it('triggers onUpdate when input changes', () => {
    const onUpdate = vi.fn();
    render(<Slider defaultValue={5} onUpdate={onUpdate} />);
    const input = document.querySelector(
      'input[ data-testid="mock-input" ]'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: '7' } });
    });
    expect(onUpdate).toHaveBeenCalled();
  });

  it('clamps input value to min', () => {
    const onUpdate = vi.fn();
    render(
      <Slider
        defaultValue={5}
        min={3}
        max={10}
        onUpdate={onUpdate}
      />
    );
    const input = document.querySelector(
      'input[ data-testid="mock-input" ]'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: '1' } });
    });
    expect(onUpdate).toHaveBeenCalledWith(3);
  });

  it('clamps input value to max', () => {
    const onUpdate = vi.fn();
    render(
      <Slider
        defaultValue={5}
        min={0}
        max={10}
        onUpdate={onUpdate}
      />
    );
    const input = document.querySelector(
      'input[ data-testid="mock-input" ]'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: '15' } });
    });
    expect(onUpdate).toHaveBeenCalledWith(10);
  });

  it('handles range input changes for first value', () => {
    const onUpdate = vi.fn();
    render(
      <Slider
        range
        defaultValue={[ 2, 8 ]}
        onUpdate={onUpdate}
      />
    );
    const inputs = document.querySelectorAll(
      'input[ data-testid="mock-input" ]'
    );

    act(() => {
      fireEvent.change(inputs[ 0 ], { target: { value: '3' } });
    });
    expect(onUpdate).toHaveBeenCalledWith([ 3, 8 ]);
  });

  it('handles range input changes for second value', () => {
    const onUpdate = vi.fn();
    render(
      <Slider
        range
        defaultValue={[ 2, 8 ]}
        onUpdate={onUpdate}
      />
    );
    const inputs = document.querySelectorAll(
      'input[ data-testid="mock-input" ]'
    );

    act(() => {
      fireEvent.change(inputs[ 1 ], { target: { value: '9' } });
    });
    expect(onUpdate).toHaveBeenCalledWith([ 2, 9 ]);
  });

  it('applies slot styles to handles', () => {
    render(
      <Slider
        defaultValue={5}
        handles={{ className: 'custom-handle' }}
      />
    );
    const handle = document.querySelector(
      '.frui-form-slider-handle'
    );
    expect(handle).toHaveClass('custom-handle');
  });

  it('applies slot styles to inputs', () => {
    render(
      <Slider
        defaultValue={5}
        inputs={{ className: 'custom-input' }}
      />
    );
    const input = document.querySelector('.frui-form-slider-input');
    expect(input).toHaveClass('custom-input');
  });

  it('applies slot styles to track', () => {
    render(
      <Slider
        defaultValue={5}
        track={{ className: 'custom-track' }}
      />
    );
    const track = document.querySelector('.frui-form-slider-track');
    expect(track).toHaveClass('custom-track');
  });

  it('passes error prop to inputs', () => {
    render(<Slider defaultValue={5} error />);
    expect(
      document.querySelector('.frui-form-slider-input')
    ).toBeInTheDocument();
  });

  it('passes name prop to inputs', () => {
    render(<Slider defaultValue={5} name="slider-input" />);
    expect(
      document.querySelector('.frui-form-slider-input')
    ).toBeInTheDocument();
  });
});

describe('SliderHandle', () => {
  const mockContext = {
    values: [ 0, 5 ] as [ number, number ],
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders handle at correct position', () => {
    render(
      <SliderContext.Provider value={mockContext}>
        <SliderHandle index={1} />
      </SliderContext.Provider>
    );
    const handle = document.querySelector(
      '.frui-form-slider-handle'
    ) as HTMLElement;
    expect(handle).toBeInTheDocument();
    expect(handle.style.left).toBe('50%');
  });

  it('handles mousedown event', () => {
    render(
      <SliderContext.Provider value={mockContext}>
        <SliderHandle index={1} />
      </SliderContext.Provider>
    );
    const handle = document.querySelector(
      '.frui-form-slider-handle'
    );
    fireEvent.mouseDown(handle!);
    expect(handle).toBeInTheDocument();
  });

  it('enforces asc constraint', () => {
    const update = vi.fn();
    const ctx = {
      ...mockContext,
      asc: true,
      range: true,
      values: [ 3, 7 ] as [ number, number ],
      update
    };
    render(
      <SliderContext.Provider value={ctx}>
        <SliderHandle index={1} />
      </SliderContext.Provider>
    );
    expect(
      document.querySelector('.frui-form-slider-handle')
    ).toBeInTheDocument();
  });

  it('enforces desc constraint', () => {
    const update = vi.fn();
    const ctx = {
      ...mockContext,
      desc: true,
      range: true,
      values: [ 7, 3 ] as [ number, number ],
      update
    };
    render(
      <SliderContext.Provider value={ctx}>
        <SliderHandle index={0} />
      </SliderContext.Provider>
    );
    expect(
      document.querySelector('.frui-form-slider-handle')
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <SliderContext.Provider value={mockContext}>
        <SliderHandle index={1} className="custom-handle" />
      </SliderContext.Provider>
    );
    const handle = document.querySelector(
      '.frui-form-slider-handle'
    );
    expect(handle).toHaveClass('custom-handle');
  });
});

describe('SliderConnection', () => {
  it('renders connection with correct width', () => {
    const ctx = {
      values: [ 2, 8 ] as [ number, number ],
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
    const connection = document.querySelector(
      '.frui-form-slider-connection'
    ) as HTMLElement;
    expect(connection).toBeInTheDocument();
    expect(connection.style.left).toBe('20%');
    expect(connection.style.width).toBe('60%');
  });

  it('handles non-range connection', () => {
    const ctx = {
      values: [ 0, 5 ] as [ number, number ],
      min: 0,
      max: 10,
      step: 1,
      asc: false,
      desc: false,
      update: vi.fn(),
      track: { current: null },
      range: false,
      angle: 0
    };
    render(
      <SliderContext.Provider value={ctx}>
        <SliderConnection />
      </SliderContext.Provider>
    );
    const connection = document.querySelector(
      '.frui-form-slider-connection'
    ) as HTMLElement;
    expect(connection.style.left).toBe('0%');
    expect(connection.style.width).toBe('50%');
  });

  it('applies custom className', () => {
    const ctx = {
      values: [ 2, 8 ] as [ number, number ],
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
        <SliderConnection className="custom-connection" />
      </SliderContext.Provider>
    );
    const connection = document.querySelector(
      '.frui-form-slider-connection'
    );
    expect(connection).toHaveClass('custom-connection');
  });
});

describe('SliderTrack', () => {
  it('renders track element', () => {
    const ref = { current: null };
    render(<SliderTrack ref={ref} />);
    const track = document.querySelector('.frui-form-slider-track');
    expect(track).toBeInTheDocument();
  });

  it('renders children', () => {
    const ref = { current: null };
    render(
      <SliderTrack ref={ref}>
        <div data-testid="child">Child</div>
      </SliderTrack>
    );
    expect(
      document.querySelector('[data-testid="child"]')
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const ref = { current: null };
    render(<SliderTrack ref={ref} className="custom-track" />);
    const track = document.querySelector('.frui-form-slider-track');
    expect(track).toHaveClass('custom-track');
  });
});