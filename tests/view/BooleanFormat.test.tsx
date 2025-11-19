// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { describe, expect, it, afterEach } from 'vitest'
import Yesno from '../../components/view/BooleanFormat' 

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Yesno />', () => {
  afterEach(() => cleanup())

  it('renders "Yes" when value is truthy', () => {
    render(<Yesno value={true} />)
    expect(screen.getByText('Yes')).toBeInTheDocument()
  })

  it('renders "No" when value is falsy', () => {
    render(<Yesno value={false} />)
    expect(screen.getByText('No')).toBeInTheDocument()
  })

  it('accepts custom yes/no labels', () => {
    render(<Yesno value={1} yes="Affirmative" no="Negative" />)
    expect(screen.getByText('Affirmative')).toBeInTheDocument()
  })

  it('treats other truthy values (strings, numbers) as "Yes"', () => {
    render(<Yesno value="non-empty string" />)
    expect(screen.getByText('Yes')).toBeInTheDocument()

    cleanup()

    render(<Yesno value={123} />)
    expect(screen.getByText('Yes')).toBeInTheDocument()
  })

  it('treats falsy values (0, empty, null, undefined) as "No"', () => {
    render(<Yesno value={0} />)
    expect(screen.getByText('No')).toBeInTheDocument()

    cleanup()
    render(<Yesno value="" />)
    expect(screen.getByText('No')).toBeInTheDocument()

    cleanup()
    render(<Yesno value={null} />)
    expect(screen.getByText('No')).toBeInTheDocument()

    cleanup()
    render(<Yesno value={undefined} />)
    expect(screen.getByText('No')).toBeInTheDocument()
  })
})