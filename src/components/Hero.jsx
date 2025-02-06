import React, { useState, useEffect } from 'react';
import './Hero.css';

function Hero({ business }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const heroSlides = business.sections.hero;

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="hero-section">
      {/* Background Image */}
      <div 
        className={`hero-background ${isTransitioning ? 'fade-out' : ''}`}
        style={{
          backgroundImage: `url(${heroSlides[currentSlide].imageIndex})`
        }}
      />

      {/* Content Overlay */}
      <div className="hero-content">
        <h1>{business.businessName}</h1>
        <p className="hero-text">{heroSlides[currentSlide].callToAction}</p>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`slide-dot ${currentSlide === index ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;