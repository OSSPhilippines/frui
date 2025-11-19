// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------
import '@testing-library/jest-dom'
import { act, renderHook } from '@testing-library/react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ChangeEvent, KeyboardEvent } from 'react'
import Taglist, { useTaglist } from '../../components/form/Taglist'

// --------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------
const getInput = () => screen.getByRole('textbox') as HTMLInputElement
const getTag = (text: string) => screen.getByText(text)

// --------------------------------------------------------------------
// Hook Tests
// --------------------------------------------------------------------
describe('useTaglist()', () => {
  it('adds and removes tags correctly', () => {
    const onUpdateMock = vi.fn()
    const { result, rerender } = renderHook(() =>
      useTaglist({ defaultValue: ['a'], onUpdate: onUpdateMock })
    )

    act(() => result.current.handlers.remove(0))
    expect(result.current.tags).toEqual([])

    const changeEvent = { target: { value: 'test' } } as unknown as ChangeEvent<HTMLInputElement>
    act(() => result.current.handlers.change(changeEvent))
    rerender()

    const keyEvent = { key: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent<HTMLInputElement>
    act(() => result.current.handlers.edit(keyEvent))
    expect(result.current.tags).toEqual(['test'])
  })

  it('updates tags when value prop changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useTaglist({ value }),
      { initialProps: { value: ['one'] } }
    )
    expect(result.current.tags).toEqual(['one'])
    rerender({ value: ['two'] })
    expect(result.current.tags).toEqual(['two'])
  })
})

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe('<Taglist />', () => {
  it('adds tag on comma key', () => {
    render(<Taglist />)
    const input = getInput()
    fireEvent.change(input, { target: { value: 'commaTag' } })
    fireEvent.keyDown(input, { key: ',' })
    expect(getTag('commaTag')).toBeInTheDocument()
  })

  it('adds tag on Enter key and clears input', () => {
    render(<Taglist />)
    const input = getInput()
    fireEvent.change(input, { target: { value: 'newtag' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(getTag('newtag')).toBeInTheDocument()
    expect(input.value).toBe('')
  })

  it('applies color classes and inline color style', () => {
    const { container, rerender } = render(<Taglist info defaultValue={['i']} />)
    expect(container.querySelector('.frui-bg-info')).toBeInTheDocument()
    rerender(<Taglist color="red" defaultValue={['r']} />)
    const tag = container.querySelector('.frui-form-tag-list-tag')
    expect(tag).not.toBeNull()
    expect(tag).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' })
  })

  it('calls onUpdate when tags change', () => {
    const onUpdateMock = vi.fn()
    render(<Taglist onUpdate={onUpdateMock} />)
    const input = getInput()
    fireEvent.change(input, { target: { value: 'callme' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onUpdateMock).toHaveBeenCalled()
  })

  it('handles Backspace to edit last tag', () => {
    render(<Taglist defaultValue={['editme']} />)
    const input = getInput()
    fireEvent.keyUp(input)
    fireEvent.keyDown(input, { key: 'Backspace' })
    expect(input.value).toBe('editme')
  })

  it('renders wrapper and existing tags', () => {
    render(<Taglist defaultValue={['tag1', 'tag2']} />)
    const wrapper = getInput().closest('div')!
    expect(wrapper).toHaveClass('frui-form-tag-list')
    expect(screen.getAllByText(/tag/)).toHaveLength(2)
  })

  it('removes tag when × clicked', () => {
    render(<Taglist defaultValue={['removeMe']} />)
    fireEvent.click(getTag('×'))
    expect(screen.queryByText('removeMe')).not.toBeInTheDocument()
  })
})