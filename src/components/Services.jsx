import React from 'react';
import './Services.css';

function Services({ business }) {
  const { color1, color2 } = business.businessInfo;

  // Default colors if none provided
  const primaryColor = color1 || '#4a90e2';
  const secondaryColor = color2 || '#357abd';

  const services = [
    {
      title: "Residential Services",
      description: "Complete home electrical solutions including installations, repairs, and upgrades for your peace of mind.",
      icon: "⚡"
    },
    {
      title: "Commercial Services",
      description: "Professional electrical installations and maintenance for businesses of all sizes.",
      icon: "🏢"
    },
    {
      title: "Emergency Service",
      description: "24/7 emergency electrical repairs and support when you need it most.",
      icon: "🚨"
    },
    {
      title: "Panel Upgrades",
      description: "Electrical panel replacements and capacity upgrades to meet your power needs.",
      icon: "🔌"
    },
    {
      title: "Safety Inspections",
      description: "Comprehensive electrical safety audits and certification services.",
      icon: "✓"
    },
    {
      title: "Lighting Design",
      description: "Custom lighting solutions to enhance your space with modern, efficient fixtures.",
      icon: "💡"
    }
  ];

  return (
    <section id="services" className="services-section">
      {/* Section Header */}
      <div className="services-header">
        <h2>Our Services</h2>
        <div 
          className="underline" 
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p>Professional electrical solutions for residential and commercial properties</p>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="service-card"
            style={{
              '--hover-color': primaryColor,
              '--border-color': secondaryColor
            }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;