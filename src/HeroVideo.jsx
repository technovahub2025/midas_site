import { useState } from "react";
import video from "./assets/wall-offer.mp4";
import logoImg from "./assets/middaslogo.webp";

const HeroVideo = ({ onOpenEstimate }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const openEstimator = () => {
    closeMenu();
    onOpenEstimate?.();
  };

  return (
    <section className="hero-section" id="home">
      <nav className="hero-nav">
        <div className="hero-logo-shell">
          <img src={logoImg} alt="Midas Interiors & Traders" className="hero-nav-logo" />
        </div>

        <button
          type="button"
          className="hero-nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`hero-nav-inner ${menuOpen ? "open" : ""}`}>
          <a href="#home" className="hero-nav-link" onClick={closeMenu}>
            Home
          </a>
          <button type="button" className="hero-nav-link hero-nav-link-btn" onClick={openEstimator}>
            Building Estimator
          </button>
          <a href="#priceBar" className="hero-nav-link" onClick={closeMenu}>
            Price Bar
          </a>
          <a href="#contactUs" className="hero-nav-link" onClick={closeMenu}>
            Contact Us
          </a>
        </div>
      </nav>

      <video autoPlay muted loop playsInline className="hero-video">
        <source src={video} type="video/mp4" />
      </video>

      {showPopup && (
        <div className="hero-content text-center">
          <button
            type="button"
            className="hero-close-btn"
            aria-label="Close popup"
            onClick={() => setShowPopup(false)}
          >
            x
          </button>
          <span className="badge bg-danger mb-3">Flat 50% OFF</span>
          <h1>Professional Interior and Architecture Work</h1>
          <p>Free Site Visit | Premium Materials | Skilled Professionals</p>
          <button type="button" className="btn btn-primary btn-lg mt-3" onClick={openEstimator}>
            Get 50% OFF Quote
          </button>
        </div>
      )}
    </section>
  );
};

export default HeroVideo;
