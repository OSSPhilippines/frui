//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Text from '../../frui/src/format/Text.js';

//--------------------------------------------------------------------//
// Helpers

const sampleValue = 'hello world';

//--------------------------------------------------------------------//
// Tests

describe('Text component', () => {
  it('renders the given text value', () => {
    render(<Text value={sampleValue} />);
    const span = screen.getByText(sampleValue);
    expect(span).toBeInTheDocument();
  });

  it('applies uppercase format', () => {
    render(<Text value={sampleValue} format="uppercase" />);
    const span = screen.getByText(sampleValue);
    expect(span).toHaveStyle({ textTransform: 'uppercase' });
  });

  it('applies lowercase format when specified', () => {
    render(<Text value={sampleValue} format="lowercase" />);
    const span = screen.getByText(sampleValue);
    expect(span).toHaveStyle({ textTransform: 'lowercase' });
  });

  it('applies capitalize format when specified', () => {
    render(<Text value={sampleValue} format="capitalize" />);
    const span = screen.getByText(sampleValue);
    expect(span).toHaveStyle({ textTransform: 'capitalize' });
  });

  it('applies no textTransform style when format="none"', () => {
    render(<Text value={sampleValue} format="none" />);
    const span = screen.getByText(sampleValue);
    expect(span.style.textTransform).toBe('');
  });

  it('applies no style when format prop is undefined', () => {
    render(<Text value={sampleValue} />);
    const span = screen.getByText(sampleValue);
    expect(span.style.textTransform).toBe('');
  });

  it('renders mixed casing text unchanged in content', () => {
    const mixedValue = 'ViTeSt Example';
    render(<Text value={mixedValue} format="none" />);
    const span = screen.getByText(mixedValue);
    expect(span.textContent).toBe(mixedValue);
  });

  it('matches snapshot for uppercase format', () => {
    const { container } = render(
      <Text value={sampleValue} format="uppercase" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for lowercase format', () => {
    const { container } = render(
      <Text value={sampleValue} format="lowercase" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for capitalize format', () => {
    const { container } = render(
      <Text value={sampleValue} format="capitalize" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for none/undefined format', () => {
    const { container } = render(<Text value={sampleValue} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});