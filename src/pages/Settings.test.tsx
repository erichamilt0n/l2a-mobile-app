import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Settings from './Settings'

describe('Settings', () => {
  const renderSettings = () => {
    render(
      <BrowserRouter>
        <Settings />
      </BrowserRouter>
    )
  }

  it('renders settings header', () => {
    renderSettings()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  describe('Personal Information Section', () => {
    beforeEach(() => {
      renderSettings()
    })

    it('renders personal information section header', () => {
      expect(screen.getByText('Personal Information')).toBeInTheDocument()
      expect(screen.getByText('Update your personal details')).toBeInTheDocument()
    })

    it('renders edit profile button', () => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument()
    })

    it('displays user information correctly', () => {
      expect(screen.getByText('john.rambo@badass.com')).toBeInTheDocument()
      expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
      expect(screen.getByText('123 Main Street')).toBeInTheDocument()
      expect(screen.getByText('Hope')).toBeInTheDocument()
      expect(screen.getByText('WA')).toBeInTheDocument()
      expect(screen.getByText('98826')).toBeInTheDocument()
    })

    it('renders all personal information field labels', () => {
      const labels = ['Email', 'Phone', 'Address', 'City', 'State', 'Zip']
      labels.forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument()
      })
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

    it('renders billing action buttons', () => {
      expect(screen.getByText('Edit Billing')).toBeInTheDocument()
      expect(screen.getByText('View All')).toBeInTheDocument()
    })

    it('displays payment history entries', () => {
      // Check for payment descriptions
      expect(screen.getByText('Bay Reservation - 2 Hours')).toBeInTheDocument()
      expect(screen.getByText('Pro Shop Purchase - Golf Balls')).toBeInTheDocument()
      expect(screen.getByText('Monthly Membership Fee')).toBeInTheDocument()
      expect(screen.getByText('Table Reservation - Dinner')).toBeInTheDocument()

      // Check for payment amounts
      expect(screen.getByText('$120.00')).toBeInTheDocument()
      expect(screen.getByText('$45.99')).toBeInTheDocument()
      expect(screen.getByText('$199.99')).toBeInTheDocument()
      expect(screen.getByText('$85.00')).toBeInTheDocument()

      // Check for payment dates
      expect(screen.getByText('Dec 15, 2024')).toBeInTheDocument()
      expect(screen.getByText('Dec 10, 2024')).toBeInTheDocument()
      expect(screen.getByText('Dec 5, 2024')).toBeInTheDocument()
      expect(screen.getByText('Nov 28, 2024')).toBeInTheDocument()
    })
  })

  describe('Status Color Function', () => {
    it('renders status with correct color', () => {
      renderSettings()
      const paymentItems = screen.getAllByText('Completed')
      const firstPaymentStatus = paymentItems[0].closest('span')
      expect(firstPaymentStatus).toHaveClass('bg-green-100', 'text-green-800', 'px-3', 'py-1', 'rounded-full', 'text-sm')
    })
  })
})
