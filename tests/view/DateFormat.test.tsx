//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
//modules
import moment from 'moment';
//frui
import DateFormat from '../../src/view/DateFormat.js';

//--------------------------------------------------------------------//
// Tests

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2024-01-01T12:00:00Z'));
});

describe('<DateFormat />', () => {
  it('renders formatted date with default format', () => {
    render(<DateFormat value="2024-01-01T00:00:00Z" />);
    const formatted = moment('2024-01-01T00:00:00Z')
      .locale('en')
      .format('MMMM Do YYYY, h:mm:ss a');

    expect(screen.getByText(formatted)).toBeInTheDocument();
  });

  it('renders formatted date using custom format', () => {
    render(<DateFormat value="2024-03-15T08:00:00Z" format="YYYY-MM-DD" />);
    expect(screen.getByText('2024-03-15')).toBeInTheDocument();
  });

  it('renders relative time when format="ago"', () => {
    const past = new Date('2023-12-31T12:00:00Z');
    render(<DateFormat value={past} format="ago" />);
    const expected = moment(past).locale('en').fromNow();
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('renders short relative time when format="a"', () => {
    const past = new Date('2023-12-31T12:00:00Z');
    render(<DateFormat value={past} format="a" />);
    const expected = moment(past).locale('short').fromNow();
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('respects provided locale for formatting', () => {
    render(
      <DateFormat
        value="2024-07-04T00:00:00Z"
        locale="fr"
        format="MMMM YYYY"
      />
    );
    const expected = moment('2024-07-04T00:00:00Z')
      .locale('fr')
      .format('MMMM YYYY');
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});