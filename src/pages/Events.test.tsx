import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Events from './Events'

describe('Events Component', () => {
  it('renders without crashing', () => {
    render(<Events />, { wrapper: BrowserRouter })
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument()
  })
  // ... rest of tests
})
