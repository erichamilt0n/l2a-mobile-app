import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProShop from './ProShop'

describe('ProShop', () => {
  const renderProShop = () => {
    render(
      <BrowserRouter>
        <ProShop />
      </BrowserRouter>
    )
  }

  it('renders the pro shop header and description', () => {
    renderProShop()
    expect(screen.getByText('Pro Shop')).toBeInTheDocument()
    expect(screen.getByText('Browse our collection of premium equipment')).toBeInTheDocument()
  })

  it('renders all category filter buttons', () => {
    renderProShop()
    expect(screen.getByText('All Products')).toBeInTheDocument()
    
    // Check for categories in the filter buttons
    const filterButtons = screen.getAllByRole('button', { name: /^(Firearms|Accessories|Optics)$/ })
    expect(filterButtons).toHaveLength(3)
    expect(filterButtons[0]).toHaveTextContent('Firearms')
    expect(filterButtons[1]).toHaveTextContent('Accessories')
    expect(filterButtons[2]).toHaveTextContent('Optics')
  })

  it('renders all products with correct information', () => {
    renderProShop()
    
    // Check for specific products
    expect(screen.getByText('Sim Pistol')).toBeInTheDocument()
    expect(screen.getByText('$499.99')).toBeInTheDocument()
    
    expect(screen.getByText('Premium Ammunition')).toBeInTheDocument()
    expect(screen.getByText('$49.99')).toBeInTheDocument()
    
    expect(screen.getByText('Lodge2A Hat')).toBeInTheDocument()
    expect(screen.getByText('$24.99')).toBeInTheDocument()
    
    expect(screen.getByText('Trijicon Rental')).toBeInTheDocument()
    expect(screen.getByText('$79.99')).toBeInTheDocument()
    
    expect(screen.getByText('Holosun Optic')).toBeInTheDocument()
    expect(screen.getByText('$299.99')).toBeInTheDocument()
  })

  it('renders product categories correctly', () => {
    renderProShop()
    expect(screen.getByText('All Products')).toBeInTheDocument()
    
    // Check for categories in the filter buttons
    const filterButtons = screen.getAllByRole('button')
    expect(filterButtons.some(button => button.textContent === 'Firearms')).toBe(true)
    expect(filterButtons.some(button => button.textContent === 'Accessories')).toBe(true)
    expect(filterButtons.some(button => button.textContent === 'Optics')).toBe(true)
  })

  it('renders add to cart buttons for all products', () => {
    renderProShop()
    const addToCartButtons = screen.getAllByText('Add to Cart')
    expect(addToCartButtons).toHaveLength(5) // We have 5 products in total
  })

  it('renders shopping cart preview button', () => {
    renderProShop()
    // The shopping cart button is identified by its SVG, so we'll look for its container
    const cartButton = screen.getByRole('button', { name: '' }) // The floating cart button has no text
    expect(cartButton).toBeInTheDocument()
    expect(cartButton).toHaveClass("p-4 bg-[#333e48] text-white rounded-full")
  })
})
