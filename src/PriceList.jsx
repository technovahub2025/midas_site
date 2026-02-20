const COMBO_PACKAGES = [
  {
    name: "Basic Package",
    price: "₹2,350 / sq.ft",
    theme: "basic",
    includes: [
      "Standard False Ceiling",
      "Economy Wall Painting",
      "Basic Electrical & Plumbing",
      "Standard Flooring",
      "Basic Doors & Windows",
    ],
  },
  {
    name: "Standard Package",
    price: "₹2,450 / sq.ft",
    theme: "standard",
    popular: true,
    includes: [
      "Premium False Ceiling",
      "Premium Wall Painting",
      "Modular Kitchen (Basic)",
      "Premium Flooring",
      "Branded Electrical & Plumbing",
    ],
  },
  {
    name: "Premium Package",
    price: "₹2,650 / sq.ft",
    theme: "premium",
    includes: [
      "Designer False Ceiling",
      "Luxury Wall Painting",
      "Modular Kitchen (Premium)",
      "Imported Flooring",
      "Top Brand Electrical & Plumbing",
    ],
  },
];

const WHATSAPP_NUMBER = "918682057193";

const ComboPackages = () => {
  const sendWhatsAppMessage = (pkg) => {
    const message = `
Hi, I’m interested in the ${pkg.name}.

Package Price: ${pkg.price}

Please contact me for further details.
    `;

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <section className="container my-5" id="priceBar">
      <h2 className="text-center mb-4">
        Interior Combo Packages
      </h2>

      <div className="row g-4">
        {COMBO_PACKAGES.map((pkg, index) => (
          <div className="col-md-4" key={index}>
            <div
              className={`combo-card ${pkg.theme} ${
                pkg.popular ? "popular" : ""
              }`}
            >
              {pkg.popular && (
                <div className="popular-badge">MOST POPULAR</div>
              )}

              <div className="combo-header">
                <h4>{pkg.name}</h4>
                <h3>{pkg.price}</h3>
              </div>

              <ul className="combo-list">
                {pkg.includes.map((item, i) => (
                  <li key={i}>✔ {item}</li>
                ))}
              </ul>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => sendWhatsAppMessage(pkg)}
              >
                Get Estimate
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComboPackages;

