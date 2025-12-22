//--------------------------------------------------------------------//
// Imports

//frui
import TextOverflow from '../../src/view/TextOverflow.js';
//tests
import '@testing-library/jest-dom';
import {
  describe,
  it,
  expect
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

//--------------------------------------------------------------------//
// Tests

describe('<TextOverflow />', () => {
  it('renders full text if length not exceeded', () => {
    render(<TextOverflow value="Hello World" length={20} />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('truncates text by characters', () => {
    render(<TextOverflow value="Hello World" length={5} />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('truncates text by characters with ellipsis', () => {
    render(<TextOverflow value="Hello World" length={5} hellip />);

    expect(screen.getByText('Hello…')).toBeInTheDocument();
  });

  it('truncates by words', () => {
    render(
      <TextOverflow
        value="Hello World from Vitest"
        words
        length={2}
      />
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('truncates by words with ellipsis', () => {
    render(
      <TextOverflow
        value="Hello World from Vitest"
        words
        length={2}
        hellip
      />
    );

    expect(screen.getByText('Hello World…')).toBeInTheDocument();
  });

  it('shows full text if words under count', () => {
    render(<TextOverflow value="Hello World" words length={5} />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('handles string length as string type', () => {
    render(<TextOverflow value="Hello World" length="5" />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders full text if length prop is invalid string', () => {
    render(<TextOverflow value="Hello World" length="abc" />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});