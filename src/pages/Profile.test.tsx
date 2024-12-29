import { render, screen } from '@testing-library/react'
import Profile from './Profile'

describe('Profile', () => {
  it('renders the profile page', () => {
    render(<Profile />)
    expect(screen.getByText(/profile/i)).toBeInTheDocument()
  })
})
