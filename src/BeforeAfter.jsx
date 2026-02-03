const BeforeAfter = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">
        Before & After Transformation
      </h2>

      <div className="row g-4">
        <div className="col-md-6">
          <img src="src/assets/before.jpeg" className="img-fluid rounded" id="BAimg" />
        </div>
        <div className="col-md-6">
          <img src="src/assets/after.jpeg" className="img-fluid rounded" id="BAimg" />
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
