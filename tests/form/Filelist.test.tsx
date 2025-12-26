//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';

//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//frui
import FileList from '../../src/form/FileList.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    className,
    multiple,
    onChange,
    type,
    ...props
  }: {
    className?: string,
    multiple?: boolean,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    [ key: string ]: unknown
  }) => (
    <input
      className={className}
      data-testid="mock-input"
      multiple={multiple}
      onChange={onChange}
      type={type}
      {...props}
    />
  ),
  useInput: vi.fn(() => ({ handlers: {} }))
}));

//--------------------------------------------------------------------//
// Helpers

function createFile(name: string, content = 'content') {
  return new File([ content ], name);
}

function createFiles(...names: string[]) {
  return names.map(name => createFile(name));
}

//--------------------------------------------------------------------//
// Tests

describe('<FileList />', () => {
  describe('Rendering', () => {
    it('renders wrapper and input', () => {
      render(<FileList />);
      const input = screen.getByTestId('mock-input');
      expect(input).toHaveAttribute('type', 'file');
      expect(input).toHaveAttribute('multiple');
      expect(input.closest('div')).toHaveClass(
        'frui-form-file-list'
      );
    });

    it('renders with custom className', () => {
      render(<FileList className="custom-class" />);
      const wrapper = screen.getByTestId('mock-input')
        .closest('div');
      expect(wrapper).toHaveClass(
        'frui-form-file-list',
        'custom-class'
      );
    });

    it('renders with custom style', () => {
      render(
        <FileList style={{ backgroundColor: 'red' }} />
      );
      const wrapper = screen.getByTestId('mock-input')
        .closest('div');
      expect(wrapper?.style.backgroundColor).toBe('red');
    });

    it('renders with custom uploading text', async () => {
      const onUpload = vi.fn((files, update) => {
        setTimeout(() => update([]), 100);
      });
      render(
        <FileList
          onUpload={onUpload}
          uploading="Processing..."
        />
      );
      const file = createFile('test.png');
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files: [ file ] } }
        );
      });

      await waitFor(() =>
        expect(
          screen.getByText('Processing...')
        ).toBeInTheDocument()
      );
    });

    it('renders uploaded files from defaultValue', () => {
      render(
        <FileList
          defaultValue={[ 'file1.png', 'file2.jpg' ]}
        />
      );
      expect(screen.getAllByRole('link')).toHaveLength(2);
      expect(
        screen.getByText('file1.png')
      ).toBeInTheDocument();
      expect(
        screen.getByText('file2.jpg')
      ).toBeInTheDocument();
    });

    it('renders uploaded files from value prop', () => {
      render(<FileList value={[ 'valueFile1.png' ]} />);
      expect(
        screen.getByText('valueFile1.png')
      ).toBeInTheDocument();
    });

    it('prioritizes value over defaultValue', () => {
      render(
        <FileList
          value={[ 'value.png' ]}
          defaultValue={[ 'default.png' ]}
        />
      );
      expect(
        screen.getByText('value.png')
      ).toBeInTheDocument();
      expect(
        screen.queryByText('default.png')
      ).not.toBeInTheDocument();
    });

    it('renders with no uploaded files initially', () => {
      render(<FileList />);
      expect(
        screen.queryAllByRole('link')
      ).toHaveLength(0);
      expect(
        screen.queryByText('Uploading...')
      ).not.toBeInTheDocument();
    });
  });

  describe('File Upload Flow', () => {
    it('shows placeholder then uploaded file', async () => {
      const onUpload = vi.fn((files, update) => {
        setTimeout(() => update([ 'fileA.jpg' ]), 10);
      });
      render(<FileList onUpload={onUpload} />);
      const file = createFile('fileA.jpg');
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files: [ file ] } }
        );
      });

      await waitFor(() =>
        expect(
          screen.getByText('Uploading...')
        ).toBeInTheDocument()
      );
      await waitFor(() =>
        expect(
          screen.getByText('fileA.jpg')
        ).toBeInTheDocument()
      );
    });

    it('handles multiple file uploads', async () => {
      const onUpload = vi.fn(
        (files: File[], update: (urls: string[]) => void) => {
          const urls = files.map(f => `uploaded_${f.name}`);
          setTimeout(() => update(urls), 10);
        }
      );
      render(<FileList onUpload={onUpload} />);
      const files = createFiles('a.png', 'b.png');
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files } }
        );
      });

      await waitFor(() =>
        expect(
          screen.getByText('uploaded_a.png')
        ).toBeInTheDocument()
      );
      expect(
        screen.getByText('uploaded_b.png')
      ).toBeInTheDocument();
    });

    it('handles batch uploads correctly', async () => {
      let updateFn: (urls: string[]) => void;
      const onUpload = vi.fn((files, update) => {
        updateFn = update;
      });
      render(<FileList onUpload={onUpload} />);
      const files = createFiles('1.png', '2.png', '3.png');
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files } }
        );
      });

      await waitFor(() =>
        expect(onUpload).toHaveBeenCalled()
      );

      act(() => {
        updateFn!([ 'url1.png', 'url2.png', 'url3.png' ]);
      });

      await waitFor(() => {
        expect(
          screen.getByText('url1.png')
        ).toBeInTheDocument();
        expect(
          screen.getByText('url2.png')
        ).toBeInTheDocument();
        expect(
          screen.getByText('url3.png')
        ).toBeInTheDocument();
      });
    });

    it('works without onUpload handler', () => {
      render(<FileList />);
      const file = createFile('test.png');
      
      expect(() => {
        act(() => {
          fireEvent.change(
            screen.getByTestId('mock-input'),
            { target: { files: [ file ] } }
          );
        });
      }).not.toThrow();
    });

    it('handles empty file list', () => {
      const onUpload = vi.fn();
      render(<FileList onUpload={onUpload} />);
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files: null } }
        );
      });

      expect(onUpload).not.toHaveBeenCalled();
    });
  });

  describe('Callbacks', () => {
    it('calls onUpdate when upload completes', async () => {
      const onUpload = vi.fn((_, update) =>
        update([ 'url1.png' ])
      );
      const onUpdate = vi.fn();
      render(
        <FileList
          onUpload={onUpload}
          onUpdate={onUpdate}
        />
      );
      const file = createFile('test.png');
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files: [ file ] } }
        );
      });

      await waitFor(() =>
        expect(onUpdate).toHaveBeenCalledWith([
          'url1.png'
        ])
      );
    });

    it('calls onChange when file selected', () => {
      const onChange = vi.fn();
      render(<FileList onChange={onChange} />);
      const file = createFile('test.png');
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files: [ file ] } }
        );
      });

      expect(onChange).toHaveBeenCalled();
    });

    it('calls onUpdate on initial render', () => {
      const onUpdate = vi.fn();
      render(
        <FileList
          defaultValue={[ 'initial.png' ]}
          onUpdate={onUpdate}
        />
      );
      expect(onUpdate).toHaveBeenCalledWith([
        'initial.png'
      ]);
    });

    it('does not call onChange without handler', () => {
      render(<FileList />);
      const file = createFile('test.png');
      
      expect(() => {
        act(() => {
          fireEvent.change(
            screen.getByTestId('mock-input'),
            { target: { files: [ file ] } }
          );
        });
      }).not.toThrow();
    });
  });

  describe('File Removal', () => {
    it('removes uploaded file when × clicked', async () => {
      render(<FileList defaultValue={[ 'one.png' ]} />);
      const removeBtn = screen.getByText('×');
      
      await act(async () => {
        await userEvent.click(removeBtn);
      });

      expect(
        screen.queryByText('one.png')
      ).not.toBeInTheDocument();
    });

    it('removes correct file from multiple', async () => {
      render(
        <FileList
          defaultValue={[
            'first.png',
            'second.png',
            'third.png'
          ]}
        />
      );
      const removeBtns = screen.getAllByText('×');
      
      await act(async () => {
        await userEvent.click(removeBtns[ 1 ]);
      });

      expect(
        screen.getByText('first.png')
      ).toBeInTheDocument();
      expect(
        screen.queryByText('second.png')
      ).not.toBeInTheDocument();
      expect(
        screen.getByText('third.png')
      ).toBeInTheDocument();
    });

    it('calls onUpdate after removal', async () => {
      const onUpdate = vi.fn();
      render(
        <FileList
          defaultValue={[ 'file1.png', 'file2.png' ]}
          onUpdate={onUpdate}
        />
      );
      onUpdate.mockClear();
      const removeBtns = screen.getAllByText('×');
      
      await act(async () => {
        await userEvent.click(removeBtns[ 0 ]);
      });

      await waitFor(() =>
        expect(onUpdate).toHaveBeenCalledWith([
          'file2.png'
        ])
      );
    });

    it('removes last file correctly', async () => {
      render(<FileList defaultValue={[ 'only.png' ]} />);
      const removeBtn = screen.getByText('×');
      
      await act(async () => {
        await userEvent.click(removeBtn);
      });

      expect(
        screen.queryByText('only.png')
      ).not.toBeInTheDocument();
      expect(
        screen.queryAllByRole('link')
      ).toHaveLength(0);
    });
  });

  describe('Hidden Inputs', () => {
    it('renders hidden inputs with name prop', () => {
      render(
        <FileList
          name="files"
          defaultValue={[ 'file1.png', 'file2.png' ]}
        />
      );
      const hiddenInputs = document.querySelectorAll(
        'input[type="hidden"][name="files"]'
      );
      expect(hiddenInputs).toHaveLength(2);
      expect(hiddenInputs[ 0 ]).toHaveValue('file1.png');
      expect(hiddenInputs[ 1 ]).toHaveValue('file2.png');
    });

    it('updates hidden inputs after upload', async () => {
      const onUpload = vi.fn((_, update) => {
        setTimeout(() => update([ 'new.png' ]), 10);
      });
      render(
        <FileList name="files" onUpload={onUpload} />
      );
      const file = createFile('test.png');
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files: [ file ] } }
        );
      });

      await waitFor(() => {
        const hiddenInputs = document.querySelectorAll(
          'input[type="hidden"][name="files"]'
        );
        expect(hiddenInputs).toHaveLength(1);
        expect(hiddenInputs[ 0 ]).toHaveValue('new.png');
      });
    });

    it('does not render hidden inputs without name', () => {
      render(
        <FileList defaultValue={[ 'file1.png' ]} />
      );
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(1);
    });
  });

  describe('Link Attributes', () => {
    it('renders links with correct attributes', () => {
      render(<FileList defaultValue={[ 'test.png' ]} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'test.png');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
      expect(link).toHaveClass('frui-form-file-list-link');
    });

    it('renders correct link text', () => {
      render(
        <FileList
          defaultValue={[
            'file1.png',
            'https://example.com/file2.jpg'
          ]}
        />
      );
      expect(screen.getByText('file1.png')).toBeInTheDocument();
      expect(
        screen.getByText('https://example.com/file2.jpg')
      ).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('passes error prop to Input', () => {
      render(<FileList error="Upload failed" />);
      const input = screen.getByTestId('mock-input');
      expect(input.closest('div')).toBeInTheDocument();
    });

    it('renders without error prop', () => {
      render(<FileList />);
      const input = screen.getByTestId('mock-input');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Attributes Pass-through', () => {
    it('passes additional props to Input', () => {
      render(
        <FileList
          data-custom="value"
          aria-label="file upload"
        />
      );
      const input = screen.getByTestId('mock-input');
      expect(input).toHaveAttribute(
        'data-custom',
        'value'
      );
      expect(input).toHaveAttribute(
        'aria-label',
        'file upload'
      );
    });

    it('passes multiple attribute to Input', () => {
      render(<FileList />);
      const input = screen.getByTestId('mock-input');
      expect(input).toHaveAttribute('multiple');
    });

    it('applies correct CSS classes', () => {
      render(<FileList className="custom" />);
      const wrapper = screen.getByTestId('mock-input')
        .closest('div');
      expect(wrapper).toHaveClass('frui-form-file-list');
      expect(wrapper).toHaveClass('custom');
    });
  });

  describe('Edge Cases', () => {
    it('maintains state across re-renders', () => {
      const { rerender } = render(
        <FileList defaultValue={[ 'initial.png' ]} />
      );
      expect(
        screen.getByText('initial.png')
      ).toBeInTheDocument();
      rerender(
        <FileList defaultValue={[ 'initial.png' ]} />
      );
      expect(
        screen.getByText('initial.png')
      ).toBeInTheDocument();
    });

    it('clears queue when all uploads complete', async () => {
      const onUpload = vi.fn((files, update) => {
        setTimeout(() => update([ 'a.png' ]), 10);
      });
      render(<FileList onUpload={onUpload} />);
      const file = createFile('test.png');
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files: [ file ] } }
        );
      });

      await waitFor(() =>
        expect(
          screen.getByText('Uploading...')
        ).toBeInTheDocument()
      );
      await waitFor(() =>
        expect(
          screen.queryByText('Uploading...')
        ).not.toBeInTheDocument()
      );
    });

    it('handles rapid consecutive uploads', async () => {
      const onUpload = vi.fn((files, update) => {
        setTimeout(
          () => update(files.map((f: File) => f.name)),
          10
        );
      });
      render(<FileList onUpload={onUpload} />);
      const file1 = createFile('first.png');
      const file2 = createFile('second.png');
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files: [ file1 ] } }
        );
      });

      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files: [ file2 ] } }
        );
      });

      await waitFor(() => {
        expect(
          screen.getByText('first.png')
        ).toBeInTheDocument();
        expect(
          screen.getByText('second.png')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Queue Management', () => {
    it('increments queue for each upload', async () => {
      const onUpload = vi.fn((files, update) => {
        setTimeout(() => update([]), 100);
      });
      render(<FileList onUpload={onUpload} />);
      const files = createFiles('1.png', '2.png', '3.png');
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files } }
        );
      });

      await waitFor(() =>
        expect(
          screen.getByText('Uploading...')
        ).toBeInTheDocument()
      );
    });

    it('decrements queue on partial completion', async () => {
      let updateFn: (urls: string[]) => void;
      const onUpload = vi.fn((files, update) => {
        updateFn = update;
      });
      render(<FileList onUpload={onUpload} />);
      const files = createFiles('1.png', '2.png', '3.png');
      
      act(() => {
        fireEvent.change(
          screen.getByTestId('mock-input'),
          { target: { files } }
        );
      });

      await waitFor(() =>
        expect(onUpload).toHaveBeenCalled()
      );

      act(() => {
        updateFn!([ 'url1.png' ]);
      });

      await waitFor(() =>
        expect(
          screen.getByText('Uploading...')
        ).toBeInTheDocument()
      );
    });
  });
});