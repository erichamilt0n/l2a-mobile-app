import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SettingsLayout from './SettingsLayout'

describe('SettingsLayout', () => {
  const renderSettingsLayout = (props = {}) => {
    const defaultProps = {
      title: 'Test Title',
      description: 'Test Description',
      children: <div>Test Children</div>,
      ...props,
    }

    return render(
      <BrowserRouter>
        <SettingsLayout {...defaultProps} />
      </BrowserRouter>
    )
  }

  it('renders title and description', () => {
    renderSettingsLayout()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders children content', () => {
    renderSettingsLayout()
    expect(screen.getByText('Test Children')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderSettingsLayout()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('Preferences')).toBeInTheDocument()
  })

  it('applies active link styles', () => {
    renderSettingsLayout()
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    // Check that at least one link has the active class
    const hasActiveLink = links.some(link => 
      link.className.includes('bg-dark-100')
    )
    expect(hasActiveLink).toBeTruthy()
  })
})
