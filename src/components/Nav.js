function Nav() {
  const links = [
    ['Home', '/'],
    ['About', '#about'],
    ['Menu', '#menu'],
    ['Reservations', '#reservations'],
    ['Order Online', '#order-online'],
    ['Login', '#login'],
  ];

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <ul>
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
