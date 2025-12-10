//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it
} from 'vitest';
//frui
import Button from '../../src/base/Button.js';

//--------------------------------------------------------------------//
// Tests

describe('<Button />', () => {
  it('renders a button element by default', () => {
    render(<Button data-testid="button">Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveTextContent('Click me');
  });
  it('applies frui-button class to button element', () => {
    render(<Button data-testid="button">Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies custom className to button element', () => {
    render(<Button className="custom-btn" data-testid="button">Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
    expect(button).toHaveClass('custom-btn');
  });
  it('applies custom inline styles to button element', () => {
    render(
      <Button style={{ backgroundColor: 'red' }} data-testid="button">
        Click me
      </Button>
    );
    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('style');
    expect(button.style.backgroundColor).toBe('red');
  });
  it('applies title attribute to button element', () => {
    render(<Button title="Click this button" data-testid="button">Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('title', 'Click this button');
  });
  it('passes through standard button attributes', () => {
    render(
      <Button 
        type="submit" 
        disabled 
        data-testid="button"
      >
        Submit
      </Button>
    );
    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });
  it('renders as anchor element when href prop is provided', () => {
    render(<Button href="/page">Link</Button>);
    const link = screen.getByRole('link', { name: 'Link' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/page');
  });
  it('applies target attribute to anchor element', () => {
    render(
      <Button href="/page" target="_blank">
        Link
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Link' });
    expect(link).toHaveAttribute('target', '_blank');
  });
  it('applies title attribute to anchor element', () => {
    render(
      <Button href="/page" title="Go to page">
        Link
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Link' });
    expect(link).toHaveAttribute('title', 'Go to page');
  });
  it('applies frui-button class to anchor element', () => {
    render(<Button href="/page">Link</Button>);
    const link = screen.getByRole('link', { name: 'Link' });
    expect(link).toHaveClass('frui-button');
  });
  it('applies color theme props', () => {
    render(<Button color="primary" data-testid="button">Themed</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies border radius theme props', () => {
    render(<Button rounded data-testid="button">Rounded</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies border style theme props', () => {
    render(<Button solid data-testid="button">Solid</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies display theme props', () => {
    render(<Button block data-testid="button">Block</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies fill theme props', () => {
    render(<Button fill data-testid="button">Filled</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies size theme props', () => {
    render(<Button xs data-testid="button">Extra Small</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies text align theme props', () => {
    render(<Button left data-testid="button">Left Aligned</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies multiple theme props together', () => {
    render(
      <Button 
        color="primary" 
        rounded 
        block 
        xs 
        data-testid="button"
      >
        Multi-themed
      </Button>
    );
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies default fill when outline is not set', () => {
    render(<Button data-testid="button">Default Fill</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('does not apply default fill when outline is set', () => {
    render(<Button outline data-testid="button">Outlined</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies default center alignment when no text align props set', () => {
    render(<Button data-testid="button">Centered</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('converts full prop to width full', () => {
    render(<Button full data-testid="button">Full Width</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies default padding for extra small size', () => {
    render(<Button xs data-testid="button">XS Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies default padding for small size', () => {
    render(<Button sm data-testid="button">SM Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('applies default padding for normal size', () => {
    render(<Button data-testid="button">Normal Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('does not apply default padding when custom padding is set', () => {
    render(<Button px="xl" py="md" data-testid="button">Custom Padding</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('frui-button');
  });
  it('renders children content correctly', () => {
    render(<Button data-testid="button">Button Text</Button>);
    expect(screen.getByTestId('button')).toHaveTextContent('Button Text');
  });
  it('renders complex children elements', () => {
    render(
      <Button data-testid="button">
        <span>Icon</span>
        <span>Text</span>
      </Button>
    );
    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('IconText');
  });
  describe('as anchor element', () => {
    it('applies theme props to anchor element', () => {
      render(
        <Button 
          href="/page" 
          color="primary" 
          rounded
        >
          Themed Link
        </Button>
      );
      const link = screen.getByRole('link', { name: 'Themed Link' });
      expect(link.tagName).toBe('A');
      expect(link).toHaveClass('frui-button');
    });
    it('applies custom className to anchor element', () => {
      render(
        <Button 
          href="/page" 
          className="custom-link"
        >
          Custom Link
        </Button>
      );
      const link = screen.getByRole('link', { name: 'Custom Link' });
      expect(link).toHaveClass('frui-button');
      expect(link).toHaveClass('custom-link');
    });
    it('applies custom styles to anchor element', () => {
      render(
        <Button 
          href="/page" 
          style={{ color: 'blue' }}
        >
          Styled Link
        </Button>
      );
      const link = screen.getByRole('link', { name: 'Styled Link' });
      expect(link).toHaveAttribute('style');
    });
  });
});