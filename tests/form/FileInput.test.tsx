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
import FileInput from '../../src/form/FileInput.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    onChange,
    type,
    className,
  }: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    className?: string
  }) => (
    <input
      data-testid="mock-input"
      type={type}
      className={className}
      onChange={onChange}
    />
  ),
  useInput: vi.fn()
}));

//--------------------------------------------------------------------//
// Tests

describe('<FileInput />', () => {
  it('renders wrapper and input', () => {
    render(<FileInput />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveAttribute('type', 'file');
    expect(input.closest('div')).toHaveClass('frui-form-file-input');
  });

  it('renders uploaded link when defaultValue provided', () => {
    render(<FileInput defaultValue="uploaded.png" />);
    expect(screen.getByText('uploaded.png')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'uploaded.png');
  });

  it('shows uploading placeholder and then uploaded link', async () => {
    const onUpload = vi.fn((_: File, update: (url: string) => void) => {
      setTimeout(() => update('done.jpg'), 10);
    });
    render(<FileInput onUpload={onUpload} />);
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
    const onUpload = vi.fn((_: File, update: (url: string) => void) =>
      update('uploaded.png')
    );
    const onUpdate = vi.fn();
    render(<FileInput onUpload={onUpload} onUpdate={onUpdate} />);
    const input = screen.getByTestId('mock-input') as HTMLInputElement;
    const file = new window.File(['x'], 'file.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() => expect(onUpdate).toHaveBeenCalledWith('uploaded.png'));
  });

  it('removes uploaded file when "×" clicked', async () => {
    render(<FileInput defaultValue="one.png" />);
    const resetBtn = screen.getByText('×');
    await userEvent.click(resetBtn);
    expect(screen.queryByText('one.png')).not.toBeInTheDocument();
  });

  it('displays custom uploading text when provided', async () => {
    const onUpload = vi.fn((_: File, update: (url: string) => void) => {
      setTimeout(() => update('final.txt'), 10);
    });
    render(<FileInput uploading="Uploading File..." onUpload={onUpload} />);
    const input = screen.getByTestId('mock-input') as HTMLInputElement;
    const file = new window.File(['z'], 'z.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() =>
      expect(screen.getByText('Uploading File...')).toBeInTheDocument()
    );
  });
});