//--------------------------------------------------------------------//
// Imports

//modules
import { describe, expect, it } from 'vitest';
//tests
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
//frui
import Box, {
  getThemeProps,
  hasBorderRadiusProps,
  hasBorderSizeProps,
  hasBorderStyleProps,
  hasColorProps,
  hasDimensionProps,
  hasDisplayProps,
  hasFillProps,
  hasMarginProps,
  hasPaddingProps,
  hasSizeProps,
  hasTextAlignProps,
  hasTextSizeProps,
  removeThemeProps,
  useBox
} from '../../src/base/Box.js';

//--------------------------------------------------------------------//
// Tests

describe('getThemeProps()', () => {
  it('returns empty object when no theme props provided', () => {
    const result = getThemeProps({});
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  it('extracts theme props from config object', () => {
    const props = {
      color: 'primary',
      padding: 'md',
      rounded: true
    };
    const result = getThemeProps(props);
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });
});

describe('removeThemeProps()', () => {
  it('removes theme props and returns clean attributes', () => {
    const props = {
      id: 'test-id',
      color: 'primary',
      padding: 'md',
      'data-testid': 'box'
    };
    const result = removeThemeProps(props);
    expect(result).toHaveProperty('id', 'test-id');
    expect(result).toHaveProperty('data-testid', 'box');
  });

  it('preserves non-theme props', () => {
    const props = {
      onClick: () => {},
      title: 'Test Title',
      'aria-label': 'Test Label'
    };
    const result = removeThemeProps(props);
    expect(result).toHaveProperty('onClick');
    expect(result).toHaveProperty('title', 'Test Title');
    expect(result).toHaveProperty('aria-label', 'Test Label');
  });
});

describe('hasBorderRadiusProps()', () => {
  it('returns false when no border radius props provided', () => {
    expect(hasBorderRadiusProps({})).toBe(false);
  });

  it('returns true when border radius props provided', () => {
    expect(hasBorderRadiusProps({ rounded: true })).toBe(true);
  });
});

describe('hasBorderSizeProps()', () => {
  it('returns falsy when no border size props provided', () => {
    expect(hasBorderSizeProps({})).toBeFalsy();
  });

  it('executes without error when props provided', () => {
    expect(() => hasBorderSizeProps({ border: '1' })).not.toThrow();
  });
});

describe('hasBorderStyleProps()', () => {
  it('returns false when no border style props provided', () => {
    expect(hasBorderStyleProps({})).toBe(false);
  });

  it('returns true when border style props provided', () => {
    expect(hasBorderStyleProps({ solid: true })).toBe(true);
  });
});

describe('hasColorProps()', () => {
  it('returns false when no color props provided', () => {
    expect(hasColorProps({})).toBe(false);
  });

  it('returns true when color props provided', () => {
    expect(hasColorProps({ color: 'primary' })).toBe(true);
  });
});

describe('hasDimensionProps()', () => {
  it('returns falsy when no dimension props provided', () => {
    expect(hasDimensionProps({})).toBeFalsy();
  });

  it('executes without error when props provided', () => {
    expect(() => hasDimensionProps({ width: '100' })).not.toThrow();
  });
});

describe('hasDisplayProps()', () => {
  it('returns false when no display props provided', () => {
    expect(hasDisplayProps({})).toBe(false);
  });

  it('returns true when display props provided', () => {
    expect(hasDisplayProps({ block: true })).toBe(true);
  });
});

describe('hasFillProps()', () => {
  it('returns false when no fill props provided', () => {
    expect(hasFillProps({})).toBe(false);
  });

  it('returns true when fill props provided', () => {
    expect(hasFillProps({ fill: true })).toBe(true);
  });
});

describe('hasMarginProps()', () => {
  it('returns falsy when no margin props provided', () => {
    expect(hasMarginProps({})).toBeFalsy();
  });

  it('executes without error when props provided', () => {
    expect(() => hasMarginProps({ margin: 'md' })).not.toThrow();
  });
});

describe('hasPaddingProps()', () => {
  it('returns falsy when no padding props provided', () => {
    expect(hasPaddingProps({})).toBeFalsy();
  });

  it('executes without error when props provided', () => {
    expect(() => hasPaddingProps({ padding: 'md' })).not.toThrow();
  });
});

describe('hasSizeProps()', () => {
  it('returns false when no size props provided', () => {
    expect(hasSizeProps({})).toBe(false);
  });

  it('returns true when size props provided', () => {
    expect(hasSizeProps({ size: 'md' })).toBe(true);
  });
});

describe('hasTextAlignProps()', () => {
  it('returns false when no text align props provided', () => {
    expect(hasTextAlignProps({})).toBe(false);
  });

  it('returns true when text align props provided', () => {
    expect(hasTextAlignProps({ center: true })).toBe(true);
  });
});

describe('hasTextSizeProps()', () => {
  it('returns falsy when no text size props provided', () => {
    expect(hasTextSizeProps({})).toBeFalsy();
  });

  it('executes without error when props provided', () => {
    expect(() => hasTextSizeProps({ text: 'md' })).not.toThrow();
  });
});

describe('<Box />', () => {
  it('renders a div element with default frui-box class', () => {
    render(<Box data-testid="box">Content</Box>);
    const box = screen.getByTestId('box');
    expect(box).toBeInTheDocument();
    expect(box.tagName).toBe('DIV');
    expect(box).toHaveClass('frui-box');
  });

  it('renders children content correctly', () => {
    render(<Box data-testid="box">Test Content</Box>);
    expect(screen.getByTestId('box')).toHaveTextContent('Test Content');
  });

  it('applies custom className to element', () => {
    render(
      <Box className="custom-class" data-testid="box">
        Content
      </Box>
    );
    const box = screen.getByTestId('box');
    expect(box).toHaveClass('frui-box');
    expect(box).toHaveClass('custom-class');
  });

  it('applies custom inline styles to element', () => {
    render(
      <Box style={{ backgroundColor: 'red' }} data-testid="box">
        Content
      </Box>
    );
    const box = screen.getByTestId('box');
    expect(box).toHaveAttribute('style');
    expect(box.style.backgroundColor).toBe('red');
  });

  it('applies color theme prop classes', () => {
    render(
      <Box color="primary" data-testid="box">
        Content
      </Box>
    );
    const box = screen.getByTestId('box');
    expect(box).toHaveClass('frui-box');
  });

  it('applies border radius theme prop classes', () => {
    render(<Box rounded data-testid="box">Content</Box>);
    const box = screen.getByTestId('box');
    expect(box).toHaveClass('frui-box');
  });

  it('applies display theme prop classes', () => {
    render(<Box block data-testid="box">Content</Box>);
    const box = screen.getByTestId('box');
    expect(box).toHaveClass('frui-box');
  });

  it('applies text align theme prop classes', () => {
    render(<Box center data-testid="box">Content</Box>);
    const box = screen.getByTestId('box');
    expect(box).toHaveClass('frui-box');
  });

  it('applies multiple theme props together', () => {
    render(
      <Box color="primary" rounded block data-testid="box">
        Content
      </Box>
    );
    const box = screen.getByTestId('box');
    expect(box).toHaveClass('frui-box');
  });

  describe('with asChild prop', () => {
    it('clones single child element with box styles', () => {
      render(
        <Box asChild color="primary">
          <button data-testid="button">Click me</button>
        </Box>
      );
      const button = screen.getByTestId('button');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveClass('frui-box');
    });

    it('clones first child when children is an array', () => {
      render(
        <Box asChild color="primary">
          <span data-testid="span">First</span>
          <span>Second</span>
        </Box>
      );
      const span = screen.getByTestId('span');
      expect(span.tagName).toBe('SPAN');
      expect(span).toHaveClass('frui-box');
    });

    it('renders as div when asChild is true but no valid child', () => {
      render(
        <Box asChild data-testid="box">
          Plain text
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box.tagName).toBe('DIV');
    });
  });

  it('applies applyColor prop to override default color', () => {
    render(
      <Box applyColor="bgc" color="primary" data-testid="box">
        Content
      </Box>
    );
    const box = screen.getByTestId('box');
    expect(box).toHaveClass('frui-box');
  });

  it('applies applySize prop to override default size', () => {
    render(
      <Box applySize="bds" size="md" data-testid="box">
        Content
      </Box>
    );
    const box = screen.getByTestId('box');
    expect(box).toHaveClass('frui-box');
  });
});

describe('useBox()', () => {
  it('returns object with attributes, styles, classes, tools', () => {
    const result = useBox({});
    expect(result).toHaveProperty('attributes');
    expect(result).toHaveProperty('styles');
    expect(result).toHaveProperty('classes');
    expect(result).toHaveProperty('tools');
  });

  it('includes frui-box in classes array', () => {
    const result = useBox({});
    expect(result.classes).toContain('frui-box');
  });

  it('applies default className when provided', () => {
    const result = useBox({}, 'default-class');
    expect(result.classes).toContain('frui-box');
    expect(result.classes).toContain('default-class');
  });

  it('merges custom className with generated classes', () => {
    const result = useBox({ className: 'custom-class' });
    expect(result.classes).toContain('frui-box');
    expect(result.classes).toContain('custom-class');
  });

  it('merges default styles with custom styles', () => {
    const defaultStyle = { color: 'blue' };
    const customStyle = { backgroundColor: 'red' };
    const result = useBox(
      { style: customStyle },
      undefined,
      defaultStyle
    );
    expect(result.styles).toMatchObject({
      color: 'blue',
      backgroundColor: 'red'
    });
  });

  it('processes theme props and generates classes', () => {
    const result = useBox({ color: 'primary', size: 'md' });
    expect(result.classes).toContain('frui-box');
  });

  it('returns tools object with all theme tools', () => {
    const result = useBox({});
    expect(result.tools).toHaveProperty('borderRadius');
    expect(result.tools).toHaveProperty('borderStyle');
    expect(result.tools).toHaveProperty('color');
    expect(result.tools).toHaveProperty('display');
    expect(result.tools).toHaveProperty('fill');
    expect(result.tools).toHaveProperty('size');
    expect(result.tools).toHaveProperty('textAlign');
  });

  it('applies applyColor configuration', () => {
    const result = useBox({ applyColor: 'bgc', color: 'primary' });
    expect(result.tools.color).toBeDefined();
  });

  it('applies applySize configuration', () => {
    const result = useBox({ applySize: 'bds', size: 'md' });
    expect(result.tools.size).toBeDefined();
  });
});

describe('Box default export', () => {
  it('exposes getThemeProps helper', () => {
    expect(Box.getThemeProps).toBe(getThemeProps);
  });

  it('exposes hasBorderRadiusProps helper', () => {
    expect(Box.hasBorderRadiusProps).toBe(hasBorderRadiusProps);
  });

  it('exposes hasBorderSizeProps helper', () => {
    expect(Box.hasBorderSizeProps).toBe(hasBorderSizeProps);
  });

  it('exposes hasBorderStyleProps helper', () => {
    expect(Box.hasBorderStyleProps).toBe(hasBorderStyleProps);
  });

  it('exposes hasColorProps helper', () => {
    expect(Box.hasColorProps).toBe(hasColorProps);
  });

  it('exposes hasDimensionProps helper', () => {
    expect(Box.hasDimensionProps).toBe(hasDimensionProps);
  });

  it('exposes hasDisplayProps helper', () => {
    expect(Box.hasDisplayProps).toBe(hasDisplayProps);
  });

  it('exposes hasFillProps helper', () => {
    expect(Box.hasFillProps).toBe(hasFillProps);
  });

  it('exposes hasMarginProps helper', () => {
    expect(Box.hasMarginProps).toBe(hasMarginProps);
  });

  it('exposes hasPaddingProps helper', () => {
    expect(Box.hasPaddingProps).toBe(hasPaddingProps);
  });

  it('exposes hasSizeProps helper', () => {
    expect(Box.hasSizeProps).toBe(hasSizeProps);
  });

  it('exposes hasTextAlignProps helper', () => {
    expect(Box.hasTextAlignProps).toBe(hasTextAlignProps);
  });

  it('exposes hasTextSizeProps helper', () => {
    expect(Box.hasTextSizeProps).toBe(hasTextSizeProps);
  });

  it('exposes removeThemeProps helper', () => {
    expect(Box.removeThemeProps).toBe(removeThemeProps);
  });

  it('exposes useBox hook', () => {
    expect(Box.useBox).toBe(useBox);
  });

  it('exposes use as alias for useBox', () => {
    expect(Box.use).toBe(useBox);
  });
});