import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import './Header.css';

function Header({ business }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  // Extract all business info
  const { businessName } = business;
  const { phone, rating, reviews, reviews_link, color1, color2, logo } = business.businessInfo;

  // Sticky header logic
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showLogo = color1 !== null && color2 !== null && logo;
  const showReviews = parseFloat(rating) >= 4.5 && parseInt(reviews) >= 8;
  const primaryColor = color1 || '#4a90e2';
  const secondaryColor = color2 || '#357abd';

  return (
    <div className={`header-wrapper ${isSticky ? 'sticky' : ''}`}>
      <div className="cta-banner" style={{ backgroundColor: primaryColor }}>
        GET A FREE QUOTE TODAY - CALL US {phone}
      </div>
      <header className={`header ${isDark ? 'theme-dark' : 'theme-light'}`}>
        <div className="logo">
          {showLogo ? (
            <img src={logo} alt={businessName} />
          ) : (
            <h1>{businessName}</h1>
          )}
        </div>

        <div 
          className={`menu-button ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <ul style={{ '--hover-color': secondaryColor }}>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#location">Location</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          {showReviews && (
            <a 
              href={reviews_link} 
              className="google-review" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={i < Math.floor(rating) ? 'star filled' : 'star'}
                  >
                    ★
                  </span>
                ))} 
              </div>
              <span className="review-count">
                {rating} ({reviews} reviews)
              </span>
            </a>
          )}

          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <span className="toggle-icon">
              {isDark ? '☀️' : '🌙'}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;