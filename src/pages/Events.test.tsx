import React from 'react'
import { render, screen } from '@testing-library/react'
import Events from './Events'

describe('Events', () => {
  it('renders the events page title', () => {
    render(<Events />)
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument()
    expect(screen.getByText('Register for tournaments and training sessions')).toBeInTheDocument()
  })

  it('renders all event category buttons', () => {
    render(<Events />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.some(button => button.textContent === 'All Events')).toBe(true)
    expect(buttons.some(button => button.textContent === 'Tournaments')).toBe(true)
    expect(buttons.some(button => button.textContent === 'Training')).toBe(true)
    expect(buttons.some(button => button.textContent === 'Social')).toBe(true)
  })

  it('renders all events with correct information', () => {
    render(<Events />)

    // Check for event titles
    expect(screen.getByText('Winter Tournament')).toBeInTheDocument()
    expect(screen.getByText('Pro Training Session')).toBeInTheDocument()
    expect(screen.getByText('Christmas Social')).toBeInTheDocument()

    // Check for event dates and times
    expect(screen.getByText(/Dec 20, 2024.*2:00 PM/)).toBeInTheDocument()
    expect(screen.getByText(/Dec 22, 2024.*10:00 AM/)).toBeInTheDocument()
    expect(screen.getByText(/Dec 24, 2024.*1:00 PM/)).toBeInTheDocument()

    // Check for spots left
    expect(screen.getByText('8 spots left')).toBeInTheDocument()
    expect(screen.getByText('4 spots left')).toBeInTheDocument()
    expect(screen.getByText('12 spots left')).toBeInTheDocument()
  })

  it('renders correct button text based on event status', () => {
    render(<Events />)

    const registerButtons = screen.getAllByText('Register Now')
    expect(registerButtons).toHaveLength(2) // Two events are 'open'

    const waitlistButtons = screen.getAllByText('Waitlist')
    expect(waitlistButtons).toHaveLength(1) // One event is 'waitlist'
  })

  it('renders the calendar view button', () => {
    render(<Events />)
    const calendarButton = screen.getByText('View Calendar')
    expect(calendarButton).toBeInTheDocument()
  })

  it('applies correct styling for different event types', () => {
    render(<Events />)

    // Find all event type badges (spans) that contain the type text
    const eventTypes = screen
      .getAllByText(/Tournament|Training|Social/)
      .filter(element => element.tagName.toLowerCase() === 'span')

    const tournamentType = eventTypes.find(type => type.textContent === 'Tournament')
    const socialType = eventTypes.find(type => type.textContent === 'Social')
    const trainingType = eventTypes.find(type => type.textContent === 'Training')

    expect(tournamentType).toHaveClass('bg-blue-100', 'text-blue-800')
    expect(socialType).toHaveClass('bg-red-100', 'text-red-800')
    expect(trainingType).toHaveClass('bg-purple-100', 'text-purple-800')
  })
})
