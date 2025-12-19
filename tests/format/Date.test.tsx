//--------------------------------------------------------------------//
// Imports

//modules
import moment from 'moment';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
//frui
import DateFormat from '../../frui/src/format/Date.js';

//--------------------------------------------------------------------//
// Helpers

function renderText(value: string | number | Date, format?: string) {
  const { container } = render(
    <DateFormat value={value} format={format} />
  );
  return container.textContent ?? '';
}

const fixedDate = '2024-01-01T00:00:00Z';

//--------------------------------------------------------------------//
// Tests

describe('DateFormat component', () => {
  it('renders formatted date by default', () => {
    const { container } = render(<DateFormat value={fixedDate} />);
    const text = container.textContent;
    expect(text).toContain('2024');
    expect(text).toMatch(/\d{4}/);
  });

  it('renders custom format correctly', () => {
    const format = 'YYYY-MM-DD';
    const text = renderText(fixedDate, format);
    expect(text).toBe(moment(fixedDate).format(format));
  });

  it('renders using locale properly', () => {
    const format = 'LL';
    const locale = 'en';
    const result = renderText(fixedDate, format);
    const expected = 
      moment(new Date(fixedDate)).locale(locale).format(format);
    expect(typeof result).toBe('string');
    expect(result).toBe(expected);
  });

  it('renders relative time when format is "ago"', () => {
    const now = new Date();
    const oneHourAgo = now.getTime() - 60 * 60 * 1000;
    const result = renderText(oneHourAgo, 'ago');
    expect(typeof result).toBe('string');
    expect(result).toMatch(/hour|minute|second/i);
  });

  it('renders short relative time for format "a"', () => {
    const now = new Date();
    const oneMinAgo = now.getTime() - 60 * 1000;
    const result = renderText(oneMinAgo, 'a');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('matches snapshot for default format', () => {
    const { container } = render(
      <DateFormat value={fixedDate} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for "ago" format', () => {
    const { container } = render(
      <DateFormat value={fixedDate} format="ago" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for "a" format', () => {
    const { container } = render(
      <DateFormat value={fixedDate} format="a" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for custom format', () => {
    const { container } = render(
      <DateFormat value={fixedDate} format="YYYY-MM-DD" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});