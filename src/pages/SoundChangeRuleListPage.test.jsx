import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { fetchJson } from '../api.js';
import SoundChangeRuleListPage from './SoundChangeRuleListPage.jsx';

vi.mock('../api.js');

describe('SoundChangeRuleListPage', () => {
  it('renders one link per distinct trigger jamo, even with multiple rules for it', async () => {
    const giyeok = { id: 1, character: 'ㄱ', name: 'Giyeok' };
    fetchJson.mockResolvedValue([
      { id: 1, triggerJamo: giyeok, followingJamo: {}, resultingJamo: {}, soundChangeType: 'NASALISATION' },
      { id: 2, triggerJamo: giyeok, followingJamo: {}, resultingJamo: {}, soundChangeType: 'LIAISON' },
    ]);

    render(
      <MemoryRouter>
        <SoundChangeRuleListPage />
      </MemoryRouter>
    );

    const links = await screen.findAllByRole('link', { name: /giyeok/i });
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', '/sound-change-rules/1');
  });
});