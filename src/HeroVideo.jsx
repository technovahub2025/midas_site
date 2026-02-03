import video from "./assets/wall-offer.mp4";

const HeroVideo = () => {
  return (
    <section className="hero-section">
      <video autoPlay muted loop playsInline className="hero-video">
        <source src={video} type="video/mp4" />
      </video>

      <div className="hero-content text-center">
        <span className="badge bg-danger mb-3">🔥 Flat 50% OFF</span>
        {/* <h1>Premium Wall Painting in Pondicherry</h1> */}
        <h1>Professional Interior and Architecture Work</h1>
        <p>Free Site Visit • Premium Materials • Skilled Professionals</p>
        <a href="#leadForm" className="btn btn-primary btn-lg mt-3">
          Get 50% OFF Quote
        </a>
      </div>
    </section>
  );
};

export default HeroVideo;
