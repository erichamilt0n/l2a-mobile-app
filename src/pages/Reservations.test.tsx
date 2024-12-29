import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Reservations from './Reservations'

vi.mock('../components/icons', () => ({
  BayIcon: () => <div data-testid="bay-icon">Bay Icon</div>,
  TableIcon: () => <div data-testid="table-icon">Table Icon</div>,
}))

describe('Reservations', () => {
  const renderReservations = () => {
    render(
      <BrowserRouter>
        <Reservations />
      </BrowserRouter>
    )
  }

  it('renders reservation page header', () => {
    renderReservations()
    expect(screen.getByText('Make a Reservation')).toBeInTheDocument()
    expect(screen.getByText('Book your bay or table')).toBeInTheDocument()
  })

  describe('Reservation Type Selection', () => {
    it('renders reservation type buttons', () => {
      renderReservations()
      expect(screen.getByText('Bay Reservation')).toBeInTheDocument()
      expect(screen.getByText('Table Reservation')).toBeInTheDocument()
      expect(screen.getByTestId('bay-icon')).toBeInTheDocument()
      expect(screen.getByTestId('table-icon')).toBeInTheDocument()
    })
  })

  describe('Date Selection', () => {
    it('renders date selection section', () => {
      renderReservations()
      expect(screen.getByText('Select Date')).toBeInTheDocument()
    })

    it('displays 7 date buttons', () => {
      renderReservations()
      const today = new Date()
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

      // Get all date buttons
      const dateButtons = screen.getAllByRole('button').filter(button => {
        const text = button.textContent
        return dayNames.some(day => text?.includes(day))
      })

      expect(dateButtons).toHaveLength(7)

      // Check if first date is today
      const todayShort = today.toLocaleDateString('en-US', { weekday: 'short' })
      const todayDate = today.getDate().toString()
      expect(dateButtons[0].textContent).toContain(todayShort)
      expect(dateButtons[0].textContent).toContain(todayDate)
    })
  })

  describe('Time Selection', () => {
    it('renders time selection section', () => {
      renderReservations()
      expect(screen.getByText('Select Time')).toBeInTheDocument()
    })

    it('displays all time slots', () => {
      renderReservations()
      expect(screen.getByText('9:00 AM')).toBeInTheDocument()
      expect(screen.getByText('10:00 AM')).toBeInTheDocument()
      expect(screen.getByText('11:00 AM')).toBeInTheDocument()
      expect(screen.getByText('12:00 PM')).toBeInTheDocument()
      expect(screen.getByText('1:00 PM')).toBeInTheDocument()
      expect(screen.getByText('2:00 PM')).toBeInTheDocument()
    })

    it('disables unavailable time slots', () => {
      renderReservations()
      const tenAMSlot = screen.getByText('10:00 AM').closest('button')
      const onePMSlot = screen.getByText('1:00 PM').closest('button')

      expect(tenAMSlot).toBeDisabled()
      expect(onePMSlot).toBeDisabled()
    })

    it('enables available time slots', () => {
      renderReservations()
      const nineAMSlot = screen.getByText('9:00 AM').closest('button')
      const elevenAMSlot = screen.getByText('11:00 AM').closest('button')
      const twoPMSlot = screen.getByText('2:00 PM').closest('button')

      expect(nineAMSlot).not.toBeDisabled()
      expect(elevenAMSlot).not.toBeDisabled()
      expect(twoPMSlot).not.toBeDisabled()
    })
  })

  describe('Guest Count Selection', () => {
    it('renders guest count section', () => {
      renderReservations()
      expect(screen.getByText('Number of Guests')).toBeInTheDocument()
    })

    it('allows guest count selection', async () => {
      const user = userEvent.setup()
      renderReservations()
      const decrementButton = screen.getByLabelText('Decrease guest count')
      const incrementButton = screen.getByLabelText('Increase guest count')
      const guestCount = screen.getByLabelText('Guest count')

      expect(guestCount).toHaveTextContent('1')
      expect(decrementButton).toBeDisabled() // Can't go below 1

      // Increment guest count
      await user.click(incrementButton)
      expect(guestCount).toHaveTextContent('2')
      expect(decrementButton).not.toBeDisabled()

      // Decrement guest count
      await user.click(decrementButton)
      expect(guestCount).toHaveTextContent('1')
      expect(decrementButton).toBeDisabled()
    })
  })

  it('renders complete reservation button', () => {
    renderReservations()
    const completeButton = screen.getByText('Complete Reservation')
    expect(completeButton).toBeInTheDocument()
    expect(completeButton.closest('button')).toHaveClass(
      'p-4 md:p-6 rounded-xl transition-colors bg-[#2d3339] hover:bg-[#3a424a] text-white w-full'
    )
  })
})
