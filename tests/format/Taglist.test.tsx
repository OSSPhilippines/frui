//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties, ReactNode } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Taglist from '../../frui/src/format/Taglist.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/element/Badge.js', () => ({
  __esModule: true,
  default: ({
    children,
    className,
    style,
    ...rest
  }: {
    children?: ReactNode,
    className?: string,
    style?: CSSProperties
  }) => (
    <span
      data-testid="mock-badge"
      className={className}
      style={style as CSSProperties}
      {...rest}
    >
      {children}
    </span>
  )
}));

//--------------------------------------------------------------------//
// Helpers

const tags = [ 'React', 'TypeScript', 'Vitest' ];

//--------------------------------------------------------------------//
// Tests

describe('<Taglist /> Component', () => {
  it('renders wrapper with "frui-format-taglist" class', () => {
    render(<Taglist value={tags} />);
    const wrapper = document.querySelector('.frui-format-taglist');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('frui-format-taglist');
  });

  it('renders a Badge for each tag value', () => {
    render(<Taglist value={tags} />);
    const badges = screen.getAllByTestId('mock-badge');
    expect(badges).toHaveLength(tags.length);
    badges.forEach((badge, i) => expect(
      badge).toHaveTextContent(tags[ i ]
    ));
  });

  it('applies provided className to each Badge', () => {
    render(<Taglist value={tags} className="tag-pill" />);
    const badges = screen.getAllByTestId('mock-badge');
    badges.forEach(badge => expect(badge).toHaveClass('tag-pill'));
  });

  it('applies custom style to each Badge', () => {
    render(
      <Taglist 
        value={tags} 
        style={{ backgroundColor: 'rgb(0, 0, 255)' }} 
      />
    );
    const badges = screen.getAllByTestId('mock-badge');
    badges.forEach(badge =>
      expect(badge).toHaveStyle(
        'background-color: rgb(0, 0, 255)'
      )
    );
  });

  it('renders empty wrapper gracefully with empty array', () => {
    render(<Taglist value={[]} />);
    const wrapper = 
      document.querySelector('.frui-format-taglist');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.textContent).toBe('');
  });

  it('forwards extra props to Badge components', () => {
    render(
      <Taglist 
        value={tags} 
        className="extra" 
        data-size="lg" 
      />
    );
    const badges = screen.getAllByTestId('mock-badge');
    badges.forEach(badge => {
      expect(badge).toHaveClass('extra');
      expect(badge).toHaveAttribute('data-size', 'lg');
    });
  });

  it('matches snapshot for default rendering', () => {
    const { container } = render(<Taglist value={tags} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for styled taglist', () => {
    const { container } = render(
      <Taglist
        value={tags}
        className="highlighted"
        style={{ color: 'red' }}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});