import React from 'react'
import { BrowserRouter } from 'react-router-dom'

export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>
}
