import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Events from './Events'
import { BrowserRouter } from 'react-router-dom'

describe('Events Component', () => {
  it('renders without crashing', () => {
    render(<Events />, { wrapper: BrowserRouter })
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument()
  })
})
