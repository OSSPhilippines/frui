//--------------------------------------------------------------------
// Imports

//tests
import '@testing-library/jest-dom';
import {
  render,
  screen
} from '@testing-library/react';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import Carousel from '../../src/view/Carousel.js';

//--------------------------------------------------------------------
// Mocks

beforeEach(() => {
  Element.prototype.scrollBy = vi.fn();
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    bottom: 100,
    right: 100,
    x: 0,
    y: 0,
    toJSON: () => {}
  }));
});

//--------------------------------------------------------------------
// Tests

describe('<Carousel />', () => {
  it('renders a wrapping div with the default class', () => {
    const { container } = render(<Carousel value={[ 'a.jpg' ]} />);
    const wrapper = container.querySelector('.frui-view-carousel');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('frui-view-carousel');
  });
  it('renders an image for each item in the value array', () => {
    const images = [ 'a.jpg', 'b.jpg', 'c.jpg' ];
    render(<Carousel value={images} alt="sample" />);
    const renderedImages = screen.getAllByRole('img');
    expect(renderedImages).toHaveLength(images.length);
  });
  it('assigns the correct src attributes to each image', () => {
    const sources = [ 'one.png', 'two.png' ];
    render(<Carousel value={sources} alt="example" />);
    const renderedImages = screen.getAllByRole('img');
    renderedImages.forEach((img, index) => {
      expect(img).toHaveAttribute('src', sources[index]);
    });
  });
  it('applies a custom className along with the default class', () => {
    const { container } = render(
      <Carousel value={[ 'image.png' ]} className="custom" />
    );
    const wrapper = container.querySelector('.frui-view-carousel');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('frui-view-carousel');
    expect(wrapper).toHaveClass('custom');
  });
  it('forwards additional props such as alt and width to images', () => {
    render(<Carousel value={[ 'a.jpg', 'b.jpg' ]} alt="photo" width={50} />);
    const renderedImages = screen.getAllByRole('img');
    renderedImages.forEach((img) => {
      expect(img).toHaveAttribute('alt', 'photo');
      expect(img).toHaveAttribute('width', '50');
    });
  });
  it('renders frame and film structure', () => {
    const { container } = render(<Carousel value={[ 'a.jpg' ]} />);
    const frame = container.querySelector('.frui-view-carousel-frame');
    const film = container.querySelector('.frui-view-carousel-film');
    expect(frame).toBeInTheDocument();
    expect(film).toBeInTheDocument();
  });
  it('applies hidden scroll class when hidden prop is true', () => {
    const { container } = render(<Carousel value={[ 'a.jpg' ]} hidden />);
    const frame = container.querySelector('.frui-view-carousel-frame');
    expect(frame).toHaveClass('frui-scroll-hidden');
  });
  it('applies scroll class when scroll prop is true', () => {
    const { container } = render(<Carousel value={[ 'a.jpg' ]} scroll />);
    const frame = container.querySelector('.frui-view-carousel-frame');
    expect(frame).toHaveClass('frui-scroll');
  });
  it('applies auto scroll class when auto prop is true', () => {
    const { container } = render(<Carousel value={[ 'a.jpg' ]} auto />);
    const frame = container.querySelector('.frui-view-carousel-frame');
    expect(frame).toHaveClass('frui-scroll-auto');
  });
  it('applies custom inline styles', () => {
    const { container } = render(
      <Carousel value={[ 'a.jpg' ]} style={{ padding: '10px' }} />
    );
    const wrapper = container.querySelector('.frui-view-carousel');
    expect(wrapper).toHaveAttribute('style');
  });
  it('renders with defaultIndex prop', () => {
    const { container } = render(
      <Carousel value={[ 'a.jpg', 'b.jpg' ]} defaultIndex={1} />
    );
    const wrapper = container.querySelector('.frui-view-carousel');
    expect(wrapper).toBeInTheDocument();
  });
  it('renders with repeat prop', () => {
    const { container } = render(
      <Carousel value={[ 'a.jpg', 'b.jpg' ]} repeat />
    );
    const wrapper = container.querySelector('.frui-view-carousel');
    expect(wrapper).toBeInTheDocument();
  });
  it('renders Previous and Next components when provided', () => {
    render(
      <Carousel value={[ 'a.jpg', 'b.jpg' ]}>
        <Carousel.Previous>Prev</Carousel.Previous>
        <Carousel.Next>Next</Carousel.Next>
      </Carousel>
    );
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});