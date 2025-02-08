import React, { useState, useEffect } from 'react';
import './About.css';

const About = ({ business }) => {
  // Safety checks to ensure we have valid data
  if (
    !business.sections ||
    !business.sections.aboutUs ||
    business.sections.aboutUs.length < 3
  ) {
    return null;
  }

  // Get the two slideshow images
  const images = [
    business.sections.aboutUs[0].imageIndex,
    business.sections.aboutUs[1].imageIndex
  ];

  // Get the paragraph from the third item
  const aboutParagraph = business.sections.aboutUs[2].reason || '';

  // State for which image is currently shown
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simple slideshow that toggles between the two images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Add scroll observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="about-section">
      <div className="about-content fade-in-up">
        {/* Slideshow Container */}
        <div className="about-slideshow">
          <img
            src={images[currentIndex]}
            alt={`About ${business.businessName}`}
            className="about-image"
          />
        </div>
        {/* Text Container */}
        <div className="about-info">
          <h2>About {business.businessName}</h2>
          <p>{aboutParagraph}</p>
          <a 
            href="tel:+12057848512" 
            className="electric-button"
          >
            Call Us: +1 205-784-8512
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;