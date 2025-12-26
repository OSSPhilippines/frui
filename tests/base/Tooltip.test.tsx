//--------------------------------------------------------------------//
// Imports

//frui
import Tooltip, {
  getTooltipPosition,
  TooltipContainer
} from '../../src/base/Tooltip.js';
//tests
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  waitFor
} from '@testing-library/react';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/helpers/tools/BorderRadiusTool.js', () => ({
  __esModule: true,
  default: class {
    static get() {
      return {
        getClassStyles: vi.fn()
      };
    }
  }
}));

vi.mock('../../src/helpers/tools/ColorTool.js', () => ({
  __esModule: true,
  default: class {
    static get() {
      return {
        getClassStyles: vi.fn()
      };
    }
  }
}));

vi.mock('../../src/base/Box.js', () => ({
  __esModule: true,
  default: {
    removeThemeProps: (props: Record<string, unknown>) => {
      const {
        bgc,
        color,
        curved,
        dashed,
        rounded,
        solid,
        ...rest
      } = props;
      return rest;
    }
  }
}));

beforeEach(() => vi.clearAllMocks());

//--------------------------------------------------------------------//
// Tests

describe('getTooltipPosition()', () => {
  const createMockRect = (
    width: number, 
    height: number
  ): DOMRect => ({
    bottom: 0,
    height,
    left: 0,
    right: 0,
    top: 0,
    width,
    x: 0,
    y: 0,
    toJSON: () => ({})
  } as DOMRect);

  it('returns correct bottom position and direction', () => {
    const container = document.createElement('div');
    const tooltip = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
      createMockRect(100, 20)
    );
    vi.spyOn(tooltip, 'getBoundingClientRect').mockReturnValue(
      createMockRect(50, 10)
    );
    const result = getTooltipPosition(container, tooltip, {
      bottom: true,
      left: false,
      right: false,
      top: false
    });
    expect(result.direction).toBe('top');
    expect(result.y).toBe(25);
    expect(result.x).toBe(25);
  });

  it('returns correct top position and direction', () => {
    const container = document.createElement('div');
    const tooltip = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
      createMockRect(100, 20)
    );
    vi.spyOn(tooltip, 'getBoundingClientRect').mockReturnValue(
      createMockRect(50, 10)
    );
    const result = getTooltipPosition(container, tooltip, {
      bottom: false,
      left: false,
      right: false,
      top: true
    });
    expect(result.direction).toBe('bottom');
    expect(result.y).toBe(-15);
    expect(result.x).toBe(25);
  });

  it('returns correct left position and direction', () => {
    const container = document.createElement('div');
    const tooltip = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
      createMockRect(100, 20)
    );
    vi.spyOn(tooltip, 'getBoundingClientRect').mockReturnValue(
      createMockRect(50, 10)
    );
    const result = getTooltipPosition(container, tooltip, {
      bottom: false,
      left: true,
      right: false,
      top: false
    });
    expect(result.direction).toBe('right');
    expect(result.y).toBe(5);
    expect(result.x).toBe(-55);
  });

  it('returns correct right position and direction', () => {
    const container = document.createElement('div');
    const tooltip = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
      createMockRect(100, 20)
    );
    vi.spyOn(tooltip, 'getBoundingClientRect').mockReturnValue(
      createMockRect(50, 10)
    );
    const result = getTooltipPosition(container, tooltip, {
      bottom: false,
      left: false,
      right: true,
      top: false
    });
    expect(result.direction).toBe('left');
    expect(result.y).toBe(5);
    expect(result.x).toBe(105);
  });

  it('returns correct bottom-left position and direction', () => {
    const container = document.createElement('div');
    const tooltip = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
      createMockRect(100, 20)
    );
    vi.spyOn(tooltip, 'getBoundingClientRect').mockReturnValue(
      createMockRect(50, 10)
    );
    const result = getTooltipPosition(container, tooltip, {
      bottom: true,
      left: true,
      right: false,
      top: false
    });
    expect(result.direction).toBe('top');
    expect(result.y).toBe(25);
    expect(result.x).toBe(0);
  });

  it('returns correct bottom-right position and direction', () => {
    const container = document.createElement('div');
    const tooltip = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
      createMockRect(100, 20)
    );
    vi.spyOn(tooltip, 'getBoundingClientRect').mockReturnValue(
      createMockRect(50, 10)
    );
    const result = getTooltipPosition(container, tooltip, {
      bottom: true,
      left: false,
      right: true,
      top: false
    });
    expect(result.direction).toBe('top');
    expect(result.y).toBe(25);
    expect(result.x).toBe(50);
  });

  it('returns correct top-left position and direction', () => {
    const container = document.createElement('div');
    const tooltip = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
      createMockRect(100, 20)
    );
    vi.spyOn(tooltip, 'getBoundingClientRect').mockReturnValue(
      createMockRect(50, 10)
    );
    const result = getTooltipPosition(container, tooltip, {
      bottom: false,
      left: true,
      right: false,
      top: true
    });
    expect(result.direction).toBe('bottom');
    expect(result.y).toBe(-15);
    expect(result.x).toBe(0);
  });

  it('returns correct top-right position and direction', () => {
    const container = document.createElement('div');
    const tooltip = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
      createMockRect(100, 20)
    );
    vi.spyOn(tooltip, 'getBoundingClientRect').mockReturnValue(
      createMockRect(50, 10)
    );
    const result = getTooltipPosition(container, tooltip, {
      bottom: false,
      left: false,
      right: true,
      top: true
    });
    expect(result.direction).toBe('bottom');
    expect(result.y).toBe(-15);
    expect(result.x).toBe(50);
  });
});

describe('<Tooltip />', () => {
  it('renders container with children when not visible', () => {
    const { container } = render(
      <Tooltip text="Hello">HoverMe</Tooltip>
    );
    const outer = container.querySelector('.frui-tooltip-container');
    expect(outer).toBeInTheDocument();
    expect(outer).toHaveTextContent('HoverMe');
    expect(
      container.querySelector('.frui-tooltip')
    ).not.toBeInTheDocument();
  });

  it('renders tooltip text when show is true', async () => {
    const { container } = render(
      <Tooltip show text="Visible tip">
        Target
      </Tooltip>
    );
    await waitFor(() => {
      expect(
        container.querySelector('.frui-tooltip')
      ).toBeInTheDocument();
    });
    expect(
      container.querySelector('.frui-tooltip')
    ).toHaveTextContent('Visible tip');
    expect(
      container.querySelector('.frui-tooltip')
    ).toHaveClass('frui-tooltip');
  });

  it('shows tooltip on hover', async () => {
    const { container } = render(
      <Tooltip hover text="HoverText">
        Hover
      </Tooltip>
    );
    const outer = container.querySelector('.frui-tooltip-container');
    expect(outer).toBeInTheDocument();
    expect(
      container.querySelector('.frui-tooltip')
    ).not.toBeInTheDocument();
    fireEvent.mouseEnter(outer as Element);
    await waitFor(() => {
      expect(
        container.querySelector('.frui-tooltip')
      ).toBeInTheDocument();
    });
    expect(
      container.querySelector('.frui-tooltip')
    ).toHaveTextContent('HoverText');
  });

  it('hides tooltip on mouseLeave', async () => {
    const { container } = render(
      <Tooltip hover text="HoverText">
        Hover
      </Tooltip>
    );
    const outer = container.querySelector('.frui-tooltip-container');
    expect(outer).toBeInTheDocument();
    fireEvent.mouseEnter(outer as Element);
    await waitFor(() => {
      expect(
        container.querySelector('.frui-tooltip')
      ).toBeInTheDocument();
    });
    expect(
      container.querySelector('.frui-tooltip')
    ).toHaveTextContent('HoverText');
    fireEvent.mouseLeave(outer as Element);
    await waitFor(() => {
      expect(
        container.querySelector('.frui-tooltip')
      ).not.toBeInTheDocument();
    });
  });

  it('applies arrow class when arrow prop is true', async () => {
    const { container } = render(
      <Tooltip arrow show text="Arrow tip">
        Target
      </Tooltip>
    );
    await waitFor(() => {
      expect(
        container.querySelector('.frui-tooltip')
      ).toBeInTheDocument();
    });
    const tip = container.querySelector('.frui-tooltip');
    expect(tip).toHaveClass('frui-tooltip-arrow');
  });

  it('applies custom className when provided', async () => {
    const { container } = render(
      <Tooltip className="custom-tooltip" show text="Custom">
        Target
      </Tooltip>
    );
    await waitFor(() => {
      expect(
        container.querySelector('.frui-tooltip')
      ).toBeInTheDocument();
    });
    const tip = container.querySelector('.frui-tooltip');
    expect(tip).toHaveClass('frui-tooltip');
    expect(tip).toHaveClass('custom-tooltip');
  });

  it('applies custom opacity when provided', async () => {
    const { container } = render(
      <Tooltip opacity={50} show text="Half opacity">
        Target
      </Tooltip>
    );
    await waitFor(() => {
      expect(
        container.querySelector('.frui-tooltip')
      ).toBeInTheDocument();
    });
    const tip = container.querySelector('.frui-tooltip');
    expect(tip).toHaveStyle({ opacity: 0.5 });
  });

  it('passes container props to TooltipContainer', () => {
    const { container } = render(
      <Tooltip 
        container={{ className: 'custom-container' }} 
        text="Test"
      >
        Content
      </Tooltip>
    );
    const outer = container.querySelector('.frui-tooltip-container');
    expect(outer).toHaveClass('frui-tooltip-container');
    expect(outer).toHaveClass('custom-container');
  });
});

describe('<TooltipContainer />', () => {
  it('renders with base class and children', () => {
    const { container } = render(
      <TooltipContainer>tip</TooltipContainer>
    );
    const el = container.firstChild;
    expect(el).toHaveClass('frui-tooltip-container');
    expect(el).toHaveTextContent('tip');
  });

  it('applies additional custom class names', () => {
    const { container } = render(
      <TooltipContainer className="extra">content</TooltipContainer>
    );
    const el = container.firstChild;
    expect(el).toHaveClass('frui-tooltip-container');
    expect(el).toHaveClass('extra');
  });

  it('passes through additional HTML attributes', () => {
    const { container } = render(
      <TooltipContainer data-testid="test-container">
        content
      </TooltipContainer>
    );
    const el = container.firstChild;
    expect(el).toHaveAttribute('data-testid', 'test-container');
  });
});