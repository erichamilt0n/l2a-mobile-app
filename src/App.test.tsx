import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText(/App/i)).toBeInTheDocument();
  });
});
