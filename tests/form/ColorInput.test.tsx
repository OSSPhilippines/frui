// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ColorInput, clamp, componentToHex, rgbaToHex, toRGBA, toHex } from '../../components/form/ColorInput'
// --------------------------------------------------------------------
// Mocks
// --------------------------------------------------------------------
vi.mock('../../../components/helpers/getClassStyles.js', () => ({
  __esModule: true,
  default: ({ classes }: unknown) => ({ classes, styles: {} })
}))
vi.mock('../../../components/helpers/getSlotStyles.js', () => ({
  __esModule: true,
  default: () => ({})
}))
vi.mock('../../../components/field/Input.js', () => ({
  __esModule: true,
  default: ({ onChange, className, value, type }: unknown) => (
    <input
      data-testid="mock-input"
      className={className}
      value={value}
      onChange={onChange}
      type={type}
    />
  )
}))
// --------------------------------------------------------------------
// Helper function unit tests
// --------------------------------------------------------------------
describe('Color helper functions', () => {
  it('clamps value correctly', () => {
    expect(clamp(300, 0, 255)).toBe(255)
    expect(clamp(-20, 0, 255)).toBe(0)
    expect(clamp(123, 0, 255)).toBe(123)
  })
  it('componentToHex pads and clamps properly', () => {
    expect(componentToHex(255)).toBe('ff')
    expect(componentToHex(0)).toBe('00')
    expect(componentToHex(300)).toBe('ff')
  })
  it('rgbaToHex converts color object to hex string', () => {
    expect(rgbaToHex({ r: 255, g: 0, b: 128, a: 1 })).toBe('#ff0080')
  })
  it('toRGBA parses rgba, hex and shortHex patterns', () => {
    expect(toRGBA('rgba(255, 20, 10, 0.5)')).toEqual({ r: 255, g: 20, b: 10, a: 0.5 })
    expect(toRGBA('#ff0a14')).toEqual({ r: 255, g: 10, b: 20, a: 1 })
    expect(toRGBA('#f0a')).toEqual({ r: 255, g: 0, b: 170, a: 1 })
  })
  it('toHex converts color names, rgba, and invalids to expected hex', () => {
    expect(toHex('rgba(255,0,0,1)')).toBe('#ff0000')
    expect(toHex('#00ff00')).toBe('#00ff00')
    expect(toHex('invalid')).toBe('#000000')
  })
})
// --------------------------------------------------------------------
// Component tests
// --------------------------------------------------------------------
describe('<ColorInput />', () => {
  it('renders base structure (picker + text input)', () => {
    const { container } = render(<ColorInput />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    const colorPicker = container.querySelector('input[type="color"]') as HTMLInputElement
    expect(colorPicker).toBeInTheDocument()
    expect(colorPicker).toHaveAttribute('type', 'color')
  })

  it('renders with provided defaultValue', () => {
    const { container } = render(<ColorInput defaultValue="#ff0000" />)
    const text = screen.getByRole('textbox') as HTMLInputElement
    const colorPicker = container.querySelector('input[type="color"]') as HTMLInputElement
    expect(text.value.toLowerCase()).toBe('#ff0000')
    expect(colorPicker.value.toLowerCase()).toBe('#ff0000')
  })

  it('triggers onUpdate when typing color code', async () => {
    const onUpdate = vi.fn()
    render(<ColorInput onUpdate={onUpdate} />)
    const text = screen.getByRole('textbox')
    fireEvent.change(text, { target: { value: '#123456' } })
    await waitFor(() => expect(onUpdate).toHaveBeenCalledWith('#123456'))
  })

  it('updates picker when controlled value prop changes', async () => {
    const { rerender, container } = render(<ColorInput value="#abc123" />)
    const picker = container.querySelector('input[type="color"]') as HTMLInputElement
    expect(picker.value.toLowerCase()).toBe('#abc123')
    rerender(<ColorInput value="#ffffff" />)
    await waitFor(() => expect(picker.value.toLowerCase()).toBe('#ffffff'))
  })

  it('allows changing the color via color picker input', async () => {
    const onUpdate = vi.fn()
    const { container } = render(<ColorInput onUpdate={onUpdate} />)
    const picker = container.querySelector('input[type="color"]') as HTMLInputElement
    fireEvent.change(picker, { target: { value: '#ff8800' } })
    await waitFor(() => expect(onUpdate).toHaveBeenCalledWith('#ff8800'))
  })
})