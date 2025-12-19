//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
//frui
import Formula from '../../frui/src/format/Formula.js';

//--------------------------------------------------------------------//
// Helpers

function renderText(
  value: string,
  formula: string,
  data?: Record<string, any>
): string {
  const { container } = render(
    <Formula value={value} formula={formula} data={data} />
  );
  return container.textContent ?? '';
}

//--------------------------------------------------------------------//
// Tests

describe('Formula component', () => {
  it('evaluates simple arithmetic using {this}', () => {
    const result = renderText('5', '{this}+2');
    expect(result).toBe('7');
  });

  it('handles non-numeric input as zero', () => {
    const result = renderText('abc', '{this}+10');
    expect(result).toBe('10');
  });

  it('replaces data placeholders correctly', () => {
    const data = { price: 4, quantity: 5 };
    const result = renderText('0', '{price}*{quantity}', data);
    expect(result).toBe('20');
  });

  it('replaces both {this} and dataset variables', () => {
    const data = { rate: 0.1 };
    const result = renderText('100', '{this}*{rate}', data);
    expect(result).toBe('10');
  });

  it('removes unknown placeholders gracefully', () => {
    const result = renderText('5', '{unknown}+5');
    expect(result).toBe('5');
  });

  it('handles invalid JS formulas safely', () => {
    const result = renderText('2', '{this}+*3');
    expect(typeof result).toBe('string');
  });

  it('matches snapshot for numeric formula evaluation', () => {
    const { container } = render(
      <Formula value="10" formula="{this}*3-5" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for dataset formula evaluation', () => {
    const { container } = render(
      <Formula value="1" formula="{this}+{x}" data={{ x: 9 }} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});