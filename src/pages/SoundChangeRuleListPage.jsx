import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchJson } from '../api.js';

function SoundChangeRuleListPage() {
  const [soundChangeRulesList, setSoundChangeRulesList] = useState([]);

  const uniqueJamo = Array.from(
      new Map(soundChangeRulesList.map(rule => [rule.triggerJamo.id, rule.triggerJamo])).values()
  );

  useEffect(() => {
    fetchJson('/sound-change-rules').then(setSoundChangeRulesList);
  }, []);

  return (
      <div>
        <h1>Sound Change Rules</h1>
        <ul style={{ listStyleType: 'none', padding: '0px' }}>
            {uniqueJamo.map((triggerJamo) => (
                <li key={triggerJamo.id}>
                    <Link to={`/sound-change-rules/${triggerJamo.id}`}>
                        {triggerJamo.character} - {triggerJamo.name}
                    </Link>
                </li>
            ))}
        </ul>
      </div>
  );
}

export default SoundChangeRuleListPage;