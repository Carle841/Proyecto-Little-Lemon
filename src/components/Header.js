import Nav from './Nav';

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__content">
        <a className="brand" href="/" aria-label="Little Lemon home">
          <img src="/little-lemon-logo.svg" alt="Little Lemon" />
        </a>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
