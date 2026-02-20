const STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "24 Hrs", label: "Response Time" },
];

const TrustStats = () => {
  return (
    <section className="trust-section" id="contactUs">
      <div className="container ">
        <div className="row text-center">
          {STATS.map((s, i) => (
            <div className="col-6 col-md-3" key={i}>
              <h2>{s.value}</h2>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
