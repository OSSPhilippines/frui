//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Badge from '../../frui/src/element/Badge';

//--------------------------------------------------------------------//
// Tests

describe('Badge Component', () => {
  describe('basic rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders as span element', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge.tagName).toBe('SPAN');
    });

    it('applies base frui-badge class', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-badge');
    });

    it('applies custom className', () => {
      render(<Badge className="custom-class">Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-badge', 'custom-class');
    });
  });

  describe('layout variants', () => {
    it('applies solid layout by default', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-tx-white');
      expect(badge).not.toHaveClass('frui-solid', 'frui-thin');
    });

    it('applies solid layout when solid prop is true', () => {
      render(<Badge solid>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-tx-white');
    });

    it('applies outline layout with outline prop', () => {
      render(<Badge outline>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-solid', 'frui-thin');
      expect(badge).not.toHaveClass('frui-tx-white');
    });

    it('prioritizes outline over solid', () => {
      render(<Badge outline solid>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-solid', 'frui-thin');
      expect(badge).not.toHaveClass('frui-tx-white');
    });
  });

  describe('border radius variants', () => {
    it('applies curved class', () => {
      render(<Badge curved>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-curved');
    });

    it('applies rounded class', () => {
      render(<Badge rounded>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-rounded');
    });

    it('applies pill class', () => {
      render(<Badge pill>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-pill');
    });

    it('prioritizes curved over rounded and pill', () => {
      render(<Badge curved rounded pill>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-curved');
      expect(badge).not.toHaveClass('frui-rounded', 'frui-pill');
    });

    it('prioritizes rounded over pill when curved absent', () => {
      render(<Badge rounded pill>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-rounded');
      expect(badge).not.toHaveClass('frui-pill');
    });
  });

  describe('color variants - solid layout', () => {
    it('applies custom color as background', () => {
      render(<Badge color="#ff0000">Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveStyle({ backgroundColor: '#ff0000' });
    });

    it('applies info background class', () => {
      render(<Badge info>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-bg-info', 'frui-tx-white');
    });

    it('applies warning background class', () => {
      render(<Badge warning>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-bg-warning', 'frui-tx-white');
    });

    it('applies success background class', () => {
      render(<Badge success>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-bg-success', 'frui-tx-white');
    });

    it('applies error background class', () => {
      render(<Badge error>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-bg-error', 'frui-tx-white');
    });

    it('applies muted background class', () => {
      render(<Badge muted>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-bg-muted', 'frui-tx-white');
    });

    it('prioritizes custom color over status colors', () => {
      render(<Badge color="#ff0000" info warning>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveStyle({ backgroundColor: '#ff0000' });
      expect(badge).not.toHaveClass('frui-bg-info', 'frui-bg-warning');
    });
  });

  describe('color variants - outline layout', () => {
    it('applies custom color as border and text color', () => {
      render(<Badge outline color="#ff0000">Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveStyle({
        borderColor: '#ff0000',
        color: '#ff0000'
      });
    });

    it('applies info border and text classes', () => {
      render(<Badge outline info>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-bd-info', 'frui-tx-info');
    });

    it('applies warning border and text classes', () => {
      render(<Badge outline warning>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-bd-warning', 'frui-tx-warning');
    });

    it('applies success border and text classes', () => {
      render(<Badge outline success>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-bd-success', 'frui-tx-success');
    });

    it('applies error border and text classes', () => {
      render(<Badge outline error>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-bd-error', 'frui-tx-error');
    });

    it('applies muted border and text classes', () => {
      render(<Badge outline muted>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('frui-bd-muted', 'frui-tx-muted');
    });

    it('prioritizes custom color over status colors outline', () => {
      render(<Badge outline color="#00ff00" success>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveStyle({
        borderColor: '#00ff00',
        color: '#00ff00'
      });
      expect(badge).not.toHaveClass(
        'frui-bd-success',
        'frui-tx-success'
      );
    });
  });

  describe('combined props', () => {
    it('combines layout, border radius, and color props', () => {
      render(<Badge outline curved info>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass(
        'frui-badge',
        'frui-curved',
        'frui-solid',
        'frui-thin',
        'frui-bd-info',
        'frui-tx-info'
      );
    });

    it('combines all visual props correctly', () => {
      render(
        <Badge
          outline
          pill
          warning
          className="badge-custom"
        >
          New
        </Badge>
      );
      const badge = screen.getByText('New');
      expect(badge).toHaveClass(
        'frui-badge',
        'frui-pill',
        'frui-solid',
        'frui-thin',
        'frui-bd-warning',
        'frui-tx-warning',
        'badge-custom'
      );
    });

    it('handles numeric children', () => {
      render(<Badge error>{99}</Badge>);
      const badge = screen.getByText('99');
      expect(badge).toHaveClass('frui-badge', 'frui-bg-error');
    });
  });
});