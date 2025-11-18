// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { act, renderHook } from '@testing-library/react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Textlist, { TextlistFields, useTextlists } from '../../components/form/Textlist'

// --------------------------------------------------------------------
// Hook Tests
// --------------------------------------------------------------------
describe('useTextlists()', () => {
  it('updates a value at given index', () => {
    const setMock = vi.fn()
    const values = ['a', 'b', 'c']

    const { result } = renderHook(() =>
      useTextlists({ values, index: 1, set: setMock })
    )

    act(() => {
      result.current.handlers.update('newVal')
    })

    expect(setMock).toHaveBeenCalledWith(['a', 'newVal', 'c'])
  })

  it('removes a value (sets index to undefined)', () => {
    const setMock = vi.fn()
    const values = ['a', 'b']

    const { result } = renderHook(() =>
      useTextlists({ values, index: 0, set: setMock })
    )

    act(() => result.current.handlers.remove())
    expect(setMock).toHaveBeenCalledWith([undefined, 'b'])
  })
})

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<TextlistFields />', () => {
  it('renders input and remove button', () => {
    const setMock = vi.fn()
    render(
      <TextlistFields
        name="list"
        config={{ placeholder: 'Enter a value' }}
        values={['one']}
        index={0}
        error={false}
        set={setMock}
      />
    )

    const input = screen.getByRole('textbox')
    const removeBtn = screen.getByText('×')

    expect(input).toBeInTheDocument()
    expect(removeBtn).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Enter a value')
  })

  it('updates on typing and clicking remove button', () => {
    const setMock = vi.fn()
    render(
      <TextlistFields
        name="list"
        config={{ placeholder: 'type here' }}
        values={[undefined]}
        index={0}
        error={false}
        set={setMock}
      />
    )

    const input = screen.getByRole('textbox')
    const removeBtn = screen.getByText('×')

    fireEvent.change(input, { target: { value: 'typed text' } })
    expect(setMock).toHaveBeenCalled() // via handlers.update

    fireEvent.click(removeBtn)
    expect(setMock).toHaveBeenCalled() // via handlers.remove
  })

  it('renders hidden input when value is string', () => {
    const setMock = vi.fn()
    render(
      <TextlistFields
        name="items"
        config={{}}
        values={['abc']}
        index={0}
        error={false}
        set={setMock}
      />
    )

    // There are two <input>s with value "abc": one visible, one hidden.
    const allInputs = screen.getAllByDisplayValue('abc')
    const hidden = allInputs.find(el => el.getAttribute('type') === 'hidden') as HTMLInputElement

    expect(hidden).toBeInTheDocument()
    expect(hidden).toHaveAttribute('type', 'hidden')
    expect(hidden).toHaveAttribute('name', 'items')
  })
})

// --------------------------------------------------------------------
// Textlist Wrapper Component Tests
// --------------------------------------------------------------------
describe('<Textlist />', () => {
  it('renders Fieldset add button', () => {
    render(<Textlist name="wrapper" placeholder="add..." />)

    // Fieldset initially renders only the "Add" button
    const addButton = screen.getByRole('button', { name: /add/i })
    expect(addButton).toBeInTheDocument()
  })
})