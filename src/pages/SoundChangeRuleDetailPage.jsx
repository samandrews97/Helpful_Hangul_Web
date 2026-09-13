import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJson } from '../api.js';

function SoundChangeRuleDetailPage() {
  const { id } = useParams();
  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetchJson(`/jamo/${id}/sound-change-rules`).then(setRules);
  }, [id]);

  const triggerJamo = rules[0]?.triggerJamo;

  return (
    <div>
      {triggerJamo && (
        <h1>
          {triggerJamo.character} — {triggerJamo.name}
        </h1>
      )}
      <ul style={{ listStyleType: 'none', padding: '0px' }}>
        {rules.map((rule) => (
          <li key={rule.id} style={{ marginBottom: '24px' }}>
            <p>Following jamo: {rule.followingJamo.character} — {rule.followingJamo.name}</p>
            <p>Resulting jamo: {rule.resultingJamo.character} — {rule.resultingJamo.name}</p>
            <p>Rule type: {rule.soundChangeType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SoundChangeRuleDetailPage;