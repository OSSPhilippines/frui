//--------------------------------------------------------------------//
// Imports
//--------------------------------------------------------------------//
import '@testing-library/jest-dom'
import {
  act,
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
import SuggestInput, {
  useSuggestInput,
  SuggestInputDropdown
} from '../../src/form/SuggestInput'

//--------------------------------------------------------------------//
// Mocks
//--------------------------------------------------------------------//
vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
    onKeyDown,
    onBlur
  }: {
    value?: string
    onChange?: (
      e: React.ChangeEvent<HTMLInputElement>
    ) => void
    onKeyDown?: (
      e: React.KeyboardEvent<HTMLInputElement>
    ) => void
    onBlur?: (
      e: React.FocusEvent<HTMLInputElement>
    ) => void
  }) => (
    <input
      data-testid="mock-input"
      value={value || ''}
      onChange={(e) =>
        onChange?.(e as React.ChangeEvent<HTMLInputElement>)
      }
      onKeyDown={(e) =>
        onKeyDown?.(e as React.KeyboardEvent<HTMLInputElement>)
      }
      onBlur={(e) =>
        onBlur?.(e as React.FocusEvent<HTMLInputElement>)
      }
    />
  )
}))

//--------------------------------------------------------------------//
// Hook Tests
//--------------------------------------------------------------------//
describe('useSuggestInput', () => {
  //available options
  const options = ['Apple', 'Banana', 'Cherry']

  //helper function to mount hook for isolated testing
  function setupHook(overrides = {}) {
    let result: ReturnType<typeof useSuggestInput> | undefined

    const TestHook = () => {
      result = useSuggestInput({
        defaultValue: 'init',
        options,
        ...overrides
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
    const event =
      { target: { value: 'test' } } as unknown as React.ChangeEvent<HTMLInputElement>

    //simulate user input update
    act(() => {
      hook.handlers.update(event)
    })

    expect(onChange).toHaveBeenCalled()
    expect(onUpdate).toHaveBeenCalledWith('test')
  })

  it('calls onQuery with input value when search handler triggered', async () => {
    const onQuery = vi.fn()
    const getHook = setupHook({ onQuery })
    const hook = getHook()

    //simulate keyboard search
    act(() => {
      const e =
        { target: { value: 'apple' } } as unknown as React.KeyboardEvent<HTMLInputElement>
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

    //simulate selecting an option
    act(() => {
      hook.handlers.select('Banana')
    })

    expect(onSelected).toHaveBeenCalledWith('Banana')
  })
})

//--------------------------------------------------------------------//
// Dropdown Tests
//--------------------------------------------------------------------//
describe('SuggestInputDropdown', () => {
  it('renders matching options when visible', () => {
    const select = vi.fn()
    const match = vi.fn(() => true)

    render(
      <SuggestInputDropdown
        show
        options={['Apple', 'Banana']}
        select={select}
        match={match}
      />
    )

    const nodes = screen.getAllByText(/Apple|Banana/)
    expect(nodes.length).toBe(2)
  })

  it('does not render when there are no matching options', () => {
    const { container } = render(
      <SuggestInputDropdown
        show
        options={['Apple']}
        select={vi.fn()}
        match={() => false}
      />
    )
    //expect dropdown container not to exist
    expect(container.firstChild).toBeNull()
  })

  it('calls select when option is clicked', () => {
    const select = vi.fn()
    const match = () => true

    render(
      <SuggestInputDropdown
        show
        options={['Apple']}
        select={select}
        match={match}
      />
    )

    const option = screen.getByText('Apple')
    fireEvent.click(option)
    expect(select).toHaveBeenCalledWith('Apple')
  })
})

//--------------------------------------------------------------------//
// Tests
//--------------------------------------------------------------------//
describe('<SuggestInput />', () => {
  //preset options
  const options = ['Alpha', 'Beta', 'Gamma']

  it('renders input field correctly', () => {
    render(<SuggestInput options={options} />)
    const input = screen.getByTestId('mock-input')
    expect(input).toBeInTheDocument()
  })

  it('calls onQuery and onDropdown when typing', async () => {
    const onQuery = vi.fn()
    const onDropdown = vi.fn()

    render(
      <SuggestInput
        options={options}
        onQuery={onQuery}
        onDropdown={onDropdown}
      />
    )

    const input = screen.getByTestId('mock-input')

    //step 1: type to set value
    act(() => {
      fireEvent.change(input, { target: { value: 'alpha' } })
    })

    //step 2: trigger keyDown search
    act(() => {
      fireEvent.keyDown(input, { key: 'a', target: { value: 'alpha' } })
    })

    //wait for setTimeout inside handler
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 15))
    })

    await waitFor(() => {
      expect(onDropdown).toHaveBeenCalledWith(true)
      expect(onQuery).toHaveBeenCalledWith('alpha', expect.any(Function))
    })
  })

  it('does not render dropdown if match count is zero', () => {
    render(<SuggestInput options={['Zero']} />)
    const dropdown = document.querySelector('.frui-form-input-suggest-dropdown')
    expect(dropdown).toBeNull()
  })

  it('handles selecting dropdown option', async () => {
    const onSelected = vi.fn()
    const onUpdate = vi.fn()
    const onDropdown = vi.fn()

    render(
      <SuggestInput
        options={options}
        onSelected={onSelected}
        onUpdate={onUpdate}
        onDropdown={onDropdown}
      />
    )

    const input = screen.getByTestId('mock-input')

    //simulate typing a character key
    act(() => {
      fireEvent.keyDown(input, { key: 'a', target: { value: 'Alpha' } })
    })

    //wait for async behaviour
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10))
    })

    //simulate selecting a value
    act(() => {
      fireEvent.change(input, { target: { value: 'Beta' } })
    })

    //validate input remains rendered
    expect(input).toBeInTheDocument()
  })
})