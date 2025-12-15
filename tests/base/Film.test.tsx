//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
//tests
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
//frui
import Film, {
  FilmContext,
  FilmFrame,
  useFilmContext
} from '../../src/base/Film.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/helpers/getClassStyles.js', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    classes: [ 'mock-style' ],
    styles: { color: 'red' }
  }))
}));

vi.mock('../../src/helpers/getSlotStyles.js', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    className: 'slot-style',
    style: { backgroundColor: 'blue' }
  }))
}));

//--------------------------------------------------------------------//
// Tests

describe('useFilmContext()', () => {
  it('returns context value from FilmContext.Provider', () => {
    let captured;
    const mockContext = { frame: { className: 'frame-class' } };
    function TestComponent() {
      captured = useFilmContext();
      return (<div>ok</div>);
    }
    render(
      <FilmContext.Provider value={mockContext}>
        <TestComponent />
      </FilmContext.Provider>
    );
    expect(captured).toEqual(mockContext);
  });
});

describe('<FilmFrame />', () => {
  it('renders with default classes and styles', () => {
    render(<FilmFrame>child</FilmFrame>);
    const frame = screen.getByText('child').closest('div');
    expect(frame).toHaveClass('mock-style');
    expect(frame).toHaveAttribute('style');
  });

  it('applies className and style overrides', () => {
    render(
      <FilmFrame className="override" style={{ color: 'blue' }}>
        custom
      </FilmFrame>
    );
    const frame = screen.getByText('custom').closest('div');
    expect(frame).toHaveClass('mock-style');
    expect(frame).toHaveAttribute('style');
  });

  it('clones child element when asChild is true', () => {
    const Child = (<span data-testid="cloned">Child</span>);
    render(<FilmFrame asChild>{Child}</FilmFrame>);
    const el = screen.getByTestId('cloned');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('mock-style');
  });

  it('clones first valid element when children array is passed', () => {
    const childrenArray: ReactElement[] = [
      (<span data-testid="child1">First</span>),
      (<span>Second</span>)
    ];
    render(<FilmFrame asChild>{childrenArray}</FilmFrame>);
    const el = screen.getByTestId('child1');
    expect(el).toHaveClass('mock-style');
  });

  it('renders fallback div when asChild and invalid children', () => {
    render(<FilmFrame asChild>Invalid text</FilmFrame>);
    expect(screen.getByText('Invalid text')).toBeInTheDocument();
  });

  it('uses slot styles when frame context provided', () => {
    const contextValue = {
      frame: { className: 'slot-style', style: { background: 'yellow' } }
    };
    render(
      <FilmContext.Provider value={contextValue}>
        <FilmFrame>slotChild</FilmFrame>
      </FilmContext.Provider>
    );
    expect(screen.getByText('slotChild')).toBeInTheDocument();
  });
});

describe('<Film />', () => {
  it('renders main wrapper with frui-film class', () => {
    render(<Film>content</Film>);
    const wrapper = screen.getByText('content').closest('div');
    expect(wrapper).toHaveClass('frui-film');
  });

  it('applies custom className and style', () => {
    render(<Film className="extra" style={{ margin: '5px' }}>test</Film>);
    const wrapper = screen.getByText('test').closest('div');
    expect(wrapper).toHaveClass('frui-film');
    expect(wrapper).toHaveClass('extra');
    expect(wrapper).toHaveAttribute('style');
  });

  it('provides context value to children', () => {
    type FilmCtx = { frame: { className: string } };
    let captured: FilmCtx | undefined;
    function TestChild() {
      captured = useFilmContext() as FilmCtx;
      return (<div data-testid="child">inside</div>);
    }
    const frameProps = { className: 'frame-style' };
    render(
      <Film frame={frameProps}>
        <TestChild />
      </Film>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(captured?.frame).toEqual(frameProps);
  });

  it('renders children inside wrapper div', () => {
    render(<Film><span>inside</span></Film>);
    expect(screen.getByText('inside')).toBeInTheDocument();
  });
});