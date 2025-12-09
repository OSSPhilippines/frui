//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
//frui
import Carousel from '../../src/view/Carousel.js';

//--------------------------------------------------------------------//
// Helpers

const getWrapper = (container: HTMLElement) => container.firstElementChild!;
const getImages = () => screen.getAllByRole('img');

//--------------------------------------------------------------------//
// Tests

describe('<Carousel />', () => {
  it('renders a wrapping div with the default class', () => {
    const { container } = render(<Carousel value={['a.jpg']} />);
    const wrapper = getWrapper(container);
    expect(wrapper).toHaveClass('frui-format-imagelist');
  });

  it('renders an image for each item in the value array', () => {
    const images = ['a.jpg', 'b.jpg', 'c.jpg'];
    render(<Carousel value={images} alt="sample" />);
    expect(getImages()).toHaveLength(images.length);
  });

  it('assigns the correct src attributes to each image', () => {
    const sources = ['one.png', 'two.png'];
    render(<Carousel value={sources} alt="example" />);
    getImages().forEach((img, index) => {
      expect(img).toHaveAttribute('src', sources[index]);
    });
  });

  it('applies a custom className along with the default class', () => {
    const { container } = render(
      <Carousel value={['image.png']} className="custom" />
    );
    const wrapper = getWrapper(container);
    expect(wrapper).toHaveClass('frui-format-imagelist');
    expect(wrapper).toHaveClass('custom');
  })

  it('forwards additional props such as alt and width to images', () => {
    render(<Carousel value={['a.jpg', 'b.jpg']} alt="photo" width={50} />);
    getImages().forEach((img) => {
      expect(img).toHaveAttribute('alt', 'photo');
      expect(img).toHaveAttribute('width', '50');
    });
  });
});