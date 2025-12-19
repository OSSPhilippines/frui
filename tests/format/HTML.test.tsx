//--------------------------------------------------------------------//
// Imports

//modules
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import HTML from '../../frui/src/format/HTML.js';

//--------------------------------------------------------------------//
// Helpers

const defaultHTML = '<p>Hello <strong>World</strong></p>';
const unsafeHTML = '<img src=x onerror="alert(1)" />';

//--------------------------------------------------------------------//
// Tests

describe('HTML component', () => {
  it('renders HTML markup using dangerouslySetInnerHTML', () => {
    const { container } = render(<HTML value={defaultHTML} />);
    const htmlContainer = container.firstChild as HTMLElement;
    expect(htmlContainer.innerHTML).toBe(defaultHTML);
  });
  
  it('renders nested HTML structure correctly', () => {
    const { container } = render(<HTML value={defaultHTML} />);
    const paragraph = container.querySelector('p');
    const boldText = screen.getByText('World');
    expect(paragraph).toBeInTheDocument();
    expect(boldText).toBeInTheDocument();
    expect(boldText.tagName).toBe('STRONG');
  });
  
  it('does not escape HTML entities in the provided string', () => {
    const { container } = render(<HTML value={defaultHTML} />);
    const htmlContainer = container.firstChild as HTMLElement;
    expect(htmlContainer.innerHTML).toContain('<strong>');
  });
  
  it('renders even potentially unsafe HTML (as expected)', () => {
    const { container } = render(<HTML value={unsafeHTML} />);
    const htmlContainer = container.firstChild as HTMLElement;
    expect(htmlContainer.innerHTML).toContain('<img');
  });
  
  it('matches snapshot for simple markup', () => {
    const { container } = render(<HTML value={defaultHTML} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  
  it('matches snapshot for unsafe HTML content', () => {
    const { container } = render(<HTML value={unsafeHTML} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});