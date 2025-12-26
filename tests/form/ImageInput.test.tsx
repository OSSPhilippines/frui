//--------------------------------------------------------------------//
// Imports

//frui
import ImageInput from '../../src/form/ImageInput.js';
//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    accept,
    className,
    onChange,
    type
  }: {
    accept?: string,
    className?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
  }) => (
    <input
      accept={accept}
      className={className}
      data-testid="mock-input"
      onChange={onChange}
      type={type}
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
    expect(input.closest('div')).toHaveClass(
      'frui-form-image-input'
    );
  });

  it('shows preview if defaultValue', () => {
    render(<ImageInput defaultValue="preview.jpg" />);
    const img = screen.getByAltText('preview') as HTMLImageElement;
    expect(img).toHaveAttribute('src', 'preview.jpg');
    expect(screen.getByText('preview.jpg')).toBeInTheDocument();
  });

  it('shows uploading then preview', async () => {
    const onUpload = vi.fn((
      _file: File,
      update: (url: string) => void
    ) => {
      setTimeout(() => update('done.jpg'), 10);
    });
    render(<ImageInput onUpload={onUpload} />);
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;
    const file = new File([ 'dummy' ], 'photo.jpg', {
      type: 'image/jpeg'
    });
    fireEvent.change(input, { target: { files: [ file ] } });
    await waitFor(() =>
      expect(
        screen.getByText('Uploading...')
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText('done.jpg')).toBeInTheDocument()
    );
  });

  it('calls onUpdate when upload completes', async () => {
    const onUpload = vi.fn((
      _file: File,
      update: (url: string) => void
    ) => update('uploaded.png'));
    const onUpdate = vi.fn();
    render(
      <ImageInput onUpload={onUpload} onUpdate={onUpdate} />
    );
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;
    const file = new File([ 'data' ], 'file.png', {
      type: 'image/png'
    });
    fireEvent.change(input, { target: { files: [ file ] } });
    await waitFor(() =>
      expect(onUpdate).toHaveBeenCalledWith('uploaded.png')
    );
  });

  it('removes uploaded image when × is clicked', async () => {
    render(<ImageInput defaultValue="done.jpg" />);
    const reset = screen.getByText('×');
    await userEvent.click(reset);
    expect(
      screen.queryByText('done.jpg')
    ).not.toBeInTheDocument();
  });

  it('displays custom uploading text when provided', async () => {
    const onUpload = vi.fn((
      _file: File,
      update: (url: string) => void
    ) => {
      setTimeout(() => update('final.jpg'), 10);
    });
    render(
      <ImageInput
        onUpload={onUpload}
        uploading="Uploading Image..."
      />
    );
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;
    const file = new File([ 'z' ], 'z.jpg', {
      type: 'image/jpeg'
    });
    fireEvent.change(input, { target: { files: [ file ] } });
    await waitFor(() =>
      expect(
        screen.getByText('Uploading Image...')
      ).toBeInTheDocument()
    );
  });
});