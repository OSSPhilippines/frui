//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
//frui
import Metadata from '../../frui/src/format/Metadata.js';

//--------------------------------------------------------------------//
// Helpers

const sampleMetadata = {
  name: 'Test App',
  version: '1.0.0',
  build: 42
};

//--------------------------------------------------------------------//
// Tests

describe('Metadata component', () => {
  describe('Rendering', () => {
    it('renders a <table> with correct number of rows', () => {
      render(<Metadata value={sampleMetadata} />);
      const table = screen.getByRole('table');
      const rows = within(table).getAllByRole('row');
      expect(table).toBeInTheDocument();
      expect(rows).toHaveLength(Object.keys(sampleMetadata).length);
    });

    it('renders keys and values correctly in separate cells', () => {
      render(<Metadata value={sampleMetadata} />);
      Object.entries(sampleMetadata).forEach(([ key, val ]) => {
        expect(screen.getByText(String(key))).toBeInTheDocument();
        expect(screen.getByText(String(val))).toBeInTheDocument();
      });
    });

    it('renders empty table when value is empty object', () => {
      render(<Metadata value={{}} />);
      const table = screen.getByRole('table');
      const cells = screen.queryAllByRole('cell');
      expect(table).toBeInTheDocument();
      expect(cells).toHaveLength(0);
    });

    it('renders correct number of cells (2 per row)', () => {
      render(<Metadata value={sampleMetadata} />);
      const cells = screen.getAllByRole('cell');
      expect(cells).toHaveLength(
        Object.keys(sampleMetadata).length * 2
      );
    });
  });

  describe('Styling', () => {
    it('applies custom className to both <td> cells', () => {
      render(
        <Metadata value={sampleMetadata} className="meta-cell" />
      );
      const cells = screen.getAllByRole('cell');
      cells.forEach((cell) => {
        expect(cell).toHaveClass('meta-cell');
      });
    });

    it('applies custom style to both <td> cells', () => {
      const customStyle = { 
        color: 'red', 
        fontWeight: 'bold' 
      };
      const { container } = render(
        <Metadata 
          value={sampleMetadata} 
          style={customStyle} 
        />
      );
      const cells = container.querySelectorAll('td');
      
      cells.forEach((cell) => {
        expect(cell).toHaveAttribute('style');
        const cellStyle = cell.getAttribute('style');
        expect(cellStyle).toContain('color');
        expect(cellStyle).toContain('font-weight');
      });
    });

    it('applies both className and style together', () => {
      const customStyle = { 
        padding: '8px' 
      };
      const { container } = render(
        <Metadata 
          value={sampleMetadata} 
          className="custom-cell"
          style={customStyle}
        />
      );
      const firstCell = container.querySelector('td');
      
      expect(firstCell).toHaveClass('custom-cell');
      expect(firstCell).toHaveAttribute('style');
      expect(firstCell?.getAttribute('style')).toContain('padding');
    });
  });

  describe('Data Handling', () => {
    it('handles string values correctly', () => {
      const data = { key: 'string value' };
      render(<Metadata value={data} />);
      expect(screen.getByText('string value')).toBeInTheDocument();
    });

    it('handles numeric values correctly', () => {
      const data = { count: 123, version: 2 };
      render(<Metadata value={data} />);
      expect(screen.getByText('123')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('renders multiple rows with unique keys', () => {
      render(<Metadata value={sampleMetadata} />);
      const rows = screen.getAllByRole('row');
      
      rows.forEach((row) => {
        const cells = within(row).getAllByRole('cell');
        expect(cells).toHaveLength(2);
      });
    });
  });

  describe('Structure', () => {
    it('renders table with tbody', () => {
      const { container } = render(
        <Metadata value={sampleMetadata} />
      );
      const tbody = container.querySelector('tbody');
      expect(tbody).toBeInTheDocument();
    });

    it('row: key then value', () => {
      render(<Metadata value={sampleMetadata} />);
      const rows = screen.getAllByRole('row');
      
      Object.entries(sampleMetadata).forEach((
        [ key, val ], index
      ) => {
        const cells = within(rows[ index ]).getAllByRole('cell');
        expect(cells[ 0 ]).toHaveTextContent(String(key));
        expect(cells[ 1 ]).toHaveTextContent(String(val));
      });
    });
  });

  describe('Snapshots', () => {
    it('matches snapshot for typical metadata set', () => {
      const { container } = render(
        <Metadata value={sampleMetadata} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with className and style', () => {
      const customStyle = { 
        fontWeight: 'bold' 
      };
      const { container } = render(
        <Metadata
          value={sampleMetadata}
          className="styled-cell"
          style={customStyle}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with empty value', () => {
      const { container } = render(<Metadata value={{}} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});