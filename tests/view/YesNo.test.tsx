//--------------------------------------------------------------------//
// Imports

//frui
import Yesno from '../../src/view/YesNo.js';
//tests
import '@testing-library/jest-dom';
import { 
  describe, 
  expect, 
  it 
} from 'vitest';
import { render } from '@testing-library/react';

//--------------------------------------------------------------------//
// Helpers

function renderText(
  value: unknown,
  yes?: string,
  no?: string
): string {
  const { container } = render(
    <Yesno 
      value={value} 
      yes={yes} 
      no={no} 
    />
  );
  return container.textContent ?? '';
}

//--------------------------------------------------------------------//
// Tests

describe('Yesno component', () => {
  it('renders "Yes" when value is truthy (default yes/no)', () => {
    const result = renderText(true);
    expect(result).toBe('Yes');
  });

  it('renders "No" when value is falsy (default yes/no)', () => {
    const result = renderText(false);
    expect(result).toBe('No');
  });

  it('renders Yes for truthy string', () => {
    const result = renderText('hello');
    expect(result).toBe('Yes');
  });

  it('renders "No" for falsy values like 0 or empty string', () => {
    expect(renderText(0)).toBe('No');
    expect(renderText('')).toBe('No');
    expect(renderText(undefined)).toBe('No');
    expect(renderText(null)).toBe('No');
  });

  it('respects custom yes/no labels', () => {
    const result = renderText(true, 'On', 'Off');
    expect(result).toBe('On');
    const resultFalse = renderText(false, 'On', 'Off');
    expect(resultFalse).toBe('Off');
  });

  it('renders correctly with numeric values', () => {
    expect(renderText(1)).toBe('Yes');
    expect(renderText(-5)).toBe('Yes');
    expect(renderText(0)).toBe('No');
  });

  it('renders correctly with object or array values', () => {
    expect(renderText({ a: 1 })).toBe('Yes');
    expect(renderText([ 1, 2, 3 ])).toBe('Yes');
  });

  it('matches snapshot for true value', () => {
    const { container } = render(<Yesno value={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for false value', () => {
    const { container } = render(<Yesno value={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for custom yes/no text', () => {
    const { container } = render(
      <Yesno value={true} yes="Y" no="N" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});