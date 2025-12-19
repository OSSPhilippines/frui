//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import Autocomplete, {
  AutocompleteDropdown,
  useAutocomplete
} from '../../frui/src/field/Autocomplete.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/field/Input.js', () => ({
  __esModule: true,
  default: ({
    onBlur,
    onChange,
    onKeyDown,
    value,
    ...rest
  }: {
    onBlur?: () => void,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: any) => void,
    value?: string
  }) => (
    <input
      data-testid="mock-input"
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value || ''}
      {...rest}
    />
  )
}));

//--------------------------------------------------------------------//
// Helpers

function renderHookWithAutocomplete(
  config: Parameters<typeof useAutocomplete>[ 0 ]
) {
  let hookResult: ReturnType<typeof useAutocomplete> | undefined;

  function TestComponent() {
    hookResult = useAutocomplete(config);
    return <div data-testid="hook-render" />;
  }

  render(<TestComponent />);
  return () => hookResult!;
}

//--------------------------------------------------------------------//
// Tests

describe('useAutocomplete Hook', () => {
  it('initializes with default value', () => {
    const getHook = renderHookWithAutocomplete({ defaultValue: 'test' });
    expect(getHook().value).toBe('test');
  });

  it('initializes with empty value when no default', () => {
    const getHook = renderHookWithAutocomplete({});
    expect(getHook().value).toBe('');
  });

  it('initializes with options list', () => {
    const opts = [ 'A', 'B' ];
    const getHook = renderHookWithAutocomplete({ options: opts });
    expect(getHook().options).toEqual(opts);
  });

  it('updates value via update handler', () => {
    const getHook = renderHookWithAutocomplete({});
    let hook = getHook();
    act(() => {
      const e = { 
        target: { value: 'Hi' } 
      } as ChangeEvent<HTMLInputElement>;
      hook.handlers.update(e);
    });
    hook = getHook();
    expect(hook.value).toBe('Hi');
  });

  it('matches options respecting query case-insensitive', async () => {
    const getHook = renderHookWithAutocomplete({
      options: [ 'Apple', 'Banana', 'Cherry' ]
    });
    
    let hook = getHook();

    await act(async () => {
      const mockEvent = {
        target: { value: 'app' }
      } as unknown as KeyboardEvent;
      hook.handlers.search(mockEvent);
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    
    hook = getHook();

    expect(hook.handlers.match('Apple')).toBeTruthy();
    expect(hook.handlers.match('Banana')).toBeFalsy();
  });

  it('selects option and updates asynchronously', async () => {
    const onSelected = vi.fn();
    const onUpdate = vi.fn();
    const getHook = renderHookWithAutocomplete({ onSelected, onUpdate });
    let hook = getHook();

    act(() => hook.handlers.select('Orange'));
    await waitFor(() => {
      hook = getHook();
      expect(hook.value).toBe('Orange');
    });
    expect(onSelected).toHaveBeenCalledWith('Orange');
    expect(onUpdate).toHaveBeenCalledWith('Orange');
  });
});

describe('<AutocompleteDropdown />', () => {
  it('renders hidden dropdown when show=false', () => {
    render(
      <AutocompleteDropdown
        match={() => true}
        options={[ 'Opt' ]}
        select={() => {}}
        show={false}
      />
    );
    const dropdown = document.querySelector(
      '.frui-field-autocomplete-dropdown'
    );
    if (dropdown) {
      expect(dropdown).toHaveStyle({ display: 'none' });
    }
  });

  it('renders when show=true with options', () => {
    render(
      <AutocompleteDropdown
        match={() => true}
        options={[ 'A', 'B' ]}
        select={() => {}}
        show
      />
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('filters using match callback', () => {
    const match = (o: string) => o.startsWith('App');
    render(
      <AutocompleteDropdown
        match={match}
        options={[ 'Apple', 'Banana' ]}
        select={() => {}}
        show
      />
    );
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  });
});

describe('<Autocomplete /> Component', () => {
  it('renders input field', () => {
    render(<Autocomplete />);
    expect(screen.getByTestId('mock-input')).toBeInTheDocument();
  });

  it('applies wrapper className', () => {
    render(<Autocomplete className="cname" />);
    const wrapper = document.querySelector('.frui-field-autocomplete');
    expect(wrapper).toHaveClass('cname');
  });

  it('passes value prop correctly', () => {
    render(<Autocomplete value="apple" />);
    const el = screen.getByTestId('mock-input') as HTMLInputElement;
    expect(el.value).toBe('apple');
  });

  it('supports custom input props', () => {
    render(<Autocomplete placeholder="Search..." />);
    const el = screen.getByTestId('mock-input');
    expect(el).toHaveAttribute('placeholder', 'Search...');
  });

  it('updates value and triggers onUpdate when an option clicked', async () => {
    const onUpdate = vi.fn();
    render(<Autocomplete options={[ 'Apple', 'Banana' ]} onUpdate={onUpdate} />);
    const input = screen.getByTestId('mock-input');

    //simulate typing to trigger dropdown
    fireEvent.change(input, { target: { value: 'App' } });
    fireEvent.keyDown(input, { key: 'A' });

    await waitFor(() => expect(screen.getByText('Apple')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Apple'));

    await waitFor(() => expect(onUpdate).toHaveBeenCalledWith('Apple'));
  });

  it('hides dropdown after blur event', async () => {
    render(<Autocomplete options={[ 'Apple' ]} value="App" />);
    const input = screen.getByTestId('mock-input');
    fireEvent.keyDown(input);
    await waitFor(() => screen.getByText('Apple'));
    fireEvent.blur(input);

    await waitFor(
      () => {
        const dd = document.querySelector(
          '.frui-field-autocomplete-dropdown'
        );
        expect(dd).toHaveStyle({ display: 'none' });
      },
      { timeout: 200 }
    );
  });
});