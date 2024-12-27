import React from 'react'
import { render, screen } from '@testing-library/react'
import Settings from './Settings'
import { BrowserRouter } from 'react-router-dom'

const renderSettings = () => {
  render(
    <BrowserRouter>
      <Settings />
    </BrowserRouter>
  )
}

describe('Settings', () => {
  describe('Personal Information Section', () => {
    beforeEach(() => {
      renderSettings()
    })

    it('renders personal information section header', () => {
      expect(screen.getByText('Personal Information')).toBeInTheDocument()
      expect(screen.getByText('Update your personal details')).toBeInTheDocument()
    })

    it('displays user information', () => {
      expect(screen.getByText('john.rambo@badass.com')).toBeInTheDocument()
      expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
      expect(screen.getByText('123 Main Street')).toBeInTheDocument()
      expect(screen.getByText('Hope')).toBeInTheDocument()
      expect(screen.getByText('WA')).toBeInTheDocument()
      expect(screen.getByText('98826')).toBeInTheDocument()
    })

    it('displays edit profile button', () => {
      const button = screen.getByText('Edit Profile')
      expect(button).toBeInTheDocument()
      expect(button.closest('button')).toHaveClass('bg-[#333e48]')
    })
  })

  describe('Payment History Section', () => {
    beforeEach(() => {
      renderSettings()
    })

    it('renders payment history section header', () => {
      expect(screen.getByText('Payment History')).toBeInTheDocument()
      expect(screen.getByText('View and manage your billing information')).toBeInTheDocument()
    })

    it('displays payment history entries', () => {
      expect(screen.getByText('Bay Reservation - 2 Hours')).toBeInTheDocument()
      expect(screen.getByText('Pro Shop Purchase - Golf Balls')).toBeInTheDocument()
      expect(screen.getByText('Monthly Membership Fee')).toBeInTheDocument()
      expect(screen.getByText('Table Reservation - Dinner')).toBeInTheDocument()
    })

    it('displays payment status with correct styling', () => {
      const completedStatus = screen.getAllByText('Completed')[0]
      expect(completedStatus).toHaveClass('bg-green-100 text-green-800')
    })

    it('displays payment action buttons', () => {
      expect(screen.getByText('Edit Billing')).toBeInTheDocument()
      expect(screen.getByText('View All')).toBeInTheDocument()
    })
  })

  describe('Notification Settings Section', () => {
    beforeEach(() => {
      renderSettings()
    })

    it('renders notification settings section', () => {
      expect(screen.getByText('Notifications')).toBeInTheDocument()
    })

    it('displays notification options', () => {
      expect(screen.getByText('Email Notifications')).toBeInTheDocument()
      expect(screen.getByText('Push Notifications')).toBeInTheDocument()
      expect(screen.getByText('Receive updates about your reservations')).toBeInTheDocument()
      expect(screen.getByText('Get alerts on your mobile device')).toBeInTheDocument()
    })

    it('renders notification toggles', () => {
      const toggleInputs = screen.getAllByRole('checkbox')
      expect(toggleInputs).toHaveLength(5)
      toggleInputs.forEach(toggle => {
        expect(toggle).toBeInTheDocument()
      })
    })
  })

  describe('Display Section', () => {
    beforeEach(() => {
      renderSettings()
    })

    it('renders display section', () => {
      expect(screen.getByText('Display')).toBeInTheDocument()
    })
  })
})
