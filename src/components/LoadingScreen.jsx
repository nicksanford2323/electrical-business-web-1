import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ businessName, logo, colors }) => {
  const [circuitLines, setCircuitLines] = useState([]);

  useEffect(() => {
    const lines = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 100 + 50}px`,
      height: '2px',
      transform: `rotate(${Math.random() * 360}deg)`,
      animationDelay: `${Math.random() * 2}s`
    }));
    setCircuitLines(lines);
  }, []);

  const tagline = businessName === "Loading..." 
    ? "Please Wait..."
    : "Your Trusted Electrician";

  return (
    <div className="hero">
      {/* Circuit Board Background */}
      <div className="circuit-container">
        {circuitLines.map((line) => (
          <div
            key={line.id}
            className="circuit-line"
            style={{
              left: line.left,
              top: line.top,
              width: line.width,
              height: line.height,
              transform: line.transform,
              animationDelay: line.animationDelay
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="hero-content">
        <div className="energy-orb" />
        <div className="lightning" />

        {logo && (
          <img 
            src={logo}
            alt={businessName}
            className="business-logo"
          />
        )}

        <h1 className="hero-title glow-text">
          {businessName}
        </h1>
        <p className="tagline glow-text">
          {tagline}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;