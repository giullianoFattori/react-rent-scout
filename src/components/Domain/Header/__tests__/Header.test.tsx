import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Header } from '../Header';

describe('Header', () => {
  it('aciona o callback de login quando o botao e clicado', () => {
    const onLogin = vi.fn();

    render(
      <MemoryRouter>
        <Header onLogin={onLogin} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'Login' })[0]);

    expect(onLogin).toHaveBeenCalledTimes(1);
  });
});
