import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Preferences from './Preferences'

jest.mock('../components/SettingsLayout', () => {
  return function MockSettingsLayout({ children, title, description }: any) {
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    )
  }
})

describe('Preferences', () => {
  const renderPreferences = () => {
    render(
      <BrowserRouter>
        <Preferences />
      </BrowserRouter>
    )
  }

  it('renders preferences header', () => {
    renderPreferences()
    expect(screen.getByText('Preferences')).toBeInTheDocument()
    expect(screen.getByText('Customize your application settings')).toBeInTheDocument()
  })

  it('renders all preference settings', () => {
    renderPreferences()
    
    // Check for all preference titles
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
    expect(screen.getByText('Auto Booking')).toBeInTheDocument()
    expect(screen.getByText('Session Reminders')).toBeInTheDocument()

    // Check for all preference descriptions
    expect(screen.getByText('Use dark theme across the application')).toBeInTheDocument()
    expect(screen.getByText('Enable automatic booking for regular sessions')).toBeInTheDocument()
    expect(screen.getByText('Get reminders before your scheduled sessions')).toBeInTheDocument()
  })

  it('renders toggle buttons with correct initial states', () => {
    renderPreferences()
    
    const toggleButtons = screen.getAllByRole('button')
    expect(toggleButtons).toHaveLength(3)

    // Check initial states based on the component's initial state
    expect(toggleButtons[0]).toHaveClass('bg-[#333e48]') // Dark Mode - enabled
    expect(toggleButtons[1]).toHaveClass('bg-gray-200') // Auto Booking - disabled
    expect(toggleButtons[2]).toHaveClass('bg-[#333e48]') // Session Reminders - enabled
  })

  it('toggles preference settings when clicked', () => {
    renderPreferences()
    
    const toggleButtons = screen.getAllByRole('button')

    // Toggle Dark Mode (initially enabled)
    fireEvent.click(toggleButtons[0])
    expect(toggleButtons[0]).toHaveClass('bg-gray-200')

    // Toggle Auto Booking (initially disabled)
    fireEvent.click(toggleButtons[1])
    expect(toggleButtons[1]).toHaveClass('bg-[#333e48]')

    // Toggle Session Reminders (initially enabled)
    fireEvent.click(toggleButtons[2])
    expect(toggleButtons[2]).toHaveClass('bg-gray-200')
  })

  it('updates toggle button appearance when clicked', () => {
    renderPreferences()
    
    const toggleButtons = screen.getAllByRole('button')
    const firstToggle = toggleButtons[0]

    // Check initial state
    expect(firstToggle.firstElementChild).toHaveClass('translate-x-6') // Enabled position

    // Toggle off
    fireEvent.click(firstToggle)
    expect(firstToggle.firstElementChild).toHaveClass('translate-x-1') // Disabled position

    // Toggle on again
    fireEvent.click(firstToggle)
    expect(firstToggle.firstElementChild).toHaveClass('translate-x-6') // Back to enabled position
  })

  it('maintains other preferences state when toggling one preference', () => {
    renderPreferences()
    
    const toggleButtons = screen.getAllByRole('button')

    // Initial states
    expect(toggleButtons[0]).toHaveClass('bg-[#333e48]') // Dark Mode - enabled
    expect(toggleButtons[1]).toHaveClass('bg-gray-200') // Auto Booking - disabled
    expect(toggleButtons[2]).toHaveClass('bg-[#333e48]') // Session Reminders - enabled

    // Toggle only Auto Booking
    fireEvent.click(toggleButtons[1])

    // Check that other preferences maintained their state
    expect(toggleButtons[0]).toHaveClass('bg-[#333e48]') // Dark Mode should still be enabled
    expect(toggleButtons[1]).toHaveClass('bg-[#333e48]') // Auto Booking should now be enabled
    expect(toggleButtons[2]).toHaveClass('bg-[#333e48]') // Session Reminders should still be enabled
  })
})
