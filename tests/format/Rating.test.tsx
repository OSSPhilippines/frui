//--------------------------------------------------------------------//
// Imports

//test
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
//frui
import Rating from '../../frui/src/format/Rating.js';

//--------------------------------------------------------------------//
// Helpers

function renderText(
  value: string | number,
  max?: number,
  remainder?: boolean,
  round?: 'round' | 'ceil' | 'floor'
): string {
  const { container } = render(
    <Rating 
      value={value} 
      max={max} 
      remainder={remainder} 
      round={round} 
    />
  );
  return container.textContent ?? '';
}

//--------------------------------------------------------------------//
// Tests

describe('Rating component', () => {
  it('renders rounded stars by default', () => {
    const text = renderText(3.2);
    expect(text).toBe('★★★');
  });
  it('rounds rating based on "round" rule', () => {
    const text = renderText(3.7, 5, true, 'round');
    expect(text).toBe('★★★★☆');
  });
  it('rounds rating up when using "ceil"', () => {
    const text = renderText(2.1, 5, true, 'ceil');
    expect(text).toBe('★★★☆☆');
  });
  it('rounds rating down when using "floor"', () => {
    const text = renderText(4.9, 5, true, 'floor');
    expect(text).toBe('★★★★☆');
  });
  it('renders remainder stars to max', () => {
    const text = renderText(3, 5, true);
    expect(text).toBe('★★★☆☆');
  });
  it('renders only filled stars when remainder=false', () => {
    const text = renderText(3, 5, false);
    expect(text).toBe('★★★');
  });
  it('renders stars equal to rating if no max', () => {
    const text = renderText(2);
    expect(text).toBe('★★');
  });
  it('handles value passed as string properly', () => {
    const text = renderText('4', 5, true);
    expect(text).toBe('★★★★☆');
  });
  it('handles 0 value correctly', () => {
    const text = renderText(0, 5, true);
    expect(text).toBe('☆☆☆☆☆');
  });
  it('renders no stars when max and value are both 0', () => {
    const text = renderText(0, 0);
    expect(text).toBe('');
  });
  it('matches snapshot for basic rating', () => {
    const { container } = render(
      <Rating value={3} max={5} remainder />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('matches snapshot for rating with ceil rounding', () => {
    const { container } = render(
      <Rating value={3.3} round="ceil" max={5} remainder />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('snapshot: no remainder, floor', () => {
    const { container } = render(
      <Rating 
        value={4.8} 
        round="floor" 
        max={5} 
        remainder={false} 
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});