import logoImg from "./assets/middaslogo.webp";
import { serviceImages } from "./serviceImages";

const newsItems = [
  {
    image: serviceImages.modularKitchen,
    tag: "Modern, Lifestyle",
    title: "Easy ideas to use everyday stuff in kitchen.",
  },
  {
    image: serviceImages.turnkeyProjects,
    tag: "Modern, Lifestyle",
    title: "Interesting bridge designs from around the world.",
  },
  {
    image: serviceImages.modularKitchen,
    tag: "Modern, Lifestyle",
    title: "Space planning tricks for compact premium homes.",
  },
];

const pageLinks = [
  "About Us",
  "Services",
  "False Ceilings",
  "Aluminium Partition",
  "Wardrobe",
  "Modular Kitchen",
  "Contact",
];

const ContactFooter = () => {
  return (
    <footer className="contact-footer" id="contactUs">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-3">
            <img src={logoImg} alt="Midas Interiors & Traders" className="footer-logo" />
            <p className="footer-about">
              Midas Interiors enhances your home with stylish, trend-focused decor. Our Pondicherry decorators
              offer unique solutions, adding the perfect finishing touches that make a real difference.
            </p>
            <h5 className="footer-heading">About More</h5>
            <div className="footer-socials" aria-label="Social links">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">ig</a>
              <a href="#" aria-label="X">x</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-2">
            <h4 className="footer-title">Pages</h4>
            <ul className="footer-links">
              {pageLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="footer-title">News Feeds</h4>
            <div className="footer-news-list">
              {newsItems.map((item) => (
                <article key={item.title} className="footer-news-item">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <span>{item.tag}</span>
                    <p>{item.title}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <h4 className="footer-title">Quick Contact</h4>
            <div className="footer-contact-block">
              <div className="footer-contact-row">
                <span className="footer-icon">📍</span>
                <p>
                  20, 3rd Cross St, Jawahar Nagar, Kavery Nagar, Reddiarpalayam, Puducherry, 605005
                  <strong>Address</strong>
                </p>
              </div>
              <p className="footer-help-text">
                If you have any question or need help, feel free to contact with our team.
              </p>
              <div className="footer-contact-row">
                <span className="footer-icon">📞</span>
                <a href="tel:+919092739393" className="footer-phone">+91 90927 39393</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
