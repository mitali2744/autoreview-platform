import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaSun, FaMoon, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');

  const logout = async (e) => {
    e.preventDefault();
    await fetch('/djangoapp/logout', { method: 'GET' });
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <FaCar className="brand-icon" />
          <span>AutoReview</span>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/"        onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/dealers" onClick={() => setMenuOpen(false)}>Dealers</Link></li>
          <li><Link to="/about"   onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

          {username ? (
            <div className="nav-user">
              <FaUserCircle />
              <span>{username}</span>
              <button className="btn btn-outline" onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}

          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
