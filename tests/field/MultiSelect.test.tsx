//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
//frui
import MultiSelect from '../../frui/src/field/MultiSelect.js';

//--------------------------------------------------------------------//
// Helpers

const options = [ 'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry' ];

function getElements(container: HTMLElement) {
  return {
    wrapper: container.querySelector(
      '.frui-field-multiselect'
    ),
    control: container.querySelector(
      '.frui-field-multiselect-control'
    ),
    dropdown: container.querySelector(
      '.frui-field-multiselect-dropdown'
    ),
    input: container.querySelector(
      '.frui-field-multiselect-search-control'
    ) as HTMLInputElement,
    tags: container.querySelectorAll(
      '.frui-field-multiselect-tag'
    ),
    opts: container.querySelectorAll(
      '.frui-field-multiselect-option'
    )
  };
}

function selectOption(container: HTMLElement, index: number) {
  const { control, opts } = getElements(container);
  fireEvent.click(control!);
  fireEvent.click(opts[ index ]);
}

//--------------------------------------------------------------------//
// Tests

describe('MultiSelect', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<MultiSelect options={options} />);
      const { wrapper } = getElements(container);
      expect(wrapper).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      const { container } = render(
        <MultiSelect options={options} placeholder="Choose items" />
      );
      expect(container).toHaveTextContent('Choose items');
    });

    it('applies custom className', () => {
      const { container } = render(
        <MultiSelect options={options} className="custom-select" />
      );
      expect(container.querySelector('.custom-select'))
        .toBeInTheDocument();
    });

    it('renders with aria attributes', () => {
      const { container } = render(<MultiSelect options={options} />);
      const { wrapper } = getElements(container);
      expect(wrapper).toHaveAttribute('role', 'combobox');
      expect(wrapper).toHaveAttribute('aria-multiselectable', 'true');
      expect(wrapper).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Dropdown Behavior', () => {
    it('opens dropdown on control click', () => {
      const { container } = render(<MultiSelect options={options} />);
      const { control, wrapper } = getElements(container);
      
      fireEvent.click(control!);
      expect(wrapper).toHaveAttribute('aria-expanded', 'true');
    });

    it('displays options when dropdown is open', () => {
      const { container } = render(<MultiSelect options={options} />);
      const { control, opts } = getElements(container);
      
      fireEvent.click(control!);
      expect(opts).toHaveLength(5);
    });

    it('closes dropdown when clicking outside', async () => {
      const { container } = render(
        <>
          <MultiSelect options={options} />
          <div data-testid="outside">Outside</div>
        </>
      );
      const { control, wrapper } = getElements(container);
      
      fireEvent.click(control!);
      expect(wrapper).toHaveAttribute('aria-expanded', 'true');
      
      const outside = 
        container.querySelector('[ data-testid="outside" ]');
      fireEvent.mouseDown(outside!);
      
      await waitFor(() => {
        expect(wrapper).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('does not open dropdown when no options available', () => {
      const { container } = render(<MultiSelect options={[]} />);
      const { control, wrapper } = getElements(container);
      
      fireEvent.click(control!);
      expect(wrapper).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Selection', () => {
    it('adds selected item as tag', () => {
      const { container } = render(<MultiSelect options={options} />);
      selectOption(container, 0);
      
      const { tags } = getElements(container);
      expect(tags).toHaveLength(1);
      expect(tags[ 0 ]).toHaveTextContent('Apple');
    });

    it('removes selected option from dropdown', () => {
      const { container } = render(<MultiSelect options={options} />);
      const { control } = getElements(container);
      
      selectOption(container, 0);
      
      fireEvent.click(control!);
      const { opts } = getElements(container);
      expect(opts).toHaveLength(4);
    });

    it('selects multiple items', () => {
      const { container } = render(<MultiSelect options={options} />);
      
      selectOption(container, 0);
      selectOption(container, 0);
      
      const { tags } = getElements(container);
      expect(tags).toHaveLength(2);
    });

    it('removes tag when remove button is clicked', () => {
      const { container } = render(<MultiSelect options={options} />);
      selectOption(container, 0);
      
      let { tags } = getElements(container);
      const removeBtn = tags[ 0 ].querySelector(
        '.frui-field-multiselect-tag-remove'
      );
      fireEvent.click(removeBtn!);
      
      ({ tags } = getElements(container));
      expect(tags).toHaveLength(0);
    });

    it('adds aria-label to remove button', () => {
      const { container } = render(<MultiSelect options={options} />);
      selectOption(container, 0);
      
      const { tags } = getElements(container);
      const removeBtn = tags[ 0 ].querySelector(
        '.frui-field-multiselect-tag-remove'
      );
      expect(removeBtn).toHaveAttribute('aria-label', 'Remove Apple');
    });
  });

  describe('Searchable', () => {
    it('shows search input when searchable is true', () => {
      const { container } = render(
        <MultiSelect options={options} searchable />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      expect(input).toBeInTheDocument();
    });

    it('does not show search input by default', () => {
      const { container } = render(<MultiSelect options={options} />);
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      expect(input).not.toBeInTheDocument();
    });

    it('filters options based on search input', () => {
      const { container } = render(
        <MultiSelect options={options} searchable />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'app' } });
      
      const { opts } = getElements(container);
      expect(opts).toHaveLength(1);
      expect(opts[ 0 ]).toHaveTextContent('Apple');
    });

    it('performs case-insensitive search', () => {
      const { container } = render(
        <MultiSelect options={options} searchable />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'BANANA' } });
      
      const { opts } = getElements(container);
      expect(opts).toHaveLength(1);
      expect(opts[ 0 ]).toHaveTextContent('Banana');
    });

    it('shows no options when search has no matches', () => {
      const { container } = render(
        <MultiSelect options={options} searchable />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'xyz' } });
      
      const { opts } = getElements(container);
      expect(opts).toHaveLength(0);
    });

    it('excludes selected items from search results', () => {
      const { container } = render(
        <MultiSelect options={options} searchable />
      );
      const { control, input } = getElements(container);
      
      selectOption(container, 0);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'a' } });
      
      const { opts } = getElements(container);
      const texts = Array.from(opts).map((opt) => opt.textContent);
      expect(texts).not.toContain('Apple');
    });

    it('opens dropdown when typing in search', () => {
      const { container } = render(
        <MultiSelect options={options} searchable />
      );
      const { control, input, wrapper } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.click(control!);
      
      fireEvent.change(input, { target: { value: 'app' } });
      expect(wrapper).toHaveAttribute('aria-expanded', 'true');
    });

    it('has correct autocomplete attribute', () => {
      const { container } = render(
        <MultiSelect options={options} searchable />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
    });

    it('focuses search input when dropdown opens', () => {
      const { container } = render(
        <MultiSelect options={options} searchable />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      expect(document.activeElement).toBe(input);
    });
  });

  describe('Custom Mode', () => {
    it('shows search input when custom is true', () => {
      const { container } = render(
        <MultiSelect options={options} custom />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      expect(input).toBeInTheDocument();
    });

    it('allows adding custom values with Enter key', () => {
      const { container } = render(
        <MultiSelect options={options} custom />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'Custom' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      const { tags } = getElements(container);
      expect(tags).toHaveLength(1);
      expect(tags[ 0 ]).toHaveTextContent('Custom');
    });

    it('allows adding custom values with Tab key', () => {
      const { container } = render(
        <MultiSelect options={options} custom />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'Custom' } });
      fireEvent.keyDown(input, { key: 'Tab' });
      
      const { tags } = getElements(container);
      expect(tags).toHaveLength(1);
      expect(tags[ 0 ]).toHaveTextContent('Custom');
    });

    it('trims whitespace from custom values', () => {
      const { container } = render(
        <MultiSelect options={options} custom />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: '  Spaces  ' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      const { tags } = getElements(container);
      expect(tags[ 0 ]).toHaveTextContent('Spaces');
    });

    it('does not add empty custom values', () => {
      const { container } = render(
        <MultiSelect options={options} custom />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: '   ' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      const { tags } = getElements(container);
      expect(tags).toHaveLength(0);
    });

    it('prevents duplicate custom values', () => {
      const { container } = render(
        <MultiSelect options={options} custom />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'Custom' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      fireEvent.change(input, { target: { value: 'Custom' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      const { tags } = getElements(container);
      expect(tags).toHaveLength(1);
    });

    it('clears input after adding custom value', () => {
      const { container } = render(
        <MultiSelect options={options} custom />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'Custom' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(input.value).toBe('');
    });

    it('opens dropdown when typing in custom mode', () => {
      const { container } = render(
        <MultiSelect options={options} custom />
      );
      const { control, input, wrapper } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.click(control!);
      
      fireEvent.change(input, { target: { value: 'text' } });
      expect(wrapper).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('removes last tag on Backspace when input is empty', () => {
      const { container } = render(
        <MultiSelect options={options} custom />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'First' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.change(input, { target: { value: 'Second' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      let { tags } = getElements(container);
      expect(tags).toHaveLength(2);
      
      fireEvent.keyDown(input, { key: 'Backspace' });
      ({ tags } = getElements(container));
      expect(tags).toHaveLength(1);
      expect(tags[ 0 ]).toHaveTextContent('First');
    });

    it('does not remove tag on Backspace when input has value', () => {
      const { container } = render(
        <MultiSelect options={options} custom />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'Tag' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      fireEvent.change(input, { target: { value: 'text' } });
      fireEvent.keyDown(input, { key: 'Backspace' });
      
      const { tags } = getElements(container);
      expect(tags).toHaveLength(1);
    });

    it('does not add non-option value without custom mode', () => {
      const { container } = render(
        <MultiSelect options={options} searchable />
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'NotInList' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      const { tags } = getElements(container);
      expect(tags).toHaveLength(0);
    });
  });

  describe('Form Integration', () => {
    it('does not render hidden inputs without name', () => {
      const { container } = 
        render(<MultiSelect options={options} />);
      const inputs = 
        container.querySelectorAll('input[ type="hidden" ]');
      expect(inputs).toHaveLength(0);
    });

    it('renders hidden inputs for selected items', () => {
      const { container } = render(
        <MultiSelect options={options} name="fruits" />
      );
      
      selectOption(container, 0);
      selectOption(container, 1);
      
      const inputs = container.querySelectorAll(
        'input[ type="hidden" ][ name="fruits[]" ]'
      );
      expect(inputs).toHaveLength(2);
    });

    it('sets correct values for hidden inputs', () => {
      const { container } = render(
        <MultiSelect options={options} name="fruits" />
      );
      
      selectOption(container, 0);
      selectOption(container, 1);
      
      const inputs = container.querySelectorAll(
        'input[ type="hidden" ]'
      ) as NodeListOf<HTMLInputElement>;
      expect(inputs[ 0 ].value).toBe('Apple');
      expect(inputs[ 1 ].value).toBe('Cherry');
    });

    it('updates hidden inputs when tags are removed', () => {
      const { container } = render(
        <MultiSelect options={options} name="fruits" />
      );
      
      selectOption(container, 0);
      
      let inputs = 
        container.querySelectorAll('input[ type="hidden" ]');
      expect(inputs).toHaveLength(1);
      
      const { tags } = getElements(container);
      const removeBtn = tags[ 0 ].querySelector(
        '.frui-field-multiselect-tag-remove'
      );
      fireEvent.click(removeBtn!);
      
      inputs = container.querySelectorAll('input[ type="hidden" ]');
      expect(inputs).toHaveLength(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      const { container } = render(<MultiSelect options={[]} />);
      const { control, opts } = getElements(container);
      
      fireEvent.click(control!);
      expect(opts).toHaveLength(0);
    });

    it('hides placeholder when items are selected', () => {
      const { container } = render(
        <MultiSelect options={options} placeholder="Select items" />
      );
      
      selectOption(container, 0);
      
      const placeholder = container.querySelector(
        '.frui-field-multiselect-placeholder'
      );
      expect(placeholder).not.toBeInTheDocument();
    });

    it('shows placeholder when all tags are removed', () => {
      const { container } = render(
        <MultiSelect options={options} placeholder="Select items" />
      );
      
      selectOption(container, 0);
      
      const { tags } = getElements(container);
      const removeBtn = tags[ 0 ].querySelector(
        '.frui-field-multiselect-tag-remove'
      );
      fireEvent.click(removeBtn!);
      
      expect(container).toHaveTextContent('Select items');
    });

    it('clears input value when clicking outside', async () => {
      const { container } = render(
        <>
          <MultiSelect options={options} searchable />
          <div data-testid="outside">Outside</div>
        </>
      );
      const { control, input } = getElements(container);
      
      fireEvent.click(control!);
      fireEvent.change(input, { target: { value: 'test' } });
      
      const outside = 
        container.querySelector('[ data-testid="outside" ]');
      fireEvent.mouseDown(outside!);
      
      await waitFor(() => {
        expect(input.value).toBe('');
      });
    });

    it('renders options with role attribute', () => {
      const { container } = render(<MultiSelect options={options} />);
      const { control, opts } = getElements(container);
      
      fireEvent.click(control!);
      opts.forEach((opt) => {
        expect(opt).toHaveAttribute('role', 'option');
      });
    });

    it('sets aria-selected attribute on options', () => {
      const { container } = render(<MultiSelect options={options} />);
      const { control } = getElements(container);
      
      selectOption(container, 0);
      
      fireEvent.click(control!);
      const { opts } = getElements(container);
      opts.forEach((opt) => {
        expect(opt).toHaveAttribute('aria-selected');
      });
    });
  });
});