//--------------------------------------------------------------------//
// Imports
//modules
import { describe, expect, it, vi } from 'vitest';

//tests
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

//frui
import type { AccordionContextProps } from '../../src/base/Accordion.js';
import {
  Accordion,
  AccordionActive,
  AccordionBellow,
  AccordionContent,
  AccordionContext,
  AccordionInactive,
  AccordionLabel,
  useAccordionContext
} from '../../src/base/Accordion.js';

//--------------------------------------------------------------------//
// Tests

describe('useAccordionContext()', () => {
  it('returns provided context values', () => {
    const mockChange = vi.fn();
    const mockContext: AccordionContextProps = {
      change: mockChange,
      value: 'a1',
      itemValue: 'a1'
    };
    let returnedContext: AccordionContextProps | undefined;
    const TestComponent = () => {
      returnedContext = useAccordionContext();
      return null;
    };
    render(
      <AccordionContext.Provider value={mockContext}>
        <TestComponent />
      </AccordionContext.Provider>
    );
    expect(returnedContext).toEqual(mockContext);
  });
});

describe('<Accordion />', () => {
  it('renders wrapper div with correct class', () => {
    const { container } = render(<Accordion>content</Accordion>);
    expect(container.firstChild).toHaveClass('frui-accordion');
  });

  it('applies className and triggers onChange', () => {
    const onChange = vi.fn();
    render(
      <Accordion className="custom" defaultValue="a1" onChange={onChange}>
        <AccordionBellow value="a1">
          <AccordionLabel>Label 1</AccordionLabel>
        </AccordionBellow>
      </Accordion>
    );
    const label = screen.getByText('Label 1');
    expect(label).toHaveClass('frui-accordion-label');
    fireEvent.click(label);
    expect(onChange).toHaveBeenCalledWith('a1');
  });

  it('updates internal state when controlled value changes', () => {
    const { rerender } = render(
      <Accordion value="a1">
        <AccordionBellow value="a1">
          <AccordionLabel>Label 1</AccordionLabel>
          <AccordionContent>Body</AccordionContent>
        </AccordionBellow>
      </Accordion>
    );
    expect(screen.getByText('Body')).toBeInTheDocument();
    rerender(
      <Accordion value="a2">
        <AccordionBellow value="a1">
          <AccordionLabel>Label 1</AccordionLabel>
          <AccordionContent>Body</AccordionContent>
        </AccordionBellow>
        <AccordionBellow value="a2">
          <AccordionContent>Body2</AccordionContent>
        </AccordionBellow>
      </Accordion>
    );
    expect(screen.queryByText('Body')).not.toBeInTheDocument();
    expect(screen.getByText('Body2')).toBeInTheDocument();
  });
});

describe('<AccordionActive /> and <AccordionInactive />', () => {
  it('renders Active only when selected', () => {
    const ctx: AccordionContextProps = {
      change: vi.fn(),
      itemValue: 'x',
      value: 'x'
    };
    render(
      <AccordionContext.Provider value={ctx}>
        <AccordionActive>Active</AccordionActive>
        <AccordionInactive>Inactive</AccordionInactive>
      </AccordionContext.Provider>
    );
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.queryByText('Inactive')).not.toBeInTheDocument();
  });

  it('renders Inactive when not selected', () => {
    const ctx: AccordionContextProps = {
      change: vi.fn(),
      itemValue: 'x',
      value: 'y'
    };
    render(
      <AccordionContext.Provider value={ctx}>
        <AccordionActive>Active</AccordionActive>
        <AccordionInactive>Inactive</AccordionInactive>
      </AccordionContext.Provider>
    );
    expect(screen.queryByText('Active')).not.toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });
});

describe('<AccordionBellow />', () => {
  it('provides itemValue through context', () => {
    let capturedCtx: AccordionContextProps | undefined;
    const Child = () => {
      capturedCtx = useAccordionContext();
      return (<div>child</div>);
    };
    render(
      <AccordionContext.Provider
        value={{ change: vi.fn(), itemValue: undefined, value: 'x' }}
      >
        <AccordionBellow value="x">
          <Child />
        </AccordionBellow>
      </AccordionContext.Provider>
    );
    expect(capturedCtx?.itemValue).toBe('x');
  });
});

describe('<AccordionContent />', () => {
  const setup = (ctx: AccordionContextProps) =>
    render(
      <AccordionContext.Provider value={ctx}>
        <AccordionContent>body</AccordionContent>
      </AccordionContext.Provider>
    );

  it('hides content when inactive', () => {
    setup({ change: vi.fn(), itemValue: 'v2', value: 'v1' });
    expect(screen.queryByText('body')).not.toBeInTheDocument();
  });

  it('shows content when active', () => {
    setup({ change: vi.fn(), itemValue: 'v1', value: 'v1' });
    expect(screen.getByText('body')).toBeInTheDocument();
  });
});

describe('<AccordionLabel />', () => {
  const mockChange = vi.fn();
  const itemValue = 'v1';
  const Wrapper = ({ activeValue }: { activeValue?: string }) => (
    <AccordionContext.Provider
      value={{ change: mockChange, itemValue, value: activeValue }}
    >
      <AccordionLabel>ClickMe</AccordionLabel>
    </AccordionContext.Provider>
  );

  it('renders active class when current item matches value', () => {
    render(<Wrapper activeValue={itemValue} />);
    const label = screen.getByText('ClickMe');
    expect(label).toHaveClass('frui-accordion-label-active');
  });

  it('calls change handler from context on click', () => {
    render(<Wrapper activeValue={itemValue} />);
    const label = screen.getByText('ClickMe');
    fireEvent.click(label);
    expect(mockChange).toHaveBeenCalledWith(itemValue);
  });

  it('renders inactive label when not active', () => {
    render(<Wrapper activeValue="other" />);
    const label = screen.getByText('ClickMe');
    expect(label).toHaveClass('frui-accordion-label');
    expect(label.dataset.active).toBe('false');
  });
});