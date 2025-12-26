//--------------------------------------------------------------------//
// Imports

//frui
import TextTransform from '../../src/view/TextTransform.js';
//tests
import '@testing-library/jest-dom';
import {
  describe,
  it,
  expect
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

//--------------------------------------------------------------------//
// Tests

describe('<TextTransform />', () => {
  it('renders value with no format', () => {
    render(
      <TextTransform value="Hello World" />
    );
    const el = screen.getByText('Hello World');

    expect(el).toBeInTheDocument();
    expect(el.style.textTransform).toBe('');
  });

  it('renders value in uppercase', () => {
    render(
      <TextTransform value="Hello World" format="uppercase" />
    );
    const el = screen.getByText('Hello World');

    expect(el.style.textTransform).toBe('uppercase');
  });

  it('renders value in lowercase', () => {
    render(
      <TextTransform value="Hello World" format="lowercase" />
    );
    const el = screen.getByText('Hello World');

    expect(el.style.textTransform).toBe('lowercase');
  });

  it('renders value capitalized', () => {
    render(
      <TextTransform value="hello world" format="capitalize" />
    );
    const el = screen.getByText('hello world');

    expect(el.style.textTransform).toBe('capitalize');
  });
});