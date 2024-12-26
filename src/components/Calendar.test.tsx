import { render, screen, fireEvent } from '@testing-library/react'
import Calendar from './Calendar'

describe('Calendar', () => {
  const mockOnDateSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock current date to ensure consistent testing
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2024, 0, 1)) // January 1, 2024
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders calendar with correct month and year', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} />)

    expect(screen.getByText('January')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('renders weekday headers', () => {
    render(<Calendar />)

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    weekdays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })

  it('handles month navigation', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} />)

    // Navigate to next month
    fireEvent.click(screen.getByLabelText('next-month'))
    expect(screen.getByText('February')).toBeInTheDocument()

    // Navigate to previous month
    fireEvent.click(screen.getByLabelText('previous-month'))
    expect(screen.getByText('January')).toBeInTheDocument()
  })

  it('handles year navigation', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} />)

    // Change year using select
    fireEvent.change(screen.getByLabelText('select-year'), { target: { value: '2025' } })
    expect(screen.getByText('2025')).toBeInTheDocument()
  })

  it('handles month selection', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} />)

    // Change month using select
    fireEvent.change(screen.getByLabelText('select-month'), { target: { value: '6' } })
    expect(screen.getByText('July')).toBeInTheDocument()
  })

  it('calls onDateSelect when clicking a date', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} selectedDate={new Date(2024, 0, 1)} />)

    // Click on a date in the current month
    fireEvent.click(screen.getByText('15'))
    expect(mockOnDateSelect).toHaveBeenCalledWith(new Date(2024, 0, 15))
  })

  it('respects minDate and maxDate constraints', () => {
    const minDate = new Date(2024, 0, 5)
    const maxDate = new Date(2024, 0, 25)

    render(
      <Calendar
        onDateSelect={mockOnDateSelect}
        selectedDate={new Date(2024, 0, 15)}
        minDate={minDate}
        maxDate={maxDate}
      />
    )

    // Find all date buttons
    const dateButtons = screen.getAllByRole('button').filter(button => {
      const text = button.textContent
      return (
        text &&
        !isNaN(parseInt(text)) &&
        button.getAttribute('aria-label') !== 'next-month' &&
        button.getAttribute('aria-label') !== 'previous-month'
      )
    })

    // Find the first date button for January 3rd (should be disabled)
    const earlyDate = dateButtons.find(
      button => button.textContent === '3' && !button.classList.contains('text-gray-600')
    )
    expect(earlyDate).toBeDefined()
    expect(earlyDate).toBeDisabled()

    // Find the date button for January 27th (should be disabled)
    const lateDate = dateButtons.find(button => button.textContent === '27')
    expect(lateDate).toBeDefined()
    expect(lateDate).toBeDisabled()

    // Find the date button for January 15th (should be enabled)
    const validDate = dateButtons.find(button => button.textContent === '15')
    expect(validDate).toBeDefined()
    expect(validDate).not.toBeDisabled()
  })

  it('handles year wrap around when navigating months', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} selectedDate={new Date(2024, 11, 1)} />)

    // Navigate to next month (should wrap to January next year)
    fireEvent.click(screen.getByLabelText('next-month'))
    expect(screen.getByText('January')).toBeInTheDocument()
    expect(screen.getByText('2025')).toBeInTheDocument()

    // Navigate back
    fireEvent.click(screen.getByLabelText('previous-month'))
    expect(screen.getByText('December')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
  })
})
