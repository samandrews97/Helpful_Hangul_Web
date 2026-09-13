import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { fetchJson } from '../api.js';
import JamoDetailPage from './JamoDetailPage.jsx';

vi.mock('../api.js');

function renderAtJamo(id) {
  render(
    <MemoryRouter initialEntries={[`/jamo/${id}`]}>
      <Routes>
        <Route path="/jamo/:id" element={<JamoDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('JamoDetailPage', () => {
  it('renders the manner line when the jamo has one', async () => {
    fetchJson.mockResolvedValue({
      character: 'ㄱ',
      name: 'Giyeok',
      romanisation: 'g/k',
      jamoType: 'CONSONANT',
      manner: 'PLAIN',
      canBeChoseong: true,
      canBeJungseong: false,
      canBeJongseong: true,
    });

    renderAtJamo(1);

    expect(await screen.findByText(/manner: plain/i)).toBeInTheDocument();
  });

  it('omits the manner line when the jamo has none', async () => {
    fetchJson.mockResolvedValue({
      character: 'ㅏ',
      name: 'A',
      romanisation: 'a',
      jamoType: 'VOWEL',
      manner: null,
      canBeChoseong: false,
      canBeJungseong: true,
      canBeJongseong: false,
    });

    renderAtJamo(4);

    expect(await screen.findByText(/romanisation: a/i)).toBeInTheDocument();
    expect(screen.queryByText(/manner:/i)).not.toBeInTheDocument();
  });
});