//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Separated from '../../frui/src/format/Separated.js';

//--------------------------------------------------------------------//
// Helpers

const sampleValues = [ 'Apple', 'Banana', 'Cherry' ];

//--------------------------------------------------------------------//
// Tests

describe('<Separated /> Component', () => {
  it('renders values joined by default space separator', () => {
    render(<Separated value={sampleValues} />);
    const text = screen.getByText('Apple Banana Cherry');
    expect(text).toBeInTheDocument();
  });

  it('renders values joined by a custom separator', () => {
    render(<Separated value={sampleValues} separator=", " />);
    const text = screen.getByText('Apple, Banana, Cherry');
    expect(text).toBeInTheDocument();
  });

  it('renders values as lines if separator is "line"', () => {
    const { container } = render(
      <Separated value={sampleValues} separator="line" />
    );
    const wrapper = container.querySelector('div');
    expect(wrapper).toBeInTheDocument();
    const items = wrapper?.querySelectorAll('div');
    expect(items).toHaveLength(sampleValues.length);
    items?.forEach((item, idx) => {
      expect(item.textContent).toBe(sampleValues[ idx ]);
    });
  });

  it('applies provided className and style correctly', () => {
    render(
      <Separated
        value={sampleValues}
        separator=", "
        className="fruit-list"
        style={{ color: 'rgb(0, 0, 255)' }}
      />
    );
    const span = screen.getByText('Apple, Banana, Cherry');
    expect(span).toHaveClass('fruit-list');
    expect(span).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });

  it('renders empty element when value array is empty', () => {
    const { container } = render(<Separated value={[]} />);
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
    expect(span?.textContent).toBe('');
  });

  it('joins numeric values correctly', () => {
    render(<Separated value={[ 1, 2, 3 ]} separator="-" />);
    const text = screen.getByText('1-2-3');
    expect(text).toBeInTheDocument();
  });

  it('matches snapshot for default spaced separator', () => {
    const { container } = render(
      <Separated value={sampleValues} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for line-based separation', () => {
    const { container } = render(
      <Separated value={sampleValues} separator="line" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for custom separator', () => {
    const { container } = render(
      <Separated value={sampleValues} separator=" | " />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});