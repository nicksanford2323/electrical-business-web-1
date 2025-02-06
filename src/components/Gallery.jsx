import React, { useState, useEffect, useCallback } from 'react';
import './Gallery.css';

function Gallery({ business }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const images = business.sections.gallery;
  const { color1, color2 } = business.businessInfo;

  // Default colors if none provided
  const primaryColor = color1 || '#4a90e2';
  const secondaryColor = color2 || '#357abd';

  const nextSlide = useCallback(() => {
    setCurrentSlide(current => (current + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(current => (current - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto advance slides (2.5 seconds instead of 3)
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 2500);
      return () => clearInterval(timer);
    }
  }, [isPaused, nextSlide]);

  // Hide controls after 3 seconds of no hover
  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showControls]);

  return (
    <section className="gallery-section" style={{ backgroundColor: '#f8f8f8' }}>
      <div className="gallery-header">
        <h2>Experience Our Craftsmanship</h2>
        <div 
          className="title-underline"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p>See why our clients trust us with their electrical needs</p>
      </div>

      <div 
        className="slideshow-container"
        onMouseEnter={() => {
          setIsPaused(true);
          setShowControls(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setShowControls(false);
        }}
        onMouseMove={() => setShowControls(true)}
      >
        <div className="slides-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((img, index) => (
            <div key={index} className="slide">
              <img src={img} alt={`Project ${index + 1}`} />
              <div className="slide-overlay"></div>
            </div>
          ))}
        </div>

        <button 
          className={`nav-button prev ${showControls ? 'visible' : ''}`}
          onClick={prevSlide}
          style={{ '--hover-bg': primaryColor }}
        >
          ←
        </button>

        <button 
          className={`nav-button next ${showControls ? 'visible' : ''}`}
          onClick={nextSlide}
          style={{ '--hover-bg': primaryColor }}
        >
          →
        </button>

        <div 
          className="slide-counter"
          style={{ 
            backgroundColor: `${primaryColor}cc`,
            border: `2px solid ${secondaryColor}`
          }}
        >
          {currentSlide + 1} / {images.length}
        </div>
      </div>
    </section>
  );
}

export default Gallery;