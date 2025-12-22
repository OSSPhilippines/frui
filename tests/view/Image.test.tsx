//--------------------------------------------------------------------//
// Imports

//frui
import Image from '../../src/view/Image.js';
//tests
import '@testing-library/jest-dom';
import {
  describe,
  expect,
  it
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

//--------------------------------------------------------------------//
// Tests

describe('<Image />', () => {
  it('renders an image element', () => {
    render(<Image value="logo.png" alt="logo" />);
    const image = screen.getByRole('img');

    expect(image.tagName.toLowerCase()).toBe('img');
  });

  it('sets src attribute from value prop', () => {
    render(<Image value="path/to/photo.jpg" alt="photo" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'path/to/photo.jpg');
  });

  it('applies additional props such as alt and className', () => {
    render(
      <Image
        value="image.png"
        alt="sample"
        className="custom"
        width={100}
      />
    );
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('alt', 'sample');
    expect(image).toHaveClass('custom');
    expect(image).toHaveAttribute('width', '100');
  });

  it('renders safely when value is empty', () => {
    render(<Image value="" alt="empty" />);
    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBeNull();
  });
});