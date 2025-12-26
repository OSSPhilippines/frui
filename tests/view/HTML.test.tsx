//--------------------------------------------------------------------//
// Imports

//frui
import HTML from '../../src/view/HTML.js';
//tests
import '@testing-library/jest-dom';
import {
  describe,
  expect,
  it
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

//--------------------------------------------------------------------//
// Tests

describe('<HTML />', () => {
  it('renders plain text content', () => {
    render(<HTML value="Hello world" />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders HTML markup from string', () => {
    render(<HTML value="<p>Paragraph</p>" />);
    const paragraph = screen.getByText('Paragraph');

    expect(paragraph.tagName.toLowerCase()).toBe('p');
  });

  it('accepts and renders dangerous HTML as is', () => {
    render(<HTML value='<img src="x" alt="y" />' />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('alt', 'y');
  });

  it('uses a div as the root element', () => {
    render(<HTML value="<span>test</span>" />);
    const container = screen.getByText('test').parentElement;

    expect(container?.tagName.toLowerCase()).toBe('div');
  });
});