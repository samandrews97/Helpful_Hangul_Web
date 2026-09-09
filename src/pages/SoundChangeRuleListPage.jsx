import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchJson } from '../api.js';

function SoundChangeRuleListPage() {
  const [soundChangeRulesList, setSoundChangeRulesList] = useState([]);

  useEffect(() => {
    fetchJson('/sound-change-rules').then(setSoundChangeRulesList);
  }, []);

  return (
      <div>
        <h1>Sound Change Rules</h1>
        <ul>
          {soundChangeRulesList.map((soundChangeRules) => (
              <li key={soundChangeRules.id}>
                <Link to={`/sound-change-rules/${soundChangeRules.id}`}>
                  {soundChangeRules.triggerJamo.character} - {soundChangeRules.triggerJamo.name} {' '}
                  {soundChangeRules.followingJamo.character} - {soundChangeRules.followingJamo.name} {' '}
                  {soundChangeRules.resultingJamo.character} - {soundChangeRules.resultingJamo.name} {' '}
                  {soundChangeRules.soundChangeType}
                </Link>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default SoundChangeRuleListPage;