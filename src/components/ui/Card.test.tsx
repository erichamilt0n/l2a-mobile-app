import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText(/card content/i)).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Card content</Card>)
    const card = screen.getByText(/card content/i).closest('div')
    expect(card).toHaveClass('custom-class')
  })
})
