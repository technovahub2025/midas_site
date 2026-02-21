import { useState } from "react";
import { jsPDF } from "jspdf";
import logoImg from "./assets/middaslogo.webp";

const COMBO_PACKAGES = [
  {
    name: "Basic Package",
    priceLabel: "Rs. 2,350 / sq.ft",
    ratePerSqFt: 2350,
    theme: "basic",
    includes: [
      {
        label: "Standard False Ceiling",
        details: ["Armstrong Grid Ceiling", "Gypsum Board Ceiling", "Simple Cove Lighting"],
      },
      {
        label: "Economy Wall Painting",
        details: ["Acrylic Emulsion Finish", "Primer + 2 Coat System", "Basic Texture Option"],
      },
      {
        label: "Basic Electrical & Plumbing",
        details: ["Concealed Wiring Layout", "Standard Switch Modules", "CPVC Water Line Work"],
      },
      {
        label: "Standard Flooring",
        details: ["Vitrified Tiles", "Vinyl Flooring (Economy)", "Skirting Finishing"],
      },
      {
        label: "Basic Doors & Windows",
        details: ["UPVC Sliding Window", "Flush Main Door", "Standard Hardware Set"],
      },
    ],
  },
  {
    name: "Standard Package",
    priceLabel: "Rs. 2,450 / sq.ft",
    ratePerSqFt: 2450,
    theme: "standard",
    popular: true,
    includes: [
      {
        label: "Premium False Ceiling",
        details: ["Designer Gypsum Pattern", "Edge Profile Lighting", "Multi-level Ceiling Design"],
      },
      {
        label: "Premium Wall Painting",
        details: ["Luxury Emulsion Finish", "Feature Wall Texture", "Imported Wallpapers"],
      },
      {
        label: "Modular Kitchen (Basic)",
        details: ["Base + Wall Cabinets", "Granite Countertop", "Soft-close Channels"],
      },
      {
        label: "Premium Flooring",
        details: ["Large Format Tiles", "Vinyl Wooden Planks", "Anti-skid Bath Tiles"],
      },
      {
        label: "Branded Electrical & Plumbing",
        details: ["Anchor / Legrand Modules", "Branded CP Fittings", "Concealed Plumbing Upgrade"],
      },
    ],
  },
  {
    name: "Premium Package",
    priceLabel: "Rs. 2,650 / sq.ft",
    ratePerSqFt: 2650,
    theme: "premium",
    includes: [
      {
        label: "Designer False Ceiling",
        details: ["Curved Ceiling Concepts", "Cove + Spot Lighting Mix", "Statement Ceiling Panel"],
      },
      {
        label: "Luxury Wall Painting",
        details: ["Imported Wallpapers", "Metallic Texture Coats", "Premium Accent Wall Design"],
      },
      {
        label: "Modular Kitchen (Premium)",
        details: ["BWR Plywood Carcass", "Premium Laminate Finish", "Tall Unit + Pantry Setup"],
      },
      {
        label: "Imported Flooring",
        details: ["SPC Wooden Flooring", "Premium Vinyl Systems", "Luxury Tile Collection"],
      },
      {
        label: "Top Brand Electrical & Plumbing",
        details: ["Schneider / Legrand Fittings", "Brass Core Plumbing Set", "Smart Controls Provision"],
      },
    ],
  },
];

const ComboPackages = () => {
  const [sqFtValues, setSqFtValues] = useState({});
  const [logoDataUrl, setLogoDataUrl] = useState("");

  const updateSqFt = (packageName, value) => {
    setSqFtValues((prev) => ({
      ...prev,
      [packageName]: value,
    }));
  };

  const getLogoDataUrl = () =>
    new Promise((resolve, reject) => {
      if (logoDataUrl) {
        resolve(logoDataUrl);
        return;
      }

      const img = new Image();
      img.src = logoImg;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context unavailable"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        setLogoDataUrl(dataUrl);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Failed to load logo image"));
    });

  const downloadEstimatePdf = async (pkg) => {
    const rawSqFt = sqFtValues[pkg.name];
    const sqFt = Number.parseFloat(rawSqFt);

    if (!sqFt || sqFt <= 0) {
      window.alert(`Please enter a valid sq.ft value for ${pkg.name}.`);
      return;
    }

    const totalEstimate = Math.round(sqFt * pkg.ratePerSqFt);
    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const accentByTheme = {
      basic: [196, 102, 51],
      standard: [122, 122, 122],
      premium: [231, 176, 0],
    };
    const accent = accentByTheme[pkg.theme] || [245, 158, 11];
    const logo = await getLogoDataUrl();

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 22;
    const cardWidth = pageWidth - margin * 2;
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header strip
    doc.setFillColor(17, 24, 39);
    doc.rect(0, 0, pageWidth, 74, "F");
    doc.setFillColor(accent[0], accent[1], accent[2]);
    doc.rect(0, 74, pageWidth, 4, "F");

    // Logo card
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, 16, 128, 42, 8, 8, "F");
    doc.addImage(logo, "PNG", margin + 8, 22, 112, 30);

    // Title + Date
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("Midas Interiors - Estimate", 166, 34);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(222, 226, 234);
    doc.text(`Package: ${pkg.name}`, 166, 52);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(230, 233, 238);
    doc.text(`Date: ${today}`, pageWidth - margin, 32, { align: "right" });

    // Info card
    const infoY = 96;
    const infoH = 102;
    doc.setDrawColor(236, 196, 125);
    doc.setLineWidth(0.8);
    doc.roundedRect(margin, infoY, cardWidth, infoH, 10, 10, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(35, 42, 53);
    doc.text("Name: -", margin + 14, infoY + 24);
    doc.text("Mobile: -", margin + 14, infoY + 44);
    doc.text(`Site: ${pkg.name}`, margin + 14, infoY + 64);
    doc.text(`Total Built-up: ${sqFt.toLocaleString("en-IN")} sq.ft`, margin + 14, infoY + 84);

    // Table header + row
    const tableY = infoY + infoH + 16;
    const headerH = 34;
    const rowH = 38;
    const colW = [56, 144, 278, cardWidth - 56 - 144 - 278];
    const headers = ["S.No", "Category", "Selected Product", "Rate / sq.ft"];

    let x = margin;
    headers.forEach((label, idx) => {
      doc.setFillColor(236, 227, 204);
      doc.setDrawColor(190, 196, 204);
      doc.rect(x, tableY, colW[idx], headerH, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(24, 24, 24);
      doc.text(label, x + 8, tableY + 22);
      x += colW[idx];
    });

    const rowData = [
      "1",
      "Interior Package",
      pkg.name,
      `Rs.${pkg.ratePerSqFt.toLocaleString("en-IN")}`,
    ];

    x = margin;
    rowData.forEach((value, idx) => {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(190, 196, 204);
      doc.rect(x, tableY + headerH, colW[idx], rowH, "FD");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(34, 41, 50);
      const text = idx === 2 ? doc.splitTextToSize(value, colW[idx] - 10) : value;
      doc.text(text, x + 8, tableY + headerH + 22);
      x += colW[idx];
    });

    // Total summary card
    const totalY = tableY + headerH + rowH + 16;
    const totalH = 92;
    doc.setDrawColor(236, 196, 125);
    doc.roundedRect(margin, totalY, cardWidth, totalH, 10, 10, "S");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(40, 48, 60);
    doc.text(
      `Combined Material Rate: Rs.${pkg.ratePerSqFt.toLocaleString("en-IN")} / sq.ft`,
      margin + 14,
      totalY + 24
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(231, 138, 0);
    doc.text(`Total Estimate: Rs.${totalEstimate.toLocaleString("en-IN")}`, margin + 14, totalY + 52);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(70, 70, 70);
    doc.text("*Approximate estimate. Final cost may vary after site visit.", margin + 14, totalY + 74);

    // Footer line
    doc.setDrawColor(222, 226, 234);
    doc.line(margin, pageHeight - 32, pageWidth - margin, pageHeight - 32);
    doc.setFontSize(9);
    doc.setTextColor(112, 118, 128);
    doc.text("Midas Interiors & Traders", margin, pageHeight - 18);

    const fileName = `${pkg.name.replace(/\s+/g, "-").toLowerCase()}-estimate.pdf`;
    doc.save(fileName);
  };

  return (
    <section className="container my-5" id="priceBar">
      <h2 className="text-center mb-4">Interior Combo Packages</h2>

      <div className="row g-4">
        {COMBO_PACKAGES.map((pkg, index) => {
          const currentSqFt = sqFtValues[pkg.name] || "";
          const parsedSqFt = Number.parseFloat(currentSqFt);
          const estimate = parsedSqFt > 0 ? Math.round(parsedSqFt * pkg.ratePerSqFt) : null;

          return (
            <div className="col-md-4" key={index}>
              <div className={`combo-card ${pkg.theme} ${pkg.popular ? "popular" : ""}`}>
                {pkg.popular && <div className="popular-badge">MOST POPULAR</div>}

                <div className="combo-header">
                  <h4>{pkg.name}</h4>
                  <h3>{pkg.priceLabel}</h3>
                </div>

                <div className="combo-sqft-group">
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    className="form-control combo-sqft-input"
                    placeholder="Enter sq.ft"
                    value={currentSqFt}
                    onChange={(e) => updateSqFt(pkg.name, e.target.value)}
                  />

                  {estimate && (
                    <p className="combo-estimate-total mb-0">
                      Estimate: <strong>Rs. {estimate.toLocaleString("en-IN")}</strong>
                    </p>
                  )}
                </div>

                <ul className="combo-list">
                  {pkg.includes.map((item, i) => (
                    <li key={i}>
                      <span className="combo-item-label">{item.label}</span>
                      <div className="combo-hover-panel">
                        {item.details.map((detail) => (
                          <div className="combo-hover-row" key={detail}>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>

                <button className="btn btn-primary w-100 mt-3" onClick={() => downloadEstimatePdf(pkg)}>
                  Get Estimate
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ComboPackages;
