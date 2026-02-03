// import beforeImg from "../assets/before.jpeg";
// import afterImg from "../assets/after.jpeg";
// const BeforeAfter = () => {
//   return (
//     <section className="container my-5">
//       <h2 className="text-center mb-4">
//         Before & After Transformation
//       </h2>

//       <div className="row g-4">
//         <div className="col-md-6">
//           <img src={beforeImg} className="img-fluid rounded" id="BAimg" />
//         </div>
//         <div className="col-md-6">
//           <img src={afterImg} className="img-fluid rounded" id="BAimg" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BeforeAfter;
import beforeImg from "./assets/before.jpeg";
import afterImg from "./assets/after.jpeg";

const BeforeAfter = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">
        Before & After Transformation
      </h2>

      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={beforeImg}
            alt="Before transformation"
            className="img-fluid rounded BAimg"
          />
        </div>

        <div className="col-md-6">
          <img
            src={afterImg}
            alt="After transformation"
            className="img-fluid rounded BAimg"
          />
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
