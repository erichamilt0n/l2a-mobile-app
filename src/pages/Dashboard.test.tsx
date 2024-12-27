import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard'

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('Dashboard', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders the welcome message and description', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText('Welcome Back, John')).toBeInTheDocument()
    expect(screen.getByText("Here's what's happening at Lodge2A")).toBeInTheDocument()
  })

  it('renders all stat cards with correct information', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    // Check stat card titles
    expect(screen.getByText('Upcoming Reservations')).toBeInTheDocument()
    expect(screen.getByText('Events This Week')).toBeInTheDocument()
    expect(screen.getByText('Average Score')).toBeInTheDocument()
    expect(screen.getByText('Pro Shop Points')).toBeInTheDocument()

    // Check stat card values
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('82')).toBeInTheDocument()
    expect(screen.getByText('1,250')).toBeInTheDocument()
  })

  it('navigates to correct pages when stat cards are clicked', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    // Click each stat card and verify navigation
    fireEvent.click(screen.getByText('Upcoming Reservations'))
    expect(mockNavigate).toHaveBeenCalledWith('/reservations')

    fireEvent.click(screen.getByText('Events This Week'))
    expect(mockNavigate).toHaveBeenCalledWith('/events')

    fireEvent.click(screen.getByText('Average Score'))
    expect(mockNavigate).toHaveBeenCalledWith('/scores')

    fireEvent.click(screen.getByText('Pro Shop Points'))
    expect(mockNavigate).toHaveBeenCalledWith('/pro-shop')
  })

  it('renders recent activity section with correct information', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    // Check section title
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()

    // Check activity entries
    const recentActivitySection = screen.getByText('Recent Activity').closest('div')?.parentElement
    expect(recentActivitySection).toBeInTheDocument()
    
    // Check bay reservations within the recent activity section
    expect(within(recentActivitySection!).getAllByText(/Bay Reservation/)).toHaveLength(3)
    expect(within(recentActivitySection!).getAllByText(/2 hours - Bay/)).toHaveLength(3)
    expect(within(recentActivitySection!).getByText('Dec 5, 2024')).toBeInTheDocument()
    expect(within(recentActivitySection!).getByText('Dec 10, 2024')).toBeInTheDocument()
    expect(within(recentActivitySection!).getByText('Dec 15, 2024')).toBeInTheDocument()
  })

  it('renders upcoming events section with correct information', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    // Check section title
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument()

    // Check event entries
    const upcomingEventsSection = screen.getByText('Upcoming Events').closest('div')?.parentElement
    expect(upcomingEventsSection).toBeInTheDocument()
    
    // Check tournament entries within the upcoming events section
    within(upcomingEventsSection!).getAllByText(/Tournament/).forEach((element, index) => {
      expect(element).toHaveTextContent(`Tournament ${index + 1}`)
    })
    expect(within(upcomingEventsSection!).getAllByText('18 holes - Singles')).toHaveLength(3)
    expect(within(upcomingEventsSection!).getByText('Dec 10, 2024')).toBeInTheDocument()
    expect(within(upcomingEventsSection!).getByText('Dec 20, 2024')).toBeInTheDocument()
    expect(within(upcomingEventsSection!).getByText('Dec 30, 2024')).toBeInTheDocument()
  })

  it('navigates to events page when View All button is clicked', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    const viewAllButtons = screen.getAllByText('View All')
    expect(viewAllButtons).toHaveLength(2)

    // Click the View All button in the Upcoming Events section
    fireEvent.click(viewAllButtons[1])
    expect(mockNavigate).toHaveBeenCalledWith('/events')
  })
})
