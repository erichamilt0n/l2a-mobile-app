import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Preferences from './Preferences';

vi.mock('../components/SettingsLayout', () => ({
  default: ({ children, title, description }: any) => (
    <div data-testid="mock-settings-layout">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  )
}));

describe('Preferences', () => {
  it('renders preferences page', () => {
    render(<Preferences />);
    expect(screen.getByTestId('mock-settings-layout')).toBeInTheDocument();
  });
});
