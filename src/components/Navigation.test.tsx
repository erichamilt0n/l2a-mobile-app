import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test-utils'
import Navigation from './Navigation'

describe('Navigation', () => {
  it('renders navigation component', () => {
    renderWithRouter(<Navigation isOpen onClose={vi.fn()} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
