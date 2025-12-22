//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
//tests
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
//frui
import ImageFilm from '../../src/view/ImageFilm.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/base/Film.js', () => {
  const MockFrame = ({ children }: { children?: ReactNode }) => (
    <div data-testid="mock-frame">{children}</div>
  );

  const MockFilm = ({
    children,
    className,
    style
  }: {
    children?: ReactNode,
    className?: string,
    style?: object
  }) => (
    <div data-testid="mock-film" className={className} style={style}>
      {children}
    </div>
  );

  Object.assign(MockFilm, {
    Frame: MockFrame,
    useFilmContext: vi.fn(),
    useContext: vi.fn(),
    useFilm: vi.fn(),
    use: vi.fn()
  });

  return {
    __esModule: true,
    default: MockFilm
  };
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
    style: { background: 'yellow' }
  }))
}));

//--------------------------------------------------------------------//
// Tests

describe('<ImageFilm />', () => {
  it('renders Film wrapper with correct base class', () => {
    render(<ImageFilm value={[ 'img1.jpg' ]} />);
    const wrapper = screen.getByTestId('mock-film');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('frui-view-image-film');
  });

  it('applies custom className and style', () => {
    render(
      <ImageFilm
        className="extra"
        style={{ margin: '10px' }}
        value={[ 'one.png' ]}
      />
    );
    const wrapper = screen.getByTestId('mock-film');
    expect(wrapper).toHaveClass('extra');
    expect(wrapper).toHaveStyle({ margin: '10px' });
  });

  it('renders img elements based on value array', () => {
    render(<ImageFilm value={[ 'a.jpg', 'b.jpg', 'c.jpg' ]} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('src', 'a.jpg');
    expect(images[1]).toHaveAttribute('src', 'b.jpg');
    expect(images[2]).toHaveAttribute('src', 'c.jpg');
  });

  it('applies class and style from getClassStyles', () => {
    render(<ImageFilm value={[ 'styled-img.jpg' ]} />);
    const img = screen.getByRole('img');
    expect(img).toHaveClass('mock-img-class');
    const styleAttr = img.getAttribute('style') || '';
    expect(styleAttr.includes('border: 1px solid red')).toBe(true);
  });

  it('renders Film.Frame component for each image', () => {
    render(<ImageFilm value={[ 'frame1.png', 'frame2.png' ]} />);
    const frames = screen.getAllByTestId('mock-frame');
    expect(frames).toHaveLength(2);
  });

  it('calls getSlotStyles when image prop is provided', async () => {
    const getSlotStyles = (
      await import('../../src/helpers/getSlotStyles.js')
    ).default as ReturnType<typeof vi.fn>;

    getSlotStyles.mockClear();

    render(
      <ImageFilm
        image={{ className: 'slot-class', style: { opacity: 0.5 } }}
        value={[ 'one.jpg' ]}
      />
    );

    expect(getSlotStyles).toHaveBeenCalledWith(
      { className: 'slot-class', style: { opacity: 0.5 } },
      {}
    );
  });

  it('forwards extra HTML props like alt and title to <img>', () => {
    render(
      <ImageFilm
        alt="sample"
        title="Test image"
        value={[ 'test.png' ]}
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'sample');
    expect(img).toHaveAttribute('title', 'Test image');
  });
});