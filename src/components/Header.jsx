import React, { useState } from 'react';
import './Header.css';

function Header({ business }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Extract all business info
  const { businessName } = business;
  const { phone, rating, reviews, reviews_link, color1, color2, logo } = business.businessInfo;

  // Only show logo if both colors are present
  const showLogo = color1 !== null && color2 !== null && logo;

  // Only show reviews if rating is high enough and enough reviews
  const showReviews = parseFloat(rating) >= 4.5 && parseInt(reviews) >= 8;

  // Default colors if none provided
  const primaryColor = color1 || '#4a90e2';
  const secondaryColor = color2 || '#357abd';

  return (
    <>
      <div className="cta-banner" style={{ backgroundColor: primaryColor }}>
        GET A FREE QUOTE TODAY - CALL US {phone}
      </div>

      <header className="header">
        <div className="logo">
          {showLogo ? (
            <img src={logo} alt={businessName} />
          ) : (
            <h1>{businessName}</h1>
          )}
        </div>

        {/* Mobile Menu Button */}
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
      </header>
    </>
  );
}

export default Header;