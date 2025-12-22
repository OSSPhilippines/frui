//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Control from '../../frui/src/form/Control.js';

//--------------------------------------------------------------------//
// Tests

describe('<Control />', () => {
  describe('Rendering', () => {
    it('renders control wrapper', () => {
      const { container } = render(<Control>Content</Control>);
      const field = container.querySelector('.frui-control-field');
      expect(field).toBeInTheDocument();
      expect(field).toHaveTextContent('Content');
    });

    it('renders children in field wrapper', () => {
      render(
        <Control>
          <input type="text" />
        </Control>
      );
      const input = screen.getByRole('textbox');
      expect(input.parentElement).toHaveClass('frui-control-field');
    });

    it('applies base frui-control class', () => {
      const { container } = render(<Control>Content</Control>);
      const control = container.firstChild;
      expect(control).toHaveClass('frui-control');
    });
  });

  describe('Label', () => {
    it('renders label when provided', () => {
      render(<Control label="Username">Content</Control>);
      const label = screen.getByText('Username');
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('frui-control-label');
    });

    it('does not render label when not provided', () => {
      const { container } = render(<Control>Content</Control>);
      const label = container.querySelector('.frui-control-label');
      expect(label).not.toBeInTheDocument();
    });

    it('does not render label when empty string', () => {
      const { container } = render(
        <Control label="">Content</Control>
      );
      const label = container.querySelector('.frui-control-label');
      expect(label).not.toBeInTheDocument();
    });
  });

  describe('Error', () => {
    it('renders error when provided', () => {
      render(<Control error="Invalid input">Content</Control>);
      const error = screen.getByText('Invalid input');
      expect(error).toBeInTheDocument();
      expect(error).toHaveClass('frui-control-error');
    });

    it('does not render error when not provided', () => {
      const { container } = render(<Control>Content</Control>);
      const error = container.querySelector('.frui-control-error');
      expect(error).not.toBeInTheDocument();
    });

    it('does not render error when empty string', () => {
      const { container } = render(
        <Control error="">Content</Control>
      );
      const error = container.querySelector('.frui-control-error');
      expect(error).not.toBeInTheDocument();
    });
  });

  describe('Custom styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <Control className="custom-class">Content</Control>
      );
      const control = container.firstChild;
      expect(control).toHaveClass('frui-control', 'custom-class');
    });

    it('applies inline styles', () => {
      const { container } = render(
        <Control style={{ padding: '20px', margin: '10px' }}>
          Content
        </Control>
      );
      const control = container.firstChild as HTMLElement;
      expect(control).toHaveStyle({
        padding: '20px',
        margin: '10px'
      });
    });

    it('passes through other attributes', () => {
      const { container } = render(
        <Control data-testid="custom-control" id="test-id">
          Content
        </Control>
      );
      const control = container.firstChild;
      expect(control).toHaveAttribute('data-testid', 'custom-control');
      expect(control).toHaveAttribute('id', 'test-id');
    });
  });

  describe('Complete structure', () => {
    it('renders all parts when label and error provided', () => {
      render(
        <Control error="Error message" label="Field Label">
          <input type="text" />
        </Control>
      );
      expect(screen.getByText('Field Label')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('maintains correct DOM structure', () => {
      const { container } = render(
        <Control error="Error" label="Label">
          <input type="text" />
        </Control>
      );
      const control = container.firstChild;
      const children = control?.childNodes;
      expect(children).toHaveLength(3);
      expect(children?.[ 0 ]).toHaveClass('frui-control-label');
      expect(children?.[ 1 ]).toHaveClass('frui-control-field');
      expect(children?.[ 2 ]).toHaveClass('frui-control-error');
    });
  });
});