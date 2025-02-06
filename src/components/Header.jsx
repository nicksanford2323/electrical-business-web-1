import React from 'react';
import './Header.css';

function Header({ business }) {
  // Extract needed info from business data
  const { logo, phone } = business.businessInfo;
  const businessName = business.businessName;
  const rating = business.businessInfo.rating;
  const reviews = business.businessInfo.reviews;
  const reviewsLink = business.businessInfo.reviews_link;
  const primaryColor = business.businessInfo.color1 || '#1a1a1a';

  return (
    <>
      {/* Call to Action Banner */}
      <div className="cta-banner" style={{ backgroundColor: primaryColor }}>
        GET A FREE QUOTE TODAY - CALL US {phone}
      </div>

      <header className="header">
        <div className="logo">
          {logo ? (
            <img src={logo} alt={businessName} />
          ) : (
            <h1>{businessName}</h1>
          )}
        </div>

        <nav>
          <ul className="nav-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#location">Location</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        {/* Google Review Section */}
        <a href={reviewsLink} className="google-review" target="_blank" rel="noopener noreferrer">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? 'star filled' : 'star'}>★</span>
            ))}
          </div>
          <span className="review-count">
            {rating} ({reviews} reviews)
          </span>
        </a>
      </header>
    </>
  );
}

export default Header;
