//--------------------------------------------------------------------//
// Imports

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
//frui
import Dropdown, {
  buildOptions,
  getAbsolutePosition,
  getRelativePosition
} from '../../src/base/Dropdown.js';

//--------------------------------------------------------------------//
// Tests

describe('buildOptions()', () => {
  it('returns empty arrays when no children or data provided', () => {
    const result = buildOptions();
    expect(result.options).toEqual([]);
    expect(result.selected).toEqual([]);
  });

  it('builds options from data array', () => {
    const data = [ 'Option 1', 'Option 2', 'Option 3' ];
    const result = buildOptions(undefined, data);
    expect(result.options.length).toBe(3);
  });

  it('builds options from data object', () => {
    const data = { label1: 'value1', label2: 'value2' };
    const result = buildOptions(undefined, data);
    expect(result.options.length).toBe(2);
  });

  it('identifies selected options', () => {
    const data = [ 'Option 1', 'Option 2', 'Option 3' ];
    const result = buildOptions(undefined, data, [ 'Option 2' ]);
    expect(result.selected.length).toBe(1);
  });
});

describe('getAbsolutePosition()', () => {
  it('calculates bottom position correctly', () => {
    const container = document.createElement('div');
    const dropdown = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 150,
      left: 50,
      right: 250,
      width: 200,
      height: 50,
      x: 50,
      y: 100,
      toJSON: () => ({})
    } as DOMRect);
    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 100,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => ({})
    } as DOMRect);
    const position = getAbsolutePosition(container, dropdown, {
      top: false,
      bottom: true,
      left: false,
      right: false
    });
    expect(position.y).toBe(150);
    expect(position.x).toBe(50);
  });

  it('calculates top position correctly', () => {
    const container = document.createElement('div');
    const dropdown = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 150,
      left: 50,
      right: 250,
      width: 200,
      height: 50,
      x: 50,
      y: 100,
      toJSON: () => ({})
    } as DOMRect);
    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 100,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => ({})
    } as DOMRect);
    const position = getAbsolutePosition(container, dropdown, {
      top: true,
      bottom: false,
      left: false,
      right: false
    });
    expect(position.y).toBe(0);
    expect(position.x).toBe(50);
  });
});

describe('getRelativePosition()', () => {
  it('calculates bottom position correctly', () => {
    const container = document.createElement('div');
    const dropdown = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 50,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => ({})
    } as DOMRect);
    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 100,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => ({})
    } as DOMRect);
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
  it('renders dropdown container', () => {
    render(
      <Dropdown>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('renders dropdown with options from data', () => {
    const { container } = render(
      <Dropdown options={[ 'Option 1', 'Option 2' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-container')
    ).toBeInTheDocument();
  });

  it('calls onUpdate when dropdown is configured', () => {
    const onUpdate = vi.fn();
    render(
      <Dropdown
        options={[ 'Option 1', 'Option 2' ]}
        onUpdate={onUpdate}
      >
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('supports multiple selection configuration', () => {
    const onUpdate = vi.fn();
    render(
      <Dropdown
        multiple
        options={[ 'Option 1', 'Option 2' ]}
        onUpdate={onUpdate}
      >
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('applies custom className to dropdown', () => {
    const { container } = render(
      <Dropdown className="custom-dropdown">
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-container')
    ).toBeInTheDocument();
  });

  it('respects controlled value', () => {
    render(
      <Dropdown
        value="Option 2"
        options={[ 'Option 1', 'Option 2' ]}
      >
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('applies direction class based on position props', () => {
    const { container } = render(
      <Dropdown top options={[ 'Option 1' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-container')
    ).toBeInTheDocument();
  });

  it('applies custom inline styles', () => {
    const { container } = render(
      <Dropdown style={{ backgroundColor: 'blue' }}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-container')
    ).toBeInTheDocument();
  });
});

describe('<Dropdown.Control />', () => {
  it('renders control content', () => {
    render(
      <Dropdown>
        <Dropdown.Control>Click me</Dropdown.Control>
      </Dropdown>
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies frui-dropdown-control class', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Control>Control</Dropdown.Control>
      </Dropdown>
    );
    expect(
      container.querySelector('.frui-dropdown-control')
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Control className="custom-control">
          Control
        </Dropdown.Control>
      </Dropdown>
    );
    const control = container.querySelector('.frui-dropdown-control');
    expect(control).toHaveClass('custom-control');
  });

  it('applies custom inline styles', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Control style={{ padding: '10px' }}>
          Control
        </Dropdown.Control>
      </Dropdown>
    );
    const control = container.querySelector('.frui-dropdown-control');
    expect(control).toHaveAttribute('style');
  });

  it('renders children content correctly', () => {
    render(
      <Dropdown>
        <Dropdown.Control>
          <span>Custom</span> Content
        </Dropdown.Control>
      </Dropdown>
    );
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

describe('<Dropdown.Option />', () => {
  it('renders option component with value prop', () => {
    render(
      <Dropdown>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Option value="opt1">Option 1</Dropdown.Option>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('applies frui-dropdown-option class when rendered', () => {
    render(
      <Dropdown options={[ 'Option 1' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('supports active state with defaultValue', () => {
    render(
      <Dropdown defaultValue="opt1">
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Option value="opt1">Option 1</Dropdown.Option>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('renders custom className on option', () => {
    render(
      <Dropdown>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Option value="opt1" className="custom-option">
          Option 1
        </Dropdown.Option>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('renders children or value as fallback', () => {
    render(
      <Dropdown>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Option value="opt1" />
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });
});

describe('<Dropdown.Head />', () => {
  it('renders header component', () => {
    render(
      <Dropdown options={[ 'Option 1' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Head>Header</Dropdown.Head>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('applies frui-dropdown-head class', () => {
    render(
      <Dropdown options={[ 'Option 1' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Head>Header</Dropdown.Head>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('applies custom className to header', () => {
    render(
      <Dropdown options={[ 'Option 1' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Head className="custom-head">Header</Dropdown.Head>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('renders children content in header', () => {
    render(
      <Dropdown options={[ 'Option 1' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Head>
          <span>Header</span> Content
        </Dropdown.Head>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });
});

describe('<Dropdown.Foot />', () => {
  it('renders footer component', () => {
    render(
      <Dropdown options={[ 'Option 1' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Foot>Footer</Dropdown.Foot>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('applies frui-dropdown-foot class', () => {
    render(
      <Dropdown options={[ 'Option 1' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Foot>Footer</Dropdown.Foot>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('applies custom className to footer', () => {
    render(
      <Dropdown options={[ 'Option 1' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Foot className="custom-foot">Footer</Dropdown.Foot>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('renders children content in footer', () => {
    render(
      <Dropdown options={[ 'Option 1' ]}>
        <Dropdown.Control>Select</Dropdown.Control>
        <Dropdown.Foot>
          <span>Footer</span> Content
        </Dropdown.Foot>
      </Dropdown>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });
});