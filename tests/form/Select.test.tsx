//--------------------------------------------------------------------//
// Imports
//--------------------------------------------------------------------//
import '@testing-library/jest-dom'
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react'
import {
  describe,
  expect,
  it,
  vi
} from 'vitest'

//components
import Select, {
  SelectPlaceholder
} from '../../src/form/Select'

//--------------------------------------------------------------------//
// Tests
//--------------------------------------------------------------------//
describe('<Select />', () => {
  //------------------------------------------------------------------//
  // Renders
  //------------------------------------------------------------------//
  it('renders base wrapper and placeholder text', () => {
    render(
      <Select placeholder="Pick one">
        <SelectPlaceholder>Pick one</SelectPlaceholder>
      </Select>
    )

    const wrapper = document.querySelector('.frui-form-select')
    expect(wrapper).toBeInTheDocument()
    expect(screen.getByText('Pick one')).toBeInTheDocument()
  })

  //------------------------------------------------------------------//
  // Error state
  //------------------------------------------------------------------//
  it('applies error class when error prop set', () => {
    const { container } = render(<Select error />)
    const wrapper = container.querySelector('.frui-form-select')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper?.className).toContain('frui-form-select-error')
  })

  //------------------------------------------------------------------//
  // Dropdown toggle
  //------------------------------------------------------------------//
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
    )

    const toggle = screen.getByText('Click me')
    fireEvent.click(toggle)

    //assert visible dropdown toggle icon
    expect(
      document.querySelector('.frui-form-select-control-actions-toggle')
    ).toBeInTheDocument()
  })

  //------------------------------------------------------------------//
  // Update handler
  //------------------------------------------------------------------//
  it('calls onUpdate when external value changes', async () => {
    const handleUpdate = vi.fn()

    const { rerender } = render(
      <Select
        value="yes"
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
        onUpdate={handleUpdate}
      />
    )

    //simulate external controlled value change
    rerender(
      <Select
        value="no"
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
        onUpdate={handleUpdate}
      />
    )

    await waitFor(() => {
      expect(handleUpdate).toHaveBeenCalledWith('no')
    })
  })

  //------------------------------------------------------------------//
  // Hidden input simulation
  //------------------------------------------------------------------//
  it('adds hidden input after selection (manual value simulation)', async () => {
    const { rerender } = render(
      <Select
        name="colors"
        value=""
        options={[{ value: 'blue', label: 'Blue' }]}
      />
    )

    //simulate programmatic value update
    rerender(
      <Select
        name="colors"
        value="blue"
        options={[{ value: 'blue', label: 'Blue' }]}
      />
    )

    await waitFor(() => {
      const hidden =
        document.querySelector('input[type="hidden"]') as HTMLInputElement
      expect(hidden).toBeInTheDocument()
      expect(hidden.name).toBe('colors')
      expect(hidden.value).toBe('blue')
    })
  })

  //------------------------------------------------------------------//
  // Multiple select behaviour
  //------------------------------------------------------------------//
  it('supports multiple selections and clear button (programmatic simulation)', async () => {
    const { rerender } = render(
      <Select
        multiple
        name="multi"
        value={[]}
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]}
      />
    )

    //simulate selecting multiple values
    rerender(
      <Select
        multiple
        name="multi"
        value={['a', 'b']}
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]}
      />
    )

    await waitFor(() => {
      const clearBtn = document.querySelector(
        '.frui-form-select-control-actions-clear'
      )
      expect(clearBtn).toBeInTheDocument()

      //trigger clear all action
      fireEvent.click(clearBtn!)

      const inputs = document.querySelectorAll('input[type="hidden"]')
      expect(inputs.length).toBe(0)
    })
  })

  //------------------------------------------------------------------//
  // Controlled value rendering
  //------------------------------------------------------------------//
  it('renders correct selected option when value prop provided', async () => {
    const { rerender, container } = render(
      <Select
        value="opt2"
        options={[
          { value: 'opt1', label: 'Opt1' },
          { value: 'opt2', label: 'Opt2' }
        ]}
      />
    )

    const control = container.querySelector(
      '.frui-form-select-control-selected'
    )
    expect(control).toBeInTheDocument()
    expect(control?.textContent).toContain('Opt2')

    //rerender to new controlled value
    rerender(
      <Select
        value="opt1"
        options={[
          { value: 'opt1', label: 'Opt1' },
          { value: 'opt2', label: 'Opt2' }
        ]}
      />
    )

    await waitFor(() => {
      const updatedControl = container.querySelector(
        '.frui-form-select-control-selected'
      )
      expect(updatedControl).toBeInTheDocument()
      expect(updatedControl?.textContent).toContain('Opt1')
    })
  })
})