import { useState } from "react";
import EstimateModal from "./EstimateModal";

const OfferForm = () => {
  const [showEstimate, setShowEstimate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = "919677973676";
    window.open(
      `https://wa.me/${phone}?text=Hi, I want 50% OFF wall painting offer`,
      "_blank"
    );
  };

  return (
    <>
      <section className="container my-5" id="leadForm">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h3 className="text-center mb-3">Claim Your 50% Discount</h3>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="tel"
                  className="form-control mb-3"
                  placeholder="Mobile Number"
                  required
                />

                <button className="btn btn-danger w-100 mb-3">
                  Get Instant Call Back
                </button>
              </form>

              <button
                className="btn btn-outline-primary w-100"
                onClick={() => setShowEstimate(true)}
              >
                Get Estimate
              </button>
            </div>
          </div>
        </div>
      </section>

      <EstimateModal
        show={showEstimate}
        onClose={() => setShowEstimate(false)}
      />
    </>
  );
};

export default OfferForm;
