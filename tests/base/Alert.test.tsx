//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactElement, ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
//tests
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
//frui
import { Alert } from '../../src/base/Alert.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/base/Box.js', () => {
  const BoxMock = ({
    asChild,
    children,
    className,
    style,
    color,
    outline
  }: {
    asChild?: boolean,
    children?: ReactNode,
    className?: string,
    style?: Record<string, unknown>,
    color?: string,
    outline?: boolean
  }) => {
    const computedStyle: Record<string, unknown> = { ...style };
    const computedClasses: string[] = [ 'frui-alert' ];
    if (className) computedClasses.push(className);
    //Add background or border colors depending on layout
    if (color && outline) {
      computedStyle.borderColor = color;
      computedStyle.color = color;
      computedClasses.push('frui-solid', 'frui-thin');
    } else if (color) {
      computedStyle.backgroundColor = color;
      computedClasses.push('frui-tx-white');
    } else {
      computedClasses.push('frui-tx-white');
    }
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
            computedClasses.join(' ')
          }`.trim(),
          style: {
            ...((childProps.style as Record<string, unknown>) || {}),
            ...computedStyle
          }
        }
      };
    }
    return (
      <div className={computedClasses.join(' ')} style={computedStyle}>
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
  BoxMock.removeThemeProps = (props: Record<string, unknown>) => {
    const { children, className, style, ...rest } = props;
    const baseProps: Record<string, unknown> = {
      children,
      className,
      style
    };
    Object.keys(rest).forEach(key => {
      if ([ 'id', 'data-testid', 'onClick' ].includes(key)) {
        baseProps[ key ] = rest[ key ];
      }
    });
    return baseProps;
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

describe('<Alert />', () => {
  it('renders with base classes', () => {
    const { container } = render(<Alert>content</Alert>);
    const alert = container.querySelector('.frui-alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('frui-alert', 'frui-tx-white');
    expect(alert?.textContent).toBe('content');
  });

  it('adds a custom className when provided', () => {
    render(<Alert className="custom">message</Alert>);
    const element = screen.getByText('message');
    expect(element).toHaveClass('frui-alert', 'custom');
  });

  it('applies solid layout by default with background color', () => {
    render(<Alert color="red">solid</Alert>);
    const element = screen.getByText('solid');
    expect(element).toHaveClass('frui-alert', 'frui-tx-white');
    expect(element.style.backgroundColor).toBe('red');
  });

  it('applies outline layout with border and text color', () => {
    render(
      <Alert color="blue" outline>
        outlined
      </Alert>
    );
    const element = screen.getByText('outlined');
    expect(element).toHaveClass(
      'frui-alert', 'frui-solid', 'frui-thin'
    );
    expect(element.style.borderColor).toBe('blue');
    expect(element.style.color).toBe('blue');
  });

  it('merges inline styles with generated ones', () => {
    render(
      <Alert color="green" style={{ padding: '10px' }}>
        styled
      </Alert>
    );
    const element = screen.getByText('styled');
    expect(element.style.padding).toBe('10px');
    expect(element.style.backgroundColor).toBe('green');
  });
});