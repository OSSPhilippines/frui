//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
//frui
import ColorPicker, {
  defaultHsva,
  hsvaToRgba,
  parseColorString,
  rgbaToHsva,
  rgbaToString
} from '../../frui/src/field/ColorPicker.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/format/Color.js', () => ({
  __esModule: true,
  default: ({ value }: { value?: string }) => (
    <div data-testid="color-display">{value}</div>
  )
}));

//--------------------------------------------------------------------//
// Helpers

const mockSwatches = [
  'rgba(255, 0, 0, 1)',
  '#00ff00',
  'rgba(0, 0, 255, 0.5)'
];

//--------------------------------------------------------------------//
// Tests

describe('ColorPicker utilities', () => {
  it('converts HSVA to RGBA correctly', () => {
    const result = hsvaToRgba({ h: 0, s: 100, v: 100, a: 1 });
    expect(result).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('handles default HSVA values', () => {
    const r = hsvaToRgba(defaultHsva).r;
    expect(r).toBeGreaterThanOrEqual(0);
    expect(r).toBeLessThanOrEqual(255);
  });

  it('converts RGBA to HSVA correctly', () => {
    const result = rgbaToHsva({ r: 255, g: 0, b: 0, a: 1 });
    expect(result.h).toBe(0);
    expect(result.s).toBe(100);
    expect(result.v).toBe(100);
  });

  it('formats RGBA as string correctly', () => {
    const result = rgbaToString({ r: 255, g: 128, b: 64, a: 0.75 });
    expect(result).toBe('rgba(255, 128, 64, 0.75)');
  });

  it('parses color strings properly', () => {
    expect(parseColorString('rgba(10, 20, 30, 0.5)')).toEqual({
      r: 10, g: 20, b: 30, a: 0.5
    });
    expect(parseColorString('#ff0000')).toEqual({
      r: 255, g: 0, b: 0, a: 1
    });
    expect(parseColorString('#f00')).toEqual({
      r: 255, g: 0, b: 0, a: 1
    });
    expect(parseColorString('not-a-color')).toBeNull();
  });
});

describe('<ColorPicker /> Component', () => {
  it('renders trigger with color display', () => {
    render(<ColorPicker />);
    expect(screen.getByTestId('color-display')).toBeInTheDocument();
  });

  it('toggles color picker when trigger clicked', () => {
    render(<ColorPicker />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders hue slider when open', () => {
    render(<ColorPicker />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByLabelText('Hue')).toBeInTheDocument();
  });

  it('shows alpha slider when showAlpha=true', () => {
    render(<ColorPicker showAlpha />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByLabelText('Alpha')).toBeInTheDocument();
  });

  it('hides alpha slider when showAlpha=false', () => {
    render(<ColorPicker showAlpha={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByLabelText('Alpha')).not.toBeInTheDocument();
  });

  it('renders RGBA inputs when showInputs=true', () => {
    render(<ColorPicker showInputs />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByLabelText('R')).toBeInTheDocument();
    expect(screen.getByLabelText('G')).toBeInTheDocument();
    expect(screen.getByLabelText('B')).toBeInTheDocument();
  });

  it('renders provided swatches', () => {
    render(<ColorPicker swatches={mockSwatches} />);
    fireEvent.click(screen.getByRole('button'));
    const swatchButtons = screen.getAllByRole('button', { 
      name: /select color/i 
    });
    expect(swatchButtons).toHaveLength(mockSwatches.length);
  });

  it('calls onChange on hue slider adjustment', () => {
    const onChange = vi.fn();
    render(<ColorPicker onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    const slider = screen.getByLabelText('Hue');
    fireEvent.change(slider, { target: { value: '45' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('updates RGBA input values when changed', () => {
    render(<ColorPicker showInputs />);
    fireEvent.click(screen.getByRole('button'));
    const r = screen.getByLabelText('R') as HTMLInputElement;
    fireEvent.change(r, { target: { value: '200' } });
    expect(r.value).toBe('200');
  });

  it('selects a swatch color on swatch click', () => {
    const onChange = vi.fn();
    render(
      <ColorPicker swatches={mockSwatches} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole('button'));
    const first = screen.getAllByRole('button', { 
      name: /select color/i 
    })[ 0 ];
    fireEvent.click(first);
    expect(onChange).toHaveBeenCalled();
  });

  it('uses controlled value properly', () => {
    const { rerender } = render(
      <ColorPicker value="rgba(255, 0, 0, 1)" />
    );
    const display = screen.getByTestId('color-display');
    expect(display.textContent).toContain('rgba(255, 0, 0');

    rerender(<ColorPicker value="rgba(0, 255, 0, 1)" />);
    expect(display.textContent).toContain('rgba(0, 255, 0');
  });

  it('uses defaultValue when uncontrolled', () => {
    render(<ColorPicker defaultValue="rgba(100, 100, 100, 1)" />);
    const display = screen.getByTestId('color-display');
    const displayText = display.textContent || '';
    
    const parsed = parseColorString(displayText);
    expect(parsed).not.toBeNull();
    expect(parsed!.r).toBeGreaterThanOrEqual(99);
    expect(parsed!.r).toBeLessThanOrEqual(101);
    expect(parsed!.g).toBeGreaterThanOrEqual(99);
    expect(parsed!.g).toBeLessThanOrEqual(101);
    expect(parsed!.b).toBeGreaterThanOrEqual(99);
    expect(parsed!.b).toBeLessThanOrEqual(101);
    expect(parsed!.a).toBeCloseTo(1, 1);
  });

  it('closes picker when clicking outside', () => {
    render(
      <div>
        <ColorPicker />
        <div data-testid="outside">Outside</div>
      </div>
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});