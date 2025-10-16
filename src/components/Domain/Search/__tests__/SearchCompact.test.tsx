import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { SearchCompact } from '../SearchCompact';

describe('SearchCompact', () => {
  it('envia os valores do formulario ao clicar em Buscar', () => {
    const handleSubmit = vi.fn();

    render(<SearchCompact onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText('Destino'), { target: { value: 'Rio de Janeiro' } });
    fireEvent.change(screen.getByLabelText('Check-in'), { target: { value: '2024-11-10' } });
    fireEvent.change(screen.getByLabelText('Check-out'), { target: { value: '2024-11-15' } });
    fireEvent.change(screen.getByLabelText('Quantidade de adultos'), { target: { value: '3' } });

    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(handleSubmit).toHaveBeenCalledWith({
      location: 'Rio de Janeiro',
      dateRange: { checkIn: '2024-11-10', checkOut: '2024-11-15' },
      guests: { adults: 3, children: 0, infants: 0 },
    });
  });
});
