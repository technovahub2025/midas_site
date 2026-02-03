import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PRODUCTS = [
    { id: 1, name: "Wall Painting", rate: 45, img: "/services/wall (2).webp" },
    { id: 2, name: "False Ceiling", rate: 120, img: "/services/fall.webp" },
    { id: 3, name: "Vinyl Flooring", rate: 95, img: "/services/vinyl (4).webp" },
    { id: 4, name: "Modular Kitchen", rate: 1800, img: "/services/kichan.webp" },
    { id: 6, name: "False Ceiling", rate: 120, img: "/services/fall.webp" },
    { id: 8, name: "Modular Kitchen", rate: 1800, img: "/services/kichan.webp" },
    { id: 5, name: "Wall Painting", rate: 45, img: "/services/wall (2).webp" },
    { id: 7, name: "Vinyl Flooring", rate: 95, img: "/services/vinyl (4).webp" },
];

const WHATSAPP_NUMBER = "919677973676"; 

const EstimateModal = ({ show, onClose }) => {
    const [selected, setSelected] = useState({});
    const [total, setTotal] = useState(null);

    const resetState = () => {
        setSelected({});
        setTotal(null);
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const toggleProduct = (product) => {
        setSelected((prev) => {
            const updated = { ...prev };
            if (updated[product.id]) {
                delete updated[product.id];
            } else {
                updated[product.id] = { ...product, area: "" };
            }
            return updated;
        });
    };

    const updateArea = (id, value) => {
        setSelected((prev) => ({
            ...prev,
            [id]: { ...prev[id], area: value },
        }));
    };

    const calculateTotal = () => {
        let sum = 0;
        Object.values(selected).forEach((item) => {
            if (item.area) {
                sum += item.area * item.rate;
            }
        });
        setTotal(sum);
    };

    // WHATSAPP MESSAGE BUILDER
    const sendToWhatsApp = () => {
        let message = "Hi, I would like an interior estimate.%0A%0A";

        Object.values(selected).forEach((item) => {
            if (item.area) {
                const cost = item.area * item.rate;
                message += `${item.name}: ${item.area} sq.ft × ₹${item.rate} = ₹${cost.toLocaleString()}%0A`;
            }
        });

        message += `%0ATotal Estimated Cost: ₹${total.toLocaleString()}%0A%0A(Location: Pondicherry)`;

        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
            "_blank"
        );

    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Select Products & Area</Modal.Title>
            </Modal.Header>
                
            <Modal.Body>
                <div className="row g-3">
                    {PRODUCTS.map((product) => {
                        const isSelected = !!selected[product.id];

                        return (
                            <div className="col-6 col-md-3" key={product.id}>
                                <div
                                    className={`product-card ${isSelected ? "active" : ""}`}
                                    onClick={() => toggleProduct(product)}
                                >
                                    <img src={product.img} alt={product.name} />
                                    <h6>{product.name}</h6>
                                    <p>₹ {product.rate} / sq.ft</p>
                                </div>

                                {isSelected && (
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter sq.ft"
                                        className="mt-2"
                                        value={selected[product.id].area}
                                        onChange={(e) =>
                                            updateArea(product.id, e.target.value)
                                        }
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                <Button
                    className="w-100 mt-4"
                    variant="primary"
                    onClick={calculateTotal}
                >
                    Calculate Estimate
                </Button>

                {total !== null && (
                    <div className="alert alert-success mt-3 text-center">
                        <h5>Total Estimate</h5>
                        <h3>₹ {total.toLocaleString()}</h3>

                        <Button
                            variant="success"
                            className="mt-3 w-100"
                            onClick={sendToWhatsApp}
                        >
                            Send Estimate to WhatsApp
                        </Button>

                        <small className="d-block mt-2">
                            *Approximate estimate only
                        </small>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default EstimateModal;
