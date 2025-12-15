//--------------------------------------------------------------------//
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
import Carousel from '../../src/base/Carousel.js';

//--------------------------------------------------------------------//
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

//--------------------------------------------------------------------//
// Tests

describe('<Carousel />', () => {
  it('renders a wrapping div with the default class', () => {
    const { container } = render(
      <Carousel>
        <Carousel.Frame>
          <img src="a.jpg" alt="test" />
        </Carousel.Frame>
      </Carousel>
    );
    const wrapper = container.querySelector('.frui-carousel');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('frui-carousel');
  });

  it('renders an image for each item in the value array', () => {
    const images = [ 'a.jpg', 'b.jpg', 'c.jpg' ];
    render(
      <Carousel>
        {images.map((src, i) => (
          <Carousel.Frame key={i}>
            <img src={src} alt="sample" />
          </Carousel.Frame>
        ))}
      </Carousel>
    );
    const renderedImages = screen.getAllByRole('img');
    expect(renderedImages).toHaveLength(images.length);
  });

  it('assigns the correct src attributes to each image', () => {
    const sources = [ 'one.png', 'two.png' ];
    render(
      <Carousel>
        {sources.map((src, i) => (
          <Carousel.Frame key={i}>
            <img src={src} alt="example" />
          </Carousel.Frame>
        ))}
      </Carousel>
    );
    const renderedImages = screen.getAllByRole('img');
    renderedImages.forEach((img, index) => {
      expect(img).toHaveAttribute('src', sources[ index ]);
    });
  });

  it('applies a custom className along with the default class', () => {
    const { container } = render(
      <Carousel className="custom">
        <Carousel.Frame>
          <img src="image.png" alt="test" />
        </Carousel.Frame>
      </Carousel>
    );
    const wrapper = container.querySelector('.frui-carousel');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('frui-carousel');
    expect(wrapper).toHaveClass('custom');
  });

  it('forwards additional props such as alt and width to images', () => {
    render(
      <Carousel>
        <Carousel.Frame>
          <img src="a.jpg" alt="photo" width={50} />
        </Carousel.Frame>
        <Carousel.Frame>
          <img src="b.jpg" alt="photo" width={50} />
        </Carousel.Frame>
      </Carousel>
    );
    const renderedImages = screen.getAllByRole('img');
    renderedImages.forEach((img) => {
      expect(img).toHaveAttribute('alt', 'photo');
      expect(img).toHaveAttribute('width', '50');
    });
  });

  it('renders frame and film structure', () => {
    const { container } = render(
      <Carousel>
        <Carousel.Frame>
          <img src="a.jpg" alt="test" />
        </Carousel.Frame>
      </Carousel>
    );
    const view = container.querySelector('.frui-carousel-view');
    const film = container.querySelector('.frui-carousel-film');
    expect(view).toBeInTheDocument();
    expect(film).toBeInTheDocument();
  });

  it('applies hidden scroll class when hidden prop is true', () => {
    const { container } = render(
      <Carousel hidden>
        <Carousel.Frame>
          <img src="a.jpg" alt="test" />
        </Carousel.Frame>
      </Carousel>
    );
    const view = container.querySelector('.frui-carousel-view');
    expect(view).toHaveClass('frui-scroll-hidden');
  });

  it('applies scroll class when scroll prop is true', () => {
    const { container } = render(
      <Carousel scroll>
        <Carousel.Frame>
          <img src="a.jpg" alt="test" />
        </Carousel.Frame>
      </Carousel>
    );
    const view = container.querySelector('.frui-carousel-view');
    expect(view).toHaveClass('frui-scroll');
  });

  it('applies auto scroll class when auto prop is true', () => {
    const { container } = render(
      <Carousel auto>
        <Carousel.Frame>
          <img src="a.jpg" alt="test" />
        </Carousel.Frame>
      </Carousel>
    );
    const view = container.querySelector('.frui-carousel-view');
    expect(view).toHaveClass('frui-scroll-auto');
  });

  it('applies custom inline styles', () => {
    const { container } = render(
      <Carousel style={{ padding: '10px' }}>
        <Carousel.Frame>
          <img src="a.jpg" alt="test" />
        </Carousel.Frame>
      </Carousel>
    );
    const wrapper = container.querySelector('.frui-carousel');
    expect(wrapper).toHaveAttribute('style');
  });

  it('renders with defaultIndex prop', () => {
    const { container } = render(
      <Carousel defaultIndex={1}>
        <Carousel.Frame>
          <img src="a.jpg" alt="test" />
        </Carousel.Frame>
        <Carousel.Frame>
          <img src="b.jpg" alt="test" />
        </Carousel.Frame>
      </Carousel>
    );
    const wrapper = container.querySelector('.frui-carousel');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders with repeat prop', () => {
    const { container } = render(
      <Carousel repeat>
        <Carousel.Frame>
          <img src="a.jpg" alt="test" />
        </Carousel.Frame>
        <Carousel.Frame>
          <img src="b.jpg" alt="test" />
        </Carousel.Frame>
      </Carousel>
    );
    const wrapper = container.querySelector('.frui-carousel');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders Previous and Next components when provided', () => {
    render(
      <Carousel>
        <Carousel.Frame>
          <img src="a.jpg" alt="test" />
        </Carousel.Frame>
        <Carousel.Frame>
          <img src="b.jpg" alt="test" />
        </Carousel.Frame>
        <Carousel.Previous>Prev</Carousel.Previous>
        <Carousel.Next>Next</Carousel.Next>
      </Carousel>
    );
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});