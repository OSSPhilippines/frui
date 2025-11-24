//--------------------------------------------------------------------//
// Imports
//--------------------------------------------------------------------//
import '@testing-library/jest-dom'
import {
  render,
  screen
} from '@testing-library/react'
import {
  describe,
  expect,
  it
} from 'vitest'

//components
import When, {
  Otherwise
} from '../../components/When'

//--------------------------------------------------------------------//
// Component Tests
//--------------------------------------------------------------------//
describe('When / Otherwise conditional rendering', () => {
  //------------------------------------------------------------------//
  // Basic true condition
  //------------------------------------------------------------------//
  it('renders children when condition is true', () => {
    render(
      <When condition={true}>
        <div data-testid="content">True Content</div>
      </When>
    )

    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByText('True Content')).toBeVisible()
  })

  //------------------------------------------------------------------//
  // False condition without fallback
  //------------------------------------------------------------------//
  it('renders nothing when condition is false with no fallback', () => {
    render(
      <When condition={false}>
        <div data-testid="content">False Content</div>
      </When>
    )

    expect(screen.queryByTestId('content')).not.toBeInTheDocument()
  })

  //------------------------------------------------------------------//
  // False condition with Otherwise fallback
  //------------------------------------------------------------------//
  it('renders Otherwise when condition is false', () => {
    render(
      <When condition={false}>
        <div data-testid="when-content">When Content</div>
        <Otherwise>
          <div data-testid="otherwise-content">Otherwise Content</div>
        </Otherwise>
      </When>
    )

    expect(screen.queryByTestId('when-content')).not.toBeInTheDocument()
    expect(screen.getByTestId('otherwise-content')).toBeInTheDocument()
    expect(screen.getByText('Otherwise Content')).toBeVisible()
  })

  //------------------------------------------------------------------//
  // Multiple chained When blocks
  //------------------------------------------------------------------//
  it('renders first true When in a chain and skips the rest', () => {
    render(
      <When condition={false}>
        <div data-testid="first">First (false)</div>
        <When condition={true}>
          <div data-testid="second">Second (true)</div>
        </When>
        <When condition={true}>
          <div data-testid="third">Third (should skip)</div>
        </When>
        <Otherwise>
          <div data-testid="otherwise">Otherwise</div>
        </Otherwise>
      </When>
    )

    //only the first matching true When should render
    expect(screen.queryByTestId('first')).not.toBeInTheDocument()
    expect(screen.getByTestId('second')).toBeInTheDocument()
    expect(screen.queryByTestId('third')).not.toBeInTheDocument()
    expect(screen.queryByTestId('otherwise')).not.toBeInTheDocument()
  })

  //------------------------------------------------------------------//
  // All conditions false falls to Otherwise
  //------------------------------------------------------------------//
  it('falls back to Otherwise when all When are false', () => {
    render(
      <When condition={false}>
        <div data-testid="first">First (false)</div>
        <When condition={false}>
          <div data-testid="second">Second (false)</div>
        </When>
        <Otherwise>
          <div data-testid="otherwise">Otherwise</div>
        </Otherwise>
      </When>
    )

    expect(screen.queryByTestId('first')).not.toBeInTheDocument()
    expect(screen.queryByTestId('second')).not.toBeInTheDocument()
    expect(screen.getByTestId('otherwise')).toBeInTheDocument()
  })

  //------------------------------------------------------------------//
  // All false and no Otherwise
  //------------------------------------------------------------------//
  it('renders nothing when all conditions false and no Otherwise', () => {
    render(
      <When condition={false}>
        <div data-testid="first">First (false)</div>
        <When condition={false}>
          <div data-testid="second">Second (false)</div>
        </When>
      </When>
    )

    //verify no blocks rendered
    expect(screen.queryByTestId('first')).not.toBeInTheDocument()
    expect(screen.queryByTestId('second')).not.toBeInTheDocument()
  })
})