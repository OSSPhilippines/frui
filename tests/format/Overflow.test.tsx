//--------------------------------------------------------------------//
// Imports

//test
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
//frui
import Overflow from '../../frui/src/format/Overflow.js';

//--------------------------------------------------------------------//
// Helpers

function renderText(
  value: string,
  length?: string | number,
  words?: boolean,
  hellip?: boolean
): string {
  const { container } = render(
    <Overflow 
      value={value} 
      length={length} 
      words={words} 
      hellip={hellip} 
    />
  );
  return container.textContent ?? '';
}

//--------------------------------------------------------------------//
// Tests

describe('Overflow component', () => {
  it('renders text unchanged when value shorter than length', () => {
    const text = renderText(
      'Short text', 20
    );
    expect(text).toBe('Short text');
  });

  it('truncates text when longer than characters limit', () => {
    const text = renderText(
      'Hello world this is truncated', 5
    );
    expect(text).toBe('Hello');
  });

  it('truncates text with ellipsis when hellip=true', () => {
    const text = renderText(
      'Truncate this sentence please', 8, false, true
    );
    expect(text.endsWith('…')).toBe(true);
  });

  it('handles word-based truncation correctly', () => {
    const longText = 'This is a test of word based trimming logic';
    const text = renderText(longText, 4, true);
    expect(text).toBe('This is a test');
  });

  it('adds ellipsis for truncated words', () => {
    const longText = 'Hello world this should be truncated';
    const text = renderText(longText, 2, true, true);
    expect(text).toContain('Hello world');
    expect(text.endsWith('…')).toBe(true);
  });

  it('renders entire text when word count below threshold', () => {
    const text = renderText('One two', 5, true);
    expect(text).toBe('One two');
  });

  it('handles numeric length passed as string', () => {
    const text = renderText('abcdefg', '4');
    expect(text).toBe('abcd');
  });

  it('returns full string if length invalid', () => {
    const text = renderText('abcdefg', 'abc');
    expect(text).toBe('abcdefg');
  });

  it('matches snapshot for plain truncation', () => {
    const { container } = render(
      <Overflow value="LongTextExample" length={4} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('snapshot: word truncation + ellipsis', () => {
    const sentence = 'Alpha Beta Gamma Delta Epsilon';
    const { container } = render(
      <Overflow value={sentence} length={3} words hellip />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});