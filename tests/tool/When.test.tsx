//--------------------------------------------------------------------//
// Imports

//frui
import When, {
  Otherwise,
  nextCondition
} from '../../src/tool/When.js';
//tests
import '@testing-library/jest-dom';
import {
  describe,
  expect,
  it
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

//--------------------------------------------------------------------//
// Tests

describe('nextCondition()', () => {
  it('returns -1 when no When or Otherwise components found', () => {
    const children = [
      <span key="1">A</span>,
      <div key="2">B</div>
    ];
    const result = nextCondition(children, 0);
    expect(result).toBe(-1);
  });

  it('returns index of the next When component', () => {
    const children = [
      <div key="1">first</div>,
      <When key="2" condition={true}>child</When>,
      <Otherwise key="3">child</Otherwise>
    ];
    const result = nextCondition(children, 0);
    expect(result).toBe(1);
  });

  it('returns index of the next Otherwise component', () => {
    const children = [
      <div key="1">first</div>,
      <Otherwise key="2">child</Otherwise>
    ];
    const result = nextCondition(children, 0);
    expect(result).toBe(1);
  });
});

describe('<When />', () => {
  it('renders its children when condition is true', () => {
    render(
      <When condition={true}>
        <div data-testid="content">Visible Content</div>
      </When>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('renders null if false and no next', () => {
    const { container } = render(
      <When condition={false}>
        <div data-testid="content">Hidden</div>
      </When>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders next <When> if false', () => {
    render(
      <When condition={false}>
        <div>First Layer</div>
        <When condition={true}>
          <div data-testid="content">Second Layer</div>
        </When>
      </When>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('renders <Otherwise> children when condition is false', () => {
    render(
      <When condition={false}>
        <div>Fallback</div>
        <Otherwise>
          <div data-testid="content">Otherwise Block</div>
        </Otherwise>
      </When>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('"renders first <When> only', () => {
    render(
      <When condition={true}>
        <div data-testid="first">First</div>
        <When condition={true}>
          <div data-testid="second">Second</div>
        </When>
        <Otherwise>
          <div data-testid="otherwise">Otherwise</div>
        </Otherwise>
      </When>
    );
    expect(screen.getByTestId('first')).toBeInTheDocument();
    expect(
      screen.queryByTestId('second')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('otherwise')
    ).not.toBeInTheDocument();
  });

  it('renders next <When> if false and no Otherwise', () => {
    render(
      <When condition={false}>
        <div>Initial</div>
        <When condition={true}>
          <div data-testid="valid-next">Next Visible</div>
        </When>
      </When>
    );
    expect(screen.getByTestId('valid-next')).toBeInTheDocument();
  });
});