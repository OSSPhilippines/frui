//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
//frui
import File, { useFile } from '../../frui/src/field/File.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithState<T>(hook: () => T): { current: T } {
  let currentValue: T;
  function TestHook() {
    currentValue = hook();
    return null;
  }
  render(<TestHook />);
  return { current: currentValue! };
}

function getFileElements(container: HTMLElement) {
  const wrapper = container.querySelector('.frui-field-file');
  const input = container.querySelector(
    'input[ type="file" ]'
  ) as HTMLInputElement;
  const uploadingText = container.querySelector(
    '.frui-field-file-link'
  );
  const fileLink = container.querySelector(
    'a.frui-field-file-link'
  ) as HTMLAnchorElement;
  const resetButton = container.querySelector(
    '.frui-field-file-reset'
  ) as HTMLButtonElement;
  const hiddenInput = container.querySelector(
    'input[type="hidden"]'
  ) as HTMLInputElement;
  return {
    wrapper,
    input,
    uploadingText,
    fileLink,
    resetButton,
    hiddenInput
  };
}

function createMockFile(
  filename: string,
  type = 'image/png'
): globalThis.File {
  return new globalThis.File([ 'content' ], filename, { type });
}

//--------------------------------------------------------------------//
// Tests

describe('useFile', () => {
  it('initializes with defaultValue', () => {
    const { current } = renderHookWithState(() =>
      useFile({ defaultValue: 'test-url.jpg' })
    );
    expect(current.url).toBe('test-url.jpg');
    expect(current.uploading).toBe(false);
  });
  it('initializes without defaultValue', () => {
    const { current } = renderHookWithState(() => useFile({}));
    expect(current.url).toBeUndefined();
    expect(current.uploading).toBe(false);
  });
  it('calls onChange when file is selected', async () => {
    const onChange = vi.fn();
    
    function TestComponent() {
      const { handlers } = useFile({ onChange });
      
      const file = createMockFile('test.png');
      const event = {
        target: { files: [ file ] }
      } as unknown as ChangeEvent<HTMLInputElement>;
      
      handlers.change(event);
      return null;
    }
    
    await act(async () => {
      render(<TestComponent />);
    });
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });
  it('calls onUpload when file is selected', async () => {
    const onUpload = vi.fn();
    let changeHandler: (
      (e: ChangeEvent<HTMLInputElement>) => void
    ) | null = null;
    
    function TestComponent() {
      const { handlers } = useFile({ onUpload });
      changeHandler = handlers.change;
      return null;
    }
    
    render(<TestComponent />);
    
    const file = createMockFile('test.png');
    const event = {
      target: { files: [ file ] }
    } as unknown as ChangeEvent<HTMLInputElement>;
    
    await act(async () => {
      changeHandler!(event);
    });
    
    expect(onUpload).toHaveBeenCalledWith(
      expect.any(globalThis.File),
      expect.any(Function)
    );
  });
  it('provides reset handler', () => {
    const { current } = renderHookWithState(() =>
      useFile({ defaultValue: 'test-url.jpg' })
    );
    
    expect(current.handlers.reset).toBeDefined();
    expect(typeof current.handlers.reset).toBe('function');
  });
});

describe('File', () => {
  describe('Basic Rendering', () => {
    it('renders file input when no file is uploaded', () => {
      const { container } = render(<File />);
      const { wrapper, input } = getFileElements(container);
      expect(wrapper).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'file');
    });
    it('applies custom className', () => {
      const { container } = render(
        <File className="custom-class" />
      );
      const { wrapper } = getFileElements(container);
      expect(wrapper).toHaveClass('custom-class');
    });
    it('applies custom style', () => {
      const { container } = render(
        <File style={{ margin: '10px' }} />
      );
      const { wrapper } = getFileElements(container);
      expect(wrapper).toHaveStyle({ margin: '10px' });
    });
    it('passes error prop to input', () => {
      const { container } = render(<File error />);
      const { input } = getFileElements(container);
      expect(input).toHaveClass('frui-tx-error');
    });
  });
  describe('Uploading State', () => {
    it('shows uploading message when uploading', async () => {
      const onUpload = vi.fn();
      const { container } = render(
        <File onUpload={onUpload} uploading="Uploading file..." />
      );
      
      const { input } = getFileElements(container);
      const file = createMockFile('test.png');
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [ file ] } });
      });
      
      expect(
        container.querySelector('.frui-field-file-file')
      ).toBeInTheDocument();
    });
    it('uses custom uploading text', async () => {
      const onUpload = vi.fn();
      const { container } = render(
        <File onUpload={onUpload} uploading="Please wait..." />
      );
      
      const { input } = getFileElements(container);
      const file = createMockFile('test.png');
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [ file ] } });
      });
      
      const uploadingText = container.querySelector(
        '.frui-field-file-link'
      );
      expect(uploadingText).toBeInTheDocument();
    });
    it('hides file input when uploading', async () => {
      const onUpload = vi.fn();
      const { container } = render(<File onUpload={onUpload} />);
      
      const { input } = getFileElements(container);
      const file = createMockFile('test.png');
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [ file ] } });
      });
      
      const fileInput = container.querySelector('input[ type="file" ]');
      expect(fileInput).not.toBeInTheDocument();
    });
  });
  describe('Uploaded File Display', () => {
    it('shows file link when file is uploaded', () => {
      const { container } = render(
        <File defaultValue="/uploaded/file.jpg" />
      );
      const { fileLink } = getFileElements(container);
      expect(fileLink).toBeInTheDocument();
      expect(fileLink).toHaveAttribute('href', '/uploaded/file.jpg');
      expect(fileLink).toHaveTextContent('/uploaded/file.jpg');
    });
    it('opens file in new tab', () => {
      const { container } = render(
        <File defaultValue="/uploaded/file.jpg" />
      );
      const { fileLink } = getFileElements(container);
      expect(fileLink).toHaveAttribute('target', '_blank');
      expect(fileLink).toHaveAttribute('rel', 'noreferrer');
    });
    it('shows reset button when file is uploaded', () => {
      const { container } = render(
        <File defaultValue="/uploaded/file.jpg" />
      );
      const { resetButton } = getFileElements(container);
      expect(resetButton).toBeInTheDocument();
      expect(resetButton).toHaveTextContent('×');
    });
    it('removes file when reset button is clicked', () => {
      const { container } = render(
        <File defaultValue="/uploaded/file.jpg" />
      );
      let { resetButton, fileLink } = getFileElements(container);
      
      fireEvent.click(resetButton!);
      
      ({ fileLink } = getFileElements(container));
      expect(fileLink).not.toBeInTheDocument();
    });
    it('hides file input when file is uploaded', () => {
      const { container } = render(
        <File defaultValue="/uploaded/file.jpg" />
      );
      const { input } = getFileElements(container);
      expect(input).not.toBeInTheDocument();
    });
  });
  describe('Form Integration', () => {
    it('renders hidden input with file URL', () => {
      const { container } = render(
        <File name="avatar" defaultValue="/uploaded/file.jpg" />
      );
      const { hiddenInput } = getFileElements(container);
      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput.name).toBe('avatar');
      expect(hiddenInput.value).toBe('/uploaded/file.jpg');
    });
    it('does not render hidden input when no file', () => {
      const { container } = render(<File name="avatar" />);
      const { hiddenInput } = getFileElements(container);
      expect(hiddenInput).not.toBeInTheDocument();
    });
  });
  describe('Callbacks', () => {
    it('calls onChange when file is selected', async () => {
      const onChange = vi.fn();
      const { container } = render(<File onChange={onChange} />);
      const { input } = getFileElements(container);
      
      const file = createMockFile('test.png');
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [ file ] } });
      });
      
      expect(onChange).toHaveBeenCalled();
    });
    it('calls onUpload when file is selected', async () => {
      const onUpload = vi.fn();
      const { container } = render(<File onUpload={onUpload} />);
      const { input } = getFileElements(container);
      
      const file = createMockFile('test.png');
      
      await act(async () => {
        fireEvent.change(input, { target: { files: [ file ] } });
      });
      
      expect(onUpload).toHaveBeenCalledWith(
        file,
        expect.any(Function)
      );
    });
    it('calls onUpdate when URL is set', () => {
      const onUpdate = vi.fn();
      render(<File defaultValue="/test.jpg" onUpdate={onUpdate} />);
      
      expect(onUpdate).toHaveBeenCalledWith('/test.jpg');
    });
  });
  describe('Value Handling', () => {
    it('accepts defaultValue prop', () => {
      const { container } = render(
        <File defaultValue="/default.jpg" />
      );
      const { fileLink } = getFileElements(container);
      expect(fileLink).toHaveAttribute('href', '/default.jpg');
    });
    it('accepts value prop as defaultValue', () => {
      const { container } = render(<File value="/value.jpg" />);
      const { fileLink } = getFileElements(container);
      expect(fileLink).toHaveAttribute('href', '/value.jpg');
    });
  });
});