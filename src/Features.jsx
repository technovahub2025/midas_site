const FEATURES = [
  {
    icon: "⚡",
    title: "Instant Interior Estimate",
    desc: "Know your cost instantly based on your space",
  },
  {
    icon: "💬",
    title: "WhatsApp Consultation",
    desc: "Direct chat with interior experts",
  },
  {
    icon: "💎",
    title: "Transparent Pricing",
    desc: "Clear ₹/sq.ft pricing, no hidden charges",
  },
  {
    icon: "🛠️",
    title: "End-to-End Execution",
    desc: "Design, materials & installation handled",
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>

        <div className="row g-4">
          {FEATURES.map((f, i) => (
            <div className="col-md-3 col-6" key={i}>
              <div className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h6>{f.title}</h6>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
