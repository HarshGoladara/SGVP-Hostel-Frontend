import '../assets/css/layouts/Navbar.css';
export default function Header() {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar-links">
          <li>Trade</li>
          <li>Explore</li>
          <li>Pool</li>
        </ul>
        <button className="navbar-button">Connect</button>
      </nav>
    </>
  );
}
