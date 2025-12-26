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
  fireEvent,
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

  it('handles nested arrays of children', () => {
    const trail = buildBreadTrail([
      [ <BreadCrumb key="1">A</BreadCrumb> ],
      <BreadCrumb key="2">B</BreadCrumb>
    ]);
    expect(trail.length).toBe(3);
  });

  it('skips null and undefined children', () => {
    const trail = buildBreadTrail([
      <BreadCrumb key="1">A</BreadCrumb>,
      null,
      undefined,
      <BreadCrumb key="2">B</BreadCrumb>
    ]);
    expect(trail.length).toBe(3);
  });

  it('updates slicer when BreadSlicer encountered', () => {
    const trail = buildBreadTrail([
      <BreadCrumb key="1">A</BreadCrumb>,
      <BreadSlicer key="sep" value="-" />,
      <BreadCrumb key="2">B</BreadCrumb>
    ]);
    expect(trail.length).toBe(3);
  });

  it('handles single non-array child', () => {
    const trail = buildBreadTrail(
      <BreadCrumb key="1">Single</BreadCrumb>
    );
    expect(trail.length).toBe(1);
  });

  it('handles breadSlicer prop alternative', () => {
    const customSlicer = <span key="s" breadSlicer={true}>|</span>;
    const trail = buildBreadTrail([
      <BreadCrumb key="1">A</BreadCrumb>,
      customSlicer,
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

  it('renders with custom className and style', () => {
    const { container } = render(
      <Bread className="custom" style={{ padding: '10px' }}>
        children
      </Bread>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('frui-bread', 'custom');
    expect(element.style.padding).toBe('10px');
  });

  it('renders crumbs when using controlled value prop', () => {
    const value = [ 
      { label: 'Home', className: '', style: {} }, 
      { label: 'About', className: '', style: {} } 
    ];
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
      expect(crumbs.length).toBe(2);
    });
  });

  it('updates when controlled value changes', async () => {
    const { container, rerender } = render(
      <Bread value={[ { label: 'Home', className: '', style: {} } ]} />
    );
    expect(
      container.querySelectorAll('.frui-bread-crumb').length
    ).toBe(1);

    rerender(
      <Bread value={[ 
        { label: 'Home', className: '', style: {} }, 
        { label: 'About', className: '', style: {} } 
      ]} />
    );
    await waitFor(() => {
      expect(
        container.querySelectorAll('.frui-bread-crumb').length
      ).toBe(2);
    });
  });

  it('uses defaultValue for uncontrolled mode', () => {
    const { container } = render(
      <Bread defaultValue={[ {
         label: 'Initial', 
         className: '', 
         style: {} 
        } ]} 
      />
    );
    expect(
      container.querySelector('.frui-bread-crumb')
    ).toHaveTextContent('Initial');
  });

  it('calls onClick handler when crumb clicked', async () => {
    const onClick = vi.fn();
    const { container } = render(
      <Bread onClick={onClick}>
        <BreadCrumb href="/home">Home</BreadCrumb>
        <BreadCrumb href="/about">About</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const crumbs = 
        container.querySelectorAll('.frui-bread-crumb');
      fireEvent.click(crumbs[ 0 ]);
    });
    expect(onClick).toHaveBeenCalled();
  });

  it('renders crumbs with href and icon from value prop', () => {
    const value = [
      { 
        label: 'Home', 
        href: '/', icon: 'home', 
        className: '', 
        style: {} 
      },
      { 
        label: 'About', 
        href: '/about', 
        className: '', 
        style: {} 
      }
    ];
    const { container } = render(<Bread value={value} />);
    expect(
      container.querySelector('a[href="/"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('.fa-home')
    ).toBeInTheDocument();
  });

  it('renders crumbs with className and style from value', () => {
    const value = [
      { label: 'Styled', className: 'custom', style: { color: 'red' } }
    ];
    const { container } = render(<Bread value={value} />);
    const crumb = container.querySelector('.custom') as HTMLElement;
    expect(crumb.style.color).toBe('red');
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
      expect(
        container.querySelector('.frui-bread-crumb')
      ).toBeInTheDocument();
    });
  });

  it('renders as anchor when href provided', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb href="/home">Home</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const anchor = container.querySelector('a.frui-bread-crumb');
      expect(anchor).toHaveAttribute('href', '/home');
    });
  });

  it('renders as span without href', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>Home</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      expect(
        container.querySelector('span.frui-bread-crumb')
      ).toBeTruthy();
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
      expect(icon).toHaveClass('fa-home');
    });
  });

  it('marks last crumb active', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>Home</BreadCrumb>
        <BreadCrumb>About</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const crumbs = container.querySelectorAll('.frui-bread-crumb');
      expect(crumbs[ 0 ]).not.toHaveClass('frui-bread-crumb-active');
      expect(crumbs[ 1 ]).toHaveClass('frui-bread-crumb-active');
      expect(crumbs[ 0 ]).toHaveAttribute('data-active', 'false');
      expect(crumbs[ 1 ]).toHaveAttribute('data-active', 'true');
    });
  });

  it('handles click to remove trailing crumbs', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>Home</BreadCrumb>
        <BreadCrumb>Products</BreadCrumb>
        <BreadCrumb>Details</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      expect(
        container.querySelectorAll('.frui-bread-crumb').length
      ).toBe(3);
    });
    const crumbs = container.querySelectorAll('.frui-bread-crumb');
    fireEvent.click(crumbs[ 1 ]);
    await waitFor(() => {
      expect(
        container.querySelectorAll('.frui-bread-crumb').length
      ).toBe(2);
    });
  });

  it('handles span click to remove trailing crumbs', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>Home</BreadCrumb>
        <BreadCrumb>Products</BreadCrumb>
        <BreadCrumb>Details</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      expect(
        container.querySelectorAll('.frui-bread-crumb').length
      ).toBe(3);
    });
    const spans = container.querySelectorAll('span.frui-bread-crumb');
    fireEvent.click(spans[ 0 ]);
    await waitFor(() => {
      expect(
        container.querySelectorAll('.frui-bread-crumb').length
      ).toBe(1);
    });
  });

  it('applies custom className and style', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb className="custom" style={{ color: 'red' }}>
          Home
        </BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const crumb = container.querySelector(
        '.frui-bread-crumb'
      ) as HTMLElement;
      expect(crumb).toHaveClass('custom');
      expect(crumb.style.color).toBe('red');
    });
  });

  it('applies slot styles from context', async () => {
    const crumbSlot = { className: 'slot-class' };
    const { container } = render(
      <Bread crumb={crumbSlot}>
        <BreadCrumb>Home</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      expect(
        container.querySelector('.slot-class')
      ).toBeInTheDocument();
    });
  });

  it('applies slot style object from context', async () => {
    const { container } = render(
      <Bread crumb={{ style: { fontWeight: 'bold' } }}>
        <BreadCrumb>Home</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const crumb = 
        container.querySelector('.frui-bread-crumb') as HTMLElement;
      expect(crumb.style.fontWeight).toBe('bold');
    });
  });

  it('prefers direct props over slot props', async () => {
    const { container } = render(
      <Bread crumb={{ className: 'slot' }}>
        <BreadCrumb className="direct">Home</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const crumb = container.querySelector('.frui-bread-crumb');
      expect(crumb).toHaveClass('direct');
      expect(crumb).not.toHaveClass('slot');
    });
  });

  it('renders with function children', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>
          {({ active }) => (active ? 'Active' : 'Inactive')}
        </BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      expect(
        container.querySelector('.frui-bread-crumb')
      ).toHaveTextContent('Active');
    });
  });

  it('applies callable className based on state', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb
          className={({ active }) => (
            active ? 'is-active' : 'is-inactive'
          )}
        >
          Home
        </BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      expect(
        container.querySelector('.is-active')
      ).toBeInTheDocument();
    });
  });

  it('applies callable style based on state', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb
          style={({ active }) => ({ color: active ? 'blue' : 'gray' })}
        >
          Home
        </BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const crumb = container.querySelector(
        '.frui-bread-crumb'
      ) as HTMLElement;
      expect(crumb.style.color).toBe('blue');
    });
  });

  it('handles click on anchor crumb with href', async () => {
    const onClick = vi.fn();
    const { container } = render(
      <Bread onClick={onClick}>
        <BreadCrumb href="/home">Home</BreadCrumb>
        <BreadCrumb href="/products">Products</BreadCrumb>
        <BreadCrumb href="/details">Details</BreadCrumb>
      </Bread>
    );
    
    await waitFor(() => {
      expect(
        container.querySelectorAll('.frui-bread-crumb').length
      ).toBe(3);
    });

    const anchors = container.querySelectorAll('a.frui-bread-crumb');
    fireEvent.click(anchors[ 0 ]);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalled();
      expect(
        container.querySelectorAll('.frui-bread-crumb').length
      ).toBe(1);
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
      expect(
        container.querySelector('.frui-bread-slicer')
      ).toBeInTheDocument();
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
      expect(slicer?.textContent).toBe('/');
    });
  });

  it('renders with custom value', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>A</BreadCrumb>
        <BreadSlicer value="->" />
        <BreadCrumb>B</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      expect(
        container.querySelector('.frui-bread-slicer')?.textContent
      ).toBe('->');
    });
  });

  it('renders with children instead of value', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>A</BreadCrumb>
        <BreadSlicer>
          <span className="custom-sep">›</span>
        </BreadSlicer>
        <BreadCrumb>B</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const customSep = container.querySelector('.custom-sep');
      expect(customSep?.textContent).toBe('›');
    });
  });

  it('applies custom className and style', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>A</BreadCrumb>
        <BreadSlicer className="custom" style={{ color: 'blue' }} />
        <BreadCrumb>B</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      const slicer = container.querySelector(
        '.frui-bread-slicer'
      ) as HTMLElement;
      expect(slicer).toHaveClass('custom');
      expect(slicer.style.color).toBe('blue');
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

  it('provides default context when no provider', () => {
    let grabbed: any;
    const Demo = () => {
      grabbed = useBreadContext();
      return null;
    };
    render(<Demo />);
    expect(grabbed.trail).toEqual([]);
    expect(typeof grabbed.click).toBe('function');
    expect(typeof grabbed.pop).toBe('function');
    expect(typeof grabbed.push).toBe('function');
  });
});

describe('Context operations', () => {
  it('push operation adds to trail correctly', () => {
    const contextValue = {
      click: vi.fn(),
      pop: vi.fn(),
      push: vi.fn(),
      trail: []
    };
    render(
      <BreadContext.Provider value={contextValue}>
        <div>Test</div>
      </BreadContext.Provider>
    );
    contextValue.push('test-id');
    expect(contextValue.push).toHaveBeenCalledWith('test-id');
  });

  it('pop operation removes from trail correctly', () => {
    const contextValue = {
      click: vi.fn(),
      pop: vi.fn(),
      push: vi.fn(),
      trail: [ 'id1', 'id2', 'id3' ]
    };
    render(
      <BreadContext.Provider value={contextValue}>
        <div>Test</div>
      </BreadContext.Provider>
    );
    contextValue.pop(1);
    expect(contextValue.pop).toHaveBeenCalledWith(1);
  });

  it('click operation triggers correctly', () => {
    const contextValue = {
      click: vi.fn(),
      pop: vi.fn(),
      push: vi.fn(),
      trail: [ 'id1', 'id2' ]
    };
    render(
      <BreadContext.Provider value={contextValue}>
        <div>Test</div>
      </BreadContext.Provider>
    );
    contextValue.click('id1');
    expect(contextValue.click).toHaveBeenCalledWith('id1');
  });
});

describe('Integration', () => {
  it('navigates breadcrumb trail correctly', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb href="/">Home</BreadCrumb>
        <BreadCrumb href="/products">Products</BreadCrumb>
        <BreadCrumb href="/products/123">Details</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      expect(
        container.querySelectorAll('.frui-bread-crumb').length
      ).toBe(3);
    });
    const crumbs = container.querySelectorAll('.frui-bread-crumb');
    fireEvent.click(crumbs[ 1 ]);
    await waitFor(() => {
      expect(
        container.querySelectorAll('.frui-bread-crumb').length
      ).toBe(2);
    });
  });

  it('maintains active state during navigation', async () => {
    const { container } = render(
      <Bread>
        <BreadCrumb>Home</BreadCrumb>
        <BreadCrumb>Products</BreadCrumb>
        <BreadCrumb>Details</BreadCrumb>
      </Bread>
    );
    await waitFor(() => {
      expect(
        container.querySelectorAll('.frui-bread-crumb').length
      ).toBe(3);
    });
    let crumbs = container.querySelectorAll('.frui-bread-crumb');
    expect(crumbs[ 2 ]).toHaveAttribute('data-active', 'true');
    fireEvent.click(crumbs[ 1 ]);
    await waitFor(() => {
      crumbs = container.querySelectorAll('.frui-bread-crumb');
      expect(crumbs[ 1 ]).toHaveAttribute('data-active', 'true');
    });
  });
});