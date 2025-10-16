import { render, screen } from '@testing-library/react';

import { HomePage } from '..';

describe('HomePage', () => {
  it('renders hello world message', () => {
    render(<HomePage />);

    expect(screen.getByText(/olá, mundo!/i)).toBeInTheDocument();
  });
});
