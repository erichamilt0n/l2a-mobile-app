import { render, screen, fireEvent } from '@testing-library/react'
import Stats from './Stats'

describe('Stats', () => {
  const renderStats = () => {
    return render(<Stats />)
  }

  it('renders the stats overview section', () => {
    renderStats()
    expect(screen.getByText('Your Stats')).toBeInTheDocument()
    expect(screen.getByText('Track your performance and progress')).toBeInTheDocument()
  })

  it('displays all stat cards with correct values', () => {
    renderStats()
    expect(screen.getByText('Titles Played')).toBeInTheDocument()
    expect(screen.getByText('24')).toBeInTheDocument()
    expect(screen.getByText('Average Score')).toBeInTheDocument()
    expect(screen.getByText('714')).toBeInTheDocument()
    expect(screen.getByText('Best Score')).toBeInTheDocument()
    expect(screen.getByText('1,075')).toBeInTheDocument()
    expect(screen.getByText('Hours Played')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it('displays recent scores section', () => {
    renderStats()
    expect(screen.getByText('Recent Scores')).toBeInTheDocument()
    const courseElements = screen.getAllByText('Lodge2A Main Course')
    expect(courseElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Dec 15, 2024')).toBeInTheDocument()
    expect(screen.getByText('82')).toBeInTheDocument()
  })

  it('displays score distribution chart', () => {
    renderStats()
    expect(screen.getByText('Score Distribution')).toBeInTheDocument()
    const chartElement = screen.getByTestId('score-distribution-chart')
    expect(chartElement).toBeInTheDocument()
  })

  it('displays achievements section', () => {
    renderStats()
    expect(screen.getByText('Achievements')).toBeInTheDocument()
    const viewAllButton = screen.getAllByText('View All').find(el => 
      el.closest('button')?.className.includes('text-blue-500')
    )
    expect(viewAllButton).toBeInTheDocument()
  })

  it('handles time period filter changes', () => {
    renderStats()
    const filterButton = screen.getByRole('button', { name: /Last 30 Days/i })
    expect(filterButton).toBeInTheDocument()
    fireEvent.click(filterButton)
    // Check if dropdown opens
    expect(screen.getByText('Last 7 Days')).toBeInTheDocument()
    expect(screen.getByText('Last 90 Days')).toBeInTheDocument()
    expect(screen.getByText('All Time')).toBeInTheDocument()
  })

  it('displays correct chart data based on selected time period', () => {
    renderStats()
    const filterButton = screen.getByRole('button', { name: /Last 30 Days/i })
    fireEvent.click(filterButton)
    const sevenDaysOption = screen.getByText('Last 7 Days')
    fireEvent.click(sevenDaysOption)
    // Verify chart updates
    const chartElement = screen.getByTestId('score-distribution-chart')
    expect(chartElement).toHaveAttribute('data-period', '7')
  })

  it('handles achievement card interactions', () => {
    renderStats()
    const achievementCards = screen.getAllByTestId('achievement-card')
    expect(achievementCards.length).toBeGreaterThan(0)
    fireEvent.click(achievementCards[0])
    // Verify achievement details modal/popup
    expect(screen.getByTestId('achievement-details')).toBeInTheDocument()
  })
})
