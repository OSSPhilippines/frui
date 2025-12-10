//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  it,
  expect
} from 'vitest';
//frui
import Rating from '../../src/view/Rating.js';


//--------------------------------------------------------------------//
// Tests

describe('<Rating />', () => {
  it('renders correct number of stars based on value', () => {
    render(<Rating value={3} />);
    const stars = screen.getAllByText('★');

    expect(stars).toHaveLength(3);
  });

  it('renders stars according to max prop', () => {
    render(<Rating value={2} max={5} />);
    const filledStars = screen.getAllByText('★');

    expect(filledStars).toHaveLength(2);
  });

  it('renders remainder stars when remainder=true', () => {
    render(<Rating value={2} max={5} remainder />);
    const filledStars = screen.getAllByText('★');
    const emptyStars = screen.getAllByText('☆');

    expect(filledStars).toHaveLength(2);
    expect(emptyStars).toHaveLength(3);
  });

  it('applies rounding "round" correctly', () => {
    render(<Rating value={2.6} round="round" />);
    const stars = screen.getAllByText('★');

    expect(stars).toHaveLength(3);
  });

  it('applies rounding "ceil" correctly', () => {
    render(<Rating value={2.1} round="ceil" />);
    const stars = screen.getAllByText('★');

    expect(stars).toHaveLength(3);
  });

  it('applies rounding "floor" correctly', () => {
    render(<Rating value={2.9} round="floor" />);
    const stars = screen.getAllByText('★');

    expect(stars).toHaveLength(2);
  });

  it('defaults to round if no round prop is provided', () => {
    render(<Rating value={2.5} />);
    const stars = screen.getAllByText('★');

    expect(stars).toHaveLength(3);
  });
});