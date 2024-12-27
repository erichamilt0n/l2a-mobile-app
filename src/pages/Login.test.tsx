import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('Login', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders login form with all elements', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    // Check for main elements
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument()
  })

  it('handles successful login', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    // Fill in correct credentials
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'member@email.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    })

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'Sign In' }))

    // Check navigation
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    expect(screen.queryByText('Invalid email or password')).not.toBeInTheDocument()
  })

  it('handles failed login', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    // Fill in incorrect credentials
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'wrong@email.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' },
    })

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'Sign In' }))

    // Check error message
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('requires email and password fields', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    // Try to submit without filling in fields
    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    fireEvent.click(submitButton)

    // Form shouldn't submit due to HTML5 validation
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('updates input values on change', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')

    // Type in email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect(emailInput).toHaveValue('test@example.com')

    // Type in password
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } })
    expect(passwordInput).toHaveValue('testpassword')
  })
})
