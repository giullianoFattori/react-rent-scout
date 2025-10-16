import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Home } from '../Home';

describe('Home page', () => {
  it('renders hero text and property suggestions', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Encontre a estadia perfeita/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Sugestões para você/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Ver detalhes/i }).length).toBeGreaterThan(0);
  });
});
