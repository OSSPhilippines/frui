//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

//frui
import RangeSlider from '../../frui/src/field/RangeSlider.js';

//--------------------------------------------------------------------//
// Helpers

function getSliderElements(container: HTMLElement) {
  const rail = container.querySelector('.frui-field-slider-rail');
  const track = container.querySelector('.frui-field-slider-track');
  const handles = container.querySelectorAll(
    '.frui-field-slider-handle'
  );
  return { rail, track, handles };
}

function simulateDrag(
  handle: Element,
  rail: Element,
  targetPercent: number
) {
  const railRect = rail.getBoundingClientRect();
  const targetX = railRect.left + (railRect.width * targetPercent / 100);
  
  fireEvent.mouseDown(handle);
  fireEvent.mouseMove(document, {
    clientX: targetX,
    clientY: railRect.top
  });
  fireEvent.mouseUp(document);
}

//--------------------------------------------------------------------//
// Tests

describe('RangeSlider', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<RangeSlider />);
      expect(container.querySelector('.frui-field-slider'))
        .toBeInTheDocument();
    });

    it('renders rail, track, and single handle', () => {
      const { container } = render(<RangeSlider />);
      const { rail, track, handles } = getSliderElements(container);
      
      expect(rail).toBeInTheDocument();
      expect(track).toBeInTheDocument();
      expect(handles).toHaveLength(1);
    });

    it('renders two handles when range is true', () => {
      const { container } = render(<RangeSlider range />);
      const { handles } = getSliderElements(container);
      expect(handles).toHaveLength(2);
    });

    it('applies custom className and style', () => {
      const { container } = render(
        <RangeSlider
          className="custom-slider"
          style={{ margin: '20px' }}
        />
      );
      const slider = container.querySelector('.frui-field-slider');
      
      expect(slider).toHaveClass('custom-slider');
      expect(slider).toHaveStyle({ margin: '20px' });
    });
  });

  describe('Orientation', () => {
    it('applies vertical class and positioning', () => {
      const { container } = render(
        <RangeSlider vertical value={50} />
      );
      const { track } = getSliderElements(container);
      
      expect(
        container.querySelector('.frui-field-slider-vertical')
      ).toBeInTheDocument();
      expect(track).toHaveStyle({ bottom: '0%', height: '50%' });
    });

    it('uses horizontal positioning by default', () => {
      const { container } = render(<RangeSlider value={50} />);
      const { track } = getSliderElements(container);
      expect(track).toHaveStyle({ left: '0%', width: '50%' });
    });
  });

  describe('Disabled State', () => {
    it('applies disabled class', () => {
      const { container } = render(<RangeSlider disabled />);
      expect(
        container.querySelector('.frui-field-slider-disabled')
      ).toBeInTheDocument();
    });

    it('does not trigger onChange when disabled', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <RangeSlider onChange={handleChange} disabled />
      );
      const { rail, handles } = getSliderElements(container);
      
      simulateDrag(handles[0], rail!, 50);
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Value Handling', () => {
    it('handles controlled value for single slider', () => {
      const { container, rerender } = render(
        <RangeSlider value={25} />
      );
      const { track } = getSliderElements(container);
      expect(track).toHaveStyle({ width: '25%' });
      
      rerender(<RangeSlider value={75} />);
      expect(track).toHaveStyle({ width: '75%' });
    });

    it('handles controlled value for range slider', () => {
      const { container } = render(
        <RangeSlider value={[ 25, 75 ]} range />
      );
      const { track } = getSliderElements(container);
      expect(track).toHaveStyle({ left: '25%', width: '50%' });
    });

    it('handles defaultValue for single and range sliders', () => {
      const { container: singleContainer } = render(
        <RangeSlider defaultValue={30} />
      );
      const { track: singleTrack } = 
        getSliderElements(singleContainer);

      expect(singleTrack).toHaveStyle({ width: '30%' });

      const { container: rangeContainer } = render(
        <RangeSlider defaultValue={[ 20, 80 ]} range />
      );
      const { track: rangeTrack } = 
        getSliderElements(rangeContainer);

      expect(
        rangeTrack).toHaveStyle({ left: '20%', width: '60%' }
      );
    });
  });

  describe('Min/Max/Step', () => {
    it('respects custom min and max values', () => {
      const { container } = render(
        <RangeSlider min={50} max={150} value={100} />
      );
      const { track } = getSliderElements(container);
      expect(track).toHaveStyle({ width: '50%' });
    });

    it('clamps values to min and max', () => {
      const { container: minContainer } = render(
        <RangeSlider min={20} max={100} value={10} />
      );
      expect(getSliderElements(minContainer).track)
        .toHaveStyle({ width: '0%' });

      const { container: maxContainer } = render(
        <RangeSlider min={0} max={100} value={150} />
      );
      expect(getSliderElements(maxContainer).track)
        .toHaveStyle({ width: '100%' });
    });
  });

  describe('Colors', () => {
    it('applies custom colors', () => {
      const { container } = render(
        <RangeSlider
          trackColor="#ff0000"
          railColor="#00ff00"
          handleColor="#0000ff"
        />
      );
      const { rail, track, handles } = getSliderElements(container);
      
      expect(track).toHaveStyle({ backgroundColor: '#ff0000' });
      expect(rail).toHaveStyle({ backgroundColor: '#00ff00' });
      expect(
        handles[0]).toHaveStyle({ backgroundColor: '#0000ff' }
      );
    });

    it('uses default colors when not specified', () => {
      const { container } = render(<RangeSlider />);
      const { track, rail, handles } = getSliderElements(container);
      
      expect(track).toHaveStyle({ backgroundColor: '#1890ff' });
      expect(rail).toHaveStyle({ backgroundColor: '#f5f5f5' });
      expect(
        handles[0]).toHaveStyle({ backgroundColor: '#fff' }
      );
    });
  });

  describe('Tooltip', () => {
    it('shows and hides tooltip on hover', () => {
      const { container } = render(
        <RangeSlider tooltip value={50} />
      );
      const { handles } = getSliderElements(container);
      
      fireEvent.mouseEnter(handles[0]);
      expect(container.querySelector('.frui-field-slider-tooltip'))
        .toHaveTextContent('50');
      
      fireEvent.mouseLeave(handles[0]);
      expect(container.querySelector('.frui-field-slider-tooltip'))
        .not.toBeInTheDocument();
    });

    it('uses custom tooltip formatter', () => {
      const formatter = (val: number) => `$${val}`;
      const { container } = render(
        <RangeSlider 
          tooltip 
          value={50} 
          tooltipFormatter={formatter} 
        />
      );
      const { handles } = getSliderElements(container);
      
      fireEvent.mouseEnter(handles[0]);
      expect(
        container.querySelector('.frui-field-slider-tooltip')
      ).toHaveTextContent('$50');
    });

    it('shows tooltips for both handles in range mode', () => {
      const { container } = render(
        <RangeSlider tooltip range value={[ 25, 75 ]} />
      );
      const { handles } = getSliderElements(container);
      
      fireEvent.mouseEnter(handles[0]);
      expect(
        container.querySelector('.frui-field-slider-tooltip')
      ).toHaveTextContent('25');
      
      fireEvent.mouseLeave(handles[0]);
      fireEvent.mouseEnter(handles[1]);
      expect(
        container.querySelector('.frui-field-slider-tooltip')
      ).toHaveTextContent('75');
    });
  });

  describe('Marks', () => {
    it('renders marks at specified positions with labels', () => {
      const marks = { 0: '0°C', 50: '50°C', 100: '100°C' };
      const { container } = render(<RangeSlider marks={marks} />);
      
      const markElements = container.querySelectorAll(
        '.frui-field-slider-mark'
      );
      expect(markElements).toHaveLength(3);
      expect(markElements[0]).toHaveStyle({ left: '0%' });
      expect(markElements[1]).toHaveStyle({ left: '50%' });
      expect(container).toHaveTextContent('0°C');
      expect(container).toHaveTextContent('50°C');
    });

    it('positions marks vertically when vertical is true', () => {
      const marks = { 50: 'Middle' };
      const { container } = render(
        <RangeSlider marks={marks} vertical />
      );
      
      const mark = container.querySelector(
        '.frui-field-slider-mark'
      );
      expect(mark).toHaveStyle({ bottom: '50%' });
    });

    it('renders React nodes as mark labels', () => {
      const marks = {
        0: <span data-testid="custom-mark">Start</span>
      };
      render(<RangeSlider marks={marks} />);
      
      expect(
        screen.getByTestId('custom-mark')
      ).toBeInTheDocument();
    });
  });

  describe('Form Integration', () => {
    it('does not render hidden input without name', () => {
      const { container } = render(<RangeSlider />);
      const inputs = container.querySelectorAll(
        'input[type="hidden"]'
      );
      expect(inputs).toHaveLength(0);
    });

    it('renders hidden input with value for single slider', () => {
      const { container } = render(
        <RangeSlider name="temperature" value={50} />
      );
      const input = container.querySelector(
        'input[name="temperature"]'
      ) as HTMLInputElement;
      
      expect(input).toBeInTheDocument();
      expect(input.value).toBe('50');
    });

    it('renders two hidden inputs for range slider', () => {
      const { container } = render(
        <RangeSlider name="range" range value={[ 25, 75 ]} />
      );
      const input1 = container.querySelector(
        'input[name="range[0]"]'
      ) as HTMLInputElement;
      const input2 = container.querySelector(
        'input[name="range[1]"]'
      ) as HTMLInputElement;
      
      expect(input1).toBeInTheDocument();
      expect(input2).toBeInTheDocument();
      expect(input1.value).toBe('25');
      expect(input2.value).toBe('75');
    });
  });

  describe('onChange Callback', () => {
    it('calls onChange during drag for single slider', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <RangeSlider onChange={handleChange} />
      );
      const { rail, handles } = getSliderElements(container);
      
      simulateDrag(handles[0], rail!, 60);
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onChange with array for range slider', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <RangeSlider onChange={handleChange} range />
      );
      const { rail, handles } = getSliderElements(container);
      
      simulateDrag(handles[0], rail!, 30);
      expect(handleChange).toHaveBeenCalled();
      const callArg = handleChange.mock.calls[0][0];
      expect(Array.isArray(callArg)).toBe(true);
    });
  });

  describe('Track and Handle Positioning', () => {
    it('positions track from 0 for single slider', () => {
      const { container } = render(<RangeSlider value={40} />);
      const { track } = getSliderElements(container);
      expect(track).toHaveStyle({ left: '0%', width: '40%' });
    });

    it('positions track between handles for range slider', () => {
      const { container } = render(
        <RangeSlider range value={[ 20, 60 ]} />
      );
      const { track } = getSliderElements(container);
      expect(track).toHaveStyle({ left: '20%', width: '40%' });
    });

    it('handles reversed range values', () => {
      const { container } = render(
        <RangeSlider range value={[ 70, 30 ]} />
      );
      const { track } = getSliderElements(container);
      expect(track).toHaveStyle({ left: '30%', width: '40%' });
    });

    it('positions handles correctly', () => {
      const { container: singleContainer } = render(
        <RangeSlider value={35} />
      );
      expect(getSliderElements(singleContainer).handles[0])
        .toHaveStyle({ left: '35%' });

      const { container: rangeContainer } = render(
        <RangeSlider range value={[ 15, 85 ]} />
      );
      const { handles } = getSliderElements(rangeContainer);
      expect(handles[0]).toHaveStyle({ left: '15%' });
      expect(handles[1]).toHaveStyle({ left: '85%' });
    });

    it('positions elements vertically when vertical is true', () => {
      const { container } = render(
        <RangeSlider vertical value={60} />
      );
      const { handles } = getSliderElements(container);
      expect(handles[0]).toHaveStyle({ bottom: '60%' });
    });
  });

  describe('Edge Cases', () => {
    it('handles boundary values', () => {
      const { container: zeroContainer } = render(
        <RangeSlider value={0} />
      );
      expect(getSliderElements(zeroContainer).track)
        .toHaveStyle({ width: '0%' });

      const { container: maxContainer } = render(
        <RangeSlider max={100} value={100} />
      );
      expect(getSliderElements(maxContainer).track)
        .toHaveStyle({ width: '100%' });
    });

    it('handles identical range values', () => {
      const { container } = render(
        <RangeSlider range value={[ 50, 50 ]} />
      );
      const { track } = getSliderElements(container);
      expect(track).toHaveStyle({ left: '50%', width: '0%' });
    });

    it('handles negative min and max values', () => {
      const { container } = render(
        <RangeSlider min={-50} max={50} value={0} />
      );
      const { track } = getSliderElements(container);
      expect(track).toHaveStyle({ width: '50%' });
    });
  });
});