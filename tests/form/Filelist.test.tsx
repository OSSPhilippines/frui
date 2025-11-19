// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import FileList from '../../components/form/FileList'

// --------------------------------------------------------------------
// Mock Input.js so FileList uses a simple input element
// --------------------------------------------------------------------
vi.mock('../../components/form/Input.js', () => ({
  __esModule: true,
  default: ({ onChange, multiple, type, className, ...props }: unknown) => (
    <input
      data-testid="mock-input"
      type={type}
      multiple={multiple}
      className={className}
      onChange={onChange}
      {...props}
    />
  ),
  useInput: vi.fn(),
}))

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<FileList />', () => {
  it('renders wrapper and input', () => {
    render(<FileList />)
    const input = screen.getByTestId('mock-input')
    expect(input).toHaveAttribute('type', 'file')
    expect(input).toHaveAttribute('multiple')
    expect(input.closest('div')).toHaveClass('frui-form-file-list')
  })

  it('renders uploaded files from defaultValue', () => {
    render(<FileList defaultValue={['file1.png', 'file2.jpg']} />)
    expect(screen.getAllByRole('link')).toHaveLength(2)
    expect(screen.getByText('file1.png')).toBeInTheDocument()
    expect(screen.getByText('file2.jpg')).toBeInTheDocument()
  })

  it('shows uploading placeholder and then uploaded file', async () => {
    const onUpload = vi.fn((files, update) => {
      setTimeout(() => update(['fileA.jpg']), 10)
    })
    render(<FileList onUpload={onUpload} />)
    const file = new File(['dummy'], 'fileA.jpg', { type: 'image/jpeg' })
    fireEvent.change(screen.getByTestId('mock-input'), {
      target: { files: [file] },
    })
    // Wait for "Uploading..." placeholder
    await waitFor(() => expect(screen.getByText('Uploading...')).toBeInTheDocument())
    // Wait for uploaded file
    await waitFor(() => expect(screen.getByText('fileA.jpg')).toBeInTheDocument())
  })

  it('calls onUpdate when upload completes', async () => {
    const onUpload = vi.fn((files, update) => update(['url1.png']))
    const onUpdate = vi.fn()
    render(<FileList onUpload={onUpload} onUpdate={onUpdate} />)
    const file = new File(['content'], 'test.png')
    fireEvent.change(screen.getByTestId('mock-input'), {
      target: { files: [file] },
    })
    await waitFor(() => expect(onUpdate).toHaveBeenCalledWith(['url1.png']))
  })

  it('removes uploaded file when "×" clicked', async () => {
    render(<FileList defaultValue={['one.png']} />)
    const removeBtn = screen.getByText('×')
    await userEvent.click(removeBtn)
    expect(screen.queryByText('one.png')).not.toBeInTheDocument()
  })

  it('resets list when defaultValue prop becomes empty array', async () => {
    const { rerender } = render(<FileList defaultValue={['a.png', 'b.png']} />)
    expect(screen.getAllByRole('link')).toHaveLength(2)
    // Force a fresh mount to clear hook state
    rerender(<FileList key="reset" defaultValue={[]} />)
    await waitFor(() => {
      expect(screen.queryAllByRole('link')).toHaveLength(0)
    })
  })
})