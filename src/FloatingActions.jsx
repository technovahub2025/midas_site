import { useEffect, useState } from "react";

const ICON_ESTIMATE = "\u{1F4D0}";
const ICON_WHATSAPP = "\u{1F4AC}";
const ICON_TOP = "\u{1F51D}";

const FloatingActions = ({ onOpenEstimate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const firstSection = document.querySelector(".hero-section");
      const threshold = firstSection ? Math.max(firstSection.offsetHeight - 80, 120) : 220;
      setIsVisible(window.scrollY > threshold);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`floating-actions ${isVisible ? "show" : "hide"}`}>
      <button
        type="button"
        className="floating-btn estimate-btn"
        title="Get Estimate"
        onClick={onOpenEstimate}
      >
        {ICON_ESTIMATE}
      </button>

      <a
        href="https://wa.me/919092739393"
        className="floating-btn whatsapp-btn"
        target="_blank"
        rel="noreferrer"
        title="WhatsApp"
      >
        {ICON_WHATSAPP}
      </a>

      <button
        type="button"
        className="floating-btn top-btn"
        onClick={goToTop}
        title="Go to Top"
      >
        {ICON_TOP}
      </button>
    </div>
  );
};

export default FloatingActions;
