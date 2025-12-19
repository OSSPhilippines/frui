//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
//frui
import Knob from '../../frui/src/field/Knob.js';

//--------------------------------------------------------------------//
// Tests

describe('<Knob /> Component', () => {
  it('renders knob SVG element', () => {
    render(<Knob />);
    const svg = document.querySelector('.frui-field-knob-svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders default numeric value', () => {
    render(<Knob defaultValue={50} />);
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('formats value using valueTemplate', () => {
    render(<Knob defaultValue={75} valueTemplate="{}%" />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('triggers onChange when user interacts', () => {
    const onChange = vi.fn();
    render(<Knob onChange={onChange} />);
    const knob = document.querySelector('.frui-field-knob-svg')!;
    fireEvent.pointerDown(knob, { clientX: 10, clientY: 10 });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders hidden input with name and value', () => {
    render(<Knob name="volume" defaultValue={30} />);
    const hidden = document.querySelector(
      'input[ type="hidden" ]'
    ) as HTMLInputElement;
    expect(hidden).toHaveAttribute('name', 'volume');
    expect(hidden.value).toBe('30');
  });

  it('shows unclamped defaultValue if out of range', () => {
    render(<Knob min={10} max={90} defaultValue={150} />);
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('shows unrounded defaultValue with step', () => {
    render(<Knob step={5} defaultValue={23} />);
    expect(screen.getByText('23')).toBeInTheDocument();
  });

  it('applies provided visual properties', () => {
    render(
      <Knob
        size={150}
        stroke={12}
        textColor="#f00"
        rangeColor="#0f0"
        valueColor="#00f"
      />
    );
    const svg = document.querySelector('.frui-field-knob-svg');
    expect(svg).toBeInTheDocument();
  });
});