import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HeroVideo from "./HeroVideo";
import OfferForm from "./OfferForm";
import Services from "./Services";
import OfferStrip from "./OfferStrip";
import HowItWorks from "./HowItWorks";
import "./wallOffer.css";
import PriceList from './PriceList';
import Features from './Features';
import FloatingActions from './FloatingActions';
import TrustStats from './TrustStats';
import BeforeAfter from './BeforeAfter';
import ContactFooter from './ContactFooter';

function App() {
  const [showEstimate, setShowEstimate] = useState(false);
  const bodyLines = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="body-lines" aria-hidden="true">
        <div className="body-lines-container">
          {bodyLines.map((line) => (
            <span key={line} className="line">
              <span className="dot" />
            </span>
          ))}
        </div>
      </div>
      <HeroVideo onOpenEstimate={() => setShowEstimate(true)} />
      <Features />
      <OfferForm
        showEstimate={showEstimate}
        onOpenEstimate={() => setShowEstimate(true)}
        onCloseEstimate={() => setShowEstimate(false)}
      />
      <HowItWorks />
      <PriceList />
      <BeforeAfter />
      <Services />
      <OfferStrip />
      <TrustStats />
      <ContactFooter />
      <FloatingActions onOpenEstimate={() => setShowEstimate(true)} />
    </>
  );
}

export default App;
