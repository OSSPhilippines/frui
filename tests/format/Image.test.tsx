//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Image from '../../frui/src/field/Image.js';

//--------------------------------------------------------------------//
// Helpers

const defaultSrc = 'https://example.com/image.png';

//--------------------------------------------------------------------//
// Tests

describe('Image component', () => {
  it('renders <img> with correct src', () => {
    render(<Image value={defaultSrc} />);
    const img = screen.getByAltText('preview');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', defaultSrc);
  });
  it('renders with default alt text "preview"', () => {
    render(<Image value={defaultSrc} />);
    const img = screen.getByAltText('preview');
    expect(img).toBeInTheDocument();
  });
  it('applies style attributes to the wrapper element', () => {
    render(
      <Image 
        value={defaultSrc} 
        style={{ maxWidth: '400px', maxHeight: '200px' }} 
      />
    );
    const wrapper = document.querySelector('.field-image');
    expect(wrapper).toHaveStyle({ maxWidth: '400px' });
    expect(wrapper).toHaveStyle({ maxHeight: '200px' });
  });
  it('applies className to the wrapper element', () => {
    render(
      <Image 
        value={defaultSrc} 
        className="custom-class" 
      />
    );
    const wrapper = 
      document.querySelector('.field-image.custom-class');
    expect(wrapper).toBeInTheDocument();
  });
  it('renders the image link with correct href', () => {
    render(<Image value={defaultSrc} />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', defaultSrc);
  });
  it('matches snapshot for default usage', () => {
    const { container } = render(
      <Image value={defaultSrc} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('matches snapshot with className', () => {
    const { container } = render(
      <Image
        value={defaultSrc}
        className="thumb"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});