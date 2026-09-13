import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import HomePage from './HomePage.jsx';

describe('HomePage', () => {
  it('renders a link to the jamo list', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const jamoLink = screen.getByRole('link', { name: /jamo/i });
    expect(jamoLink).toHaveAttribute('href', '/jamo');
  });

  it('renders a link to the sound change rules list', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const rulesLink = screen.getByRole('link', { name: /pronunciation rules/i });
    expect(rulesLink).toHaveAttribute('href', '/sound-change-rules');
  });
});