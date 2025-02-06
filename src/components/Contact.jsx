import React, { useState } from 'react';
import './Contact.css';

function Contact({ business }) {
  const { phone, full_address, color1, color2 } = business.businessInfo;
  const { businessName } = business;

  // Default colors if none provided
  const primaryColor = color1 || '#4a90e2';
  const secondaryColor = color2 || '#357abd';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'residential',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-header">
        <h2>Get Your Free Quote Today</h2>
        <div 
          className="title-underline"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p>Let's discuss your electrical needs and find the perfect solution</p>
      </div>

      <div className="contact-container">
        {/* Contact Information */}
        <div className="contact-info">
          <h3>Contact Information</h3>
          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <h4>Phone</h4>
              <a 
                href={`tel:${phone}`}
                style={{ color: primaryColor }}
              >
                {phone}
              </a>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <h4>Address</h4>
              <p>{full_address}</p>
            </div>
          </div>

          <div className="business-hours">
            <h4>Business Hours</h4>
            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
            <p>24/7 Emergency Service Available</p>
          </div>
        </div>

        {/* Contact Form */}
        <form 
          className="contact-form" 
          onSubmit={handleSubmit}
          style={{ '--focus-color': primaryColor }} // Apply CSS variable here
        >
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="serviceType">Service Type</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="emergency">Emergency</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Please describe your electrical needs..."
            ></textarea>
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: primaryColor,
              borderColor: secondaryColor
            }}
          >
            Request Quote
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;