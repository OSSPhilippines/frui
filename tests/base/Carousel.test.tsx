//--------------------------------------------------------------------//
// Imports

//frui
import Carousel from '../../src/base/Carousel.js';
//tests
import '@testing-library/jest-dom';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';

//--------------------------------------------------------------------//
// Mocks

const mockScrollBy = vi.fn();

const mockGetBoundingClientRect = vi.fn(() => ({
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

//--------------------------------------------------------------------//
// Helpers

const renderCarousel = (
  props: Record<string, unknown> = {},
  frameCount = 3
) => {
  const images = Array.from(
    { length: frameCount },
    (_, i) => `image${i + 1}.jpg`
  );

  return render(
    <Carousel {...props}>
      {images.map((src, i) => (
        <Carousel.Frame key={i}>
          <img alt={`test${i + 1}`} src={src} />
        </Carousel.Frame>
      ))}
    </Carousel>
  );
};

//--------------------------------------------------------------------//
// Tests

describe('Carousel component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Element.prototype.scrollBy = mockScrollBy;
    Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;
  });

  describe('rendering', () => {
    it('renders wrapper with default class', () => {
      const { container } = renderCarousel();
      const wrapper = container.querySelector('.frui-carousel');

      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('frui-carousel');
    });

    it('renders correct number of frames', () => {
      renderCarousel({}, 3);
      const images = screen.getAllByRole('img');

      expect(images).toHaveLength(3);
    });

    it('renders frame and film structure', () => {
      const { container } = renderCarousel();
      const view = container.querySelector('.frui-carousel-view');
      const film = container.querySelector('.frui-carousel-film');
      const frames = container.querySelectorAll('.frui-film-frame');

      expect(view).toBeInTheDocument();
      expect(film).toBeInTheDocument();
      expect(frames).toHaveLength(3);
    });

    it('applies correct src to images', () => {
      const sources = [ 'one.png', 'two.png' ];

      render(
        <Carousel>
          {sources.map((src, i) => (
            <Carousel.Frame key={i}>
              <img alt={`img${i}`} src={src} />
            </Carousel.Frame>
          ))}
        </Carousel>
      );

      const images = screen.getAllByRole('img');
      images.forEach((img, i) => {
        expect(img).toHaveAttribute('src', sources[i]);
      });
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      const { container } = renderCarousel({
        className: 'custom'
      });
      const wrapper = container.querySelector('.frui-carousel');

      expect(wrapper).toHaveClass('frui-carousel', 'custom');
    });

    it('applies custom inline styles', () => {
      const { container } = renderCarousel({
        style: { padding: '10px' }
      });
      const wrapper = container.querySelector('.frui-carousel');

      expect(wrapper).toHaveStyle({ padding: '10px' });
    });

    it('applies hidden scroll class', () => {
      const { container } = renderCarousel({ hidden: true });
      const view = container.querySelector('.frui-carousel-view');

      expect(view).toHaveClass('frui-scroll-hidden');
    });

    it('applies scroll class', () => {
      const { container } = renderCarousel({ scroll: true });
      const view = container.querySelector('.frui-carousel-view');

      expect(view).toHaveClass('frui-scroll');
    });

    it('applies auto scroll class', () => {
      const { container } = renderCarousel({ auto: true });
      const view = container.querySelector('.frui-carousel-view');

      expect(view).toHaveClass('frui-scroll-auto');
    });

    it('applies film slot styles', () => {
      const { container } = renderCarousel({
        film: { className: 'custom-film' }
      });
      const film = container.querySelector('.frui-carousel-film');

      expect(film).toHaveClass('custom-film');
    });

    it('applies view slot styles', () => {
      const { container } = renderCarousel({
        view: { className: 'custom-view' }
      });
      const view = container.querySelector('.frui-carousel-view');

      expect(view).toHaveClass('custom-view');
    });

    it('applies frame slot styles', () => {
      const { container } = renderCarousel({
        frame: { className: 'custom-frame' }
      });
      const frames = container.querySelectorAll('.frui-film-frame');

      expect(frames[ 0 ]).toHaveClass('custom-frame');
    });

    it('applies multiple scroll classes', () => {
      const { container } = renderCarousel({
        hidden: true,
        scroll: true,
        auto: true
      });
      const view = container.querySelector('.frui-carousel-view');

      expect(view).toHaveClass(
        'frui-scroll-hidden',
        'frui-scroll',
        'frui-scroll-auto'
      );
    });

    it('applies film slot with style object', () => {
      const { container } = renderCarousel({
        film: { style: { gap: '10px' } }
      });
      const film = container.querySelector(
        '.frui-carousel-film'
      ) as HTMLElement;

      expect(film.style.gap).toBe('10px');
    });

    it('applies view slot with style object', () => {
      const { container } = renderCarousel({
        view: { style: { overflow: 'hidden' } }
      });
      const view = container.querySelector(
        '.frui-carousel-view'
      ) as HTMLElement;

      expect(view.style.overflow).toBe('hidden');
    });

    it('applies frame slot with style object', () => {
      const { container } = renderCarousel({
        frame: { style: { margin: '5px' } }
      });
      const frame = container.querySelector(
        '.frui-film-frame'
      ) as HTMLElement;

      expect(frame.style.margin).toBe('5px');
    });
  });

  describe('navigation', () => {
    it('renders Previous and Next components', () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Previous>Prev</Carousel.Previous>
          <Carousel.Next>Next</Carousel.Next>
        </Carousel>
      );

      expect(screen.getByText('Prev')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('calls prev handler on Previous click', async () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test1" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test2" src="b.jpg" />
          </Carousel.Frame>
          <Carousel.Previous>Prev</Carousel.Previous>
        </Carousel>
      );

      const prevBtn = screen.getByText('Prev');
      fireEvent.click(prevBtn);

      await waitFor(() => {
        expect(mockScrollBy).toHaveBeenCalled();
      });
    });

    it('calls next handler on Next click', async () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test1" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test2" src="b.jpg" />
          </Carousel.Frame>
          <Carousel.Next>Next</Carousel.Next>
        </Carousel>
      );

      const nextBtn = screen.getByText('Next');
      fireEvent.click(nextBtn);

      await waitFor(() => {
        expect(mockScrollBy).toHaveBeenCalled();
      });
    });

    it('renders Previous with asChild prop', () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Previous asChild>
            <button type="button">Custom Prev</button>
          </Carousel.Previous>
        </Carousel>
      );

      const btn = screen.getByRole('button', {
        name: 'Custom Prev'
      });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveClass('frui-carousel-prev');
    });

    it('renders Next with asChild prop', () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Next asChild>
            <button type="button">Custom Next</button>
          </Carousel.Next>
        </Carousel>
      );

      const btn = screen.getByRole('button', {
        name: 'Custom Next'
      });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveClass('frui-carousel-next');
    });

    it('handles asChild with array children for Previous', () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Previous asChild>
            {[ <button key="1" type="button">First</button> ]}
          </Carousel.Previous>
        </Carousel>
      );

      const btn = screen.getByRole('button', { name: 'First' });
      expect(btn).toHaveClass('frui-carousel-prev');
    });

    it('handles asChild with array children for Next', () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Next asChild>
            {[ <button key="1" type="button">First</button> ]}
          </Carousel.Next>
        </Carousel>
      );

      const btn = screen.getByRole('button', { name: 'First' });
      expect(btn).toHaveClass('frui-carousel-next');
    });

    it('falls back to div when asChild has invalid children', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Previous asChild>Invalid</Carousel.Previous>
        </Carousel>
      );

      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('applies custom className to Previous', () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Previous className="custom-prev">
            Prev
          </Carousel.Previous>
        </Carousel>
      );

      const prevBtn = screen.getByText('Prev');
      expect(prevBtn).toHaveClass('custom-prev');
    });

    it('applies custom className to Next', () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Next className="custom-next">Next</Carousel.Next>
        </Carousel>
      );

      const nextBtn = screen.getByText('Next');
      expect(nextBtn).toHaveClass('custom-next');
    });

    it('applies custom style to Previous', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Previous style={{ padding: '5px' }}>
            Prev
          </Carousel.Previous>
        </Carousel>
      );

      const prevBtn = screen.getByText('Prev');
      expect(prevBtn).toHaveStyle({ padding: '5px' });
    });

    it('applies custom style to Next', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Next 
            style={{ padding: '5px' }}
          >
            Next
          </Carousel.Next>
        </Carousel>
      );

      const nextBtn = screen.getByText('Next');
      expect(nextBtn).toHaveStyle({ padding: '5px' });
    });
  });

  describe('carousel state', () => {
    it('renders with defaultIndex', () => {
      const { container } = renderCarousel({ defaultIndex: 1 });
      const wrapper = container.querySelector('.frui-carousel');

      expect(wrapper).toBeInTheDocument();
    });

    it('renders with controlled index', () => {
      const { container } = renderCarousel({ index: 2 });
      const wrapper = container.querySelector('.frui-carousel');

      expect(wrapper).toBeInTheDocument();
    });

    it('updates when index prop changes', async () => {
      const { rerender } = renderCarousel({ index: 0 });

      rerender(
        <Carousel index={1}>
          <Carousel.Frame>
            <img alt="test1" src="image1.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test2" src="image2.jpg" />
          </Carousel.Frame>
        </Carousel>
      );

      await waitFor(() => {
        expect(mockScrollBy).toHaveBeenCalled();
      });
    });

    it('renders with repeat prop', () => {
      const { container } = renderCarousel({ repeat: true });
      const wrapper = container.querySelector('.frui-carousel');

      expect(wrapper).toBeInTheDocument();
    });

    it('prev wraps to last with repeat', async () => {
      render(
        <Carousel repeat>
          <Carousel.Frame>
            <img alt="test1" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test2" src="b.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test3" src="c.jpg" />
          </Carousel.Frame>
          <Carousel.Previous>Prev</Carousel.Previous>
        </Carousel>
      );

      const prevBtn = screen.getByText('Prev');
      fireEvent.click(prevBtn);

      await waitFor(() => {
        expect(mockScrollBy).toHaveBeenCalled();
      });
    });

    it('next wraps to first with repeat', async () => {
      render(
        <Carousel repeat defaultIndex={2}>
          <Carousel.Frame>
            <img alt="test1" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test2" src="b.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test3" src="c.jpg" />
          </Carousel.Frame>
          <Carousel.Next>Next</Carousel.Next>
        </Carousel>
      );

      const nextBtn = screen.getByText('Next');
      fireEvent.click(nextBtn);

      await waitFor(() => {
        expect(mockScrollBy).toHaveBeenCalled();
      });
    });

    it('does not go below 0 without repeat', () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test1" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Previous>Prev</Carousel.Previous>
        </Carousel>
      );

      const prevBtn = screen.getByText('Prev');
      fireEvent.click(prevBtn);

      expect(prevBtn).toBeInTheDocument();
    });

    it('does not exceed max without repeat', () => {
      render(
        <Carousel defaultIndex={1}>
          <Carousel.Frame>
            <img alt="test1" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test2" src="b.jpg" />
          </Carousel.Frame>
          <Carousel.Next>Next</Carousel.Next>
        </Carousel>
      );

      const nextBtn = screen.getByText('Next');
      fireEvent.click(nextBtn);

      expect(nextBtn).toBeInTheDocument();
    });
  });

  describe('scrolling behavior', () => {
    it('scrolls to active frame on mount', async () => {
      renderCarousel({ defaultIndex: 1 });

      await waitFor(() => {
        expect(mockScrollBy).toHaveBeenCalled();
      });
    });

    it('handles missing active frame gracefully', () => {
      const { container } = renderCarousel({ defaultIndex: 10 });
      expect(
        container.querySelector('.frui-carousel')
      ).toBeInTheDocument();
    });
  });

  describe('exports', () => {
    it('exports Frame component', () => {
      expect(Carousel.Frame).toBeDefined();
    });

    it('exports Previous component', () => {
      expect(Carousel.Previous).toBeDefined();
      expect(Carousel.Previous).toBe(Carousel.Prev);
    });

    it('exports Next component', () => {
      expect(Carousel.Next).toBeDefined();
    });

    it('exports useCarousel hook', () => {
      expect(Carousel.useCarousel).toBeDefined();
      expect(Carousel.use).toBe(Carousel.useCarousel);
    });

    it('exports useCarouselContext hook', () => {
      expect(Carousel.useCarouselContext).toBeDefined();
      expect(Carousel.useContext).toBe(Carousel.useCarouselContext);
    });

    it('exports helper functions', () => {
      expect(Carousel.getFrames).toBeDefined();
      expect(Carousel.getPrevious).toBeDefined();
      expect(Carousel.getNext).toBeDefined();
    });
  });
});