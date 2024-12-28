import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

describe('Dashboard', () => {
  it('renders dashboard', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    // Check for the welcome message
    expect(screen.getByText(/Welcome Back, John/i)).toBeInTheDocument();
    
    // Check for main sections
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    
    // Check for stats
    expect(screen.getByText('Upcoming Reservations')).toBeInTheDocument();
    expect(screen.getByText('Events This Week')).toBeInTheDocument();
    expect(screen.getByText('Average Score')).toBeInTheDocument();
    expect(screen.getByText('Pro Shop Points')).toBeInTheDocument();
  });
}); 