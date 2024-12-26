import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeInTheDocument()
  })
})
