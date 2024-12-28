import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

// Create a wrapper component that provides router context
const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Navigation', () => {
  it('renders navigation component', () => {
    renderWithRouter(
      <Navigation isOpen={true} onClose={vi.fn()} />
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
