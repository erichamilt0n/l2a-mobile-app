import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Check credentials
    if (email === 'member@email.com' && password === 'password') {
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full max-w-2xl bg-dark-100 p-12 rounded-2xl shadow-2xl">
        <div>
          <div className="w-24 h-24 mx-auto">
            <svg
              className="w-full h-full text-[#333e48]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
            </svg>
          </div>
          <h2 className="mt-8 text-center text-4xl font-bold text-white">Welcome Back</h2>
        </div>
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200">
            {error}
          </div>
        )}
        <form className="mt-12 space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full p-4 bg-white rounded-xl text-black focus:ring-2 focus:ring-[#333e48] focus:outline-none"
                placeholder="member@email.com"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full p-4 bg-white rounded-xl text-black focus:ring-2 focus:ring-[#333e48] focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-lg">
              <a href="#" className="font-medium text-[#333e48] hover:text-[#3f4b57]">
                Forgot Password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#333e48] text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-[#3f4b57] transition-colors"
            >
              Sign In
            </button>
          </div>

          <div className="text-center text-lg">
            <span className="text-gray-400">Don't have an account? </span>
            <a href="#" className="font-medium text-[#333e48] hover:text-[#3f4b57]">
              Sign Up
            </a>
          </div>
          <div className="mt-4 text-center text-gray-400">
            <p>Demo credentials:</p>
            <p>Email: member@email.com</p>
            <p>Password: password</p>
          </div>
        </form>
      </div>
    </div>
  )
}
