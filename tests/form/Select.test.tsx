// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Select, {
  SelectOption,
  SelectPlaceholder,
} from '../../components/form/Select'

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Select />', () => {
  // ------------------------------------------------------------------
  // Rendering and structure
  // ------------------------------------------------------------------
  it('renders base wrapper and placeholder text', () => {
    render(
      <Select placeholder="Pick one">
        <SelectPlaceholder>Pick one</SelectPlaceholder>
        <SelectOption value="red">Red</SelectOption>
      </Select>
    )
    const wrapper = document.querySelector('.frui-form-select')
    expect(wrapper).toBeInTheDocument()
    expect(screen.getByText('Pick one')).toBeInTheDocument()
  })

  it('applies error class when error prop set', () => {
    const { container } = render(<Select error />)
    const wrapper = container.querySelector('.frui-form-select')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper?.className).toContain('frui-form-select-error')
  })

  // ------------------------------------------------------------------
  // Opening / Closing dropdown
  // ------------------------------------------------------------------
  it('toggles dropdown open on placeholder click', async () => {
    render(
      <Select>
        <SelectPlaceholder>Click me</SelectPlaceholder>
        <SelectOption value="1">One</SelectOption>
        <SelectOption value="2">Two</SelectOption>
      </Select>
    )

    const toggle = await screen.findByText('Click me')
    fireEvent.click(toggle)
    const dropdown = document.querySelector('.frui-form-select-dropdown')
    expect(dropdown).toBeInTheDocument()
  })

  // ------------------------------------------------------------------
  // Selection behaviour (single select)
  // ------------------------------------------------------------------
  it('calls onUpdate when an option is clicked', async () => {
    const handleUpdate = vi.fn()
    render(
      <Select onUpdate={handleUpdate}>
        <SelectPlaceholder>Select</SelectPlaceholder>
        <SelectOption value="yes">Yes</SelectOption>
        <SelectOption value="no">No</SelectOption>
      </Select>
    )

    fireEvent.click(await screen.findByText('Select'))
    fireEvent.click(await screen.findByText('Yes'))
    expect(handleUpdate).toHaveBeenCalledWith('yes')
  })

  it('adds hidden input after selection', async () => {
    render(
      <Select name="colors">
        <SelectPlaceholder>Color</SelectPlaceholder>
        <SelectOption value="blue">Blue</SelectOption>
      </Select>
    )
    fireEvent.click(await screen.findByText('Color'))
    fireEvent.click(await screen.findByText('Blue'))
    const hidden = document.querySelector('input[type="hidden"]') as HTMLInputElement
    expect(hidden).toBeInTheDocument()
    expect(hidden.name).toBe('colors')
    expect(hidden.value).toBe('blue')
  })

  // ------------------------------------------------------------------
  // Multiple selection behaviour
  // ------------------------------------------------------------------
  it('supports multiple selections and clear button', async () => {
    render(
      <Select multiple>
        <SelectPlaceholder>Multi</SelectPlaceholder>
        <SelectOption value="a">A</SelectOption>
        <SelectOption value="b">B</SelectOption>
      </Select>
    )
    fireEvent.click(await screen.findByText('Multi'))
    fireEvent.click(await screen.findByText('A'))
    fireEvent.click(await screen.findByText('B'))
    const clearBtn = document.querySelector('.frui-form-select-clear')
    expect(clearBtn).toBeInTheDocument()

    if (clearBtn) fireEvent.click(clearBtn)
    const hidden = document.querySelectorAll('input[type="hidden"]')
    expect(hidden.length).toBe(0)
  })

  // ------------------------------------------------------------------
  // 5️⃣ Controlled value updates
  // ------------------------------------------------------------------
  it('renders correct selected option when value prop provided', () => {
    const { rerender } = render(
      <Select value="opt2">
        <SelectOption value="opt1">Opt1</SelectOption>
        <SelectOption value="opt2">Opt2</SelectOption>
      </Select>
    )

    let active = document.querySelectorAll('.frui-form-select-option-active')
    expect(active.length).toBe(1)

    rerender(
      <Select value="opt1">
        <SelectOption value="opt1">Opt1</SelectOption>
        <SelectOption value="opt2">Opt2</SelectOption>
      </Select>
    )

    active = document.querySelectorAll('.frui-form-select-option-active')
    expect(active.length).toBe(1)
  })
})