//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  render,
  screen,
  cleanup
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  afterEach
} from 'vitest';
//frui
import YesNo from '../../src/view/YesNo.js';

//--------------------------------------------------------------------//
// Tests

describe('<YesNo />', () => {
  afterEach(() => cleanup());

  it('renders "Yes" when value is truthy', () => {
    render(<YesNo value={true} />);

    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('renders "No" when value is falsy', () => {
    render(<YesNo value={false} />);

    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('accepts custom yes/no labels', () => {
    render(<YesNo value={1} yes="Affirmative" no="Negative" />);

    expect(screen.getByText('Affirmative')).toBeInTheDocument();
  });

  it('treats other truthy values (strings, numbers) as "Yes"', () => {
    render(<YesNo value="non-empty string" />);

    expect(screen.getByText('Yes')).toBeInTheDocument();

    cleanup();
    render(<YesNo value={123} />);
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('treats falsy values (0, empty, null, undefined) as "No"', () => {
    render(<YesNo value={0} />);
    expect(screen.getByText('No')).toBeInTheDocument();

    cleanup();
    render(<YesNo value="" />);
    expect(screen.getByText('No')).toBeInTheDocument();

    cleanup();
    render(<YesNo value={null} />);
    expect(screen.getByText('No')).toBeInTheDocument();

    cleanup();
    render(<YesNo value={undefined} />);
    expect(screen.getByText('No')).toBeInTheDocument();
  });
});