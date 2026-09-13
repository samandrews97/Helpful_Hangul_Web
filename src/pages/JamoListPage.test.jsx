import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { fetchJson } from '../api.js';
import JamoListPage from './JamoListPage.jsx';

vi.mock('../api.js');

describe('JamoListPage', () => {
  it('renders a link for each jamo returned by the API', async () => {
    fetchJson.mockResolvedValue([
      { id: 1, character: 'ㄱ', name: 'Giyeok' },
      { id: 4, character: 'ㅏ', name: 'A' },
    ]);

    render(
      <MemoryRouter>
        <JamoListPage />
      </MemoryRouter>
    );

    const giyeokLink = await screen.findByRole('link', { name: /giyeok/i });
    expect(giyeokLink).toHaveAttribute('href', '/jamo/1');

    const aLink = screen.getByRole('link', { name: /^ㅏ/ });
    expect(aLink).toHaveAttribute('href', '/jamo/4');
  });
});