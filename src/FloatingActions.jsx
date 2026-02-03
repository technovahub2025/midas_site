const FloatingActions = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-actions">
      <a
        href="#leadForm"
        className="floating-btn estimate-btn"
        title="Get Estimate"
      >
        📐
      </a>

      <a
        href="https://wa.me/918682057193"
        className="floating-btn whatsapp-btn"
        target="_blank"
        rel="noreferrer"
        title="WhatsApp"
      >
        💬
      </a>

      <button
        className="floating-btn top-btn"
        onClick={goToTop}
        title="Go to Top"
      >
        🔝
      </button>
    </div>
  );
};

export default FloatingActions;
