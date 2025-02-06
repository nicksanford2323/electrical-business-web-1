import React, { useState, useEffect, useCallback } from 'react';
import './Gallery.css';

function Gallery({ business }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const images = business.sections.gallery;

  const nextSlide = useCallback(() => {
    setCurrentSlide(current => (current + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(current => (current - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto advance slides
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 3000);
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
    <section className="gallery-section">
      <h2>Our Work</h2>

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
        >
          ←
        </button>

        <button 
          className={`nav-button next ${showControls ? 'visible' : ''}`}
          onClick={nextSlide}
        >
          →
        </button>

        <div className="slide-counter">
          {currentSlide + 1} / {images.length}
        </div>
      </div>
    </section>
  );
}

export default Gallery;