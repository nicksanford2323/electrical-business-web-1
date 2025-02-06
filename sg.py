import os
import subprocess
import sys

# ------------------------------------------------------------------------------
# CONFIGURATION
# ------------------------------------------------------------------------------
GITHUB_USERNAME = "nicksanford2323"     # Your GitHub username
REPO_NAME = "business-data-fixed2"      # The existing repo name on GitHub
APP_JSX_PATH = "src/App.jsx"           # Where your App.jsx lives locally
COMMIT_MESSAGE = "Update App.jsx with About Us section and deploy"

# The final App.jsx content (include About or any changes you want):
APP_JSX_CONTENT = r"""import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Reviews from './components/Reviews.jsx';
import Gallery from './components/Gallery.jsx';
import Contact from './components/Contact.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import './App.css';

function App() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // URL for your data.json
    const dataUrl = 'https://raw.githubusercontent.com/nicksanford2323/business-data-fixed2/main/data.json';

    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.status}`);
        }
        return response.json();
      })
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
          }, 6000);
        } else {
          console.error('Business ID not found in JSON. Defaulting to Dupree Electrical.');
          setSelectedBusiness(data['ChIJf2n-H9t1uCQRUzPxaliDdqM']);

          setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }, 6000);
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

            {/* Services Section */}
            <section id="services">
              <Services business={selectedBusiness} />
            </section>

            {/* About Section */}
            <section id="about">
              <About business={selectedBusiness} />
            </section>

            {/* Reviews Section */}
            <section id="reviews">
              <Reviews business={selectedBusiness} />
            </section>

            {/* Gallery Section */}
            <section id="gallery">
              <Gallery business={selectedBusiness} />
            </section>

            {/* Contact Section */}
            <section id="contact">
              <Contact business={selectedBusiness} />
            </section>
          </main>

          <footer className="footer">
            <div className="footer-content">
              <p>
                © {new Date().getFullYear()} {selectedBusiness.businessName}. All rights reserved.
              </p>
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
"""

# ------------------------------------------------------------------------------
# GITHUB_TOKEN from environment (In Replit's Secrets)
# ------------------------------------------------------------------------------
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
if not GITHUB_TOKEN:
    print("Error: GITHUB_TOKEN not found in environment variables.")
    sys.exit(1)

# ------------------------------------------------------------------------------
# 1) Overwrite App.jsx
# ------------------------------------------------------------------------------
def overwrite_app_jsx():
    # Ensure folder path exists if needed
    folder_path = os.path.dirname(APP_JSX_PATH)
    if folder_path and not os.path.exists(folder_path):
        os.makedirs(folder_path, exist_ok=True)

    with open(APP_JSX_PATH, "w", encoding="utf-8") as f:
        f.write(APP_JSX_CONTENT)
    print(f"Overwrote {APP_JSX_PATH} with updated App.jsx content.")


# ------------------------------------------------------------------------------
# 2) Git commit & push, then npm run deploy
# ------------------------------------------------------------------------------
def commit_and_deploy():
    # If no .git, init
    if not os.path.isdir(".git"):
        print("Initializing a new git repository...")
        subprocess.run(["git", "init"], check=True)

    # Force main branch
    subprocess.run(["git", "checkout", "-B", "main"], check=True)

    print("Adding files to git...")
    subprocess.run(["git", "add", "."], check=True)

    print("Committing files...")
    subprocess.run(["git", "commit", "-m", COMMIT_MESSAGE], check=True)

    print("Setting remote origin and pushing to GitHub...")
    remote_url = f"https://{GITHUB_USERNAME}:{GITHUB_TOKEN}@github.com/{GITHUB_USERNAME}/{REPO_NAME}.git"
    subprocess.run(["git", "remote", "remove", "origin"], check=False)
    subprocess.run(["git", "remote", "add", "origin", remote_url], check=True)
    subprocess.run(["git", "push", "-u", "origin", "main"], check=True)

    # Now run npm scripts
    print("Installing NPM dependencies...")
    subprocess.run(["npm", "install"], check=True)

    print("Building the app (npm run build)...")
    subprocess.run(["npm", "run", "build"], check=True)

    print("Deploying to GitHub Pages (npm run deploy)...")
    deploy_result = subprocess.run(["npm", "run", "deploy"], check=False)

    if deploy_result.returncode == 0:
        print("\nDeployment to GitHub Pages successful!")
        print(f"Your site should be at: https://{GITHUB_USERNAME}.github.io/{REPO_NAME}")
    else:
        print("\nDeployment step encountered an error. Check logs above.")
        sys.exit(1)


def main():
    overwrite_app_jsx()
    commit_and_deploy()


if __name__ == "__main__":
    main()
