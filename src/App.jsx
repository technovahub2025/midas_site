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

function App() {
  return (
    <>
      <HeroVideo />
      <Features />
      <OfferForm />
      <HowItWorks />
      <PriceList />
      <BeforeAfter />
      <Services />
      <OfferStrip />
      <TrustStats />
      <FloatingActions />
    </>
  );
}

export default App;
