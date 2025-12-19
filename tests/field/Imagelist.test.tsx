//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Imagelist from '../../frui/src/field/Imagelist.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/field/Input.js', async () => {
  const actual = await vi.importActual('../../frui/src/field/Input.js');
  return {
    ...actual,
    default: ({
      multiple,
      type,
      accept,
      error,
      className,
      onChange,
      ...rest
    }: any) => (
      <input
        type={type}
        multiple={multiple}
        accept={accept}
        className={className}
        onChange={onChange}
        data-testid="mock-input"
        {...rest}
      />
    )
  };
});

//--------------------------------------------------------------------//
// Helpers

const defaultImages = [
  'https://example.com/image1.png',
  'https://example.com/image2.png'
];

//--------------------------------------------------------------------//
// Tests

describe('Imagelist component', () => {
  it('renders the file input control', () => {
    const { container } = render(<Imagelist />);
    const input = container.querySelector(
      '[ data-testid="mock-input" ]'
    );
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('multiple');
    expect(input).toHaveAttribute('accept', 'image/*');
  });

  it('applies custom className to the wrapper', () => {
    const { container } = render(
      <Imagelist className="custom-imagelist" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('frui-field-imagelist');
    expect(wrapper).toHaveClass('custom-imagelist');
  });

  it('renders uploaded images with preview and link', () => {
    const { container } = render(
      <Imagelist defaultValue={defaultImages} />
    );
    
    const fileWrappers = container.querySelectorAll(
      '.frui-field-imagelist-file'
    );
    expect(fileWrappers).toHaveLength(defaultImages.length);
  });

  it('renders remove buttons for each uploaded image', () => {
    render(<Imagelist defaultValue={defaultImages} />);
    const removeButtons = screen.getAllByText('×');
    expect(removeButtons).toHaveLength(defaultImages.length);
  });

  it('renders hidden input fields', () => {
    const name = 'image-list';
    const { container } = render(
      <Imagelist name={name} defaultValue={defaultImages} />
    );
    
    const hiddenInputs = container.querySelectorAll(
      'input[ type="hidden" ]'
    );
    expect(hiddenInputs).toHaveLength(defaultImages.length);
  });

  it('forwards additional attributes to the input element', () => {
    const { container } = render(
      <Imagelist disabled placeholder="Select images" />
    );
    const input = container.querySelector(
      '[ data-testid="mock-input" ]'
    );
    expect(input).toHaveAttribute('disabled');
    expect(input).toHaveAttribute('placeholder', 'Select images');
  });

  it('matches snapshot for default rendering', () => {
    const { container } = render(<Imagelist />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with uploaded images', () => {
    const { container } = render(
      <Imagelist defaultValue={defaultImages} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with custom className', () => {
    const { container } = render(
      <Imagelist className="gallery" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});