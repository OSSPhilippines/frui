//--------------------------------------------------------------------//
// Imports

//frui
import Bread, {
  BreadContext,
  BreadCrumb,
  BreadSlicer,
  buildBreadTrail,
  useBreadContext
} from '../../src/base/Bread.js';
//tests
import '@testing-library/jest-dom';
import {
  render,
  waitFor
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';

//--------------------------------------------------------------------//
// Tests

describe('buildBreadTrail()', () => {
  it('builds trail array from crumb children', () => {
    const trail = buildBreadTrail([
      <BreadCrumb key="1">A</BreadCrumb>,
      <BreadCrumb key="2">B</BreadCrumb>
    ]);
    expect(trail.length).toBe(3);
  });
});

describe('<Bread />', () => {
  it('renders base wrapper with class', () => {
    const { container } = render(<Bread>children</Bread>);
    expect(container.firstChild).toHaveClass('frui-bread');
  });

  it('renders crumbs when using controlled value prop', () => {
    const value = [ { label: 'Home' }, { label: 'About' } ];
    const { container } = render(<Bread value={value} />);
    const crumbs = container.querySelectorAll('.frui-bread-crumb');
    expect(crumbs.length).toBe(2);
  });

  it('renders crumbs from children', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>Home</BreadCrumb>
        <BreadCrumb>About</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const crumbs = container.querySelectorAll('.frui-bread-crumb');
      expect(crumbs.length).toBeGreaterThan(0);
    });
  });
});

describe('<BreadCrumb />', () => {
  it('renders within Bread component', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>Crumb1</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const crumb = container.querySelector('.frui-bread-crumb');
      expect(crumb).toBeInTheDocument();
    });
  });

  it('renders with href as anchor element', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb href="/home">Home</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const anchor = container.querySelector('a.frui-bread-crumb');
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', '/home');
    });
  });

  it('renders with icon when icon prop provided', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb icon="home">Home</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const icon = container.querySelector('.frui-bread-crumb-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('fa-home');
    });
  });
});

describe('<BreadSlicer />', () => {
  it('renders separator within Bread component', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>A</BreadCrumb>
        <BreadSlicer value=">" />
        <BreadCrumb>B</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const slicer = container.querySelector('.frui-bread-slicer');
      expect(slicer).toBeInTheDocument();
    });
  });

  it('uses default separator when no value provided', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>A</BreadCrumb>
        <BreadSlicer />
        <BreadCrumb>B</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const slicer = container.querySelector('.frui-bread-slicer');
      expect(slicer).toBeInTheDocument();
      expect(slicer?.textContent).toBe('/');
    });
  });
});

describe('useBreadContext()', () => {
  it('provides the same context value via hook', () => {
    let grabbed: unknown;
    const Demo = () => {
      grabbed = useBreadContext();
      return null;
    };
    const contextValue = {
      click: vi.fn(),
      pop: vi.fn(),
      push: vi.fn(),
      trail: [ 'abc' ]
    };
    render(
      <BreadContext.Provider value={contextValue}>
        <Demo />
      </BreadContext.Provider>
    );
    expect(grabbed).toBe(contextValue);
  });
});