import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Settings from './Settings'
import { BrowserRouter } from 'react-router-dom'

describe('Settings Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Settings />
      </BrowserRouter>
    )
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })
})
