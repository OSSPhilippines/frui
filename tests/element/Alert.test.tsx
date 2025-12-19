//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Alert from '../../frui/src/element/Alert';

//--------------------------------------------------------------------//
// Tests

describe('Alert Component', () => {
  describe('Basic Rendering', () => {
    it('renders children with base class', () => {
      render(<Alert>Test Alert</Alert>);
      const alert = screen.getByText('Test Alert');
      
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('frui-alert');
    });

    it('applies custom className', () => {
      render(<Alert className="custom-class">Test</Alert>);
      const alert = screen.getByText('Test');
      expect(alert).toHaveClass('frui-alert', 'custom-class');
    });
  });

  describe('Layout Variants', () => {
    it('applies solid layout by default', () => {
      render(<Alert>Test</Alert>);
      const alert = screen.getByText('Test');
      
      expect(alert).toHaveClass('frui-tx-white');
      expect(alert).not.toHaveClass('frui-solid', 'frui-thin');
    });

    it('applies outline layout', () => {
      render(<Alert outline>Test</Alert>);
      const alert = screen.getByText('Test');
      
      expect(alert).toHaveClass('frui-solid', 'frui-thin');
      expect(alert).not.toHaveClass('frui-tx-white');
    });

    it('prioritizes outline over solid', () => {
      render(<Alert outline solid>Test</Alert>);
      const alert = screen.getByText('Test');
      
      expect(alert).toHaveClass('frui-solid', 'frui-thin');
      expect(alert).not.toHaveClass('frui-tx-white');
    });
  });

  describe('Border Radius Variants', () => {
    it('applies curved, rounded, and pill classes', () => {
      const { container: curved } = 
        render(<Alert curved>Test</Alert>);
      expect(curved.firstChild).toHaveClass('frui-curved');

      const { container: rounded } = 
        render(<Alert rounded>Test</Alert>);
      expect(rounded.firstChild).toHaveClass('frui-rounded');

      const { container: pill } = 
        render(<Alert pill>Test</Alert>);
      expect(pill.firstChild).toHaveClass('frui-pill');
    });

    it('prioritizes curved over rounded over pill', () => {
      const { container: curvedRounded } = render(
        <Alert curved rounded pill>Test</Alert>
      );
      const el1 = curvedRounded.firstChild as HTMLElement;
      expect(el1).toHaveClass('frui-curved');
      expect(el1).not.toHaveClass('frui-rounded', 'frui-pill');

      const { container: roundedPill } = render(
        <Alert rounded pill>Test</Alert>
      );
      const el2 = roundedPill.firstChild as HTMLElement;
      expect(el2).toHaveClass('frui-rounded');
      expect(el2).not.toHaveClass('frui-pill');
    });
  });

  describe('Solid Layout Colors', () => {
    it('applies custom color as background', () => {
      render(<Alert color="#ff0000">Test</Alert>);
      const alert = screen.getByText('Test');
      
      expect(alert).toHaveStyle(
        { backgroundColor: '#ff0000' }
      );
      expect(alert).toHaveClass('frui-tx-white');
    });

    it('applies status background classes', () => {
      const statuses = [
        { prop: 'info', class: 'frui-bg-info' },
        { prop: 'warning', class: 'frui-bg-warning' },
        { prop: 'success', class: 'frui-bg-success' },
        { prop: 'error', class: 'frui-bg-error' },
        { prop: 'muted', class: 'frui-bg-muted' }
      ];

      statuses.forEach(({ prop, class: className }) => {
        const { container } = render(
          <Alert {...{ [prop]: true }}>Test</Alert>
        );
        const alert = container.firstChild as HTMLElement;
        expect(alert).toHaveClass(className, 'frui-tx-white');
      });
    });

    it('prioritizes custom color over status colors', () => {
      render(
        <Alert color="#ff0000" info warning>Test</Alert>
      );
      const alert = screen.getByText('Test');
      
      expect(alert).toHaveStyle(
        { backgroundColor: '#ff0000' }
      );
      expect(alert).not.toHaveClass(
        'frui-bg-info', 'frui-bg-warning'
      );
    });
  });

  describe('Outline Layout Colors', () => {
    it('applies custom color as border and text', () => {
      render(<Alert outline color="#ff0000">Test</Alert>);
      const alert = screen.getByText('Test');
      
      expect(alert).toHaveStyle({
        borderColor: '#ff0000',
        color: '#ff0000'
      });
    });

    it('applies status border and text classes', () => {
      const statuses = [
        { 
          prop: 'info', 
          bdClass: 'frui-bd-info', 
          txClass: 'frui-tx-info' 
        },
        {
          prop: 'warning',
          bdClass: 'frui-bd-warning',
          txClass: 'frui-tx-warning'
        },
        {
          prop: 'success',
          bdClass: 'frui-bd-success',
          txClass: 'frui-tx-success'
        },
        {
          prop: 'error',
          bdClass: 'frui-bd-error',
          txClass: 'frui-tx-error'
        },
        {
          prop: 'muted',
          bdClass: 'frui-bd-muted',
          txClass: 'frui-tx-muted'
        }
      ];

      statuses.forEach(({ prop, bdClass, txClass }) => {
        const { container } = render(
          <Alert outline {...{ [ prop ]: true }}>Test</Alert>
        );
        const alert = container.firstChild as HTMLElement;
        expect(alert).toHaveClass(bdClass, txClass);
      });
    });

    it('prioritizes custom color over status colors', () => {
      render(
        <Alert outline color="#00ff00" success>Test</Alert>
      );
      const alert = screen.getByText('Test');
      
      expect(alert).toHaveStyle({
        borderColor: '#00ff00',
        color: '#00ff00'
      });
      expect(alert).not.toHaveClass(
        'frui-bd-success',
        'frui-tx-success'
      );
    });
  });

  describe('Combined Props', () => {
    it('combines all visual props correctly', () => {
      render(
        <Alert outline pill warning className="test-class">
          Complex Alert
        </Alert>
      );
      const alert = screen.getByText('Complex Alert');
      
      expect(alert).toHaveClass(
        'frui-alert',
        'frui-pill',
        'frui-solid',
        'frui-thin',
        'frui-bd-warning',
        'frui-tx-warning',
        'test-class'
      );
    });
  });
});