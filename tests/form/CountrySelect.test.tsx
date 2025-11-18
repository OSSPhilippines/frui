// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import CountrySelect from '../../components/form/CountrySelect'

// --------------------------------------------------------------------
// Mocks
// --------------------------------------------------------------------
vi.mock('../../components/data/countries.js', () => ({
  __esModule: true,
  default: [
    {
      type: 'country',
      iso2: 'US',
      iso3: 'USA',
      name: 'United States',
      flag: '🇺🇸',
      ne: [0, 0],
      sw: [0, 0],
      cur: 'USD',
      tel: '+1',
      lang: 'en',
      num: ['001', '002'],
    },
    {
      type: 'country',
      iso2: 'FR',
      iso3: 'FRA',
      name: 'France',
      flag: '🇫🇷',
      ne: [0, 0],
      sw: [0, 0],
      cur: 'EUR',
      tel: '+33',
      lang: 'fr',
      num: ['003', '004'],
    },
  ],
}))

vi.mock('../../components/form/Select.js', () => {
  let parentOnUpdate: ((value: string | string[]) => void) | undefined

  const MockSelect = ({
    children,
    className,
    onUpdate,
    placeholder,
  }: {
    children?: React.ReactNode
    className?: string
    onUpdate?: (value: string | string[]) => void
    placeholder?: string
  }) => {
    parentOnUpdate = onUpdate
    return (
      <div data-testid="mock-select" className={className}>
        <div className="frui-form-select-display">{placeholder}</div>
        <div className="frui-form-select-dropdown">{children}</div>
      </div>
    )
  }

  const MockSelectDropdownHead = ({
    children,
  }: {
    children?: React.ReactNode
  }) => <div data-testid="select-head">{children}</div>

  const MockSelectOption = ({
    children,
    value,
  }: {
    children?: React.ReactNode
    value?: string
  }) => (
    <div
      data-testid="select-option"
      className="frui-form-select-option"
      onClick={() => parentOnUpdate?.(value as string)}
    >
      {children}
    </div>
  )

  return {
    __esModule: true,
    Select: MockSelect,
    SelectDropdownHead: MockSelectDropdownHead,
    SelectOption: MockSelectOption,
  }
})

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<CountrySelect />', () => {
  it('renders base layout and all options', () => {
    render(<CountrySelect />)
    expect(screen.getByText('Select a country')).toBeInTheDocument()

    const options = screen.getAllByTestId('select-option')
    expect(options.length).toBeGreaterThanOrEqual(2)

    const optionTexts = options.map((o) => o.textContent ?? '')
    expect(optionTexts.some((t) => t.includes('United States'))).toBe(true)
    expect(optionTexts.some((t) => t.includes('France'))).toBe(true)
  })

  it('renders searchable head with placeholder', () => {
    render(<CountrySelect searchable="Type here" />)
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
  })

  it('updates search field text when typing', async () => {
    render(<CountrySelect searchable />)
    const input = screen.getByPlaceholderText('Search...')
    await userEvent.type(input, 'Fra')
    fireEvent.keyUp(input, { target: { value: 'Fra' } })
    expect(input).toHaveValue('Fra')
  })

  it('calls onUpdate with a single selected country', () => {
    const onUpdate = vi.fn()
    render(<CountrySelect onUpdate={onUpdate} />)

    const france = screen
      .getAllByTestId('select-option')
      .find((opt) => opt.textContent?.includes('France'))
    expect(france).toBeInTheDocument()
    france && fireEvent.click(france)

    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        iso2: 'FR',
        name: 'France',
        flag: '🇫🇷',
      })
    )
  })

  it('calls onUpdate twice and includes both countries for multiple select', () => {
    const onUpdate = vi.fn()
    render(<CountrySelect multiple onUpdate={onUpdate} />)

    const options = screen.getAllByTestId('select-option')
    const us = options.find((n) => n.textContent?.includes('United States'))
    const fr = options.find((n) => n.textContent?.includes('France'))
    expect(us).toBeInTheDocument()
    expect(fr).toBeInTheDocument()

    us && fireEvent.click(us)
    fr && fireEvent.click(fr)

    // two separate calls for US and FR
    expect(onUpdate).toHaveBeenCalledTimes(2)
    const allArgs = onUpdate.mock.calls.flat()
    const iso2Values = allArgs.map((arg) => arg.iso2)
    expect(iso2Values).toEqual(expect.arrayContaining(['US', 'FR']))
  })
})