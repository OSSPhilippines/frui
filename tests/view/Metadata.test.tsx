// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Metadata } from '../../components/view/Metadata'

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Metadata />', () => {
  it('renders a table with tbody', () => {
    render(<Metadata value={{ key: 'value' }} />)
    const table = screen.getByRole('table')
    const tbody = table.querySelector('tbody')
    expect(table.tagName.toLowerCase()).toBe('table')
    expect(tbody).toBeInTheDocument()
  })

  it('renders one table row per key-value pair', () => {
    const data = { name: 'John', age: 30, city: 'Paris' }
    render(<Metadata value={data} />)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(Object.keys(data).length)
  })

  it('displays the correct key and value text', () => {
    const data = { name: 'Alice', age: 25 }
    render(<Metadata value={data} />)
    expect(screen.getByText('name')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('age')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('applies className and style to all table cells', () => {
    const style = { color: 'red' }
    render(<Metadata value={{ one: 1 }} className="custom" style={style} />)
    const cells = screen.getAllByRole('cell')

    cells.forEach((cell) => {
      expect(cell).toHaveClass('custom')
      // JSDOM normalizes named colors to rgb()
      expect(cell).toHaveStyle({ color: 'rgb(255, 0, 0)' })
    })
  })

  it('renders no rows when value is an empty object', () => {
    render(<Metadata value={{}} />)
    const rows = screen.queryAllByRole('row')
    expect(rows).toHaveLength(0)
  })
})