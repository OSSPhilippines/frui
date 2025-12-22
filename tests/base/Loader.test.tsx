//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it
} from 'vitest';
//frui
import Loader, {
  LoaderContainer
} from '../../src/base/Loader.js';

//--------------------------------------------------------------------//
// Tests

describe('<Loader />', () => {
  it('renders a loader span element', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toBeInTheDocument();
    expect(loader?.tagName).toBe('SPAN');
  });

  it('applies frui-loader class to loader element', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveClass('frui-loader');
  });

  it('wraps loader in LoaderContainer', () => {
    const { container } = render(<Loader />);
    const loaderContainer = container.querySelector(
      '.frui-loader-container'
    );
    expect(loaderContainer).toBeInTheDocument();
  });

  it('applies custom className to loader element', () => {
    const { container } = render(
      <Loader className="custom-loader" />
    );
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveClass('frui-loader');
    expect(loader).toHaveClass('custom-loader');
  });

  it('applies default size of 20px', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveStyle({ width: '20px', height: '20px' });
  });

  it('applies custom size in pixels', () => {
    const { container } = render(<Loader size={50} />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveStyle({ width: '50px', height: '50px' });
  });

  it('applies default thickness of 2px', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveStyle({ borderWidth: '2px' });
  });

  it('applies custom thickness in pixels', () => {
    const { container } = render(<Loader thickness={5} />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveStyle({ borderWidth: '5px' });
  });

  it('applies default speed of 1000ms', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveStyle({ animationDuration: '1000ms' });
  });

  it('applies custom speed in milliseconds', () => {
    const { container } = render(<Loader speed={500} />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveStyle({ animationDuration: '500ms' });
  });

  it('applies default border color', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveStyle({ borderColor: '#666666' });
  });

  it('does not render when show prop is false', () => {
    const { container } = render(<Loader show={false} />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).not.toBeInTheDocument();
  });

  it('renders when show prop is true', () => {
    const { container } = render(<Loader show={true} />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders when show prop is undefined', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toBeInTheDocument();
  });

  it('applies frui-loader-slice-1 class when slice is 1', () => {
    const { container } = render(<Loader slice={1} />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveClass('frui-loader-slice-1');
  });

  it('applies frui-loader-slice-2 class when slice is 2', () => {
    const { container } = render(<Loader slice={2} />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveClass('frui-loader-slice-2');
  });

  it('applies frui-loader-slice-3 class when slice is 3', () => {
    const { container } = render(<Loader slice={3} />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveClass('frui-loader-slice-3');
  });

  it('applies slice-3 class if slice > 3', () => {
    const { container } = render(<Loader slice={5} />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveClass('frui-loader-slice-3');
  });

  it('does not apply slice class when slice is 0', () => {
    const { container } = render(<Loader slice={0} />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).not.toHaveClass('frui-loader-slice-1');
    expect(loader).not.toHaveClass('frui-loader-slice-2');
    expect(loader).not.toHaveClass('frui-loader-slice-3');
  });

  it('applies border style theme props', () => {
    const { container } = render(<Loader solid />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveClass('frui-loader');
  });

  it('applies color theme props', () => {
    const { container } = render(<Loader bdc="primary" />);
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveClass('frui-loader');
  });

  it('applies custom inline styles', () => {
    const { container } = render(
      <Loader style={{ opacity: 0.5 }} />
    );
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveAttribute('style');
    expect(loader).toHaveStyle({ opacity: 0.5 });
  });

  it('merges custom styles with default styles', () => {
    const { container } = render(
      <Loader style={{ opacity: 0.8 }} />
    );
    const loader = container.querySelector('.frui-loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveStyle({ opacity: '0.8' });
    expect(loader).toHaveStyle({ width: '20px' });
  });

  it('renders children content inside container', () => {
    render(<Loader>Loading...</Loader>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('passes container props to LoaderContainer', () => {
    const { container } = render(
      <Loader container={{ className: 'custom-container' }} />
    );
    const loaderContainer = container.querySelector(
      '.frui-loader-container'
    );
    expect(loaderContainer).toHaveClass('custom-container');
  });
});

describe('<LoaderContainer />', () => {
  it('renders a div element', () => {
    const { container } = render(
      <LoaderContainer>Content</LoaderContainer>
    );
    const loaderContainer = container.querySelector(
      '.frui-loader-container'
    );
    expect(loaderContainer).toBeInTheDocument();
    expect(loaderContainer?.tagName).toBe('DIV');
  });

  it('applies frui-loader-container class', () => {
    const { container } = render(
      <LoaderContainer>Content</LoaderContainer>
    );
    const loaderContainer = container.querySelector(
      '.frui-loader-container'
    );
    expect(loaderContainer).toHaveClass('frui-loader-container');
  });

  it('renders children content', () => {
    render(<LoaderContainer>Container Content</LoaderContainer>);
    expect(
      screen.getByText('Container Content')
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <LoaderContainer className="custom-container">
        Content
      </LoaderContainer>
    );
    const loaderContainer = container.querySelector(
      '.frui-loader-container'
    );
    expect(loaderContainer).toHaveClass('frui-loader-container');
    expect(loaderContainer).toHaveClass('custom-container');
  });

  it('passes through HTML attributes', () => {
    const { container } = render(
      <LoaderContainer data-testid="loader-wrapper">
        Content
      </LoaderContainer>
    );
    const loaderContainer = container.querySelector(
      '[ data-testid="loader-wrapper" ]'
    );
    expect(loaderContainer).toBeInTheDocument();
  });

  it('renders complex children elements', () => {
    render(
      <LoaderContainer>
        <span>Loading</span>
        <span>Please wait</span>
      </LoaderContainer>
    );
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });
});

describe('Loader integration', () => {
  it('renders complete loader with all props', () => {
    const { container } = render(
      <Loader
        size={40}
        thickness={4}
        speed={800}
        slice={2}
        className="spinner"
        container={{ className: 'wrapper' }}
      >
        Loading...
      </Loader>
    );
    const loader = container.querySelector('.frui-loader');
    const loaderContainer = container.querySelector(
      '.frui-loader-container'
    );
    expect(loader).toHaveClass(
      'frui-loader',
      'spinner',
      'frui-loader-slice-2'
    );
    expect(loader).toHaveStyle({
      width: '40px',
      height: '40px',
      borderWidth: '4px',
      animationDuration: '800ms'
    });
    expect(loaderContainer).toHaveClass('wrapper');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies theme props in integrated loader', () => {
    const { container } = render(
      <Loader solid bdc="primary" size={30}>
        Processing...
      </Loader>
    );
    const loader = container.querySelector('.frui-loader');
    expect(loader).toHaveClass('frui-loader');
    expect(loader).toHaveStyle({ width: '30px', height: '30px' });
  });
});