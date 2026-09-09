import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="nav-links">
      <h1>Helpful Hangul</h1>
      <Link to="/jamo">Jamo</Link>
      <Link to="/sound-change-rules">Pronunciation Rules</Link>
    </div>
  );
}

export default HomePage;