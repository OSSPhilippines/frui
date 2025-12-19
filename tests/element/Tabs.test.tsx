//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
//frui
import Tabs from '../../frui/src/element/Tabs';

//--------------------------------------------------------------------//
// Tests

describe('<Tabs />', () => {
  const testTabs = [
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' }
  ];
  
  const testPanels = [
    <div key="1">Content 1</div>,
    <div key="2">Content 2</div>,
    <div key="3">Content 3</div>
  ];

  describe('Basic Rendering', () => {
    it('renders tabs and shows first panel by default', () => {
      render(<Tabs tabs={testTabs} panels={testPanels} />);
      
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
      
      const panel1 = screen.getByText('Content 1')
        .closest('.frui-tab-panel');
      const panel2 = screen.getByText('Content 2')
        .closest('.frui-tab-panel');
      
      expect(panel1).toHaveClass('frui-tab-panel-active');
      expect(panel2).not.toHaveClass('frui-tab-panel-active');
    });
  });

  describe('Tab Interaction', () => {
    it('switches to second panel when second tab is clicked', () => {
      render(<Tabs tabs={testTabs} panels={testPanels} />);
      
      const tab2 = screen.getByText('Tab 2');
      fireEvent.click(tab2);
      
      const panel1 = screen.getByText('Content 1')
        .closest('.frui-tab-panel');
      const panel2 = screen.getByText('Content 2')
        .closest('.frui-tab-panel');
      const panel3 = screen.getByText('Content 3')
        .closest('.frui-tab-panel');
      
      expect(panel1).not.toHaveClass('frui-tab-panel-active');
      expect(panel2).toHaveClass('frui-tab-panel-active');
      expect(panel3).not.toHaveClass('frui-tab-panel-active');
    });

    it('switches to third panel when third tab is clicked', () => {
      render(<Tabs tabs={testTabs} panels={testPanels} />);
      
      const tab3 = screen.getByText('Tab 3');
      fireEvent.click(tab3);
      
      const panel3 = screen.getByText('Content 3')
        .closest('.frui-tab-panel');
      
      expect(panel3).toHaveClass('frui-tab-panel-active');
    });

    it('does not switch when disabled tab is clicked', () => {
      const disabledTabs = [
        { label: 'Tab 1' },
        { label: 'Tab 2', disabled: true },
        { label: 'Tab 3' }
      ];
      
      render(<Tabs tabs={disabledTabs} panels={testPanels} />);
      
      const disabledTab = screen.getByText('Tab 2');
      fireEvent.click(disabledTab);
      
      const panel1 = screen.getByText('Content 1')
        .closest('.frui-tab-panel');
      const panel2 = screen.getByText('Content 2')
        .closest('.frui-tab-panel');
      
      expect(panel1).toHaveClass('frui-tab-panel-active');
      expect(panel2).not.toHaveClass('frui-tab-panel-active');
    });
  });

  describe('Tab Styling', () => {
    it('applies active and disabled classes to tabs', () => {
      const disabledTabs = [
        { label: 'Tab 1' },
        { label: 'Tab 2', disabled: true }
      ];
      render(
        <Tabs
          tabs={disabledTabs}
          panels={[ 
            <div key="1">Content 1</div>, <div key="2">Content 2</div>
          ]}
        />
      );
      
      const activeTab = 
        screen.getByText('Tab 1').closest('.frui-tab');
      const disabledTab = 
        screen.getByText('Tab 2').closest('.frui-tab');
      
      expect(activeTab).toHaveClass('frui-tab-active');
      expect(disabledTab).toHaveClass('frui-tab-disabled');
    });

    it('applies custom className to tabs', () => {
      const customTabs = 
        [ { label: 'Tab 1', className: 'custom-tab' } ];
      render(
        <Tabs
          tabs={customTabs}
          panels={[ <div key="1">Content</div> ]}
        />
      );
      
      const customTab = screen.getByText('Tab 1').closest('.frui-tab');
      expect(customTab).toHaveClass('custom-tab');
    });

    it('applies custom style to tabs', () => {
      const styledTabs = [
        { label: 'Tab 1', style: { color: 'rgb(255, 0, 0)' } }
      ];
      render(
        <Tabs
          tabs={styledTabs}
          panels={[ <div key="1">Content</div> ]}
        />
      );
      
      const styledTab = screen.getByText('Tab 1').closest('.frui-tab');
      expect(styledTab).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    });
  });

  describe('Panel Styling', () => {
    it('applies active class to active panel', () => {
      render(<Tabs tabs={testTabs} panels={testPanels} />);
      
      const activePanel = screen.getByText('Content 1')
        .closest('.frui-tab-panel');
      expect(activePanel).toHaveClass('frui-tab-panel-active');
    });
  });

  describe('Layout Variants', () => {
    it('applies vertical layout classes', () => {
      render(<Tabs tabs={testTabs} panels={testPanels} vertical />);
      
      const container = 
        screen.getByText('Tab 1').closest('.frui-tabs');
      const tabList = screen.getByText('Tab 1')
        .closest('.frui-tab-list');
      const tab = screen.getByText('Tab 1').closest('.frui-tab');
      
      expect(container).toHaveClass('frui-tabs-vertical');
      expect(tabList).toHaveClass('frui-tab-list-vertical');
      expect(tab).toHaveClass('frui-tab-vertical');
    });

    it('applies scrollable class', () => {
      render(<Tabs tabs={testTabs} panels={testPanels} scrollable />);
      
      const tabList = screen.getByText('Tab 1')
        .closest('.frui-tab-list');
      expect(tabList).toHaveClass('frui-tab-list-scrollable');
    });

    it('applies centered class', () => {
      render(<Tabs tabs={testTabs} panels={testPanels} centered />);
      
      const tabList = screen.getByText('Tab 1')
        .closest('.frui-tab-list');
      expect(tabList).toHaveClass('frui-tab-list-centered');
    });

    it('applies full width class', () => {
      render(<Tabs tabs={testTabs} panels={testPanels} fullWidth />);
      
      const tabList = screen.getByText('Tab 1')
        .closest('.frui-tab-list');
      expect(tabList).toHaveClass('frui-tab-list-fullwidth');
    });

    it('does not apply full width when vertical', () => {
      render(
        <Tabs tabs={testTabs} panels={testPanels} fullWidth vertical />
      );
      
      const tabList = screen.getByText('Tab 1')
        .closest('.frui-tab-list');
      expect(tabList).not.toHaveClass('frui-tab-list-fullwidth');
    });

    it('applies wrap class to container', () => {
      render(<Tabs tabs={testTabs} panels={testPanels} wrap />);
      
      const container = 
        screen.getByText('Tab 1').closest('.frui-tabs');
      expect(container).toHaveClass('wrap');
    });
  });

  describe('Tab with Icons', () => {
    it('renders icon when provided', () => {
      const iconTabs = [ { label: 'Tab 1', icon: <span>★</span> } ];
      render(
        <Tabs 
          tabs={iconTabs} 
          panels={[ <div key="1">Content</div> ]} 
        />
      );
      
      const icon = screen.getByText('★');
      const iconWrapper = icon.closest('.frui-tab-icon');
      
      expect(icon).toBeInTheDocument();
      expect(iconWrapper).toHaveClass('frui-tab-icon-show');
    });

    it('does not render icon when not provided', () => {
      render(<Tabs tabs={testTabs} panels={testPanels} />);
      
      const tab = screen.getByText('Tab 1').closest('.frui-tab');
      const iconShow = tab?.querySelector('.frui-tab-icon-show');
      expect(iconShow).not.toBeInTheDocument();
    });
  });
});