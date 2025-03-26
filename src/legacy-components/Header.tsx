import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check user login status on component mount and route change
  useEffect(() => {
    const user = localStorage.getItem('indicab_user');
    setIsLoggedIn(!!user);

    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('indicab_user');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>IndiCab</h1>
          </Link>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}></span>
          </button>

          <nav className={`main-nav ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cities" className={location.pathname === '/cities' ? 'active' : ''}>
                  Cities
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/packages" className={location.pathname === '/packages' ? 'active' : ''}>
                  Packages
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/driver-info" className={location.pathname === '/driver-info' ? 'active' : ''}>
                  Drivers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="btn-dashboard">My Account</Link>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/signup" className="btn-signup">Sign Up</Link>
              </>
            )}
            <Link to="/booking" className="btn-book-now">Book Now</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
