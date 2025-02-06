import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Gallery from './components/Gallery.jsx';
import ServiceArea from './components/ServiceArea.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import './App.css';

function App() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // URL of your JSON data on GitHub
    const dataUrl = 'https://raw.githubusercontent.com/nicksanford2323/business-data-fixed2/main/data.json';
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        const params = new URLSearchParams(window.location.search);
        const businessId = params.get('id') || "ChIJf2n-H9t1uCQRUzPxaliDdqM";
        console.log("Selected businessId:", businessId);
        if (data[businessId]) {
          console.log("Found business data for ID:", businessId);
          setSelectedBusiness(data[businessId]);
          // Set a minimum loading time of 6 seconds for the animation
          setTimeout(() => {
            setIsTransitioning(true);
            // Wait for fade out animation before setting isLoading to false
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }, 6000);
        } else {
          console.error("Business ID not found in JSON, defaulting to Dupree Electrical.");
          setSelectedBusiness(data["ChIJf2n-H9t1uCQRUzPxaliDdqM"]);
          setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }, 6000);
        }
      })
      .catch((error) => {
        console.error("Error fetching business data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleNavigation = (section) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {!selectedBusiness ? (
        <LoadingScreen businessName="Loading..." />
      ) : isLoading ? (
        <LoadingScreen 
          businessName={selectedBusiness.businessName}
          logo={selectedBusiness.businessInfo.logo}
          colors={{
            color1: selectedBusiness.businessInfo.color1,
            color2: selectedBusiness.businessInfo.color2
          }}
          className={isTransitioning ? 'fade-out' : ''}
        />
      ) : (
        <div className="app fade-in">
          <Header 
            business={selectedBusiness} 
            onNavigate={handleNavigation}
            currentSection={currentSection}
          />
          <main>
            <section id="home">
              <Hero business={selectedBusiness} />
            </section>
            <section id="gallery">
              <Gallery business={selectedBusiness} />
            </section>
            <section id="areas">
              <ServiceArea business={selectedBusiness} />
            </section>
            <section id="contact" className="contact-section">
              {/* Contact form would go here */}
            </section>
          </main>
          <footer className="footer">
            <div className="footer-content">
              <p>© {new Date().getFullYear()} {selectedBusiness.businessName}. All rights reserved.</p>
              {selectedBusiness.businessInfo.full_address && (
                <p>{selectedBusiness.businessInfo.full_address}</p>
              )}
              {selectedBusiness.businessInfo.phone && (
                <p>Phone: {selectedBusiness.businessInfo.phone}</p>
              )}
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;