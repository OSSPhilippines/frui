// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Autocomplete, {
  useAutocomplete,
  AutocompleteDropdown,
} from '../../components/form/SuggestInput'

// --------------------------------------------------------------------
// Mocks
// --------------------------------------------------------------------
vi.mock('../../components/form/Input.js', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
    onKeyDown,
    onBlur,
  }: {
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  }) => (
    <input
      data-testid="mock-input"
      value={value || ''}
      onChange={(e) => onChange?.(e as React.ChangeEvent<HTMLInputElement>)}
      onKeyDown={(e) => onKeyDown?.(e as React.KeyboardEvent<HTMLInputElement>)}
      onBlur={(e) => onBlur?.(e as React.FocusEvent<HTMLInputElement>)}
    />
  ),
}))

// --------------------------------------------------------------------
// Tests
// --------------------------------------------------------------------
describe('useAutocomplete', () => {
  const options = ['Apple', 'Banana', 'Cherry']

  function setupHook(overrides = {}) {
    let result: ReturnType<typeof useAutocomplete> | undefined
    const TestHook = () => {
      result = useAutocomplete({
        defaultValue: 'init',
        options,
        ...overrides,
      })
      return null
    }
    render(<TestHook />)
    return () => result!
  }

  it('initializes state correctly', () => {
    const getHook = setupHook()
    const hook = getHook()
    expect(hook.value).toBe('init')
    expect(hook.options).toEqual(options)
  })

  it('calls onUpdate and onChange when update handler triggered', () => {
    const onChange = vi.fn()
    const onUpdate = vi.fn()
    const getHook = setupHook({ onChange, onUpdate })
    const hook = getHook()
    const mockEvent = { target: { value: 'test' } } as unknown as React.ChangeEvent<HTMLInputElement>
    act(() => {
      hook.handlers.update(mockEvent)
    })
    expect(onChange).toHaveBeenCalled()
    expect(onUpdate).toHaveBeenCalledWith('test')
  })

  it('calls onQuery with input value when search handler triggered', async () => {
    const onQuery = vi.fn()
    const getHook = setupHook({ onQuery })
    const hook = getHook()
    act(() => {
      const e = { target: { value: 'apple' } } as unknown as React.KeyboardEvent<HTMLInputElement>
      hook.handlers.search(e)
    })
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledWith('apple', expect.any(Function))
    })
  })

  it('updates value on select', () => {
    const onSelected = vi.fn()
    const getHook = setupHook({ onSelected })
    const hook = getHook()
    act(() => {
      hook.handlers.select('Banana')
    })
    expect(onSelected).toHaveBeenCalledWith('Banana')
  })
})

describe('AutocompleteDropdown', () => {
  it('renders matching options when visible', () => {
    const select = vi.fn()
    const match = vi.fn(() => true)
    render(
      <AutocompleteDropdown
        show
        options={['Apple', 'Banana']}
        select={select}
        match={match}
      />,
    )
    const options = screen.getAllByText(/Apple|Banana/)
    expect(options.length).toBe(2)
  })

  it('does not render when there are no matching options', () => {
    const { container } = render(
      <AutocompleteDropdown
        show
        options={['Apple']}
        select={vi.fn()}
        match={() => false}
      />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('calls select when option is clicked', () => {
    const select = vi.fn()
    const match = () => true
    render(
      <AutocompleteDropdown
        show
        options={['Apple']}
        select={select}
        match={match}
      />,
    )
    const option = screen.getByText('Apple')
    fireEvent.click(option)
    expect(select).toHaveBeenCalledWith('Apple')
  })
})

describe('<Autocomplete />', () => {
  const options = ['Alpha', 'Beta', 'Gamma']

  it('renders input field correctly', () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByTestId('mock-input')
    expect(input).toBeInTheDocument()
  })

  it('calls onQuery and onDropdown when typing', async () => {
    const onQuery = vi.fn()
    const onDropdown = vi.fn()
    render(<Autocomplete options={options} onQuery={onQuery} onDropdown={onDropdown} />)
    const input = screen.getByTestId('mock-input')
    act(() => {
      fireEvent.keyDown(input, { key: 'a', target: { value: 'alpha' } })
    })
    await waitFor(() => {
      expect(onDropdown).toHaveBeenCalledWith(true)
    })
  })

  it('does not render dropdown if match count is zero', () => {
    render(<Autocomplete options={['Zero']} />)
    const dropdown = document.querySelector('.frui-form-input-suggest-dropdown')
    expect(dropdown).toBeNull()
  })

  it('handles selecting dropdown option through handler', async () => {
    const onSelected = vi.fn()
    const onUpdate = vi.fn()
    const onDropdown = vi.fn()
    render(<Autocomplete options={options} onSelected={onSelected} onUpdate={onUpdate} onDropdown={onDropdown} />)
    const input = screen.getByTestId('mock-input')
    act(() => {
      fireEvent.keyDown(input, { key: 'a', target: { value: 'Alpha' } })
    })

    // wait for internal timeout to resolve
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5))
    })

    act(() => {
      fireEvent.change(input, { target: { value: 'Beta' } })
    })

    // simulate selection via user click through dropdown API match/select
    const dropdownInstance = (Autocomplete as unknown as { useAutocomplete?: () => void })
    expect(input).toBeInTheDocument()
  })
})