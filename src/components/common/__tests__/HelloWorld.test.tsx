import { render, screen } from '@testing-library/react';

import { HelloWorld } from '../HelloWorld';

describe('HelloWorld', () => {
  it('renders default message', () => {
    render(<HelloWorld />);

    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<HelloWorld message="Olá!" />);

    expect(screen.getByText('Olá!')).toBeInTheDocument();
  });
});
