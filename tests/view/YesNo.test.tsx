//--------------------------------------------------------------------//
// Imports

//modules
import { describe, expect, it } from 'vitest';

//tests
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

//frui
import Yesno from '../../src/view/YesNo.js';

//--------------------------------------------------------------------//
// Helpers

function renderText(
  value: unknown,
  yes?: string,
  no?: string
): string {
  const { container } = render(
    <Yesno value={value} yes={yes} no={no} />
  );
  return container.textContent ?? '';
}

//--------------------------------------------------------------------//
// Tests

describe('Yesno component', () => {
  describe('default yes/no labels', () => {
    it('renders "Yes" for boolean true', () => {
      const result = renderText(true);
      expect(result).toBe('Yes');
    });

    it('renders "No" for boolean false', () => {
      const result = renderText(false);
      expect(result).toBe('No');
    });

    it('renders "Yes" for truthy string', () => {
      const result = renderText('hello');
      expect(result).toBe('Yes');
    });

    it('renders "Yes" for non-empty string', () => {
      expect(renderText('any text')).toBe('Yes');
      expect(renderText('0')).toBe('Yes');
      expect(renderText(' ')).toBe('Yes');
    });

    it('renders "No" for empty string', () => {
      const result = renderText('');
      expect(result).toBe('No');
    });

    it('renders "No" for zero', () => {
      const result = renderText(0);
      expect(result).toBe('No');
    });

    it('renders "No" for undefined', () => {
      const result = renderText(undefined);
      expect(result).toBe('No');
    });

    it('renders "No" for null', () => {
      const result = renderText(null);
      expect(result).toBe('No');
    });

    it('renders "No" for NaN', () => {
      const result = renderText(NaN);
      expect(result).toBe('No');
    });

    it('renders "Yes" for positive numbers', () => {
      expect(renderText(1)).toBe('Yes');
      expect(renderText(100)).toBe('Yes');
      expect(renderText(0.1)).toBe('Yes');
    });

    it('renders "Yes" for negative numbers', () => {
      expect(renderText(-1)).toBe('Yes');
      expect(renderText(-5)).toBe('Yes');
      expect(renderText(-0.5)).toBe('Yes');
    });

    it('renders "Yes" for non-empty objects', () => {
      expect(renderText({ a: 1 })).toBe('Yes');
      expect(renderText({ key: 'value' })).toBe('Yes');
    });

    it('renders "Yes" for empty objects', () => {
      expect(renderText({})).toBe('Yes');
    });

    it('renders "Yes" for non-empty arrays', () => {
      expect(renderText([ 1, 2, 3 ])).toBe('Yes');
      expect(renderText([ 'a', 'b' ])).toBe('Yes');
    });

    it('renders "Yes" for empty arrays', () => {
      expect(renderText([])).toBe('Yes');
    });

    it('renders "Yes" for functions', () => {
      const result = renderText(() => {});
      expect(result).toBe('Yes');
    });

    it('renders "Yes" for Date objects', () => {
      const result = renderText(new Date());
      expect(result).toBe('Yes');
    });

    it('renders "Yes" for RegExp objects', () => {
      const result = renderText(/test/);
      expect(result).toBe('Yes');
    });
  });

  describe('custom yes/no labels', () => {
    it('renders custom yes label for truthy value', () => {
      const result = renderText(true, 'On', 'Off');
      expect(result).toBe('On');
    });

    it('renders custom no label for falsy value', () => {
      const result = renderText(false, 'On', 'Off');
      expect(result).toBe('Off');
    });

    it('renders custom labels with single characters', () => {
      expect(renderText(true, 'Y', 'N')).toBe('Y');
      expect(renderText(false, 'Y', 'N')).toBe('N');
    });

    it('renders custom labels with emoji', () => {
      expect(renderText(true, '✓', '✗')).toBe('✓');
      expect(renderText(false, '✓', '✗')).toBe('✗');
    });

    it('renders custom labels with numbers', () => {
      expect(renderText(true, '1', '0')).toBe('1');
      expect(renderText(false, '1', '0')).toBe('0');
    });

    it('renders custom labels with long text', () => {
      const yes = 'Affirmative';
      const no = 'Negative';
      expect(renderText(true, yes, no)).toBe(yes);
      expect(renderText(false, yes, no)).toBe(no);
    });

    it('handles empty string as custom label', () => {
      expect(renderText(true, '', 'No')).toBe('');
      expect(renderText(false, 'Yes', '')).toBe('');
    });
  });

  describe('DOM structure', () => {
    it('renders as React fragment without wrapper element', () => {
      const { container } = render(<Yesno value={true} />);
      expect(container.firstChild?.nodeType).toBe(Node.TEXT_NODE);
    });

    it('contains only text content for true value', () => {
      const { container } = render(<Yesno value={true} />);
      expect(container.innerHTML).toBe('Yes');
    });

    it('contains only text content for false value', () => {
      const { container } = render(<Yesno value={false} />);
      expect(container.innerHTML).toBe('No');
    });

    it('has no HTML elements in output', () => {
      const { container } = render(<Yesno value={true} />);
      expect(container.querySelector('*')).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('handles value changing from truthy to falsy', () => {
      const { container, rerender } = render(
        <Yesno value={true} />
      );
      expect(container.textContent).toBe('Yes');
      rerender(<Yesno value={false} />);
      expect(container.textContent).toBe('No');
    });

    it('handles yes/no labels changing', () => {
      const { container, rerender } = render(
        <Yesno value={true} yes="Yes" no="No" />
      );
      expect(container.textContent).toBe('Yes');
      rerender(<Yesno value={true} yes="Y" no="N" />);
      expect(container.textContent).toBe('Y');
    });

    it('handles simultaneous value and label changes', () => {
      const { container, rerender } = render(
        <Yesno value={true} yes="On" no="Off" />
      );
      expect(container.textContent).toBe('On');
      rerender(<Yesno value={false} yes="Active" no="Inactive" />);
      expect(container.textContent).toBe('Inactive');
    });

    it('handles special JavaScript values', () => {
      expect(renderText(Infinity)).toBe('Yes');
      expect(renderText(-Infinity)).toBe('Yes');
      expect(renderText(Symbol('test'))).toBe('Yes');
    });

    it('handles BigInt values', () => {
      expect(renderText(BigInt(0))).toBe('No');
      expect(renderText(BigInt(1))).toBe('Yes');
      expect(renderText(BigInt(-1))).toBe('Yes');
    });
  });

  describe('integration scenarios', () => {
    it('works with form validation results', () => {
      const isValid = true;
      const result = renderText(isValid, 'Valid', 'Invalid');
      expect(result).toBe('Valid');
    });

    it('works with API response status', () => {
      const isOnline = false;
      const result = renderText(isOnline, 'Online', 'Offline');
      expect(result).toBe('Offline');
    });

    it('works with feature flags', () => {
      const featureEnabled = true;
      const result = renderText(
        featureEnabled,
        'Enabled',
        'Disabled'
      );
      expect(result).toBe('Enabled');
    });

    it('works with permission checks', () => {
      const hasPermission = false;
      const result = renderText(
        hasPermission,
        'Allowed',
        'Denied'
      );
      expect(result).toBe('Denied');
    });
  });

  describe('performance considerations', () => {
    it('renders efficiently with repeated calls', () => {
      for (let i = 0; i < 100; i++) {
        const result = renderText(i % 2 === 0);
        expect(result).toBe(i % 2 === 0 ? 'Yes' : 'No');
      }
    });

    it('handles rapid value changes', () => {
      const { container, rerender } = render(
        <Yesno value={true} />
      );
      for (let i = 0; i < 10; i++) {
        rerender(<Yesno value={i % 2 === 0} />);
        expect(container.textContent).toBe(
          i % 2 === 0 ? 'Yes' : 'No'
        );
      }
    });
  });
});