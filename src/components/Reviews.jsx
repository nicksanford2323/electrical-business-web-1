import React, { useState, useEffect, useCallback } from 'react';
import './Reviews.css';

function Reviews({ business }) {
  if (!business) return null;

  const {
    rating: ratingStr,
    reviews: reviewCountStr,
    reviews_link: reviewsLink,
  } = business.businessInfo || {};

  const rating = parseFloat(ratingStr) || 0;
  const reviewCount = parseInt(reviewCountStr, 10) || 0;
  const reviewsArray = business.reviews || [];
  const businessName = business.businessName || '';

  // Only show reviews if rating is at least 4.5 and there are 5 or more reviews
  const showReviewsSection = (rating >= 4.5) && (reviewCount >= 5);

  if (!showReviewsSection) {
    return null;
  }

  const [currentReview, setCurrentReview] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextReview = useCallback(() => {
    setCurrentReview(current => (current + 1) % reviewsArray.length);
  }, [reviewsArray.length]);

  const prevReview = useCallback(() => {
    setCurrentReview(current => (current - 1 + reviewsArray.length) % reviewsArray.length);
  }, [reviewsArray.length]);

  // Auto advance reviews
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextReview, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, nextReview]);

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h2>{businessName} Reviews</h2>
        <div className="rating-display">
          <div className="stars">★★★★★</div>
          <p>{rating} out of 5 stars based on {reviewCount} reviews</p>
        </div>
      </div>

      <div 
        className="reviews-slideshow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="reviews-track"
          style={{ transform: `translateX(-${currentReview * 100}%)` }}
        >
          {reviewsArray.map((review, index) => {
            if (!review.review_text?.trim()) return null;

            return (
              <div className="review-slide" key={index}>
                <div className="review-card">
                  <div className="reviewer-info">
                    <h3>{review.reviewer_name || 'Customer Review'}</h3>
                    <div className="review-stars">★★★★★</div>
                  </div>
                  <p className="review-text">{review.review_text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button className="nav-button prev" onClick={prevReview}>←</button>
        <button className="nav-button next" onClick={nextReview}>→</button>
      </div>

      <div className="reviews-cta">
        <p>Share your experience with our services</p>
        <a 
          href={reviewsLink || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="review-button"
        >
          Leave Us a Review
        </a>
      </div>
    </section>
  );
}

export default Reviews;