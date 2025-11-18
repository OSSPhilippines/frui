// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Country } from '../../components/view/CountryFormat'

// --------------------------------------------------------------------
// Mock countries data (keeps tests isolated)
// --------------------------------------------------------------------
vi.mock('../../../components/data/countries.js', () => ({
  __esModule: true,
  default: [
    { iso3: 'USA', name: 'United States', flag: '🇺🇸' },
    { iso3: 'FRA', name: 'France', flag: '🇫🇷' },
  ],
}))

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Country />', () => {
  it('renders both flag and name by default', () => {
    render(<Country value="FRA" />)

    const wrapper = document.querySelector('.frui-format-country') as HTMLElement
    const flag = wrapper.querySelector('.frui-format-country-flag') as HTMLElement
    const text = wrapper.querySelector('.frui-format-country-text') as HTMLElement

    expect(wrapper).toHaveClass('frui-format-country')
    expect(flag).toHaveTextContent('🇫🇷')
    expect(text).toHaveTextContent('France')
  })

  it('renders text only when flag is false', () => {
    render(<Country value="USA" flag={false} />)

    const text = document.querySelector('.frui-format-country-text') as HTMLElement
    expect(text).toHaveTextContent('United States')
    expect(text).not.toHaveClass('frui-format-country-flag')
  })

  it('renders flag only when text is false', () => {
    render(<Country value="USA" text={false} />)

    const flag = document.querySelector('.frui-format-country-flag') as HTMLElement
    expect(flag).toHaveTextContent('🇺🇸')
  })

  it('renders raw value when ISO3 code not found', () => {
    render(<Country value="XYZ" />)

    const fallback = document.querySelector('.frui-format-country-text') as HTMLElement
    expect(fallback).toHaveTextContent('XYZ')
  })

  it('applies custom className and style when provided', () => {
    render(
      <Country
        value="USA"
        className="custom"
        style={{ margin: '10px' }}
      />
    )

    const wrapper = document.querySelector('.frui-format-country') as HTMLElement
    expect(wrapper).toHaveClass('custom')
    expect(wrapper).toHaveStyle({ margin: '10px' })
  })
})