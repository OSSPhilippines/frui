//--------------------------------------------------------------------//
// Imports

//frui
import ImageCarousel from '../../src/view/ImageCarousel.js';
//modules
import type { ReactNode } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/base/Carousel.js', () => {
  const MockFrame = ({ children }: { children?: ReactNode }) => (
    <div data-testid="mock-frame">{children}</div>
  );

  const MockCarousel = ({
    children,
    className,
    style
  }: {
    children?: ReactNode,
    className?: string,
    style?: object
  }) => (
    <div
      data-testid="mock-carousel"
      className={className}
      style={style}
    >
      {children}
    </div>
  );

  Object.assign(MockCarousel, {
    Frame: MockFrame,
    getPrevious: vi.fn(() => (<div data-testid="mock-prev">Prev</div>)),
    getNext: vi.fn(() => (<div data-testid="mock-next">Next</div>)),
    useCarousel: vi.fn(),
    useCarouselContext: vi.fn(),
    Prev: vi.fn(),
    Previous: vi.fn(),
    Next: vi.fn(),
    useContext: vi.fn(),
    use: vi.fn()
  });

  return { __esModule: true, default: MockCarousel };
});

vi.mock('../../src/helpers/getClassStyles.js', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    classes: [ 'mock-img-class' ],
    styles: { border: '1px solid red' }
  }))
}));

vi.mock('../../src/helpers/getSlotStyles.js', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    className: 'slot-class',
    style: { opacity: 0.5 }
  }))
}));

//--------------------------------------------------------------------//
// Tests

describe('<ImageCarousel />', () => {
  it('renders Carousel wrapper with correct class', () => {
    render(<ImageCarousel value={[ 'img1.jpg', 'img2.jpg' ]} />);
    const carousel = screen.getByTestId('mock-carousel');
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveClass('frui-view-image-carousel');
  });

  it('applies custom className and style', () => {
    render(
      <ImageCarousel
        className="extra"
        style={{ color: 'blue' }}
        value={[ 'one.png' ]}
      />
    );
    const carousel = screen.getByTestId('mock-carousel');
    expect(carousel).toHaveClass('extra');
    expect(carousel).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });

  it('renders <img> elements from provided value prop', () => {
    render(
      <ImageCarousel value={[ 'a.png', 'b.png', 'c.png' ]} />
    );
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[ 0 ]).toHaveAttribute('src', 'a.png');
    expect(images[ 1 ]).toHaveAttribute('src', 'b.png');
    expect(images[ 2 ]).toHaveAttribute('src', 'c.png');
  });

  it('applies generated class and inline style to image', () => {
    render(<ImageCarousel value={[ 'styled.jpg' ]} />);
    const img = screen.getByRole('img');
    expect(img).toHaveClass('mock-img-class');
    const styleAttr = img.getAttribute('style') || '';
    expect(styleAttr.includes('border: 1px solid red')).toBe(true);
  });

  it('renders previous and next Carousel controls', () => {
    render(<ImageCarousel value={[ 'img.png' ]} />);
    expect(screen.getByTestId('mock-prev')).toBeInTheDocument();
    expect(screen.getByTestId('mock-next')).toBeInTheDocument();
  });

  it('calls getSlotStyles for image slot', async () => {
    const getSlotStyles = (
      await import('../../src/helpers/getSlotStyles.js')
    ).default as ReturnType<typeof vi.fn>;

    getSlotStyles.mockClear();

    render(
      <ImageCarousel
        image={{ className: 'slot-x', style: { background: 'red' } }}
        value={[ 'img.png' ]}
      />
    );

    expect(getSlotStyles).toHaveBeenCalledWith(
      { className: 'slot-x', style: { background: 'red' } },
      {}
    );
  });

  it('renders one <Carousel.Frame> for each image', () => {
    render(<ImageCarousel value={[ 'f1.jpg', 'f2.jpg' ]} />);
    const frames = screen.getAllByTestId('mock-frame');
    expect(frames).toHaveLength(2);
  });

  it('forwards extra HTML attributes to <img>', () => {
    render(
      <ImageCarousel
        alt="sample"
        title="sample image"
        value={[ 'alt-img.jpg' ]}
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'sample');
    expect(img).toHaveAttribute('title', 'sample image');
  });
});