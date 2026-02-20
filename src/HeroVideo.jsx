import { useState } from "react";
import video from "./assets/wall-offer.mp4";

const HeroVideo = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <section className="hero-section" id="home">
      <nav className="hero-nav">
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
          <a href="#leadForm" className="hero-nav-link" onClick={closeMenu}>
            Building Estimator
          </a>
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
          <a href="#leadForm" className="btn btn-primary btn-lg mt-3">
            Get 50% OFF Quote
          </a>
        </div>
      )}
    </section>
  );
};

export default HeroVideo;
