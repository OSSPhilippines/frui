//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Button from '../../frui/src/form/Button.js';

//--------------------------------------------------------------------//
// Tests

describe('<Button />', () => {
  describe('Rendering', () => {
    it('renders button element by default', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders anchor element when href provided', () => {
      render(<Button href="/test">Link</Button>);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });

    it('applies target and title to anchor', () => {
      render(
        <Button href="/test" target="_blank" title="Test">
          Link
        </Button>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('title', 'Test');
    });

    it('applies title to button', () => {
      render(<Button title="Test">Click</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Test');
    });

    it('passes native button attributes', () => {
      render(
        <Button disabled type="submit">
          Submit
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('Layout classes', () => {
    it('applies block class', () => {
      render(<Button block>Block</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-block');
    });

    it('applies full class', () => {
      render(<Button full>Full</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-full');
    });
  });

  describe('Size variants', () => {
    it('applies md size by default', () => {
      render(<Button>Default</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-btn-md');
    });

    it('applies xs size', () => {
      render(<Button xs>XS</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-btn-xs');
    });

    it('applies sm size', () => {
      render(<Button sm>SM</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-btn-sm');
    });

    it('applies lg size', () => {
      render(<Button lg>LG</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-btn-lg');
    });

    it('applies xl size', () => {
      render(<Button xl>XL</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-btn-xl');
    });

    it('applies 2xl size', () => {
      render(<Button xl2>2XL</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-btn-2xl');
    });

    it('applies 3xl size', () => {
      render(<Button xl3>3XL</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-btn-3xl');
    });

    it('applies 4xl size', () => {
      render(<Button xl4>4XL</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-btn-4xl');
    });

    it('applies 5xl size', () => {
      render(<Button xl5>5XL</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-btn-5xl');
    });
  });

  describe('Border radius variants', () => {
    it('applies curved class', () => {
      render(<Button curved>Curved</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-curved');
    });

    it('applies rounded class', () => {
      render(<Button rounded>Rounded</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-rounded');
    });

    it('applies pill class', () => {
      render(<Button pill>Pill</Button>);
      expect(screen.getByRole('button')).toHaveClass('frui-pill');
    });
  });

  describe('Solid layout colors', () => {
    it('applies info color', () => {
      render(<Button info>Info</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('frui-bg-info', 'frui-tx-white');
    });

    it('applies warning color', () => {
      render(<Button warning>Warning</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('frui-bg-warning', 'frui-tx-white');
    });

    it('applies success color', () => {
      render(<Button success>Success</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('frui-bg-success', 'frui-tx-white');
    });

    it('applies error color', () => {
      render(<Button error>Error</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('frui-bg-error', 'frui-tx-white');
    });

    it('applies muted color', () => {
      render(<Button muted>Muted</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('frui-bg-muted', 'frui-tx-white');
    });

    it('applies custom color as background', () => {
      render(<Button color="#ff0000">Custom</Button>);
      expect(screen.getByRole('button')).toHaveStyle({
        backgroundColor: '#ff0000'
      });
    });
  });

  describe('Outline layout', () => {
    it('applies outline classes', () => {
      render(<Button outline>Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'frui-solid',
        'frui-thin',
        'frui-bg-white'
      );
    });

    it('applies info outline color', () => {
      render(<Button info outline>Info</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('frui-bd-info', 'frui-tx-info');
    });

    it('applies custom outline color', () => {
      render(
        <Button color="#ff0000" outline>
          Custom
        </Button>
      );
      expect(screen.getByRole('button')).toHaveStyle({
        borderColor: '#ff0000',
        color: '#ff0000'
      });
    });
  });

  describe('Transparent layout', () => {
    it('applies transparent classes', () => {
      render(<Button transparent>Transparent</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('frui-solid', 'frui-thin');
      expect(button).not.toHaveClass('frui-bg-white');
    });

    it('applies info transparent color', () => {
      render(<Button info transparent>Info</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('frui-bd-info', 'frui-tx-info');
    });
  });

  describe('Custom styling', () => {
    it('applies custom className', () => {
      render(<Button className="custom">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom', 'frui-btn');
    });

    it('applies custom styles', () => {
      render(
        <Button style={{ padding: '20px' }}>
          Custom
        </Button>
      );
      expect(screen.getByRole('button')).toHaveStyle({
        padding: '20px'
      });
    });

    it('handles false style prop', () => {
      render(<Button style={false}>No Style</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});