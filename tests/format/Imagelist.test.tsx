//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Imagelist from '../../frui/src/format/Imagelist.js';

//--------------------------------------------------------------------//
// Helpers

const imageList = [
  'https://example.com/img1.png',
  'https://example.com/img2.png',
  'https://example.com/img3.png'
];

//--------------------------------------------------------------------//
// Tests

describe('<Imagelist /> Component', () => {
  it('renders wrapper with frui-format-imagelist class', () => {
    const { container } = render(
      <Imagelist value={imageList} />
    );
    const wrapper = 
      container.querySelector('.frui-format-imagelist');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('frui-format-imagelist');
  });

  it('renders the correct number of <img> elements', () => {
    render(<Imagelist value={imageList} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(imageList.length);
  });

  it('applies src attributes correctly for all images', () => {
    render(<Imagelist value={imageList} />);
    const images = screen.getAllByRole('img');
    images.forEach((img, i) => {
      expect(img).toHaveAttribute('src', imageList[ i ]);
    });
  });

  it('applies extra attributes to all <img>', () => {
    render(
      <Imagelist
        value={imageList}
        alt="Sample"
        width={100}
        height={50}
      />
    );
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt', 'Sample');
      expect(img).toHaveAttribute('width', '100');
      expect(img).toHaveAttribute('height', '50');
    });
  });

  it('adds custom className to wrapper', () => {
    const { container } = render(
      <Imagelist value={imageList} className="my-gallery" />
    );
    const wrapper = 
      container.querySelector('.frui-format-imagelist');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('frui-format-imagelist');
    expect(wrapper).toHaveClass('my-gallery');
  });

  it('renders empty wrapper when value array is empty', () => {
    const { container } = render(<Imagelist value={[]} />);
    const wrapper = 
      container.querySelector('.frui-format-imagelist');
    expect(wrapper).toBeInTheDocument();
    const imgs = wrapper?.querySelectorAll('img') ?? [];
    expect(imgs.length).toBe(0);
  });

  it('matches snapshot for default rendering', () => {
    const { container } = render(<Imagelist value={imageList} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('snapshot: custom className and attrs', () => {
    const { container } = render(
      <Imagelist
        value={imageList}
        className="gallery"
        alt="Pic"
        width={80}
        height={80}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});