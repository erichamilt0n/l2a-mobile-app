import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

export function renderWithRouter(ui: React.ReactElement) {
  return render(ui, { wrapper: BrowserRouter });
}
