const STEPS = [
  {
    step: "01",
    title: "Choose Package",
    desc: "Select Basic, Standard or Premium plan",
  },
  {
    step: "02",
    title: "Enter Area",
    desc: "Provide your square feet requirement",
  },
  {
    step: "03",
    title: "Get Estimate",
    desc: "Instant cost calculation",
  },
  {
    step: "04",
    title: "WhatsApp Support",
    desc: "Confirm & customize with experts",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-section">
      <div className="container">
        <h2 className="section-title">How It Works</h2>

        <div className="row g-4">
          {STEPS.map((s, i) => (
            <div className="col-md-3 col-6" key={i}>
              <div className="step-card">
                <div className="step-number">{s.step}</div>
                <h6>{s.title}</h6>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
