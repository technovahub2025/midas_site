const services = [
  { title: "Aluminium Partition", img: "/services/alumininiem.webp" },
  { title: "Armstrong Ceiling", img: "/services/Armstrong.webp" },

  { title: "Toughened Glass", img: "/services/glasss.webp" },
  { title: "Wardrobe", img: "/services/ward.webp" },

  { title: "Modular Kitchen", img: "/services/kichan.webp" },
  { title: "Imported Wallpapers", img: "/services/wall (2).webp" },

  { title: "Turnkey Projects", img: "/services/turkey.webp" },
  { title: "Vinyl Flooring", img: "/services/vinyl (4).webp" },

  { title: "Blinds", img: "/services/blind (2).webp" },
  { title: "UPVC Doors & Windows", img: "/services/upvc.webp" },
];


const Services = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Our Interior Services</h2>

      <div className="row g-3">
        {services.map((service, i) => (
          <div className="col-6 col-md-4 col-lg-3" key={i}>
            <div className="service-card">
              <img
                src={service.img}
                alt={service.title}
                className="service-img"
              />
              <div className="service-title">
                {service.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
