import { Link } from 'react-router-dom';

function HomePage() {
  // TODO(human): render two links, one to "/jamo" and one to
  // "/sound-change-rules". Use react-router's <Link to="..."> component,
  // not a plain <a href="..."> — Link does client-side navigation without
  // a full page reload; a plain <a> would reload the whole app.
  return (
    <div>
      <h1>Helpful Hangul</h1>
    </div>
  );
}

export default HomePage;