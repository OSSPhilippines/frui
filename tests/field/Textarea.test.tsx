//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
//frui
import Textarea, { useTextarea } from '../../frui/src/field/Textarea.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithUseTextarea(
  config: Parameters<typeof useTextarea>[ 0 ]
) {
  let hookResult: ReturnType<typeof useTextarea> | undefined;
  function TestHook() {
    hookResult = useTextarea(config);
    return <div data-testid="textarea-hook" />;
  }
  render(<TestHook />);
  return () => hookResult!;
}

//--------------------------------------------------------------------//
// Tests

describe('useTextarea Hook', () => {
  it('triggers onChange and onUpdate', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const getHook = 
      renderHookWithUseTextarea({ onChange, onUpdate });
    const hook = getHook();
    
    const event = {
      target: { value: 'test value' }
    } as ChangeEvent<HTMLTextAreaElement>;
    
    hook.handlers.change(event);
    
    expect(onChange).toHaveBeenCalledWith(event);
    expect(onUpdate).toHaveBeenCalledWith('test value');
  });

  it('handles missing onChange and onUpdate', () => {
    const getHook = renderHookWithUseTextarea({});
    const hook = getHook();
    
    const event = {
      target: { value: 'test value' }
    } as ChangeEvent<HTMLTextAreaElement>;
    
    expect(() => hook.handlers.change(event)).not.toThrow();
  });
});

describe('<Textarea /> Component', () => {
  it('renders textarea element', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });

  it('applies error styling', () => {
    render(<Textarea error />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('frui-tx-error', 'frui-bd-error');
  });

  it('passes through HTML attributes', () => {
    render(
      <Textarea
        placeholder="Enter text"
        rows={5}
        defaultValue="test content"
      />
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter text');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveValue('test content');
  });

  it('calls onChange and onUpdate when value changes', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    render(<Textarea onChange={onChange} onUpdate={onUpdate} />);
    const textarea = screen.getByRole('textbox');
    
    fireEvent.change(textarea, {
      target: { value: 'new content' }
    });
    
    expect(onChange).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalledWith('new content');
  });

  it('forwards ref to textarea element', () => {
    const ref = vi.fn();
    render(<Textarea passRef={ref} />);
    const textarea = screen.getByRole('textbox');
    expect(ref).toHaveBeenCalledWith(textarea);
  });
});