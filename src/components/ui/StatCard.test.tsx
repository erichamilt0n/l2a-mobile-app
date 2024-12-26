import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders title and value correctly', () => {
    render(<StatCard title="Test Title" value="42" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<StatCard title="Test" value="42" className="custom-class" />);
    const card = screen.getByText('Test').parentElement?.parentElement;
    expect(card).toHaveClass('custom-class');
  });
});
