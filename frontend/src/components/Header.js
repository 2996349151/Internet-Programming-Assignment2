import { Link } from 'react-router-dom';

function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link to="/">
        <img src="car rental logo.jpeg" alt="Logo" />
      </Link>
    </header>
  );
}

export default Header;
