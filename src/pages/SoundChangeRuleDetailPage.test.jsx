import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { fetchJson } from '../api.js';
import SoundChangeRuleDetailPage from './SoundChangeRuleDetailPage.jsx';

vi.mock('../api.js');

describe('SoundChangeRuleDetailPage', () => {
  it('renders a heading and every rule for that jamo', async () => {
    const giyeok = { character: 'ㄱ', name: 'Giyeok' };
    fetchJson.mockResolvedValue([
      {
        id: 1,
        triggerJamo: giyeok,
        followingJamo: { character: 'ㄴ', name: 'Nieun' },
        resultingJamo: { character: 'ㅇ', name: 'Ieung' },
        soundChangeType: 'NASALISATION',
      },
      {
        id: 2,
        triggerJamo: giyeok,
        followingJamo: { character: 'ㅇ', name: 'Ieung' },
        resultingJamo: { character: 'ㄱ', name: 'Giyeok' },
        soundChangeType: 'LIAISON',
      },
    ]);

    render(
      <MemoryRouter initialEntries={['/sound-change-rules/1']}>
        <Routes>
          <Route path="/sound-change-rules/:id" element={<SoundChangeRuleDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: /giyeok/i })).toBeInTheDocument();
    expect(screen.getByText(/NASALISATION/)).toBeInTheDocument();
    expect(screen.getByText(/LIAISON/)).toBeInTheDocument();
  });
});