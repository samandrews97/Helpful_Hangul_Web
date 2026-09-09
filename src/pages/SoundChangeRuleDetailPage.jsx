import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJson } from '../api.js';

function SoundChangeRuleDetailPage() {
  const { id } = useParams();
  const [soundChangeRules, setSoundChangeRules] = useState(null);

  useEffect(() => {
    fetchJson(`/sound-change-rules/${id}`).then(setSoundChangeRules);
  }, [id]);

  if (!soundChangeRules) {
    return <p>Loading...</p>
  }

  return (
      <div>
        <h1>
          {soundChangeRules.triggerJamo.character} - {soundChangeRules.triggerJamo.name}
        </h1>
        <p>Following Jamo: {soundChangeRules.followingJamo.character}</p>
        <p>Resulting Jamo: {soundChangeRules.resultingJamo.character}</p>
        <p>Sound Change Rule: {soundChangeRules.soundChangeType}</p>

      </div>
  );
}

export default SoundChangeRuleDetailPage;