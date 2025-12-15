//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  render,
  screen,
  within
} from '@testing-library/react';
import {
  describe,
  expect,
  it
} from 'vitest';
//frui
import Tabular from '../../src/view/Tabular.js';

//--------------------------------------------------------------------//
// Tests

describe('<Tabular />', () => {
  const data = [
    { Name: 'Alice', Age: 25 },
    { Name: 'Bob', Age: 30 }
  ];

  it('applies className to headers and cells', () => {
    render(<Tabular className="my-class" value={data} />);
    const table = screen.getByRole('table');
    const headers = within(table).getAllByRole('columnheader');
    const cells = within(table).getAllByRole('cell');

    headers.forEach((h) => expect(h).toHaveClass('my-class'));
    cells.forEach((c) => expect(c).toHaveClass('my-class'));
  });

  it('applies stripes correctly', () => {
    const stripes: [ string, string, string ] = [
      'gray',
      'white',
      'lightgray'
    ];

    render(<Tabular stripes={stripes} value={data} />);
    const table = screen.getByRole('table');
    const headers = within(table).getAllByRole('columnheader');
    const rows = within(table).getAllByRole('row').slice(1);

    expect(headers[ 0 ]).toHaveStyle({
      backgroundColor: 'rgb(128, 128, 128)'
    });
    expect(
      within(rows[ 0 ]).getAllByRole('cell')[ 0 ]
    ).toHaveStyle({ backgroundColor: 'rgb(255, 255, 255)' });
    expect(
      within(rows[ 1 ]).getAllByRole('cell')[ 0 ]
    ).toHaveStyle({ backgroundColor: 'rgb(211, 211, 211)' });
  });

  it('applies style to headers and cells', () => {
    const style = { color: 'blue', fontWeight: 'bold' };

    render(<Tabular style={style} value={data} />);
    const table = screen.getByRole('table');
    const headers = within(table).getAllByRole('columnheader');
    const cells = within(table).getAllByRole('cell');

    headers.forEach((h) =>
      expect(h).toHaveStyle({
        color: 'rgb(0, 0, 255)',
        fontWeight: 'bold'
      })
    );

    cells.forEach((c) =>
      expect(c).toHaveStyle({
        color: 'rgb(0, 0, 255)',
        fontWeight: 'bold'
      })
    );
  });

  it('renders table headers and cells correctly', () => {
    render(<Tabular value={data} />);
    const table = screen.getByRole('table');
    const headers = within(table).getAllByRole('columnheader');
    const cells = within(table).getAllByRole('cell');

    expect(headers.map((h) => h.textContent)).toEqual([ 'Name', 'Age' ]);
    expect(cells.map((c) => c.textContent)).toEqual([
      'Alice',
      '25',
      'Bob',
      '30'
    ]);
  });

  it('returns null when value is empty', () => {
    const { container } = render(<Tabular value={[]} />);

    expect(container.firstChild).toBeNull();
  });
});