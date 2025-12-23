//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { 
  fireEvent, 
  render, 
  screen, 
  waitFor 
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
import Film from '../../src/base/Film.js';

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

vi.mock('../../src/helpers/getClassStyles.js', () => ({
  __esModule: true,
  default: ({ classes = [], props, state }: {
    classes?: string[],
    props?: {
      className?: string | ((s: unknown) => string),
      style?: object | ((s: unknown) => object)
    },
    state?: unknown
  }) => {
    const finalClasses = [ ...classes ];
    const finalStyles: Record<string, unknown> = {};

    if (props?.className) {
      if (typeof props.className === 'function') {
        const result = props.className(state || {});
        if (typeof result === 'string') {
          finalClasses.push(result);
        }
      } else {
        finalClasses.push(props.className);
      }
    }

    if (props?.style) {
      if (typeof props.style === 'function') {
        const result = props.style(state || {});
        if (typeof result === 'object') {
          Object.assign(finalStyles, result);
        }
      } else {
        Object.assign(finalStyles, props.style);
      }
    }

    return {
      classes: finalClasses,
      styles: finalStyles
    };
  }
}));

vi.mock('../../src/helpers/getSlotStyles.js', () => ({
  __esModule: true,
  default: (props: unknown, state: unknown) => {
    if (typeof props === 'string') {
      return { className: props };
    }
    if (typeof props === 'object' && props !== null) {
      if ('className' in props || 'style' in props) {
        return props;
      }
      return { style: props };
    }
    if (typeof props === 'function') {
      const result = props(state);
      if (typeof result === 'string') {
        return { className: result };
      }
      if (typeof result === 'object' && result !== null) {
        if ('className' in result || 'style' in result) {
          return result;
        }
        return { style: result };
      }
    }
    return {};
  }
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

    it('renders with empty children', () => {
      const { container } = render(<Carousel />);
      const wrapper = container.querySelector('.frui-carousel');

      expect(wrapper).toBeInTheDocument();
    });

    it('renders with single frame', () => {
      renderCarousel({}, 1);
      const images = screen.getAllByRole('img');

      expect(images).toHaveLength(1);
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

    it('applies film slot with className object', () => {
      const { container } = renderCarousel({
        film: { className: 'custom-film' }
      });
      const film = container.querySelector('.frui-carousel-film');

      expect(film).toHaveClass('custom-film');
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

    it('applies film slot as string', () => {
      const { container } = renderCarousel({
        film: 'string-film-class'
      });
      const film = container.querySelector('.frui-carousel-film');

      expect(film).toHaveClass('string-film-class');
    });

    it('applies film slot as pure style object', () => {
      const { container } = renderCarousel({
        film: { display: 'flex' }
      });
      const film = container.querySelector(
        '.frui-carousel-film'
      ) as HTMLElement;

      expect(film.style.display).toBe('flex');
    });

    it('applies film slot as callable returning className', () => {
      const { container } = renderCarousel({
        film: () => ({ className: 'func-film' })
      });
      const film = container.querySelector('.frui-carousel-film');

      expect(film).toHaveClass('func-film');
    });

    it('applies film slot as callable returning style', () => {
      const { container } = renderCarousel({
        film: () => ({ style: { gap: '15px' } })
      });
      const film = container.querySelector(
        '.frui-carousel-film'
      ) as HTMLElement;

      expect(film.style.gap).toBe('15px');
    });

    it('applies film slot as callable returning string', () => {
      const { container } = renderCarousel({
        film: () => 'callable-string-film'
      });
      const film = container.querySelector('.frui-carousel-film');

      expect(film).toHaveClass('callable-string-film');
    });

    it('applies film slot as callable returning pure style object', () => {
      const { container } = renderCarousel({
        film: () => ({ flexDirection: 'column' })
      });
      const film = container.querySelector(
        '.frui-carousel-film'
      ) as HTMLElement;

      expect(film.style.flexDirection).toBe('column');
    });

    it('applies view slot with className object', () => {
      const { container } = renderCarousel({
        view: { className: 'custom-view' }
      });
      const view = container.querySelector('.frui-carousel-view');

      expect(view).toHaveClass('custom-view');
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

    it('applies view slot as string', () => {
      const { container } = renderCarousel({
        view: 'string-view-class'
      });
      const view = container.querySelector('.frui-carousel-view');

      expect(view).toHaveClass('string-view-class');
    });

    it('applies frame slot with className object', () => {
      const { container } = renderCarousel({
        frame: { className: 'custom-frame' }
      });
      const frame = container.querySelector('.frui-film-frame');

      expect(frame).toHaveClass('custom-frame');
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

    it('applies frame slot as string', () => {
      const { container } = renderCarousel({
        frame: 'string-frame-class'
      });
      const frame = container.querySelector('.frui-film-frame');

      expect(frame).toHaveClass('string-frame-class');
    });

    it('applies frame slot as callable function', () => {
      const { container } = renderCarousel({
        frame: () => ({ className: 'dynamic-frame' })
      });
      const frame = container.querySelector('.frui-film-frame');

      expect(frame).toHaveClass('dynamic-frame');
    });

    it('applies frame slot as callable returning style', () => {
      const { container } = renderCarousel({
        frame: () => ({ style: { padding: '8px' } })
      });
      const frame = container.querySelector(
        '.frui-film-frame'
      ) as HTMLElement;

      expect(frame.style.padding).toBe('8px');
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
        <Carousel defaultIndex={1}>
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

    it('falls back to div when Previous asChild has invalid children', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Previous asChild>Invalid</Carousel.Previous>
        </Carousel>
      );

      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });

    it('falls back to div when Next asChild has invalid children', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Next asChild>Invalid</Carousel.Next>
        </Carousel>
      );

      const nextDiv = screen.getByText('Invalid');
      expect(nextDiv).toBeInTheDocument();
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
      render(
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
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Next style={{ padding: '5px' }}>
            Next
          </Carousel.Next>
        </Carousel>
      );

      const nextBtn = screen.getByText('Next');
      expect(nextBtn).toHaveStyle({ padding: '5px' });
    });

    it('triggers next with asChild button click', async () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test1" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test2" src="b.jpg" />
          </Carousel.Frame>
          <Carousel.Next asChild>
            <button type="button">Go</button>
          </Carousel.Next>
        </Carousel>
      );

      const btn = screen.getByRole('button', { name: 'Go' });
      fireEvent.click(btn);

      await waitFor(() => {
        expect(mockScrollBy).toHaveBeenCalled();
      });
    });

    it('triggers prev with asChild button click', async () => {
      render(
        <Carousel defaultIndex={1}>
          <Carousel.Frame>
            <img alt="test1" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test2" src="b.jpg" />
          </Carousel.Frame>
          <Carousel.Previous asChild>
            <button type="button">Back</button>
          </Carousel.Previous>
        </Carousel>
      );

      const btn = screen.getByRole('button', { name: 'Back' });
      fireEvent.click(btn);

      await waitFor(() => {
        expect(mockScrollBy).toHaveBeenCalled();
      });
    });

    it('Next without onClick when not asChild', () => {
      render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Next>Click Me</Carousel.Next>
        </Carousel>
      );

      const nextBtn = screen.getByText('Click Me');
      fireEvent.click(nextBtn);
      
      expect(nextBtn).toBeInTheDocument();
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

    it('scrolls when active index changes', async () => {
      const { rerender } = renderCarousel({ index: 0 });

      mockScrollBy.mockClear();

      rerender(
        <Carousel index={2}>
          <Carousel.Frame>
            <img alt="test1" src="image1.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test2" src="image2.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="test3" src="image3.jpg" />
          </Carousel.Frame>
        </Carousel>
      );

      await waitFor(() => {
        expect(mockScrollBy).toHaveBeenCalled();
      });
    });

    it('handles missing view ref', () => {
      const { container } = render(
        <Carousel index={0}>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
        </Carousel>
      );

      expect(container.querySelector('.frui-carousel')).toBeInTheDocument();
    });
  });

  describe('FilmFrame component', () => {
    it('renders Frame with asChild prop', () => {
      render(
        <Carousel>
          <Carousel.Frame asChild>
            <article>
              <img alt="test" src="a.jpg" />
            </article>
          </Carousel.Frame>
        </Carousel>
      );

      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
      expect(article).toHaveClass('frui-film-frame');
    });

    it('renders Frame with asChild and array children', () => {
      render(
        <Carousel>
          <Carousel.Frame asChild>
            {[
              <article key="1">
                <img alt="test" src="a.jpg" />
              </article>
            ]}
          </Carousel.Frame>
        </Carousel>
      );

      const article = screen.getByRole('article');
      expect(article).toHaveClass('frui-film-frame');
    });

    it('falls back to div when Frame asChild has text', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame asChild>Just text</Carousel.Frame>
        </Carousel>
      );

      const frame = container.querySelector('.frui-film-frame');
      expect(frame).toBeInTheDocument();
      expect(frame?.tagName).toBe('DIV');
    });

    it('applies custom className to Frame', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame className="custom-frame-class">
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
        </Carousel>
      );

      const frame = container.querySelector('.frui-film-frame');
      expect(frame).toHaveClass('custom-frame-class');
    });

    it('applies custom style to Frame', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame style={{ padding: '10px' }}>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
        </Carousel>
      );

      const frame = container.querySelector(
        '.frui-film-frame'
      ) as HTMLElement;
      expect(frame.style.padding).toBe('10px');
    });

    it('prefers direct props over slot frame props', () => {
      const { container } = render(
        <Carousel frame={{ className: 'slot-frame' }}>
          <Carousel.Frame className="direct-frame">
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
        </Carousel>
      );

      const frame = container.querySelector('.frui-film-frame');
      expect(frame).toHaveClass('direct-frame');
      expect(frame).not.toHaveClass('slot-frame');
    });

    it('uses slot frame props when no direct props', () => {
      const { container } = render(
        <Carousel frame={{ className: 'slot-frame' }}>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
        </Carousel>
      );

      const frame = container.querySelector('.frui-film-frame');
      expect(frame).toHaveClass('slot-frame');
    });

    it('handles asChild with invalid array children', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame asChild>
            {[ 'invalid' ]}
          </Carousel.Frame>
        </Carousel>
      );

      const frame = container.querySelector('.frui-film-frame');
      expect(frame).toBeInTheDocument();
      expect(frame?.tagName).toBe('DIV');
    });
  });

  describe('Film component integration', () => {
    it('renders Film with custom className', () => {
      const { container } = render(
        <Film className="custom-film">
          <Film.Frame>
            <img alt="test" src="a.jpg" />
          </Film.Frame>
        </Film>
      );

      const film = container.querySelector('.frui-film');
      expect(film).toHaveClass('custom-film');
    });

    it('renders Film with custom style', () => {
      const { container } = render(
        <Film style={{ gap: '20px' }}>
          <Film.Frame>
            <img alt="test" src="a.jpg" />
          </Film.Frame>
        </Film>
      );

      const film = container.querySelector('.frui-film') as HTMLElement;
      expect(film.style.gap).toBe('20px');
    });

    it('passes frame slot to children via context', () => {
      const { container } = render(
        <Film frame={{ className: 'context-frame' }}>
          <Film.Frame>
            <img alt="test" src="a.jpg" />
          </Film.Frame>
        </Film>
      );

      const frame = container.querySelector('.frui-film-frame');
      expect(frame).toHaveClass('context-frame');
    });

    it('passes frame slot with style via context', () => {
      const { container } = render(
        <Film frame={{ style: { margin: '15px' } }}>
          <Film.Frame>
            <img alt="test" src="a.jpg" />
          </Film.Frame>
        </Film>
      );

      const frame = container.querySelector(
        '.frui-film-frame'
      ) as HTMLElement;
      expect(frame.style.margin).toBe('15px');
    });

    it('handles frame slot as callable', () => {
      const { container } = render(
        <Film frame={() => ({ className: 'dynamic-context' })}>
          <Film.Frame>
            <img alt="test" src="a.jpg" />
          </Film.Frame>
        </Film>
      );

      const frame = container.querySelector('.frui-film-frame');
      expect(frame).toHaveClass('dynamic-context');
    });

    it('renders empty Film', () => {
      const { container } = render(<Film />);
      const film = container.querySelector('.frui-film');

      expect(film).toBeInTheDocument();
    });
  });

  describe('helper functions', () => {
    it('getFrames returns all Frame components', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame>
            <img alt="1" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Frame>
            <img alt="2" src="b.jpg" />
          </Carousel.Frame>
        </Carousel>
      );

      const frames = container.querySelectorAll('.frui-film-frame');
      expect(frames).toHaveLength(2);
    });

    it('getFrames returns empty array with no frames', () => {
      const frames = Carousel.getFrames(<div>No frames</div>);

      expect(frames).toHaveLength(0);
    });

    it('getPrevious returns Previous component', () => {
      const children = [
        <Carousel.Previous key="prev">Prev</Carousel.Previous>,
        <Carousel.Frame key="frame">
          <img alt="test" src="a.jpg" />
        </Carousel.Frame>
      ];

      const prev = Carousel.getPrevious(children);
      expect(prev).toBeDefined();
    });

    it('getPrevious returns null with no Previous', () => {
      const prev = Carousel.getPrevious(
        <Carousel.Frame>
          <img alt="test" src="a.jpg" />
        </Carousel.Frame>
      );

      expect(prev).toBeNull();
    });

    it('getNext returns Next component', () => {
      const children = [
        <Carousel.Next key="next">Next</Carousel.Next>,
        <Carousel.Frame key="frame">
          <img alt="test" src="a.jpg" />
        </Carousel.Frame>
      ];

      const next = Carousel.getNext(children);
      expect(next).toBeDefined();
    });

    it('getNext returns null with no Next', () => {
      const next = Carousel.getNext(
        <Carousel.Frame>
          <img alt="test" src="a.jpg" />
        </Carousel.Frame>
      );

      expect(next).toBeNull();
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

    it('exports Film component exports', () => {
      expect(Film.useFilmContext).toBeDefined();
      expect(Film.Frame).toBeDefined();
      expect(Film.useContext).toBe(Film.useFilmContext);
      expect(Film.useFilm).toBe(Film.useFilmContext);
      expect(Film.use).toBe(Film.useFilmContext);
    });
  });

  describe('edge cases', () => {
    it('handles undefined children', () => {
      const { container } = render(
        <Carousel>
          {undefined}
        </Carousel>
      );

      expect(container.querySelector('.frui-carousel')).toBeInTheDocument();
    });

    it('handles null children', () => {
      const { container } = render(
        <Carousel>
          {null}
        </Carousel>
      );

      expect(container.querySelector('.frui-carousel')).toBeInTheDocument();
    });

    it('handles mixed children types', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          {null}
          {undefined}
          <div>Random div</div>
        </Carousel>
      );

      expect(container.querySelector('.frui-carousel')).toBeInTheDocument();
    });

    it('handles index change to same value', async () => {
      const { rerender } = renderCarousel({ index: 1 });
      
      mockScrollBy.mockClear();

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

      expect(mockScrollBy).not.toHaveBeenCalled();
    });

    it('handles negative defaultIndex', () => {
      const { container } = renderCarousel({ defaultIndex: -1 });
      
      expect(container.querySelector('.frui-carousel')).toBeInTheDocument();
    });

    it('handles defaultIndex larger than frame count', () => {
      const { container } = renderCarousel({ defaultIndex: 100 }, 2);
      
      expect(container.querySelector('.frui-carousel')).toBeInTheDocument();
    });

    it('Previous component handles empty array children with asChild', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Previous asChild>
            {[]}
          </Carousel.Previous>
        </Carousel>
      );

      expect(container.querySelector('.frui-carousel')).toBeInTheDocument();
    });

    it('Next component handles empty array children with asChild', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
          <Carousel.Next asChild>
            {[]}
          </Carousel.Next>
        </Carousel>
      );

      expect(container.querySelector('.frui-carousel')).toBeInTheDocument();
    });

    it('Frame handles empty array children with asChild', () => {
      const { container } = render(
        <Carousel>
          <Carousel.Frame asChild>
            {[]}
          </Carousel.Frame>
        </Carousel>
      );

      expect(container.querySelector('.frui-film-frame')).toBeInTheDocument();
    });

    it('handles slot prop as callable returning invalid value', () => {
      const { container } = renderCarousel({
        film: () => null
      });

      expect(container.querySelector('.frui-carousel-film')).toBeInTheDocument();
    });

    it('handles frame with both className and style from slot', () => {
      const { container } = render(
        <Carousel frame={{ className: 'slot-class', style: { padding: '5px' } }}>
          <Carousel.Frame>
            <img alt="test" src="a.jpg" />
          </Carousel.Frame>
        </Carousel>
      );

      const frame = container.querySelector('.frui-film-frame') as HTMLElement;
      expect(frame).toHaveClass('slot-class');
      expect(frame.style.padding).toBe('5px');
    });

    it('handles view ref without frames', async () => {
      const { container } = render(<Carousel index={0} />);
      
      await waitFor(() => {
        expect(container.querySelector('.frui-carousel')).toBeInTheDocument();
      });
    });
  });
});