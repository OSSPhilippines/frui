//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  describe,
  expect,
  it
} from 'vitest';
//frui
import Color from '../../src/view/Color.js';

//--------------------------------------------------------------------//
// Tests

describe('<Color />', () => {
  it('renders both box and text by default', () => {
    render(<Color value="#ff0000" />);
    const wrapper = document.querySelector('.frui-view-color')!;
    const box = wrapper.querySelector('.frui-view-color-box');
    const text = wrapper.querySelector('.frui-view-color-text');
    expect(wrapper).toHaveClass('frui-view-color');
    expect(box).toHaveStyle({ backgroundColor: '#ff0000' });
    expect(text).toHaveTextContent('#ff0000');
  });

  it('applies custom className and style', () => {
    render(
      <Color
        value="#abc"
        className="extra"
        style={{ margin: '8px' }}
      />
    );
    const wrapper = document.querySelector('.frui-view-color');
    expect(wrapper).toHaveClass('extra');
    expect(wrapper).toHaveStyle({ margin: '8px' });
  });

  it('renders only the color box when text is false', () => {
    render(<Color value="#00ff00" text={false} />);
    const box = document.querySelector('.frui-view-color-box');
    expect(box).toBeInTheDocument();
    expect(box).toHaveStyle({ backgroundColor: '#00ff00' });
  });

  it('renders only text when box is false', () => {
    render(<Color value="#0000ff" box={false} />);
    const text = document.querySelector('.frui-view-color-text');
    expect(text).toHaveTextContent('#0000ff');
    expect(text).toHaveClass('frui-view-color-text');
  });

  it('uses correct sizes for sm, md, and lg props', () => {
    const { rerender } = render(<Color value="#123" sm />);
    let box = document.querySelector('.frui-view-color-box');
    expect(box).toHaveStyle({ width: '8px', height: '8px' });

    rerender(<Color value="#123" md />);
    box = document.querySelector('.frui-view-color-box');
    expect(box).toHaveStyle({ width: '12px', height: '12px' });

    rerender(<Color value="#123" lg />);
    box = document.querySelector('.frui-view-color-box');
    expect(box).toHaveStyle({ width: '16px', height: '16px' });
  });
});