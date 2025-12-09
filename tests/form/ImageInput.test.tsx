//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { 
  render, 
  screen, 
  fireEvent, 
  waitFor 
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
//frui
import ImageInput from '../../src/form/ImageInput.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    onChange,
    type,
    accept,
    className,
  }: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    accept?: string
    className?: string
  }) => (
    <input
      data-testid="mock-input"
      type={type}
      accept={accept}
      className={className}
      onChange={onChange}
    />
  ),
  useInput: vi.fn()
}));

//--------------------------------------------------------------------//
// Tests

describe('<ImageInput />', () => {
  it('renders wrapper and basic input', () => {
    render(<ImageInput />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('accept', 'image/*');
    expect(input.closest('div')).toHaveClass('frui-form-image-input');
  });

  it('renders uploaded image preview when defaultValue provided', () => {
    render(<ImageInput defaultValue="preview.jpg" />);
    const img = screen.getByAltText('preview') as HTMLImageElement;
    expect(img).toHaveAttribute('src', 'preview.jpg');
    expect(screen.getByText('preview.jpg')).toBeInTheDocument();
  });

  it('shows uploading placeholder, then uploaded preview', async () => {
    const onUpload = vi.fn((file: File, update: (url: string) => void) => {
      setTimeout(() => update('done.jpg'), 10)
    });
    render(<ImageInput onUpload={onUpload} />);
    const input = screen.getByTestId('mock-input') as HTMLInputElement;
    const file = new window.File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() =>
      expect(screen.getByText('Uploading...')).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText('done.jpg')).toBeInTheDocument()
    );
  });

  it('calls onUpdate when upload completes', async () => {
    const onUpload = vi.fn((file: File, update: (url: string) => void) =>
      update('uploaded.png')
    );
    const onUpdate = vi.fn();
    render(<ImageInput onUpload={onUpload} onUpdate={onUpdate} />);
    const input = screen.getByTestId('mock-input') as HTMLInputElement;
    const file = new window.File(['data'], 'file.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() => expect(onUpdate).toHaveBeenCalledWith('uploaded.png'))
  });

  it('removes uploaded image when × is clicked', async () => {
    render(<ImageInput defaultValue="done.jpg" />);
    const reset = screen.getByText('×');
    await userEvent.click(reset);
    expect(screen.queryByText('done.jpg')).not.toBeInTheDocument();
  });

  it('displays custom uploading text when provided', async () => {
    const onUpload = vi.fn((file: File, update: (url: string) => void) => {
      setTimeout(() => update('final.jpg'), 10)
    });
    render(<ImageInput uploading="Uploading Image..." onUpload={onUpload} />);
    const input = screen.getByTestId('mock-input') as HTMLInputElement;
    const file = new window.File(['z'], 'z.jpg', { type: 'image/jpeg' });
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() =>
      expect(screen.getByText('Uploading Image...')).toBeInTheDocument()
    );
  });
});