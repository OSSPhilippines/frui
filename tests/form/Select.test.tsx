//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

//tests
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

//frui
import Select, { SelectPlaceholder } from '../../src/form/Select.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/helpers/getClassStyles.js', () => ({
  __esModule: true,
  default: ({
    classes,
    props
  }: {
    classes?: string[],
    props?: { className?: string, style?: object },
    state?: object
  }) => ({
    classes: classes || [],
    styles: props?.style || {}
  })
}));

//--------------------------------------------------------------------//
// Tests

describe('<Select />', () => {
  it('renders base wrapper and placeholder text', () => {
    const { container } = render(
      <Select placeholder="Pick one">
        <SelectPlaceholder>Pick one</SelectPlaceholder>
      </Select>
    );
    const wrapper = container.querySelector(
      '.frui-dropdown-container'
    );
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('applies error class when error prop set', () => {
    const { container } = render(<Select error />);
    const wrapper = container.querySelector(
      '.frui-dropdown-container'
    );
    expect(wrapper).toBeInTheDocument();
    const selectControl = container.querySelector(
      '.frui-form-select-control'
    );
    expect(selectControl).toBeInTheDocument();
  });

  it('toggles dropdown open on placeholder click', () => {
    render(
      <Select
        options={[
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' }
        ]}
      >
        <SelectPlaceholder>Click me</SelectPlaceholder>
      </Select>
    );
    const toggle = screen.getByText('Click me');
    fireEvent.click(toggle);
    expect(
      document.querySelector(
        '.frui-form-select-control-actions-toggle'
      )
    ).toBeInTheDocument();
  });

  it('calls onUpdate when external value changes', async () => {
    const onUpdate = vi.fn();
    const { rerender } = render(
      <Select
        onUpdate={onUpdate}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
        value="yes"
      />
    );
    rerender(
      <Select
        onUpdate={onUpdate}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
        value="no"
      />
    );
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith('no');
    });
  });

  it('adds hidden input after selection', async () => {
    const { rerender } = render(
      <Select
        name="colors"
        options={[ { value: 'blue', label: 'Blue' } ]}
        value=""
      />
    );
    rerender(
      <Select
        name="colors"
        options={[ { value: 'blue', label: 'Blue' } ]}
        value="blue"
      />
    );
    await waitFor(() => {
      const hidden = document.querySelector(
        'input[type="hidden"]'
      ) as HTMLInputElement;
      expect(hidden).toBeInTheDocument();
      expect(hidden.name).toBe('colors');
      expect(hidden.value).toBe('blue');
    });
  });

  it('supports multiple selections and clear button', async () => {
    const { rerender } = render(
      <Select
        multiple
        name="multi"
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]}
        value={[]}
      />
    );
    rerender(
      <Select
        multiple
        name="multi"
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]}
        value={[ 'a', 'b' ]}
      />
    );
    await waitFor(() => {
      const clearBtn = document.querySelector(
        '.frui-form-select-control-actions-clear'
      );
      expect(clearBtn).toBeInTheDocument();
      fireEvent.click(clearBtn!);
      const inputs = document.querySelectorAll(
        'input[type="hidden"]'
      );
      expect(inputs.length).toBe(0);
    });
  });

  it(
    'renders correct selected option when value prop provided',
    async () => {
      const { rerender, container } = render(
        <Select
          options={[
            { value: 'opt1', label: 'Opt1' },
            { value: 'opt2', label: 'Opt2' }
          ]}
          value="opt2"
        />
      );
      const control = container.querySelector(
        '.frui-form-select-control-selected'
      );
      expect(control).toBeInTheDocument();
      expect(control?.textContent).toContain('Opt2');
      rerender(
        <Select
          options={[
            { value: 'opt1', label: 'Opt1' },
            { value: 'opt2', label: 'Opt2' }
          ]}
          value="opt1"
        />
      );
      await waitFor(() => {
        const updated = container.querySelector(
          '.frui-form-select-control-selected'
        );
        expect(updated).toBeInTheDocument();
        expect(updated?.textContent).toContain('Opt1');
      });
    }
  );

  it('renders with default placeholder when none provided', () => {
    render(
      <Select
        options={[
          { value: '1', label: 'One' }
        ]}
      />
    );
    expect(screen.getByText('Choose Option...')).toBeInTheDocument();
  });

  it('calls onDropdown handler when dropdown opens', () => {
    const onDropdown = vi.fn();
    render(
      <Select
        onDropdown={onDropdown}
        options={[
          { value: '1', label: 'One' }
        ]}
      >
        <SelectPlaceholder>Toggle</SelectPlaceholder>
      </Select>
    );
    const toggle = screen.getByText('Toggle');
    fireEvent.click(toggle);
    expect(onDropdown).toHaveBeenCalledWith(true);
  });

  it('renders multiple hidden inputs for multiple selection', async () => {
    const { rerender } = render(
      <Select
        multiple
        name="tags"
        options={[
          { value: 'x', label: 'X' },
          { value: 'y', label: 'Y' },
          { value: 'z', label: 'Z' }
        ]}
        value={[]}
      />
    );
    rerender(
      <Select
        multiple
        name="tags"
        options={[
          { value: 'x', label: 'X' },
          { value: 'y', label: 'Y' },
          { value: 'z', label: 'Z' }
        ]}
        value={[ 'x', 'y', 'z' ]}
      />
    );
    await waitFor(() => {
      const inputs = document.querySelectorAll(
        'input[type="hidden"][name="tags"]'
      );
      expect(inputs.length).toBe(3);
      expect((inputs[0] as HTMLInputElement).value).toBe('x');
      expect((inputs[1] as HTMLInputElement).value).toBe('y');
      expect((inputs[2] as HTMLInputElement).value).toBe('z');
    });
  });

  it('renders custom control styles from control prop', () => {
    const { container } = render(
      <Select
        control={{
          className: 'custom-control',
          style: { color: 'blue' }
        }}
        options={[
          { value: '1', label: 'One' }
        ]}
      />
    );
    const control = container.querySelector(
      '.frui-form-select-control'
    );
    expect(control).toBeInTheDocument();
    expect(control?.className).toContain('custom-control');
  });

  it('renders custom dropdown styles from dropdown prop', () => {
    const { container } = render(
      <Select
        dropdown={{
          className: 'custom-dropdown',
          style: { background: 'red' }
        }}
        options={[
          { value: '1', label: 'One' }
        ]}
      />
    );
    const control = container.querySelector(
      '.frui-form-select-control'
    );
    expect(control).toBeInTheDocument();
  });

  it('renders direction symbols based on position props', () => {
    const { container: container1 } = render(
      <Select
        top
        options={[
          { value: '1', label: 'One' }
        ]}
      />
    );
    expect(container1.textContent).toContain('▲');

    const { container: container2 } = render(
      <Select
        bottom
        options={[
          { value: '1', label: 'One' }
        ]}
      />
    );
    expect(container2.textContent).toContain('▼');

    const { container: container3 } = render(
      <Select
        left
        options={[
          { value: '1', label: 'One' }
        ]}
      />
    );
    expect(container3.textContent).toContain('◀');

    const { container: container4 } = render(
      <Select
        right
        options={[
          { value: '1', label: 'One' }
        ]}
      />
    );
    expect(container4.textContent).toContain('▶');
  });

  it('hides clear button when no selection exists', async () => {
    const { container } = render(
      <Select
        name="items"
        options={[
          { value: 'a', label: 'A' }
        ]}
      />
    );
    await waitFor(() => {
      const clearBtn = container.querySelector(
        '.frui-form-select-control-actions-clear'
      );
      expect(clearBtn).toBeNull();
    });
  });

  it('handles empty string values in hidden inputs', async () => {
    const { container } = render(
      <Select
        name="test"
        options={[
          { value: 'valid', label: 'Valid' }
        ]}
        value=""
      />
    );
    await waitFor(() => {
      const inputs = container.querySelectorAll(
        'input[type="hidden"]'
      );
      expect(inputs.length).toBe(1);
      expect((inputs[0] as HTMLInputElement).value).toBe('');
    });
  });

  it('applies custom className through container prop', () => {
    const { container } = render(
      <Select
        className="my-custom-class"
        options={[
          { value: '1', label: 'One' }
        ]}
      />
    );
    const wrapper = container.querySelector(
      '.frui-dropdown-container'
    );
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.className).toContain('frui-dropdown-container');
  });

  it('applies custom inline styles to container', () => {
    const { container } = render(
      <Select
        style={{ margin: '10px' }}
        options={[
          { value: '1', label: 'One' }
        ]}
      />
    );
    const wrapper = container.querySelector(
      '.frui-dropdown-container'
    ) as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.style.margin).toBe('10px');
  });

  it('passes through append prop to Dropdown', () => {
    const { container } = render(
      <Select
        append="body"
        options={[
          { value: '1', label: 'One' }
        ]}
      />
    );
    const wrapper = container.querySelector(
      '.frui-dropdown-container'
    );
    expect(wrapper).toBeInTheDocument();
  });

  it('handles defaultValue prop correctly', () => {
    const { container } = render(
      <Select
        defaultValue="opt2"
        options={[
          { value: 'opt1', label: 'Opt1' },
          { value: 'opt2', label: 'Opt2' }
        ]}
      />
    );
    const control = container.querySelector(
      '.frui-form-select-control-selected'
    );
    expect(control?.textContent).toContain('Opt2');
  });

  it('renders SelectPlaceholder children correctly', () => {
    render(
      <Select
        options={[
          { value: '1', label: 'One' }
        ]}
      >
        <SelectPlaceholder>
          <span>Custom Placeholder Content</span>
        </SelectPlaceholder>
      </Select>
    );
    expect(
      screen.getByText('Custom Placeholder Content')
    ).toBeInTheDocument();
  });
});