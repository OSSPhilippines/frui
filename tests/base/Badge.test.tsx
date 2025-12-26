//--------------------------------------------------------------------//
// Imports

//frui
import Badge from '../../src/base/Badge.js';
//modules
import type {
  ReactElement, ReactNode } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/base/Box.js', () => {
  const BoxMock = ({
    asChild,
    children,
    className,
    style
  }: {
    asChild?: boolean,
    children?: ReactNode,
    className?: string,
    style?: Record<string, unknown>
  }) => {
    if (
      asChild
      && children
      && typeof children === 'object'
      && 'type' in children
    ) {
      const child = children as ReactElement;
      const childProps = child.props as Record<string, unknown>;
      return {
        ...child,
        props: {
          ...childProps,
          className: `${childProps.className || ''} ${
            className || ''
          }`.trim(),
          style: {
            ...((childProps.style as Record<string, unknown>) || {}),
            ...style
          }
        }
      };
    }
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  };

  BoxMock.getThemeProps = (props: Record<string, unknown>) => {
    const themeProps: Record<string, unknown> = {};
    Object.keys(props).forEach(key => {
      if (![ 'children', 'className', 'style' ].includes(key)) {
        themeProps[ key ] = props[ key ];
      }
    });
    return themeProps;
  };

  BoxMock.removeThemeProps = (
    props: Record<string, unknown>
  ) => {
    const { children, className, style, ...rest } = props;
    const nonThemeProps: Record<string, unknown> = {
      children,
      className,
      style
    };
    Object.keys(rest).forEach(key => {
      if ([ 'id', 'data-testid', 'onClick' ].includes(key)) {
        nonThemeProps[ key ] = rest[ key ];
      }
    });
    return nonThemeProps;
  };

  BoxMock.hasSizeProps = () => false;
  BoxMock.hasPaddingProps = () => false;

  return {
    __esModule: true,
    default: BoxMock
  };
});

//--------------------------------------------------------------------//
// Tests

describe('<Badge />', () => {
  it('renders children content correctly', () => {
    render(<Badge>Sample</Badge>);
    expect(screen.getByText('Sample')).toBeInTheDocument();
  });

  it('includes default class frui-badge', () => {
    render(<Badge>Badge</Badge>);
    const badge = screen.getByText('Badge');
    expect(badge).toHaveClass('frui-badge');
  });

  it('renders as a span element', () => {
    const { container } = render(<Badge>Styled</Badge>);
    const badge = container.querySelector('span');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Styled');
  });

  it('merges provided className with default class', () => {
    render(<Badge className="custom">Combined</Badge>);
    const badge = screen.getByText('Combined');
    expect(badge).toHaveClass('frui-badge');
    expect(badge).toHaveClass('custom');
  });

  it('applies passed style props', () => {
    render(<Badge style={{ padding: '10px' }}>StyledBadge</Badge>);
    const badge = screen.getByText('StyledBadge');
    expect(badge.style.padding).toBe('10px');
  });
});