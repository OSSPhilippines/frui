//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import Dropdown, {
  buildOptions,
  getAbsolutePosition,
  getComponents,
  getRelativePosition,
  makeOptions
} from '../../src/base/Dropdown.js';

//--------------------------------------------------------------------//
// Helpers

function createMockRect(overrides = {}) {
  return {
    top: 100,
    bottom: 150,
    left: 50,
    right: 250,
    width: 200,
    height: 50,
    x: 50,
    y: 100,
    toJSON: () => ({}),
    ...overrides
  } as DOMRect;
}

//--------------------------------------------------------------------//
// Tests

describe('buildOptions()', () => {
  it('returns empty when no data provided', () => {
    const result = buildOptions();
    expect(result.options).toEqual([]);
    expect(result.selected).toEqual([]);
  });

  it('builds options from array', () => {
    const data = [ 'Option 1', 'Option 2', 'Option 3' ];
    const result = buildOptions(undefined, data);
    expect(result.options.length).toBe(3);
  });

  it('builds options from object', () => {
    const data = { label1: 'value1', label2: 'value2' };
    const result = buildOptions(undefined, data);
    expect(result.options.length).toBe(2);
  });

  it('identifies selected options', () => {
    const data = [ 'Option 1', 'Option 2' ];
    const result = buildOptions(undefined, data, [ 'Option 2' ]);
    expect(result.selected.length).toBe(1);
  });

  it('handles multiple selections', () => {
    const data = [ 'Option 1', 'Option 2', 'Option 3' ];
    const result = buildOptions(
      undefined,
      data,
      [ 'Option 1', 'Option 3' ],
      true
    );
    expect(result.selected.length).toBe(2);
  });
});

describe('makeOptions()', () => {
  it('creates options from string array', () => {
    const data = [ 'A', 'B', 'C' ];
    const result = makeOptions(data, []);
    expect(result.options.length).toBe(3);
  });

  it('creates options from object array', () => {
    const data = [
      { label: 'First', value: '1' },
      { label: 'Second', value: '2' }
    ];
    const result = makeOptions(data, []);
    expect(result.options.length).toBe(2);
  });

  it('marks selected options', () => {
    const data = [ 'A', 'B', 'C' ];
    const result = makeOptions(data, [ 'B' ]);
    expect(result.selected.length).toBe(1);
  });
});

describe('getComponents()', () => {
  it('extracts control from children', () => {
    const result = getComponents(
      <Dropdown.Control>Select</Dropdown.Control>
    );
    expect(result.control).toBeDefined();
  });

  it('extracts header and footer from children', () => {
    const result = getComponents(
      <>
        <Dropdown.Head>Header</Dropdown.Head>
        <Dropdown.Foot>Footer</Dropdown.Foot>
      </>
    );
    expect(result.header).toBeDefined();
    expect(result.footer).toBeDefined();
  });

  it('extracts options from data', () => {
    const result = getComponents(undefined, [ 'A', 'B' ]);
    expect(result.options.length).toBe(2);
  });
});

describe('Position calculations', () => {
  it('calculates absolute bottom position', () => {
    const container = document.createElement('div');
    const dropdown = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
      createMockRect()
    );
    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(
      createMockRect({ height: 100 })
    );
    const position = getAbsolutePosition(container, dropdown, {
      top: false,
      bottom: true,
      left: false,
      right: false
    });
    expect(position.y).toBe(150);
    expect(position.x).toBe(50);
  });

  it('calculates absolute top position', () => {
    const container = document.createElement('div');
    const dropdown = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
      createMockRect()
    );
    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(
      createMockRect({ height: 100 })
    );
    const position = getAbsolutePosition(container, dropdown, {
      top: true,
      bottom: false,
      left: false,
      right: false
    });
    expect(position.y).toBe(0);
  });

  it('calculates relative bottom position', () => {
    const container = document.createElement('div');
    const dropdown = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(
      createMockRect({ height: 50 })
    );
    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(
      createMockRect({ height: 100 })
    );
    const position = getRelativePosition(container, dropdown, {
      top: false,
      bottom: true,
      left: false,
      right: false
    });
    expect(position.y).toBe(50);
    expect(position.x).toBe(0);
  });
});

describe('<Dropdown />', () => {
  it('renders container', () => {
    render(
      <Dropdown>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('renders with options from array', () => {
    const { container } = render(
      <Dropdown options={[ 'Option 1', 'Option 2' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-container')
    ).toBeInTheDocument();
  });

  it('renders with options from object', () => {
    render(
      <Dropdown options={{ First: '1', Second: '2' }}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('opens dropdown on default', () => {
    const { container } = render(
      <Dropdown defaultOpened options={[ 'Option 1' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-options')
    ).toBeInTheDocument();
  });

  it('calls onUpdate when value changes', () => {
    const onUpdate = vi.fn();
    const { container } = render(
      <Dropdown defaultOpened options={[ 'Option 1' ]} onUpdate={onUpdate}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    const option = container.querySelector('.frui-dropdown-option');
    if (option) {
      fireEvent.click(option);
      expect(onUpdate).toHaveBeenCalledWith('Option 1');
    }
  });

  it('supports multiple selection', () => {
    const onUpdate = vi.fn();
    const { container } = render(
      <Dropdown
        multiple
        defaultOpened
        options={[ 'A', 'B' ]}
        onUpdate={onUpdate}
      >
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    const options = container.querySelectorAll('.frui-dropdown-option');
    fireEvent.click(options[0]);
    fireEvent.click(options[1]);
    expect(onUpdate).toHaveBeenCalledWith([ 'A', 'B' ]);
  });

  it('deselects in multiple mode', () => {
    const onUpdate = vi.fn();
    const { container } = render(
      <Dropdown
        multiple
        defaultOpened
        defaultValue={[ 'A' ]}
        options={[ 'A', 'B' ]}
        onUpdate={onUpdate}
      >
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    const option = container.querySelector(
      '.frui-dropdown-option-active'
    );
    if (option) {
      fireEvent.click(option);
      expect(onUpdate).toHaveBeenCalledWith([]);
    }
  });

  it('applies custom className', () => {
    const { container } = render(
      <Dropdown className="custom" defaultOpened options={[ 'A' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(container.querySelector('.custom')).toBeInTheDocument();
  });

  it('applies direction classes', () => {
    const { container } = render(
      <Dropdown top defaultOpened options={[ 'A' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-top')
    ).toBeInTheDocument();
  });

  it('respects controlled opened state', () => {
    const { container, rerender } = render(
      <Dropdown opened={false} options={[ 'A' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-options')
    ).not.toBeInTheDocument();
    rerender(
      <Dropdown opened={true} options={[ 'A' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-options')
    ).toBeInTheDocument();
  });

  it('calls onDropdown handler', () => {
    const onDropdown = vi.fn();
    render(
      <Dropdown defaultOpened options={[ 'A' ]} onDropdown={onDropdown}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(onDropdown).toHaveBeenCalledWith(true);
  });

  it('renders header and footer', () => {
    render(
      <Dropdown defaultOpened options={[ 'A' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Head>Header</Dropdown.Head>
        <Dropdown.Foot>Footer</Dropdown.Foot>
      </Dropdown>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('closes dropdown after single selection', () => {
    const { container } = render(
      <Dropdown defaultOpened options={[ 'A', 'B' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    const option = container.querySelector('.frui-dropdown-option');
    if (option) {
      fireEvent.click(option);
      expect(
        container.querySelector('.frui-dropdown-options')
      ).not.toBeInTheDocument();
    }
  });

  it('stays open in multiple mode', () => {
    const { container } = render(
      <Dropdown multiple defaultOpened options={[ 'A', 'B' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    const option = container.querySelector('.frui-dropdown-option');
    if (option) {
      fireEvent.click(option);
      expect(
        container.querySelector('.frui-dropdown-options')
      ).toBeInTheDocument();
    }
  });
});

describe('<Dropdown.Control />', () => {
  it('renders content', () => {
    render(
      <Dropdown>
        <Dropdown.Control>Click me</Dropdown.Control>
      </Dropdown>
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies base class', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Control>Control</Dropdown.Control>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-control')
    ).toBeInTheDocument();
  });

  it('applies custom className and styles', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Control
          className="custom"
          style={{ padding: '10px' }}
        >
          Control
        </Dropdown.Control>
      </Dropdown>
    );
    const control = container.querySelector('.frui-dropdown-control');
    expect(control).toHaveClass('custom');
    expect(control).toHaveAttribute('style');
  });
});

describe('<Dropdown.Option />', () => {
  it('renders with value', () => {
    const { container } = render(
      <Dropdown defaultOpened>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Option value="opt1">Option 1</Dropdown.Option>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-option')
    ).toBeInTheDocument();
  });

  it('applies active class when selected', () => {
    const { container } = render(
      <Dropdown defaultOpened defaultValue="opt1">
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Option value="opt1">Option 1</Dropdown.Option>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-option-active')
    ).toBeInTheDocument();
  });

  it('handles click to select', () => {
    const onUpdate = vi.fn();
    const { container } = render(
      <Dropdown defaultOpened onUpdate={onUpdate}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Option value="opt1">Option 1</Dropdown.Option>
      </Dropdown>
    );
    const option = container.querySelector('.frui-dropdown-option');
    if (option) {
      fireEvent.click(option);
      expect(onUpdate).toHaveBeenCalledWith('opt1');
    }
  });

  it('uses value as fallback content', () => {
    render(
      <Dropdown defaultOpened>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Option value="fallback" />
      </Dropdown>
    );
    expect(screen.getByText('fallback')).toBeInTheDocument();
  });

  it('supports callable children', () => {
    render(
      <Dropdown defaultOpened>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Option value="opt1">
          {({ selected }) => (selected ? 'Selected' : 'Not Selected')}
        </Dropdown.Option>
      </Dropdown>
    );
    expect(screen.getByText('Not Selected')).toBeInTheDocument();
  });
});

describe('<Dropdown.Head /> and <Dropdown.Foot />', () => {
  it('renders header with custom className', () => {
    const { container } = render(
      <Dropdown defaultOpened options={[ 'A' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Head className="custom">Header</Dropdown.Head>
      </Dropdown>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    const head = container.querySelector('.frui-dropdown-head');
    expect(head).toHaveClass('custom');
  });

  it('renders footer with custom className', () => {
    const { container } = render(
      <Dropdown defaultOpened options={[ 'A' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Foot className="custom">Footer</Dropdown.Foot>
      </Dropdown>
    );
    expect(screen.getByText('Footer')).toBeInTheDocument();
    const foot = container.querySelector('.frui-dropdown-foot');
    expect(foot).toHaveClass('custom');
  });
});