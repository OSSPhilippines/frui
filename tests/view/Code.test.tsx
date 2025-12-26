//--------------------------------------------------------------------//
// Imports

//frui
import Code from '../../src/view/Code.js';
//tests
import '@testing-library/jest-dom';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';
//modules
import type { ReactNode } from 'react';


//--------------------------------------------------------------------//
// Mocks

vi.mock('react-shiki', () => ({
  __esModule: true,
  default: ({
    children,
    showLanguage,
    theme
  }: {
    children: ReactNode,
    showLanguage?: boolean,
    theme?: string
  }) => (
    <div
      data-testid="shiki"
      data-theme={theme}
      data-show={showLanguage ? 'yes' : 'no'}
    >
      {children}
    </div>
  )
}));

//--------------------------------------------------------------------//
// Tests

describe('<Code />', () => {
  it('renders the provided code value', () => {
    render(
      <Code language="ts" value="console.log('Hello');" />
    );
    expect(
      screen.getByText("console.log('Hello');")
    ).toBeInTheDocument();
  });

  it('uses default theme "github-dark"', () => {
    render(<Code language="js" value="alert('x');" />);
    const wrapper = screen.getByTestId('shiki');
    expect(wrapper).toHaveAttribute('data-theme', 'github-dark');
  });

  it('accepts a custom theme', () => {
    render(
      <Code language="js" value="alert('x');" theme="nord" />
    );
    expect(
      screen.getByTestId('shiki')
    ).toHaveAttribute('data-theme', 'nord');
  });

  it('passes showLanguage flag through', () => {
    render(
      <Code language="js" value="let x = 1;" showLanguage />
    );
    expect(
      screen.getByTestId('shiki')
    ).toHaveAttribute('data-show', 'yes');
  });

  it('renders multi-line code and contains both lines', () => {
    const multi = `const a = 1;\nconst b = 2;`;
    render(<Code language="js" value={multi} />);
    const wrapper = screen.getByTestId('shiki');
    const text = wrapper.textContent || '';
    expect(text).toContain('const a = 1;');
    expect(text).toContain('const b = 2;');
  });
});