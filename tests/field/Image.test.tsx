//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
//frui
import Image from '../../frui/src/field/Image.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/field/Input.js', async () => {
  const actual = await vi.importActual('../../frui/src/field/Input.js');
  return {
    ...actual,
    default: ({
      accept,
      className,
      error,
      onChange,
      type,
      ...props
    }: any) => (
      <input
        accept={accept}
        className={className}
        data-testid="image-input"
        onChange={onChange}
        type={type}
        {...props}
      />
    )
  };
});

//--------------------------------------------------------------------//
// Tests

describe('<Image /> Component', () => {
  it('renders file input with image accept attribute', () => {
    const { container } = render(<Image />);
    const input = container.querySelector(
      '[ data-testid="image-input" ]'
    );
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('accept', 'image/*');
    expect(input).toHaveAttribute('type', 'file');
  });
  
  it('applies custom className', () => {
    const { container } = render(<Image className="custom-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('field-image');
    expect(wrapper).toHaveClass('custom-class');
  });
  
  it('passes error prop to input', () => {
    const { container } = render(<Image error />);
    const input = container.querySelector(
      '[ data-testid="image-input" ]'
    );
    expect(input).toBeInTheDocument();
  });
  
  it('renders image preview when URL is provided', () => {
    const testUrl = 'test-image.jpg';
    const { container } = render(<Image defaultValue={testUrl} />);
    
    const imageWrapper = container.querySelector(
      '.frui-field-image-file'
    );
    expect(imageWrapper).toBeInTheDocument();
    
    const img = container.querySelector('.frui-field-image-image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', testUrl);
    expect(img).toHaveAttribute('alt', 'preview');
    
    const link = container.querySelector('.frui-field-image-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', testUrl);
    expect(link).toHaveTextContent(testUrl);
  });
  
  it('shows uploading state when uploading', () => {
    const { container } = render(
      <Image uploading="Processing image..." />
   );
    
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
  });
  
  it('calls onChange when image is selected', () => {
    const onChange = vi.fn();
    const { container } = render(<Image onChange={onChange} />);
    const input = container.querySelector(
      '[ data-testid="image-input" ]'
    );
    
    const file = new File([ 'content' ], 'test.png', {
      type: 'image/png'
    });
    fireEvent.change(input!, {
      target: { files: [ file ] }
    });
    
    expect(onChange).toHaveBeenCalled();
  });
  
  it('matches snapshot for default rendering', () => {
    const { container } = render(<Image />);
    expect(container.firstChild).toMatchSnapshot();
  });
  
  it('matches snapshot with image preview', () => {
    const { container } = render(
      <Image defaultValue="test-image.jpg" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});