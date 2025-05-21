import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/">
        <p>Logo Image</p>
      </Link>
    </header>
  );
}

export default Header;
