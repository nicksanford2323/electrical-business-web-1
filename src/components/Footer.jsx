import React from 'react';
import './Footer.css';

function Footer({ business }) {
  const { businessName } = business;
  const { 
    phone, 
    color1, 
    color2, 
    reviews_link,
    facebook_link,
    instagram_link
  } = business.businessInfo;

  // Default colors if none provided
  const primaryColor = color1 || '#4a90e2';
  const secondaryColor = color2 || '#357abd';

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{businessName}</h3>
          <p className="business-description">
            Professional electrical solutions for residential and commercial properties.
            Serving Jefferson County with pride.
          </p>
          <div className="social-links">
            {facebook_link && (
              <a href={facebook_link} target="_blank" rel="noopener noreferrer" 
                 className="social-icon" style={{ '--hover-color': primaryColor }}>
                <i className="fab fa-facebook-f"></i>
              </a>
            )}
            {instagram_link && (
              <a href={instagram_link} target="_blank" rel="noopener noreferrer" 
                 className="social-icon" style={{ '--hover-color': primaryColor }}>
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {reviews_link && (
              <a href={reviews_link} target="_blank" rel="noopener noreferrer" 
                 className="social-icon" style={{ '--hover-color': primaryColor }}>
                <i className="fab fa-google"></i>
              </a>
            )}
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <nav className="footer-nav">
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Our Services</h4>
          <ul className="services-list">
            <li>Residential Electrical</li>
            <li>Commercial Services</li>
            <li>Emergency Repairs</li>
            <li>Safety Inspections</li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h4>Contact Us</h4>
          <p>
            <i className="fas fa-phone"></i>
            <a href={`tel:${phone}`} style={{ color: primaryColor }}>{phone}</a>
          </p>
          <p>
            <i className="fas fa-clock"></i>
            24/7 Emergency Service
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i>
            Jefferson County, Alabama
          </p>
          <a 
            href="#contact" 
            className="contact-button"
            style={{
              background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`
            }}
          >
            Get Free Quote
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© {currentYear} {businessName}. All rights reserved.</p>
          <div className="footer-badges">
            <span className="badge">Licensed</span>
            <span className="badge">Insured</span>
            <span className="badge">Bonded</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;