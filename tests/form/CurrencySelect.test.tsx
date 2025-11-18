// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CurrencySelect } from '../../components/form/CurrencySelect'

// --------------------------------------------------------------------
// Mocks - Data: currencies + countries
// --------------------------------------------------------------------
vi.mock('../../components/data/currencies.js', () => ({
  __esModule: true,
  default: [
    {
      code: 'USD',
      name: 'US Dollar',
      plural: 'US Dollars',
      symbol: '$',
      type: 'currency',
    },
    {
      code: 'EUR',
      name: 'Euro',
      plural: 'Euros',
      symbol: '€',
      type: 'currency',
    },
  ],
}))

vi.mock('../../components/data/countries.js', () => ({
  __esModule: true,
  default: [
    { iso3: 'USA', cur: 'USD', flag: '🇺🇸' },
    { iso3: 'FRA', cur: 'EUR', flag: '🇫🇷' },
  ],
}))

// --------------------------------------------------------------------
// Mocks - Select component and exports
// --------------------------------------------------------------------
let capturedOnUpdate: any

vi.mock('../../components/form/Select.js', () => ({
  __esModule: true,
  Select: (props: any) => {
    capturedOnUpdate = props.onUpdate
    return (
      <div data-testid="select" className={props.className}>
        <div data-testid="placeholder">{props.placeholder}</div>
        {props.children}
      </div>
    )
  },
  SelectDropdownHead: ({ children }: any) => (
    <div data-testid="dropdown-head">{children}</div>
  ),
  SelectOption: ({ children, value }: any) => (
    <div data-testid="option" data-value={value}>
      {children}
    </div>
  ),
}))

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<CurrencySelect />', () => {
  it('renders with default placeholder and displays all currencies', () => {
    render(<CurrencySelect />)

    const wrapper = screen.getByTestId('select')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('frui-form-currency-select')

    expect(screen.getByText(/US Dollar/)).toBeInTheDocument()
    expect(screen.getByText(/Euro/)).toBeInTheDocument()

    expect(screen.getByTestId('placeholder')).toHaveTextContent(
      'Select a currency'
    )
  })

  it('renders a searchable input with correct placeholder text', () => {
    render(<CurrencySelect searchable="Search currency" />)
    expect(screen.getByTestId('dropdown-head')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Search currency')
    ).toBeInTheDocument()
  })

  it('updates filtered list when typing into search field', async () => {
    render(<CurrencySelect searchable />)
    const searchInput = screen.getByPlaceholderText('Search...')
    await userEvent.type(searchInput, 'Euro')
    fireEvent.keyUp(searchInput, { target: { value: 'Euro' } })

    await waitFor(() => {
      expect(searchInput).toHaveValue('Euro')
    })
  })

  it('calls onUpdate with a single currency when a code is selected', () => {
    const onUpdate = vi.fn()
    render(<CurrencySelect onUpdate={onUpdate} />)

    // Trigger captured Select onUpdate handler
    capturedOnUpdate && capturedOnUpdate('EUR')

    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'EUR',
        name: 'Euro',
        symbol: '€',
      })
    )
  })

  it('calls onUpdate with multiple currencies when array of codes selected', () => {
    const onUpdate = vi.fn()
    render(<CurrencySelect onUpdate={onUpdate} />)

    capturedOnUpdate && capturedOnUpdate(['USD', 'EUR'])

    expect(onUpdate).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ code: 'USD' }),
        expect.objectContaining({ code: 'EUR' }),
      ])
    )
  })
})