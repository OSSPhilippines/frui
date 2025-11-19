// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MetadataFields, useMetadata } from '../../components/form/Metadata'

// --------------------------------------------------------------------
// Module mocks 
// --------------------------------------------------------------------
vi.mock('../../components/Button.js', () => ({
  __esModule: true,
  default: ({ onClick }: { onClick?: () => void }) => (
    <button data-testid="mock-button" onClick={onClick}>
      ×
    </button>
  ),
}))

// helper factory defined *inside* each mock to avoid hoisting issues
vi.mock('../../components/form/Input.js', () => ({
  __esModule: true,
  default: ({ onUpdate, className }: { onUpdate?: (v: unknown) => void; className?: string }) => (
    <input
      data-testid="mock-input"
      className={className}
      onChange={(e) => onUpdate?.((e.target as HTMLInputElement).value)}
    />
  ),
}))

vi.mock('../../components/form/NumberInput.js', () => ({
  __esModule: true,
  default: ({ onUpdate, className }: { onUpdate?: (v: unknown) => void; className?: string }) => (
    <input
      data-testid="mock-number"
      className={className}
      onChange={(e) => onUpdate?.((e.target as HTMLInputElement).value)}
    />
  ),
}))

vi.mock('../../components/form/DateInput.js', () => ({
  __esModule: true,
  default: ({ onUpdate, className }: { onUpdate?: (v: unknown) => void; className?: string }) => (
    <input
      data-testid="mock-date"
      className={className}
      onChange={(e) => onUpdate?.((e.target as HTMLInputElement).value)}
    />
  ),
}))

vi.mock('../../components/form/TimeInput.js', () => ({
  __esModule: true,
  default: ({ onUpdate, className }: { onUpdate?: (v: unknown) => void; className?: string }) => (
    <input
      data-testid="mock-time"
      className={className}
      onChange={(e) => onUpdate?.((e.target as HTMLInputElement).value)}
    />
  ),
}))

vi.mock('../../components/form/DatetimeInput.js', () => ({
  __esModule: true,
  default: ({ onUpdate, className }: { onUpdate?: (v: unknown) => void; className?: string }) => (
    <input
      data-testid="mock-datetime"
      className={className}
      onChange={(e) => onUpdate?.((e.target as HTMLInputElement).value)}
    />
  ),
}))

// --------------------------------------------------------------------
// Hook tests
// --------------------------------------------------------------------
describe('useMetadata()', () => {
  const values: ([string, string | number | Date] | undefined)[] = [['key', 'val']]

  it('removes entry', () => {
    const setMock = vi.fn()
    const { handlers } = useMetadata({ type: 'text', values, index: 0, set: setMock })
    handlers.remove()
    expect(setMock).toHaveBeenCalledWith([undefined])
  })

  it('updates name/value', () => {
    const setMock = vi.fn()
    const { handlers } = useMetadata({ type: 'text', values, index: 0, set: setMock })
    handlers.update('name', 'new')
    handlers.update('value', 'val')
    expect(setMock).toHaveBeenCalledTimes(2)
  })
})

// --------------------------------------------------------------------
// Component tests
// --------------------------------------------------------------------
describe('<MetadataFields />', () => {
  const values = [['name', 'val']] as unknown as ([string, string] | undefined)[]
  const renderField = (type: string, set = vi.fn()) =>
    render(<MetadataFields name="meta" config={{ type }} values={values} index={0} set={set} />)

  it.each(['number', 'date', 'time', 'datetime'])(
    'renders correct input for type=%s',
    (type) => {
      renderField(type)
      expect(screen.getByTestId(`mock-${type}`)).toBeInTheDocument()
    },
  )

  it('renders hidden input with filled value', () => {
    renderField('text')
    const hidden = document.querySelector('input[type="hidden"]') as HTMLInputElement
    expect(hidden).toBeInTheDocument()
    expect(hidden.name).toContain('meta')
    expect(hidden.value).toBe('val')
  })

  it('renders text inputs (type=text)', () => {
    renderField('text')
    expect(screen.getAllByTestId('mock-input')).toHaveLength(2)
  })

  it('removes on button click', () => {
    const setMock = vi.fn()
    renderField('text', setMock)
    fireEvent.click(screen.getByTestId('mock-button'))
    expect(setMock).toHaveBeenCalled()
  })

  it('updates on change', () => {
    const setMock = vi.fn()
    renderField('text', setMock)
    screen
      .getAllByTestId('mock-input')
      .forEach((el) => fireEvent.change(el, { target: { value: 'x' } }))
    expect(setMock).toHaveBeenCalled()
  })
})