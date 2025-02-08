import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Reviews from './components/Reviews.jsx';
import Gallery from './components/Gallery.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
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
        const businessId = params.get('id') || 'ChIJf2n-H9t1uCQRUzPxaliDdqM';
        console.log('Selected businessId:', businessId);

        if (data[businessId]) {
          console.log('Found business data for ID:', businessId);
          setSelectedBusiness(data[businessId]);

          // Enforce a minimum loading time of 6 seconds for the animation
          setTimeout(() => {
            setIsTransitioning(true);
            // Wait for fade-out animation before removing loading screen
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }, 4000);
        } else {
          console.error('Business ID not found in JSON. Defaulting to Dupree Electrical.');
          setSelectedBusiness(data['ChIJf2n-H9t1uCQRUzPxaliDdqM']);

          setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }, 4000);
        }
      })
      .catch((error) => {
        console.error('Error fetching business data:', error);
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
            color2: selectedBusiness.businessInfo.color2,
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
            {/* Hero Section */}
            <section id="home">
              <Hero business={selectedBusiness} />
            </section>

            {/* About Section */}
            <section id="about">
              <About business={selectedBusiness} />
            </section>

            {/* Services Section */}
            <section id="services">
              <Services business={selectedBusiness} />
            </section>

            {/* Reviews Section */}
            <section id="reviews">
              <Reviews business={selectedBusiness} />
            </section>

            {/* Gallery Section */}
            <section id="gallery">
              <Gallery business={selectedBusiness} />
            </section>

            {/* Contact Us Section */}
            <section id="contact">
              <Contact business={selectedBusiness} />
            </section>
          </main>

          <Footer business={selectedBusiness} />
        </div>
      )}
    </>
  );
}

export default App;