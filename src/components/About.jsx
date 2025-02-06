// src/components/About.jsx
import React, { useState, useEffect } from 'react';
import './About.css';

function About({ business }) {
  // If no business data is passed yet, render nothing
  if (!business) return null;

  // Fallback images if business doesn't have about images
  const fallbackImages = [
    {
      url: 'https://via.placeholder.com/800x450.png?text=About+Image+1',
      description: 'Placeholder Image 1'
    },
    {
      url: 'https://via.placeholder.com/800x450.png?text=About+Image+2',
      description: 'Placeholder Image 2'
    }
  ];

  // We'll assume the business has 'sections.aboutUsImages' for the slideshow
  // If not, we fall back to the placeholders
  const aboutImages = 
    (business.sections &&
     business.sections.aboutUsImages &&
     business.sections.aboutUsImages.length >= 2)
      ? business.sections.aboutUsImages
      : fallbackImages;

  // We'll assume the about text is stored in 'business.about_us' or 'business.businessInfo.about'
  // Adjust as needed:
  const aboutText = business.about_us ||
    (business.businessInfo && business.businessInfo.about) ||
    "We are proud to serve our community with expert electrical services...";

  // Slideshow index state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic rotation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % aboutImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [aboutImages.length]);

  return (
    <section className="about-section" id="about">
      <h2 className="about-heading">About Us</h2>

      {/* Slideshow Container */}
      <div className="slideshow-container">
        {aboutImages.map((img, idx) => (
          <div
            key={idx}
            className={`slide ${idx === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img.url})` }}
          >
            <div className="slide-overlay">
              <p>{img.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* About Text */}
      <div className="about-text">
        <p>{aboutText}</p>
      </div>
    </section>
  );
}

export default About;
