import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchJson } from '../api.js';

function JamoListPage() {
  const [jamoList, setJamoList] = useState([]);

  useEffect(() => {
    fetchJson('/jamo').then(setJamoList);
  }, []);

  return (
    <div>
      <h1>Jamo</h1>
      <ul>
        {jamoList.map((jamo) => (
          <li key={jamo.id}>
            <Link to={`/jamo/${jamo.id}`}>
              {jamo.character} — {jamo.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JamoListPage;