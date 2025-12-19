//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
//frui
import Tooltip from '../../frui/src/element/Tooltip';

//--------------------------------------------------------------------//
// Tests

describe('Tooltip Component', () => {
  describe('basic rendering', () => {
    it('renders children', () => {
      render(
        <Tooltip text="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('does not show tooltip by default', () => {
      render(
        <Tooltip text="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
    });

    it('shows tooltip on mouse enter', () => {
      render(
        <Tooltip text="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      expect(screen.getByText('Tooltip text')).toBeInTheDocument();
    });

    it('hides tooltip on mouse leave', () => {
      render(
        <Tooltip text="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      expect(screen.getByText('Tooltip text')).toBeInTheDocument();
      fireEvent.mouseLeave(container!);
      expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
    });

    it('applies base class', () => {
      render(
        <Tooltip text="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-tooltip');
    });

    it('applies custom className', () => {
      render(
        <Tooltip text="Tooltip text" className="custom-tooltip">
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-tooltip', 'custom-tooltip');
    });

    it('applies custom styles', () => {
      const customStyle: CSSProperties = { fontSize: '14px' };
      render(
        <Tooltip text="Tooltip text" style={customStyle}>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveStyle({ fontSize: '14px' });
    });
  });

  describe('border radius variants', () => {
    it('applies curved class', () => {
      render(
        <Tooltip text="Tooltip text" curved>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-curved');
    });

    it('applies rounded class', () => {
      render(
        <Tooltip text="Tooltip text" rounded>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-rounded');
    });

    it('applies pill class', () => {
      render(
        <Tooltip text="Tooltip text" pill>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-pill');
    });

    it('prioritizes curved over rounded and pill', () => {
      render(
        <Tooltip text="Tooltip text" curved rounded pill>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-curved');
      expect(tooltip).not.toHaveClass('frui-rounded', 'frui-pill');
    });
  });

  describe('color variants', () => {
    it('applies custom color as background', () => {
      render(
        <Tooltip text="Tooltip text" color="#ff0000">
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveStyle({ backgroundColor: '#ff0000' });
    });

    it('applies info background class', () => {
      render(
        <Tooltip text="Tooltip text" info>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-bg-info');
    });

    it('applies warning background class', () => {
      render(
        <Tooltip text="Tooltip text" warning>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-bg-warning');
    });

    it('applies success background class', () => {
      render(
        <Tooltip text="Tooltip text" success>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-bg-success');
    });

    it('applies error background class', () => {
      render(
        <Tooltip text="Tooltip text" error>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-bg-error');
    });

    it('applies muted background class', () => {
      render(
        <Tooltip text="Tooltip text" muted>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-bg-muted');
    });

    it('prioritizes custom color over status colors', () => {
      render(
        <Tooltip text="Tooltip text" color="#00ff00" info warning>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveStyle({ backgroundColor: '#00ff00' });
      expect(tooltip).not.toHaveClass('frui-bg-info', 'frui-bg-warning');
    });
  });

  describe('arrow feature', () => {
    it('does not render arrow by default', () => {
      const { container } = render(
        <Tooltip text="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltipContainer = container.querySelector(
        '.frui-tooltip-container'
      );
      fireEvent.mouseEnter(tooltipContainer!);
      expect(
        container.querySelector('.frui-tooltip-arrow')
      ).not.toBeInTheDocument();
    });

    it('renders arrow when arrow prop is true', () => {
      const { container } = render(
        <Tooltip text="Tooltip text" arrow>
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltipContainer = container.querySelector(
        '.frui-tooltip-container'
      );
      fireEvent.mouseEnter(tooltipContainer!);
      expect(
        container.querySelector('.frui-tooltip-arrow')
      ).toBeInTheDocument();
    });

    it('applies arrow container class when arrow enabled', () => {
      render(
        <Tooltip text="Tooltip text" arrow>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass('frui-tooltip-arrow-container');
    });

    it('applies custom color to arrow', () => {
      const { container } = render(
        <Tooltip text="Tooltip text" arrow color="#ff0000">
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltipContainer = container.querySelector(
        '.frui-tooltip-container'
      );
      fireEvent.mouseEnter(tooltipContainer!);
      const arrow = container.querySelector('.frui-tooltip-arrow');
      expect(arrow).toHaveClass('custom-color');
    });

    it('applies info class to arrow', () => {
      const { container } = render(
        <Tooltip text="Tooltip text" arrow info>
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltipContainer = container.querySelector(
        '.frui-tooltip-container'
      );
      fireEvent.mouseEnter(tooltipContainer!);
      const arrow = container.querySelector('.frui-tooltip-arrow');
      expect(arrow).toHaveClass('info');
    });
  });

  describe('opacity and padding', () => {
    it('applies opacity as decimal', () => {
      render(
        <Tooltip text="Tooltip text" opacity={50}>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveStyle({ opacity: 0.5 });
    });

    it('applies padding style', () => {
      render(
        <Tooltip text="Tooltip text" padding="20px">
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveStyle({ padding: '20px' });
    });

    it('applies numeric padding', () => {
      render(
        <Tooltip text="Tooltip text" padding={15}>
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveStyle({ padding: '15px' });
    });
  });

  describe('positioning', () => {
    it('applies fixed positioning', () => {
      render(
        <Tooltip text="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveStyle({ position: 'fixed' });
    });

    it('applies high z-index', () => {
      render(
        <Tooltip text="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveStyle({ zIndex: 10000 });
    });
  });

  describe('combined props', () => {
    it('combines all visual props correctly', () => {
      render(
        <Tooltip
          text="Tooltip text"
          rounded
          warning
          arrow
          opacity={80}
          padding="10px"
          className="custom"
        >
          <button>Hover me</button>
        </Tooltip>
      );
      const container = screen
        .getByText('Hover me')
        .closest('.frui-tooltip-container');
      fireEvent.mouseEnter(container!);
      const tooltip = screen.getByText('Tooltip text');
      expect(tooltip).toHaveClass(
        'frui-tooltip',
        'frui-rounded',
        'frui-bg-warning',
        'frui-tooltip-arrow-container',
        'custom'
      );
      expect(tooltip).toHaveStyle({
        opacity: 0.8,
        padding: '10px'
      });
    });
  });
});