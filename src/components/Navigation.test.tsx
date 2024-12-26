import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Navigation from './Navigation'
import { MobileMenuButton } from './Navigation'

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('Navigation', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders navigation items', () => {
    render(
      <BrowserRouter>
        <Navigation isOpen={true} onClose={mockOnClose} />
      </BrowserRouter>
    )

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Reservations')).toBeInTheDocument()
    expect(screen.getByText('Events')).toBeInTheDocument()
    expect(screen.getByText('Stats')).toBeInTheDocument()
    expect(screen.getByText('Pro Shop')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('calls onClose when clicking overlay', () => {
    render(
      <BrowserRouter>
        <Navigation isOpen={true} onClose={mockOnClose} />
      </BrowserRouter>
    )

    const overlay = screen.getByTestId('navigation-overlay')
    fireEvent.click(overlay)
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('calls onClose when clicking a navigation item', () => {
    render(
      <BrowserRouter>
        <Navigation isOpen={true} onClose={mockOnClose} />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByText('Dashboard'))
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('navigates to home on logout', () => {
    render(
      <BrowserRouter>
        <Navigation isOpen={true} onClose={mockOnClose} />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByText('Logout'))
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('closes on mouse leave in tablet mode', () => {
    render(
      <BrowserRouter>
        <Navigation isOpen={true} onClose={mockOnClose} />
      </BrowserRouter>
    )

    const sidebar = screen.getByTestId('navigation-sidebar')
    fireEvent.mouseLeave(sidebar)
    expect(mockOnClose).toHaveBeenCalled()
  })
})

describe('MobileMenuButton', () => {
  it('renders and handles click', () => {
    const mockOnClick = jest.fn()
    render(<MobileMenuButton onClick={mockOnClick} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockOnClick).toHaveBeenCalled()
  })
})
