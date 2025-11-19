// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { ImageList } from '../../components/form/ImageList'

// --------------------------------------------------------------------
// Mocks
// --------------------------------------------------------------------

// Mock Input component
vi.mock('../../components/form/Input.js', () => ({
  __esModule: true,
  default: ({
    accept,
    className,
    multiple,
    onChange,
    type,
  }: {
    accept?: string
    className?: string
    multiple?: boolean
    onChange?: (event: unknown) => void
    type?: string
  }) => (
    <input
      data-testid="mock-input"
      type={type}
      multiple={multiple}
      className={className}
      accept={accept}
      onChange={(e) => onChange?.(e)}
    />
  ),
}))

// Mock FileList hook with reactive state (triggers component updates)
vi.mock('../../components/form/FileList.js', () => ({
  __esModule: true,
  useFileList: vi.fn(({ defaultValue = [], onUpdate, onUpload }) => {
    const [uploadedState, setUploadedState] = React.useState<string[]>([...defaultValue])
    const [queuedState, setQueuedState] = React.useState<number>(0)

    const handlers = {
      change: (e: unknown): void => {
        const evt = e as { target: { files?: FileList } }
        const files = Array.from(evt.target.files ?? [])
        setQueuedState(files.length)
        if (onUpload) {
          onUpload(files, (urls: string[]) => {
            setUploadedState(urls)
            setQueuedState(0)
            onUpdate?.(urls)
          })
        }
      },
      remove: (index: number): void => {
        setUploadedState((prev) => {
          const updated = [...prev]
          updated.splice(index, 1)
          onUpdate?.(updated)
          return updated
        })
      },
    }

    return {
      handlers,
      queued: queuedState,
      uploaded: uploadedState,
    }
  }),
}))

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<ImageList />', () => {
  it('renders wrapper and basic input', () => {
    render(<ImageList />)
    const input = screen.getByTestId('mock-input')
    expect(input).toHaveAttribute('type', 'file')
    expect(input).toHaveAttribute('accept', 'image/*')
    const wrapper = input.closest('div')
    expect(wrapper).toHaveClass('frui-form-image-list')
  })

  it('renders uploaded images from defaultValue', () => {
    render(<ImageList defaultValue={['one.jpg', 'two.png']} />)
    const images = screen.getAllByAltText('preview')
    expect(images).toHaveLength(2)
    expect(images[0]).toHaveAttribute('src', 'one.jpg')
    expect(images[1]).toHaveAttribute('src', 'two.png')
  })

  it('shows uploading placeholder and then the uploaded image', async () => {
    const onUpload = vi.fn((_files: File[], update: (urls: string[]) => void) => {
      setTimeout(() => update(['imgA.jpg']), 50)
    })
    render(<ImageList onUpload={onUpload} />)
    const file = new File(['dummy'], 'imgA.jpg', { type: 'image/jpeg' })
    fireEvent.change(screen.getByTestId('mock-input'), {
      target: { files: [file] },
    })
    await waitFor(() =>
      expect(screen.queryByText('Uploading...')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(screen.getByText('imgA.jpg')).toBeInTheDocument()
    )
  })

  it('calls onUpdate when upload completes', async () => {
    const onUpload = vi.fn((_files: File[], update: (urls: string[]) => void) =>
      update(['url1.png'])
    )
    const onUpdate = vi.fn()
    render(<ImageList onUpload={onUpload} onUpdate={onUpdate} />)
    const file = new File([''], 'photo.png', { type: 'image/png' })
    fireEvent.change(screen.getByTestId('mock-input'), {
      target: { files: [file] },
    })
    await waitFor(() => expect(onUpdate).toHaveBeenCalledWith(['url1.png']))
  })

  it('removes uploaded image when × is clicked', async () => {
    render(<ImageList defaultValue={['remove.png']} />)
    const removeBtn = screen.getByText('×')
    await userEvent.click(removeBtn)
    await waitFor(() =>
      expect(screen.queryByText('remove.png')).not.toBeInTheDocument()
    )
  })

  it('resets image list when defaultValue becomes empty', async () => {
    const { rerender } = render(<ImageList defaultValue={['a.png', 'b.png']} />)
    expect(screen.getAllByRole('img')).toHaveLength(2)
    rerender(<ImageList key="reset" defaultValue={[]} />)
    await waitFor(() => expect(screen.queryAllByRole('img')).toHaveLength(0))
  })
})