import React from 'react';
import './Reviews.css';

function Reviews({ business }) {
  if (!business) return null;

  // Extract info
  const {
    rating: ratingStr,
    reviews: reviewCountStr,
    reviews_link: reviewsLink
  } = business.businessInfo || {};

  // Parse rating and review count (they're stored as strings in your JSON)
  const rating = parseFloat(ratingStr) || 0;        // e.g. "5" => 5
  const reviewCount = parseInt(reviewCountStr, 10) || 0; // e.g. "5" => 5

  // Determine if we show the review section
  const showReviewsSection = (rating >= 4.5) && (reviewCount >= 8);
  if (!showReviewsSection) {
    // Hide the entire section if they don't meet the criteria
    return null;
  }

  // The actual list of reviews (array of { reviewer_name, review_text })
  const reviewsArray = business.reviews || [];

  const businessName = business.businessName || '';

  return (
    <section className="reviews-section" id="reviewsSection">
      <h2 className="reviews-header">Hear From Our Customers</h2>

      {/* Top summary info (rating, total reviews) */}
      <div className="rating-info">
        {/* For a star rating display, you could do something fancy, but here's a placeholder */}
        <div className="rating-stars">★★★★★</div>
        <div className="rating-text">
          <strong>{businessName}</strong> maintains a
          <span> {rating}</span>-star rating with
          <span> {reviewCount}</span> satisfied customer reviews.
        </div>
      </div>

      {/* List/slider of individual reviews */}
      <div className="reviews-list">
        {reviewsArray.map((review, index) => {
          // Some reviews have null text, so we handle that:
          const reviewText = review.review_text || '';
          const reviewerName = review.reviewer_name || 'Anonymous';

          // If there's truly no text, you might choose to hide that review card
          if (!reviewText.trim()) {
            return null;
          }

          return (
            <div className="review-card" key={index}>
              <h4 className="reviewer-name">{reviewerName}</h4>
              <p className="review-text">{reviewText}</p>
            </div>
          );
        })}
      </div>

      {/* Link to leave a review */}
      <div className="leave-review-container">
        <a
          href={reviewsLink || '#'}
          className="review-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Leave Us a Review
        </a>
      </div>
    </section>
  );
}

export default Reviews;
