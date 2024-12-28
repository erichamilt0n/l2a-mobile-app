import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';

describe('Calendar', () => {
  const mockOnDateSelect = vi.fn();

  it('renders calendar component', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} />);
    
    // Look for the month selector which we know exists
    expect(screen.getByLabelText('select-month')).toBeInTheDocument();
    expect(screen.getByLabelText('select-year')).toBeInTheDocument();
  });

  it('has navigation buttons', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} />);
    
    expect(screen.getByLabelText('previous-month')).toBeInTheDocument();
    expect(screen.getByLabelText('next-month')).toBeInTheDocument();
  });
});
