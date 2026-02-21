import { useMemo, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { serviceImages } from "./serviceImages";

const WHATSAPP_NUMBER = "919092739393";

const STEPS = ["Basic Details", "Category", "Products", "Finish"];

const CATEGORIES = [
  { id: "aluminiumPartition", name: "Aluminium Partition", img: serviceImages.aluminiumPartition, baseRate: 65 },
  { id: "armstrongCeiling", name: "Armstrong Ceiling", img: serviceImages.armstrongCeiling, baseRate: 55 },
  { id: "toughenedGlass", name: "Toughened Glass", img: serviceImages.toughenedGlass, baseRate: 80 },
  { id: "wardrobe", name: "Wardrobe", img: serviceImages.wardrobe, baseRate: 120 },
  { id: "modularKitchen", name: "Modular Kitchen", img: serviceImages.modularKitchen, baseRate: 180 },
  { id: "importedWallpapers", name: "Imported Wallpapers", img: serviceImages.importedWallpapers, baseRate: 48 },
  { id: "turnkeyProjects", name: "Turnkey Projects", img: serviceImages.turnkeyProjects, baseRate: 140 },
  { id: "vinylFlooring", name: "Vinyl Flooring", img: serviceImages.vinylFlooring, baseRate: 70 },
  { id: "blinds", name: "Blinds", img: serviceImages.blinds, baseRate: 45 },
  { id: "upvcDoorsWindows", name: "UPVC Doors & Windows", img: serviceImages.upvcDoorsWindows, baseRate: 88 },
];

const MATERIAL_LIBRARY = CATEGORIES.reduce((map, category) => {
  map[category.id] = [
    {
      id: `${category.id}-economy`,
      name: `${category.name} Economy`,
      grade: "Economy",
      rate: Math.round(category.baseRate * 0.8),
    },
    {
      id: `${category.id}-standard`,
      name: `${category.name} Standard`,
      grade: "Standard",
      rate: category.baseRate,
    },
    {
      id: `${category.id}-premium`,
      name: `${category.name} Premium`,
      grade: "Premium",
      rate: Math.round(category.baseRate * 1.25),
    },
  ];
  return map;
}, {});

const INITIAL_BASIC_DETAILS = {
  name: "",
  mobile: "",
  email: "",
  siteLocation: "",
  plotArea: "",
  landFacing: "",
  groundFloor: "",
  firstFloor: "",
  secondFloor: "",
};

const EstimateModal = ({ show, onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [basicDetails, setBasicDetails] = useState(INITIAL_BASIC_DETAILS);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [error, setError] = useState("");

  const selectedCategoryDetails = useMemo(
    () => CATEGORIES.filter((cat) => selectedCategories.includes(cat.id)),
    [selectedCategories]
  );

  const totalBuiltUpArea = useMemo(() => {
    const ground = Number.parseFloat(basicDetails.groundFloor) || 0;
    const first = Number.parseFloat(basicDetails.firstFloor) || 0;
    const second = Number.parseFloat(basicDetails.secondFloor) || 0;
    return ground + first + second;
  }, [basicDetails]);

  const totalRate = useMemo(
    () =>
      selectedCategoryDetails.reduce((sum, cat) => {
        const chosen = selectedProducts[cat.id];
        return sum + (chosen?.rate || 0);
      }, 0),
    [selectedCategoryDetails, selectedProducts]
  );

  const totalEstimate = useMemo(() => totalBuiltUpArea * totalRate, [totalBuiltUpArea, totalRate]);

  const resetState = () => {
    setStepIndex(0);
    setBasicDetails(INITIAL_BASIC_DETAILS);
    setSelectedCategories([]);
    setSelectedProducts({});
    setError("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const updateBasicDetails = (field, value) => {
    setBasicDetails((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        const next = prev.filter((id) => id !== categoryId);
        setSelectedProducts((old) => {
          const updated = { ...old };
          delete updated[categoryId];
          return updated;
        });
        return next;
      }
      return [...prev, categoryId];
    });
  };

  const selectProduct = (categoryId, product) => {
    setSelectedProducts((prev) => ({ ...prev, [categoryId]: product }));
  };

  const validateStep = () => {
    if (stepIndex === 0) {
      if (!basicDetails.name.trim()) {
        return "Name is required.";
      }
      if (!basicDetails.mobile.trim()) {
        return "Mobile number is required.";
      }
      if (!basicDetails.siteLocation.trim()) {
        return "Site location is required.";
      }
      if (!basicDetails.plotArea.trim()) {
        return "Plot area is required.";
      }
      return "";
    }

    if (stepIndex === 1 && selectedCategories.length === 0) {
      return "Select at least one category.";
    }

    if (stepIndex === 2) {
      const missing = selectedCategoryDetails.filter((cat) => !selectedProducts[cat.id]);
      if (missing.length) {
        return "Choose one product in each selected category.";
      }
    }

    return "";
  };

  const nextStep = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const previousStep = () => {
    setError("");
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const sendToWhatsApp = () => {
    const lines = [
      "Hi, I want a building estimate.",
      "",
      "Basic Details:",
      `Name: ${basicDetails.name}`,
      `Mobile: ${basicDetails.mobile}`,
      `Email: ${basicDetails.email || "-"}`,
      `Site: ${basicDetails.siteLocation}`,
      `Plot Area: ${basicDetails.plotArea} sq.ft`,
      `Land Facing: ${basicDetails.landFacing || "-"}`,
      `Ground Floor: ${basicDetails.groundFloor || 0} sq.ft`,
      `First Floor: ${basicDetails.firstFloor || 0} sq.ft`,
      `Second Floor: ${basicDetails.secondFloor || 0} sq.ft`,
      `Total Built-up: ${totalBuiltUpArea} sq.ft`,
      "",
      "Selected Materials:",
    ];

    selectedCategoryDetails.forEach((cat, index) => {
      const picked = selectedProducts[cat.id];
      lines.push(`${index + 1}. ${cat.name}: ${picked.name} (${picked.grade}) - Rs.${picked.rate}/sq.ft`);
    });

    lines.push("");
    lines.push(`Estimated Rate: Rs.${totalRate}/sq.ft`);
    lines.push(`Total Estimate: Rs.${Math.round(totalEstimate).toLocaleString("en-IN")}`);

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Check Your Dream House Estimation</Modal.Title>
      </Modal.Header>

      <Modal.Body className="estimate-wizard">
        <div className="estimate-stepper">
          {STEPS.map((label, index) => {
            const active = index <= stepIndex;
            return (
              <div className="estimate-step" key={label}>
                <div className={`estimate-step-dot ${active ? "active" : ""}`}>{index + 1}</div>
                <small>{label}</small>
              </div>
            );
          })}
        </div>

        {error && <div className="alert alert-danger py-2 mt-3 mb-0">{error}</div>}

        {stepIndex === 0 && (
          <div className="mt-3">
            <h5 className="mb-3">Basic Details</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Control
                  placeholder="Name *"
                  value={basicDetails.name}
                  onChange={(e) => updateBasicDetails("name", e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <Form.Control
                  placeholder="Mobile Number *"
                  value={basicDetails.mobile}
                  onChange={(e) => updateBasicDetails("mobile", e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <Form.Control
                  placeholder="Email"
                  value={basicDetails.email}
                  onChange={(e) => updateBasicDetails("email", e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <Form.Control
                  placeholder="Site Location *"
                  value={basicDetails.siteLocation}
                  onChange={(e) => updateBasicDetails("siteLocation", e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <Form.Control
                  type="number"
                  placeholder="Plot Area (sq.ft) *"
                  value={basicDetails.plotArea}
                  onChange={(e) => updateBasicDetails("plotArea", e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <Form.Select
                  value={basicDetails.landFacing}
                  onChange={(e) => updateBasicDetails("landFacing", e.target.value)}
                >
                  <option value="">Land Facing</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </Form.Select>
              </div>
              <div className="col-md-4">
                <Form.Control
                  type="number"
                  placeholder="Ground Floor (sq.ft)"
                  value={basicDetails.groundFloor}
                  onChange={(e) => updateBasicDetails("groundFloor", e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <Form.Control
                  type="number"
                  placeholder="First Floor (sq.ft)"
                  value={basicDetails.firstFloor}
                  onChange={(e) => updateBasicDetails("firstFloor", e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <Form.Control
                  type="number"
                  placeholder="Second Floor (sq.ft)"
                  value={basicDetails.secondFloor}
                  onChange={(e) => updateBasicDetails("secondFloor", e.target.value)}
                />
              </div>
              <div className="col-12">
                <div className="estimate-builtup">Total Built-up Area: {totalBuiltUpArea} sq.ft</div>
              </div>
            </div>
          </div>
        )}

        {stepIndex === 1 && (
          <div className="mt-3">
            <h5 className="mb-3">Select Category (Multiple Allowed)</h5>
            <div className="row g-3">
              {CATEGORIES.map((cat) => {
                const active = selectedCategories.includes(cat.id);
                return (
                  <div className="col-6 col-md-4 col-lg-3" key={cat.id}>
                    <button
                      type="button"
                      className={`estimate-select-card ${active ? "active" : ""}`}
                      onClick={() => toggleCategory(cat.id)}
                    >
                      <img src={cat.img} alt={cat.name} className="estimate-category-img" />
                      <strong>{cat.name}</strong>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {stepIndex === 2 && (
          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h5 className="mb-0">Choose Products</h5>
              <span className="estimate-cart-chip">Cart: {Object.keys(selectedProducts).length} selected</span>
            </div>

            {selectedCategoryDetails.map((cat) => (
              <div key={cat.id} className="mb-3">
                <h6 className="mb-2">{cat.name}</h6>
                <div className="row g-2">
                  {(MATERIAL_LIBRARY[cat.id] || []).map((item) => {
                    const active = selectedProducts[cat.id]?.id === item.id;
                    return (
                      <div className="col-12 col-md-4" key={item.id}>
                        <button
                          type="button"
                          className={`estimate-product-card ${active ? "active" : ""}`}
                          onClick={() => selectProduct(cat.id, item)}
                        >
                          <strong>{item.name}</strong>
                          <small>{item.grade}</small>
                          <span>Rs.{item.rate} / sq.ft</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {!selectedCategoryDetails.length && (
              <div className="alert alert-info mb-0">Select category first.</div>
            )}
          </div>
        )}

        {stepIndex === 3 && (
          <div className="mt-3">
            <h5 className="mb-3">Estimate Summary</h5>
            <div className="estimate-summary-card">
              <p className="mb-1"><strong>Name:</strong> {basicDetails.name}</p>
              <p className="mb-1"><strong>Mobile:</strong> {basicDetails.mobile}</p>
              <p className="mb-1"><strong>Site:</strong> {basicDetails.siteLocation}</p>
              <p className="mb-0"><strong>Total Built-up:</strong> {totalBuiltUpArea} sq.ft</p>
            </div>

            <div className="table-responsive mt-3">
              <table className="table table-bordered align-middle mb-0">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Category</th>
                    <th>Selected Product</th>
                    <th>Rate / sq.ft</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCategoryDetails.map((cat, index) => {
                    const picked = selectedProducts[cat.id];
                    return (
                      <tr key={cat.id}>
                        <td>{index + 1}</td>
                        <td>{cat.name}</td>
                        <td>
                          {picked?.name} <small className="text-muted">({picked?.grade})</small>
                        </td>
                        <td>Rs.{picked?.rate || 0}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="estimate-total-box mt-3">
              <div>Combined Material Rate: <strong>Rs.{totalRate} / sq.ft</strong></div>
              <div className="estimate-total-amount">Total Estimate: Rs.{Math.round(totalEstimate).toLocaleString("en-IN")}</div>
              <small>*Approximate estimate. Final cost may vary after site visit.</small>
            </div>

            <Button variant="success" className="w-100 mt-3" onClick={sendToWhatsApp}>
              Send Estimate to WhatsApp
            </Button>
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-secondary" onClick={previousStep} disabled={stepIndex === 0}>
            Previous
          </Button>

          {stepIndex < STEPS.length - 1 ? (
            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button variant="dark" onClick={handleClose}>
              Close
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EstimateModal;



