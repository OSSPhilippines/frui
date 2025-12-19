//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Loader from '../../frui/src/element/Loader';

//--------------------------------------------------------------------//
// Tests
  
describe('<Loader />', () => {
  describe('Rendering', () => {
    it('renders loader container', () => {
      const { container } = render(<Loader />);
      expect(container.firstChild).toBeInTheDocument();
    });
    
    it('renders loader element with frui-loader class', () => {
      const { container } = render(<Loader />);
      const loaderElement = container.querySelector('span');
      expect(loaderElement).toBeInTheDocument();
      expect(loaderElement).toHaveClass('frui-loader');
    });
    
    it('renders label when provided', () => {
      render(<Loader label="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
    
    it('does not render label when not provided', () => {
      const { container } = render(<Loader />);
      expect(container.firstChild).toBeInTheDocument();
      const children = Array.from(
        container.firstChild?.childNodes || []
      );
      const nonSpanNodes = children.filter(
        node => node.nodeName !== 'SPAN'
      );
      expect(nonSpanNodes).toHaveLength(0);
    });
  });
  
  describe('Visibility', () => {
    it('is visible by default', () => {
      const { container } = render(<Loader />);
      const loaderContainer = container.firstChild as HTMLElement;
      expect(loaderContainer).not.toHaveStyle({ display: 'none' });
    });
    
    it('is hidden when show is false', () => {
      const { container } = render(<Loader show={false} />);
      const loaderContainer = container.firstChild as HTMLElement;
      expect(loaderContainer).toHaveStyle({ display: 'none' });
    });
    
    it('is visible when show is true', () => {
      const { container } = render(<Loader show />);
      const loaderContainer = container.firstChild as HTMLElement;
      expect(loaderContainer).not.toHaveStyle({ display: 'none' });
    });
  });
  
  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = 
        render(<Loader className="custom-class" />);
      const loaderElement = container.querySelector('span');
      expect(loaderElement).toHaveClass(
        'frui-loader', 'custom-class'
      );
    });
    
    it('applies default border color', () => {
      const { container } = render(<Loader />);
      const loaderElement = container.querySelector('span');
      expect(loaderElement).toHaveStyle({
         borderColor: 'rgb(102, 102, 102)' 
        });
    });
    
    it('applies custom border color', () => {
      const { container } = render(<Loader color="#ff0000" />);
      const loaderElement = container.querySelector('span');
      expect(loaderElement).toHaveStyle({ borderColor: '#ff0000' });
    });
    
    it('applies inline styles', () => {
      const { container } = render(<Loader style={{
         margin: '10px', padding: '5px' 
        }} />);
      const loaderElement = container.querySelector('span');
      expect(loaderElement).toHaveStyle({
        borderColor: 'rgb(102, 102, 102)',
        margin: '10px',
        padding: '5px'
      });
    });
    
    it('The color prop overrides borderColor in style.', () => {
      const { container } = render(
        <Loader
          color="#ff0000"
          style={{ borderColor: '#00ff00' }}
        />
      );
      const loaderElement = container.querySelector('span');
      expect(loaderElement).toHaveStyle({ borderColor: '#ff0000' });
    });
  });
  
  describe('Complete structure', () => {
    it('renders all parts correctly', () => {
      const { container } = render(
        <Loader
          className="custom"
          color="#ff0000"
          label="Test Loader"
          show
        />
      );
      const loaderElement = container.querySelector('span');
      
      expect(container.firstChild).toBeInTheDocument();
      expect(loaderElement).toHaveClass('frui-loader', 'custom');
      expect(loaderElement).toHaveStyle({ borderColor: '#ff0000' });
      expect(screen.getByText('Test Loader')).toBeInTheDocument();
    });
    
    it('hides completely when show is false', () => {
      const { container } = render(<Loader label="Hidden" show={false} />);
      const loaderContainer = container.firstChild as HTMLElement;
      expect(loaderContainer).toHaveStyle({ display: 'none' });
    });
  });
});