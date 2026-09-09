import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJson } from '../api.js';

function JamoDetailPage() {
  const { id } = useParams();
  const [jamo, setJamo] = useState(null);

  useEffect(() => {
    fetchJson(`/jamo/${id}`).then(setJamo);
  }, [id]);

  if (!jamo) {
    return <p>Loading…</p>;
  }

  return (
    <div>
      <h1>
        {jamo.character} — {jamo.name}
      </h1>
      <p>Romanisation: {jamo.romanisation}</p>
      <p>Type: {jamo.jamoType}</p>
      <p>Manner: {jamo.manner}</p>
      <p>
        Can be choseong: {jamo.canBeChoseong ? 'yes' : 'no'}, jungseong:{' '}
        {jamo.canBeJungseong ? 'yes' : 'no'}, jongseong:{' '}
        {jamo.canBeJongseong ? 'yes' : 'no'}
      </p>
    </div>
  );
}

export default JamoDetailPage;
