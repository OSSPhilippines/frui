//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
//frui
import JSONFormat from '../../frui/src/format/JSON.js';

//--------------------------------------------------------------------//
// Helpers

const sampleObject = { id: 1, name: 'Test', active: true };
const sampleArray = [ { id: 1 }, { id: 2 } ];
const samplePrimitive = 'hello';

//--------------------------------------------------------------------//
// Tests

describe('JSONFormat component', () => {
  it('renders <pre> element with formatted JSON string', () => {
    const { container } = render(
      <JSONFormat value={sampleObject} />
    );
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();
    expect(pre?.tagName).toBe('PRE');
  });
  
  it('renders arrays as JSON', () => {
    const { container } = render(
      <JSONFormat value={sampleArray} />
    );
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();
    expect(pre?.textContent).toContain('"id": 1');
  });
  
  it('renders primitives as JSON', () => {
    const { container } = render(
      <JSONFormat value={samplePrimitive} />
    );
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();
    expect(pre?.textContent).toBe(
      JSON.stringify(samplePrimitive, null, 2)
    );
  });
  
  it('applies custom className and style attributes', () => {
    const style = { color: 'blue' };
    const { container } = render(
      <JSONFormat 
        value={sampleObject} 
        className="json-viewer" 
        style={style} 
      />
    );
    const pre = container.querySelector('pre');
    expect(pre).toHaveClass('json-viewer');
    expect(pre).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });
  
  it('renders undefined or null gracefully', () => {
    const { container } = render(
      <JSONFormat value={null} />
    );
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();
    expect(pre?.textContent).toBe(JSON.stringify(null, null, 2));
  });
  
  it('matches snapshot for object value', () => {
    const { container } = render(
      <JSONFormat value={sampleObject} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  
  it('matches snapshot for array value', () => {
    const { container } = render(
      <JSONFormat value={sampleArray} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  
  it('matches snapshot for primitive value', () => {
    const { container } = render(
      <JSONFormat value={samplePrimitive} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});