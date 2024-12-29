import { render, screen } from '@testing-library/react'
import ProShop from './ProShop'

describe('ProShop', () => {
  it('renders the pro shop page', () => {
    render(<ProShop />)
    expect(screen.getByText(/pro shop/i)).toBeInTheDocument()
  })
})
