import { serviceImages } from "./serviceImages";

const services = [
  { title: "Aluminium Partition", img: serviceImages.aluminiumPartition },
  { title: "Armstrong Ceiling", img: serviceImages.armstrongCeiling },

  { title: "Toughened Glass", img: serviceImages.toughenedGlass },
  { title: "Wardrobe", img: serviceImages.wardrobe },

  { title: "Modular Kitchen", img: serviceImages.modularKitchen },
  { title: "Imported Wallpapers", img: serviceImages.importedWallpapers },

  { title: "Turnkey Projects", img: serviceImages.turnkeyProjects },
  { title: "Vinyl Flooring", img: serviceImages.vinylFlooring },

  { title: "Blinds", img: serviceImages.blinds },
  { title: "UPVC Doors & Windows", img: serviceImages.upvcDoorsWindows },
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
