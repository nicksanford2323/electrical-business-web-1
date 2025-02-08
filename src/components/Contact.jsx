import React, { useState } from 'react';
import './Contact.css';

const Contact = ({ business }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (name) => {
    setFocused(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleBlur = (name) => {
    setFocused(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-header">
            <h2>Get In Touch</h2>
            <p className="contact-description">
              Have questions about our services? Need a quote? We're here to help!
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-grid">
              <div className={`form-group ${focused.name ? 'focused' : ''}`}>
                <label htmlFor="name">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  required
                  placeholder="John Doe"
                  className="form-input"
                />
              </div>

              <div className={`form-group ${focused.email ? 'focused' : ''}`}>
                <label htmlFor="email">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  required
                  placeholder="john@example.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className={`form-group ${focused.message ? 'focused' : ''}`}>
              <label htmlFor="message">
                <span className="label-text">Your Message</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                required
                placeholder="Tell us about your project..."
                className="form-input"
                rows="5"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading-spinner"></span>
              ) : (
                'Send Message'
              )}
            </button>

            {submitStatus && (
              <div className={`submit-status ${submitStatus}`}>
                {submitStatus === 'success' ? 
                  'Message sent successfully!' : 
                  'Something went wrong. Please try again.'}
              </div>
            )}
          </form>
        </div>

        <div className="contact-info">
          <div className="info-card">
            <span className="info-icon">📞</span>
            <h3>Phone</h3>
            <p>{business?.businessInfo?.phone || 'Contact us by phone'}</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📍</span>
            <h3>Location</h3>
            <p>Jefferson County, Alabama</p>
          </div>
          <div className="info-card">
            <span className="info-icon">⏰</span>
            <h3>Hours</h3>
            <p>24/7 Emergency Service Available</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;