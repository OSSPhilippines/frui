//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
//frui
import Formula from '../../src/view/Formula.js';

//--------------------------------------------------------------------//
// Tests

describe('<Formula />', () => {
  it('renders evaluated result for a simple expression', () => {
    render(<Formula value="5" formula="{this} * 2" />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders evaluated result using data placeholders', () => {
    render(
      <Formula
        value="5"
        formula="{this} + {tax}"
        data={{ tax: 3 }}
      />
    );
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('treats missing data placeholders as zero', () => {
    render(<Formula value="5" formula="{this} + {missing}" />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders zero for invalid or malformed formulas', () => {
    render(<Formula value="10" formula="invalid + {" />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders zero when value is non‑numeric', () => {
    render(<Formula value="abc" formula="{this} * 2" />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
})