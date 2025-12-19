//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

//frui
import Filelist, {
  useFilelist
} from '../../frui/src/field/Filelist.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/field/Input.js', () => ({
  __esModule: true,
  default: ({
    className,
    error,
    multiple,
    onChange,
    type,
    ...props
  }: {
    className?: string,
    error?: boolean,
    multiple?: boolean,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    [key: string]: unknown
  }) => (
    <input
      {...props}
      className={className}
      data-error={error}
      data-testid="mock-input"
      multiple={multiple}
      onChange={onChange}
      type={type}
    />
  ),
  useInput: vi.fn()
}));

//--------------------------------------------------------------------//
// Helpers

function renderHookWithState<T>(hook: () => T): () => T {
  let currentValue: T;
  function TestHook() {
    currentValue = hook();
    return null;
  }
  render(<TestHook />);
  return () => currentValue!;
}

function createMockFile(
  name: string,
  size: number = 1024,
  type: string = 'image/png'
): File {
  const blob = new Blob([ 'a'.repeat(size) ], { type });
  return new File([ blob ], name, { type });
}

function createMockFileList(files: File[]): FileList {
  const fileList = {
    length: files.length,
    item: (index: number) => files[index] || null,
    [Symbol.iterator]: function* () {
      yield* files;
    }
  };
  
  files.forEach((file, index) => {
    Object.defineProperty(fileList, index, {
      value: file,
      enumerable: true
    });
  });
  
  return fileList as FileList;
}

//--------------------------------------------------------------------//
// Tests

describe('useFilelist Hook', () => {
  it('initializes with default values', () => {
    const getHook = renderHookWithState(() =>
      useFilelist({
        defaultValue: [ 'file1.jpg', 'file2.png' ]
      })
    );
    const hook = getHook();
    expect(hook.uploaded).toEqual([ 'file1.jpg', 'file2.png' ]);
    expect(hook.queued).toBe(0);
  });

  it('initializes with empty array when no default', () => {
    const getHook = renderHookWithState(() =>
      useFilelist({})
    );
    const hook = getHook();
    expect(hook.uploaded).toEqual([]);
    expect(hook.queued).toBe(0);
  });

  it('calls onUpdate when uploaded changes', async () => {
    const onUpdate = vi.fn();
    renderHookWithState(() =>
      useFilelist({
        defaultValue: [ 'file1.jpg' ],
        onUpdate
      })
    );

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith([ 'file1.jpg' ]);
    });
  });

  it('handles file change with onUpload', async () => {
    const onUpload = vi.fn((files, update) => {
      update([ 'uploaded1.jpg', 'uploaded2.jpg' ]);
    });
    const getHook = renderHookWithState(() =>
      useFilelist({ onUpload })
    );

    const file1 = createMockFile('test1.jpg');
    const file2 = createMockFile('test2.jpg');
    const mockEvent = {
      target: {
        files: createMockFileList([ file1, file2 ])
      }
    } as ChangeEvent<HTMLInputElement>;

    await act(async () => {
      const hook = getHook();
      hook.handlers.change(mockEvent);
    });

    await waitFor(() => {
      expect(onUpload).toHaveBeenCalledWith(
        [ file1, file2 ],
        expect.any(Function)
      );
      const hook = getHook();
      expect(hook.uploaded).toEqual([
        'uploaded1.jpg',
        'uploaded2.jpg'
      ]);
      expect(hook.queued).toBe(0);
    });
  });

  it('updates queue count during upload', async () => {
    let updateCallback: ((urls: string[]) => void) | null = null;
    const onUpload = vi.fn(
      (files: File[], update: (urls: string[]) => void) => {
        updateCallback = update;
      }
    );
    const getHook = renderHookWithState(() =>
      useFilelist({ onUpload })
    );

    const file1 = createMockFile('test1.jpg');
    const file2 = createMockFile('test2.jpg');
    const mockEvent = {
      target: {
        files: createMockFileList([ file1, file2 ])
      }
    } as ChangeEvent<HTMLInputElement>;

    await act(async () => {
      const hook = getHook();
      hook.handlers.change(mockEvent);
    });

    await waitFor(() => {
      const hook = getHook();
      expect(hook.queued).toBe(2);
    });

    await act(async () => {
      updateCallback!([ 'uploaded1.jpg' ]);
    });

    await waitFor(() => {
      const hook = getHook();
      expect(hook.queued).toBe(1);
    });
  });

  it('removes file at specified index', async () => {
    const getHook = renderHookWithState(() =>
      useFilelist({
        defaultValue: [ 'file1.jpg', 'file2.png', 'file3.gif' ]
      })
    );

    await act(async () => {
      const hook = getHook();
      hook.handlers.remove(1);
    });

    await waitFor(() => {
      const hook = getHook();
      expect(hook.uploaded).toEqual([ 'file1.jpg', 'file3.gif' ]);
    });
  });

  it('resets all files and queue', async () => {
    const getHook = renderHookWithState(() =>
      useFilelist({
        defaultValue: [ 'file1.jpg', 'file2.png' ]
      })
    );

    await act(async () => {
      const hook = getHook();
      hook.handlers.reset();
    });

    await waitFor(() => {
      const hook = getHook();
      expect(hook.uploaded).toEqual([]);
      expect(hook.queued).toBe(0);
    });
  });

  it('calls onChange when provided', async () => {
    const onChange = vi.fn();
    const getHook = renderHookWithState(() =>
      useFilelist({ onChange })
    );

    const file = createMockFile('test.jpg');
    const mockEvent = {
      target: {
        files: createMockFileList([ file ])
      }
    } as ChangeEvent<HTMLInputElement>;

    await act(async () => {
      const hook = getHook();
      hook.handlers.change(mockEvent);
    });

    expect(onChange).toHaveBeenCalledWith(mockEvent);
  });

  it('handles change without files', async () => {
    const onChange = vi.fn();
    const getHook = renderHookWithState(() =>
      useFilelist({ onChange })
    );

    const mockEvent = {
      target: { files: null }
    } as ChangeEvent<HTMLInputElement>;

    await act(async () => {
      const hook = getHook();
      hook.handlers.change(mockEvent);
    });

    expect(onChange).toHaveBeenCalledWith(mockEvent);
  });
});

describe('Filelist Component', () => {
  it('renders file input with multiple attribute', () => {
    const { container } = render(<Filelist />);
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('multiple');
  });

  it('renders with default values', () => {
    render(
      <Filelist
        defaultValue={[ 'file1.jpg', 'file2.png' ]}
        name="files"
      />
    );
    expect(screen.getByText('file1.jpg')).toBeInTheDocument();
    expect(screen.getByText('file2.png')).toBeInTheDocument();
  });

  it('prioritizes value over defaultValue', () => {
    render(
      <Filelist
        value={[ 'value.jpg' ]}
        defaultValue={[ 'default.jpg' ]}
        name="files"
      />
    );
    expect(screen.getByText('value.jpg')).toBeInTheDocument();
    expect(
      screen.queryByText('default.jpg')
    ).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Filelist className="custom-class" />
    );
    const wrapper = container.querySelector(
      '.frui-field-filelist'
    );
    expect(wrapper).toHaveClass('frui-field-filelist');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    const { container } = render(
      <Filelist style={{ marginTop: '10px' }} />
    );
    const wrapper = container.querySelector(
      '.frui-field-filelist'
    ) as HTMLElement;
    expect(wrapper.style.marginTop).toBe('10px');
  });

  it('renders hidden inputs with correct names', () => {
    const { container } = render(
      <Filelist
        defaultValue={[ 'file1.jpg', 'file2.png' ]}
        name="files"
      />
    );
    const hiddenInputs = container.querySelectorAll(
      'input[type="hidden"]'
    );
    expect(hiddenInputs).toHaveLength(2);
    expect(hiddenInputs[ 0 ]).toHaveValue('file1.jpg');
    expect(hiddenInputs[ 1 ]).toHaveValue('file2.png');
  });

  it('renders file links with correct attributes', () => {
    render(
      <Filelist
        defaultValue={[ 'https://example.com/file.jpg' ]}
      />
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute(
      'href',
      'https://example.com/file.jpg'
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders remove buttons for each file', () => {
    const { container } = render(
      <Filelist defaultValue={[ 'file1.jpg', 'file2.png' ]} />
    );
    const removeButtons = container.querySelectorAll(
      '.frui-field-filelist-remove'
    );
    expect(removeButtons).toHaveLength(2);
    expect(removeButtons[ 0 ]).toHaveTextContent('×');
  });

  it('removes file when remove button clicked', async () => {
    const { container } = render(
      <Filelist defaultValue={[ 'file1.jpg', 'file2.png' ]} />
    );
    const removeButton = container.querySelectorAll(
      '.frui-field-filelist-remove'
    )[ 0 ];

    await act(async () => {
      fireEvent.click(removeButton);
    });

    await waitFor(() => {
      expect(
        screen.queryByText('file1.jpg')
      ).not.toBeInTheDocument();
      expect(screen.getByText('file2.png')).toBeInTheDocument();
    });
  });

  it('calls onUpdate when files change', async () => {
    const onUpdate = vi.fn();
    const onUpload = vi.fn(
      (files: File[], update: (urls: string[]) => void) => {
        update([ 'uploaded.jpg' ]);
      }
    );

    const { container } = render(
      <Filelist onUpdate={onUpdate} onUpload={onUpload} />
    );

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = createMockFile('test.jpg');

    await act(async () => {
      fireEvent.change(input, {
        target: { files: createMockFileList([ file ]) }
      });
    });

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith([ 'uploaded.jpg' ]);
    });
  });

  it('shows uploading message when files queued', async () => {
    const onUpload = vi.fn();
    const { container } = render(
      <Filelist onUpload={onUpload} />
    );

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = createMockFile('test.jpg');

    await act(async () => {
      fireEvent.change(input, {
        target: { files: createMockFileList([ file ]) }
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Uploading...')).toBeInTheDocument();
    });
  });

  it('shows custom uploading message', async () => {
    const onUpload = vi.fn();
    const { container } = render(
      <Filelist onUpload={onUpload} uploading="Please wait..." />
    );

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = createMockFile('test.jpg');

    await act(async () => {
      fireEvent.change(input, {
        target: { files: createMockFileList([ file ]) }
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText('Please wait...')
      ).toBeInTheDocument();
    });
  });

  it('passes error prop to input', () => {
    render(<Filelist error />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveAttribute('data-error', 'true');
  });

  it('passes additional attributes to input', () => {
    const { container } = render(
      <Filelist accept="image/*" disabled />
    );
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input).toHaveAttribute('accept', 'image/*');
    expect(input).toBeDisabled();
  });

  it('handles multiple file uploads', async () => {
    const onUpload = vi.fn(
      (files: File[], update: (urls: string[]) => void) => {
        const urls = files.map((file, i) => `uploaded${i + 1}.jpg`);
        update(urls);
      }
    );

    const { container } = render(
      <Filelist onUpload={onUpload} />
    );
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const files = [
      createMockFile('test1.jpg'),
      createMockFile('test2.jpg'),
      createMockFile('test3.jpg')
    ];

    await act(async () => {
      fireEvent.change(input, {
        target: { files: createMockFileList(files) }
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText('uploaded1.jpg')
      ).toBeInTheDocument();
      expect(
        screen.getByText('uploaded2.jpg')
      ).toBeInTheDocument();
      expect(
        screen.getByText('uploaded3.jpg')
      ).toBeInTheDocument();
    });
  });

  it('accumulates files from multiple uploads', async () => {
    const onUpload = vi.fn(
      (files: File[], update: (urls: string[]) => void) => {
        const urls = files.map(
          (file: File) => `uploaded-${file.name}`
        );
        update(urls);
      }
    );

    const { container } = render(
      <Filelist onUpload={onUpload} />
    );
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, {
        target: {
          files: createMockFileList([
            createMockFile('test1.jpg')
          ])
        }
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText('uploaded-test1.jpg')
      ).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(input, {
        target: {
          files: createMockFileList([
            createMockFile('test2.jpg')
          ])
        }
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText('uploaded-test1.jpg')
      ).toBeInTheDocument();
      expect(
        screen.getByText('uploaded-test2.jpg')
      ).toBeInTheDocument();
    });
  });

  it('calls onChange when provided', async () => {
    const onChange = vi.fn();
    const { container } = render(
      <Filelist onChange={onChange} />
    );
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = createMockFile('test.jpg');

    await act(async () => {
      fireEvent.change(input, {
        target: { files: createMockFileList([ file ]) }
      });
    });

    expect(onChange).toHaveBeenCalled();
  });

  it('hides uploading message when queue is zero', () => {
    render(<Filelist />);
    expect(
      screen.queryByText('Uploading...')
    ).not.toBeInTheDocument();
  });

  it('applies control className to input', () => {
    render(<Filelist />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveClass('frui-field-filelist-control');
  });
});