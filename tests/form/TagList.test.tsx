//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  act,
  renderHook
} from '@testing-library/react';
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//types
import type {
  ChangeEvent,
  KeyboardEvent
} from 'react';
//frui
import TagList from '../../src/form/TagList.js';

//--------------------------------------------------------------------//
// Helpers

const getInput = () => screen.getByRole('textbox') as HTMLInputElement;
const getTag = (text: string) => screen.getByText(text);

//--------------------------------------------------------------------//
// Tests

describe('<TagList />', () => {
  it('renders wrapper and existing tags', () => {
    render(<TagList defaultValue={[ 'tag1', 'tag2' ]} />);
    const wrapper = getInput().closest('div')!;
    expect(wrapper).toHaveClass('frui-form-tag-list');
    expect(screen.getAllByText(/tag/)).toHaveLength(2);
  });

  it('adds a tag on Enter key and clears input', () => {
    render(<TagList />);
    const input = getInput();
    fireEvent.change(input, { target: { value: 'newTag' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(getTag('newTag')).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  it('adds a tag on comma key', () => {
    render(<TagList />);
    const input = getInput();
    fireEvent.change(input, { target: { value: 'commaTag' } });
    fireEvent.keyDown(input, { key: ',' });
    expect(getTag('commaTag')).toBeInTheDocument();
  });

  it('removes tag when × clicked', () => {
    render(<TagList defaultValue={[ 'removeMe' ]} />);
    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText('removeMe')).not.toBeInTheDocument();
  });

  it('handles Backspace editing last tag', () => {
    render(<TagList defaultValue={[ 'editMe' ]} />);
    const input = getInput();
    fireEvent.keyUp(input);
    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(input.value).toBe('editMe');
  });

  it('calls onUpdate when tags change', () => {
    const onUpdate = vi.fn();
    render(<TagList onUpdate={onUpdate} />);
    const input = getInput();
    fireEvent.change(input, { target: { value: 'callMe' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onUpdate).toHaveBeenCalled();
  });

  it('applies info color class', () => {
    const { container } = render(<TagList info defaultValue={[ 'i' ]} />);
    expect(container.querySelector('.frui-bg-info')).toBeInTheDocument();
  });

  it('applies inline color style when color prop provided', () => {
    const { container } = render(<TagList color="red" defaultValue={[ 'r' ]} />);
    const tag = container.querySelector('.frui-form-tag-list-tag')!;
    expect(tag).toHaveAttribute('style', expect.stringContaining('background-color'));
  });
});

//--------------------------------------------------------------------//
// Hooks

describe('useTagList()', () => {
  it('adds and removes tags correctly', () => {
    const onUpdate = vi.fn();
    const { result, rerender } = renderHook(() =>
      TagList.useTagList({ defaultValue: [ 'a' ], onUpdate })
    );
    act(() => result.current.handlers.remove(0));
    expect(result.current.tags).toEqual([]);
    const changeEvent = {
      target: { value: 'test' }
    } as unknown as ChangeEvent<HTMLInputElement>;
    act(() => result.current.handlers.change(changeEvent));
    rerender();
    const keyEvent = {
      key: 'Enter',
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent<HTMLInputElement>;
    act(() => result.current.handlers.edit(keyEvent));
    expect(result.current.tags).toEqual([ 'test' ]);
  });

  it('updates tags when value prop changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => TagList.useTagList({ value }),
      { initialProps: { value: [ 'one' ] } }
    );
    expect(result.current.tags).toEqual([ 'one' ]);
    rerender({ value: [ 'two' ] });
    expect(result.current.tags).toEqual([ 'two' ]);
  });
});