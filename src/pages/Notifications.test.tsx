import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Notifications from './Notifications'

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

describe('Notifications', () => {
  const renderNotifications = () => {
    render(
      <BrowserRouter>
        <Notifications />
      </BrowserRouter>
    )
  }

  it('renders notification preferences header', () => {
    renderNotifications()
    expect(screen.getByText('Notification Preferences')).toBeInTheDocument()
    expect(screen.getByText('Manage your notification settings')).toBeInTheDocument()
  })

  it('renders all notification settings', () => {
    renderNotifications()
    
    // Check for all notification titles
    expect(screen.getByText('Email Notifications')).toBeInTheDocument()
    expect(screen.getByText('SMS Notifications')).toBeInTheDocument()
    expect(screen.getByText('Marketing Notifications')).toBeInTheDocument()
    expect(screen.getByText('Reservations Notifications')).toBeInTheDocument()

    // Check for all notification descriptions
    expect(screen.getByText('Receive notifications about email updates')).toBeInTheDocument()
    expect(screen.getByText('Receive notifications about sms updates')).toBeInTheDocument()
    expect(screen.getByText('Receive notifications about marketing updates')).toBeInTheDocument()
    expect(screen.getByText('Receive notifications about reservations updates')).toBeInTheDocument()
  })

  it('renders toggle buttons with correct initial states', () => {
    renderNotifications()
    
    const toggleButtons = screen.getAllByRole('button')
    expect(toggleButtons).toHaveLength(4)

    // Check initial states based on the component's initial state
    expect(toggleButtons[0]).toHaveClass('bg-[#333e48]') // Email - enabled
    expect(toggleButtons[1]).toHaveClass('bg-gray-200') // SMS - disabled
    expect(toggleButtons[2]).toHaveClass('bg-[#333e48]') // Marketing - enabled
    expect(toggleButtons[3]).toHaveClass('bg-[#333e48]') // Reservations - enabled
  })

  it('toggles notification settings when clicked', () => {
    renderNotifications()
    
    const toggleButtons = screen.getAllByRole('button')

    // Toggle email notifications (initially enabled)
    fireEvent.click(toggleButtons[0])
    expect(toggleButtons[0]).toHaveClass('bg-gray-200')

    // Toggle SMS notifications (initially disabled)
    fireEvent.click(toggleButtons[1])
    expect(toggleButtons[1]).toHaveClass('bg-[#333e48]')

    // Toggle marketing notifications (initially enabled)
    fireEvent.click(toggleButtons[2])
    expect(toggleButtons[2]).toHaveClass('bg-gray-200')

    // Toggle reservations notifications (initially enabled)
    fireEvent.click(toggleButtons[3])
    expect(toggleButtons[3]).toHaveClass('bg-gray-200')
  })

  it('updates toggle button appearance when clicked', () => {
    renderNotifications()
    
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
})
