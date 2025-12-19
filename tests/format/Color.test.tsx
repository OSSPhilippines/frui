//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
//frui
import Color from '../../frui/src/format/Color.js';

//--------------------------------------------------------------------//
// Helpers

function getBoxElement() {
  return document.querySelector('.frui-format-color-box');
}

function getTextElement() {
  return document.querySelector('.frui-format-color-text');
}

const defaultColor = '#FF0000';

//--------------------------------------------------------------------//
// Tests

describe('Color component', () => {
  it('renders both box and text when both are set to true', () => {
    render(<Color value={defaultColor} />);
    const wrapper = document.querySelector('.frui-format-color');
    const box = getBoxElement();
    const text = getTextElement();
    expect(wrapper).toBeInTheDocument();
    expect(box).toBeInTheDocument();
    expect(text).toHaveTextContent(defaultColor);
  });

  it('renders only box when text is set to false', () => {
    render(<Color value={defaultColor} text={false} />);
    const box = getBoxElement();
    const text = getTextElement();
    expect(box).toBeInTheDocument();
    expect(text).not.toBeInTheDocument();
  });

  it('renders only text when box is set to false', () => {
    render(<Color value={defaultColor} box={false} />);
    const text = getTextElement();
    const box = getBoxElement();
    expect(text).toBeInTheDocument();
    expect(box).not.toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const customClass = 'my-custom';
    render(<Color value={defaultColor} className={customClass} />);
    const wrapper = document.querySelector('.frui-format-color');
    expect(wrapper).toHaveClass(customClass);
  });

  it('renders correct size for sm, md, lg', () => {
    const { rerender } = render(<Color value={defaultColor} sm />);
    let box = getBoxElement();
    expect(box).toHaveStyle({ height: '8px', width: '8px' });

    rerender(<Color value={defaultColor} md />);
    box = getBoxElement();
    expect(box).toHaveStyle({ height: '12px', width: '12px' });

    rerender(<Color value={defaultColor} lg />);
    box = getBoxElement();
    expect(box).toHaveStyle({ height: '16px', width: '16px' });
  });

  it('applies style prop correctly', () => {
    const customStyle: Record<string, unknown> = { margin: '4px' };
    render(<Color value={defaultColor} style={customStyle} />);
    const wrapper = document.querySelector('.frui-format-color');
    expect(wrapper).toHaveStyle(customStyle);
  });

  it('applies color value as background to box', () => {
    render(<Color value={defaultColor} />);
    const box = getBoxElement();
    expect(box).toHaveStyle({ backgroundColor: defaultColor });
  });

  it('matches snapshot for default rendering', () => {
    const { container } = render(<Color value={defaultColor} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for text-only rendering', () => {
    const { container } = render(
      <Color value={defaultColor} box={false} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});