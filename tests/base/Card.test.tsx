//--------------------------------------------------------------------//
// Imports

//frui
import Card from '../../src/base/Card.js';
//tests
import '@testing-library/jest-dom';
import {
  describe,
  expect,
  it
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

//--------------------------------------------------------------------//
// Tests

describe('<Card />', () => {
  it('renders a section element with frui-card class', () => {
    render(<Card data-testid="card">Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.tagName).toBe('SECTION');
    expect(card).toHaveClass('frui-card');
    expect(card).toHaveTextContent('Card Content');
  });

  it('applies custom className', () => {
    render(
      <Card className="custom-card" data-testid="card">
        Content
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass(
      'frui-card',
      'custom-card'
    );
  });

  it('applies frui-flex class when horizontal', () => {
    render(<Card horizontal data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass(
      'frui-card',
      'frui-flex'
    );
  });

  it('renders as child element when asChild is true', () => {
    render(
      <Card asChild>
        <article data-testid="article">Custom Element</article>
      </Card>
    );
    const article = screen.getByTestId('article');
    expect(article.tagName).toBe('ARTICLE');
    expect(article).toHaveClass('frui-card');
  });
});

describe('<Card.Head />', () => {
  it('renders header element with base class', () => {
    render(
      <Card.Head data-testid="head">Header Content</Card.Head>
    );
    const head = screen.getByTestId('head');
    expect(head.tagName).toBe('HEADER');
    expect(head).toHaveClass('frui-card-head');
    expect(head).toHaveTextContent('Header Content');
  });

  it('applies custom className', () => {
    render(
      <Card.Head className="custom-head" data-testid="head">
        Header
      </Card.Head>
    );
    expect(screen.getByTestId('head')).toHaveClass(
      'frui-card-head',
      'custom-head'
    );
  });

  it('applies frui-fa-grow class when stretch is true', () => {
    render(<Card.Head stretch data-testid="head">Header</Card.Head>);
    expect(screen.getByTestId('head')).toHaveClass('frui-fa-grow');
  });

  it('applies inline styles', () => {
    render(
      <Card.Head 
        style={{ backgroundColor: 'blue' }} 
        data-testid="head"
      >
        Header
      </Card.Head>
    );
    expect(screen.getByTestId('head')).toHaveAttribute('style');
  });
});

describe('<Card.Body />', () => {
  it('renders main element with base class', () => {
    render(
      <Card.Body data-testid="body">Body Content</Card.Body>
    );
    const body = screen.getByTestId('body');
    expect(body.tagName).toBe('MAIN');
    expect(body).toHaveClass('frui-card-body');
    expect(body).toHaveTextContent('Body Content');
  });

  it('applies custom className', () => {
    render(
      <Card.Body className="custom-body" data-testid="body">
        Body
      </Card.Body>
    );
    expect(screen.getByTestId('body')).toHaveClass(
      'frui-card-body',
      'custom-body'
    );
  });

  it('applies frui-fa-grow class when stretch is true', () => {
    render(<Card.Body stretch data-testid="body">Body</Card.Body>);
    expect(screen.getByTestId('body')).toHaveClass('frui-fa-grow');
  });

  it('applies inline styles', () => {
    render(
      <Card.Body style={{ padding: '20px' }} data-testid="body">
        Body
      </Card.Body>
    );
    expect(screen.getByTestId('body')).toHaveAttribute('style');
  });
});

describe('<Card.Foot />', () => {
  it('renders footer element with base classes', () => {
    render(
      <Card.Foot data-testid="foot">Footer Content</Card.Foot>
    );
    const foot = screen.getByTestId('foot');
    expect(foot.tagName).toBe('FOOTER');
    expect(foot).toHaveClass('frui-card-foot', 'frui-flex');
    expect(foot).toHaveTextContent('Footer Content');
  });

  it('applies custom className', () => {
    render(
      <Card.Foot className="custom-foot" data-testid="foot">
        Footer
      </Card.Foot>
    );
    expect(screen.getByTestId('foot')).toHaveClass(
      'frui-card-foot',
      'custom-foot'
    );
  });

  it('applies alignment classes', () => {
    const { rerender } = render(
      <Card.Foot center data-testid="foot">Footer</Card.Foot>
    );
    expect(screen.getByTestId('foot')).toHaveClass('frui-fx-center');
    rerender(
      <Card.Foot left data-testid="foot">Footer</Card.Foot>
    );
    expect(screen.getByTestId('foot')).toHaveClass('frui-fx-left');
    rerender(
      <Card.Foot right data-testid="foot">Footer</Card.Foot>
    );
    expect(screen.getByTestId('foot')).toHaveClass('frui-fx-right');
  });

  it('applies frui-fa-grow class when stretch is true', () => {
    render(
      <Card.Foot stretch data-testid="foot">Footer</Card.Foot>
    );
    expect(screen.getByTestId('foot')).toHaveClass('frui-fa-grow');
  });

  it('applies inline styles', () => {
    render(
      <Card.Foot
        style={{ justifyContent: 'center' }}
        data-testid="foot"
      >
        Footer
      </Card.Foot>
    );
    expect(screen.getByTestId('foot')).toHaveAttribute('style');
  });
});

describe('<Card.Title />', () => {
  it('renders h3 element by default with base class', () => {
    render(<Card.Title data-testid="title">Title</Card.Title>);
    const title = screen.getByTestId('title');
    expect(title.tagName).toBe('H3');
    expect(title).toHaveClass('frui-card-title');
    expect(title).toHaveTextContent('Title');
  });

  it('renders correct heading elements', () => {
    const { rerender } = render(
      <Card.Title h1 data-testid="title">Title</Card.Title>
    );
    expect(screen.getByTestId('title').tagName).toBe('H1');
    rerender(
      <Card.Title h2 data-testid="title">Title</Card.Title>
    );
    expect(screen.getByTestId('title').tagName).toBe('H2');
    rerender(
      <Card.Title h4 data-testid="title">Title</Card.Title>
    );
    expect(screen.getByTestId('title').tagName).toBe('H4');
    rerender(
      <Card.Title h5 data-testid="title">Title</Card.Title>
    );
    expect(screen.getByTestId('title').tagName).toBe('H5');
    rerender(
      <Card.Title h6 data-testid="title">Title</Card.Title>
    );
    expect(screen.getByTestId('title').tagName).toBe('H6');
  });

  it('applies text styling classes', () => {
    render(
      <Card.Title bold semi italic data-testid="title">
        Title
      </Card.Title>
    );
    const title = screen.getByTestId('title');
    expect(title).toHaveClass(
      'frui-bold', 'frui-semi', 'frui-italic'
    );
  });

  it('applies text transform classes', () => {
    const { rerender } = render(
      <Card.Title upper data-testid="title">Title</Card.Title>
    );
    expect(
      screen.getByTestId('title')
    ).toHaveClass('frui-uppercase');
    rerender(
      <Card.Title lower data-testid="title">Title</Card.Title>
    );
    expect(
      screen.getByTestId('title')
    ).toHaveClass('frui-lowercase');
    rerender(
      <Card.Title capital data-testid="title">Title</Card.Title>
    );
    expect(
      screen.getByTestId('title')
    ).toHaveClass('frui-capitalize');
  });

  it('applies custom className', () => {
    render(
      <Card.Title className="custom-title" data-testid="title">
        Title
      </Card.Title>
    );
    expect(screen.getByTestId('title')).toHaveClass(
      'frui-card-title',
      'custom-title'
    );
  });

  it('applies inline styles', () => {
    render(
      <Card.Title style={{ fontSize: '24px' }} data-testid="title">
        Title
      </Card.Title>
    );
    expect(screen.getByTestId('title')).toHaveAttribute('style');
  });
});

describe('<Card.Description />', () => {
  it('renders paragraph element with base class', () => {
    render(
      <Card.Description data-testid="description">
        Description text
      </Card.Description>
    );
    const description = screen.getByTestId('description');
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('frui-card-description');
    expect(description).toHaveTextContent('Description text');
  });

  it('applies text styling classes', () => {
    render(
      <Card.Description bold semi italic data-testid="description">
        Description
      </Card.Description>
    );
    const description = screen.getByTestId('description');
    expect(description).toHaveClass(
      'frui-bold',
      'frui-semi',
      'frui-italic'
    );
  });

  it('applies text transform classes', () => {
    const { rerender } = render(
      <Card.Description upper data-testid="description">
        Description
      </Card.Description>
    );
    expect(screen.getByTestId('description')).toHaveClass(
      'frui-uppercase'
    );
    rerender(
      <Card.Description lower data-testid="description">
        Description
      </Card.Description>
    );
    expect(screen.getByTestId('description')).toHaveClass(
      'frui-lowercase'
    );
    rerender(
      <Card.Description capital data-testid="description">
        Description
      </Card.Description>
    );
    expect(screen.getByTestId('description')).toHaveClass(
      'frui-capitalize'
    );
  });

  it('applies custom className', () => {
    render(
      <Card.Description
        className="custom-desc"
        data-testid="description"
      >
        Description
      </Card.Description>
    );
    expect(screen.getByTestId('description')).toHaveClass(
      'frui-card-description',
      'custom-desc'
    );
  });

  it('applies inline styles', () => {
    render(
      <Card.Description
        style={{ lineHeight: '1.5' }}
        data-testid="description"
      >
        Description
      </Card.Description>
    );
    expect(
      screen.getByTestId('description')
    ).toHaveAttribute('style');
  });
});

describe('Card component integration', () => {
  it('renders complete card with all subcomponents', () => {
    render(
      <Card data-testid="card">
        <Card.Head data-testid="head">
          <Card.Title data-testid="title">Card Title</Card.Title>
        </Card.Head>
        <Card.Body data-testid="body">
          <Card.Description data-testid="description">
            Card description text
          </Card.Description>
        </Card.Body>
        <Card.Foot data-testid="foot">Footer content</Card.Foot>
      </Card>
    );
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('head')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('body')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
    expect(screen.getByTestId('foot')).toBeInTheDocument();
  });

  it('applies classes in horizontal layout', () => {
    render(
      <Card horizontal data-testid="card">
        <Card.Head stretch data-testid="head">Header</Card.Head>
        <Card.Body stretch data-testid="body">Body</Card.Body>
        <Card.Foot center data-testid="foot">Footer</Card.Foot>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass(
      'frui-card',
      'frui-flex'
    );
    expect(screen.getByTestId('head')).toHaveClass(
      'frui-card-head',
      'frui-fa-grow'
    );
    expect(screen.getByTestId('body')).toHaveClass(
      'frui-card-body',
      'frui-fa-grow'
    );
    expect(screen.getByTestId('foot')).toHaveClass(
      'frui-card-foot',
      'frui-flex',
      'frui-fx-center'
    );
  });

  it('renders card with styled title and description', () => {
    render(
      <Card data-testid="card">
        <Card.Body>
          <Card.Title h2 bold upper data-testid="title">
            Styled Title
          </Card.Title>
          <Card.Description italic data-testid="description">
            Styled description
          </Card.Description>
        </Card.Body>
      </Card>
    );
    const title = screen.getByTestId('title');
    const description = screen.getByTestId('description');
    expect(title.tagName).toBe('H2');
    expect(title).toHaveClass('frui-bold', 'frui-uppercase');
    expect(description).toHaveClass('frui-italic');
  });
});