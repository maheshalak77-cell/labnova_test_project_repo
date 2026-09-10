// // import { Breadcrumb, Button } from "../components/ui";

// // export function AboutPage({ navigate }: { navigate: (path: string) => void }) {
// //   return (
// //     <main className="inner-page about-page">
// //       <section className="about-hero section-wrap">
// //         <Breadcrumb navigate={navigate} items={[{ label: "About Us" }]} />
// //         <div className="about-headline">
// //           <span className="eyebrow">About LabNova</span>
// //           <h1>
// //             Supporting science.
// //             <br />
// //             <em>Simplifying supply.</em>
// //           </h1>
// //           <p>
// //             LabNova Scientific is an Australian laboratory and scientific supply
// //             company committed to supporting laboratories, research organisations
// //             and industry with reliable products, responsive service and
// //             practical scientific solutions.
// //           </p>
// //         </div>
// //         <div className="about-collage">
// //           <div className="about-image about-image--large">
// //             <img
// //               src="/assets/products/glassware-beaker-250ml.png"
// //               alt="Amber laboratory glassware arranged on a clean work surface"
// //             />
// //           </div>
// //           <div className="about-statement">
// //             <span>OUR FOCUS</span>
// //             <strong>
// //               Clarity in every selection.
// //               <br />
// //               Confidence in every product.
// //             </strong>
// //           </div>
// //           <div className="about-image about-image--small">
// //             <img
// //               src="/assets/products/safety-lab-coat.png"
// //               alt="Laboratory coat and PPE"
// //             />
// //           </div>
// //         </div>
// //       </section>
// //       <section className="story section-wrap">
// //         <div className="story-title">
// //           <span>LABNOVA / AU</span>
// //           <h2>
// //             More than a catalogue,
// //             <br />
// //             considered carefully.
// //           </h2>
// //         </div>
// //         <div className="story-copy">
// //           <p>
// //             We understand that laboratory procurement is about more than simply
// //             purchasing a product. The right specification, quality,
// //             availability, documentation and dependable supply all matter — our
// //             goal is to make that process easier by giving customers a trusted
// //             point of contact for their laboratory and scientific requirements.
// //           </p>
// //           <p>
// //             Our product portfolio covers a broad range of laboratory
// //             consumables, glassware, plasticware, sample collection and storage
// //             products, PPE and other scientific supplies. As our capabilities
// //             continue to develop, LabNova is also building solutions across
// //             specialised sourcing, equipment support, calibration, maintenance
// //             and related scientific services.
// //           </p>
// //           <p>
// //             Not every laboratory requirement can be solved by selecting an item
// //             from a standard catalogue. Customers often need a particular
// //             specification, pack size, material, brand or specialised product
// //             that may be difficult to source — LabNova takes a solution-focused
// //             approach to these requests. If you can't find the product you need,
// //             talk to us.
// //           </p>
// //         </div>
// //       </section>
// //       <section className="quality-banner section-wrap">
// //         <div>
// //           <span className="eyebrow">Quality & standards</span>
// //           <h2>Reliable by design.</h2>
// //           <p>
// //             We work to understand the technical and commercial requirements
// //             behind every enquiry and identify suitable sourcing options, helping
// //             customers reduce the time and complexity involved in laboratory
// //             procurement.
// //           </p>
// //         </div>
// //         <Button secondary onClick={() => navigate("/contact")}>
// //           Discuss your requirements
// //         </Button>
// //       </section>
// //     </main>
// //   );
// // }

// import { Breadcrumb, Button } from "../components/ui";

// export function AboutPage({ navigate }: { navigate: (path: string) => void }) {
//   return (
//     <main className="inner-page about-page">
//       <section className="about-hero section-wrap">
//         <Breadcrumb navigate={navigate} items={[{ label: "About Us" }]} />
//         <div className="about-headline">
//           <span className="eyebrow">About LabNova</span>
//           <h1>
//             Supporting science.
//             <br />
//             <em>Simplifying supply.</em>
//           </h1>
//           <p>
//             LabNova Scientific is an Australian laboratory and scientific supply
//             company committed to supporting laboratories, research organisations
//             and industry with reliable products, responsive service and
//             practical scientific solutions.
//           </p>
//         </div>
//         <div className="about-collage">
//           <div className="about-image about-image--large">
//             <img
//               src="/assets/products/glassware-beaker-250ml.png"
//               alt="Amber laboratory glassware arranged on a clean work surface"
//             />
//           </div>
//           <div className="about-statement">
//             <span>OUR FOCUS</span>
//             <strong>
//               Clarity in every selection.
//               <br />
//               Confidence in every product.
//             </strong>
//           </div>
//           <div className="about-image about-image--small">
//             <img
//               src="/assets/products/safety-lab-coat.png"
//               alt="Laboratory coat and PPE"
//             />
//           </div>
//         </div>
//       </section>
//       <section className="story section-wrap">
//         <div className="story-title">
//           <span>LABNOVA / AU</span>
//           <h2>
//             More than a catalogue,
//             <br />
//             considered carefully.
//           </h2>
//         </div>
//         <div className="story-copy">
//           <p>
//             We understand that laboratory procurement is about more than simply
//             purchasing a product. The right specification, quality,
//             availability, documentation and dependable supply all matter — our
//             goal is to make that process easier by giving customers a trusted
//             point of contact for their laboratory and scientific requirements.
//           </p>
//           <p>
//             Our product portfolio covers a broad range of laboratory
//             consumables, glassware, plasticware, sample collection and storage
//             products, PPE and other scientific supplies. As our capabilities
//             continue to develop, LabNova is also building solutions across
//             specialised sourcing, equipment support, calibration, maintenance
//             and related scientific services.
//           </p>
//           <p>
//             Not every laboratory requirement can be solved by selecting an item
//             from a standard catalogue. Customers often need a particular
//             specification, pack size, material, brand or specialised product
//             that may be difficult to source — LabNova takes a solution-focused
//             approach to these requests. If you can't find the product you need,
//             talk to us.
//           </p>
//         </div>
//       </section>
//       <section className="quality-banner section-wrap">
//         <div>
//           <span className="eyebrow">Quality & standards</span>
//           <h2>Reliable by design.</h2>
//           <p>
//             We work to understand the technical and commercial requirements
//             behind every enquiry and identify suitable sourcing options, helping
//             customers reduce the time and complexity involved in laboratory
//             procurement.
//           </p>
//         </div>
//         <Button secondary onClick={() => navigate("/contact")}>
//           Discuss your requirements
//         </Button>
//       </section>
//     </main>
//   );
// }

import { Breadcrumb, Button } from "../components/ui";

export function AboutPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <main className="inner-page about-page">
      <section className="about-hero section-wrap">
        <Breadcrumb navigate={navigate} items={[{ label: "About Us" }]} />
        <div className="about-headline">
          <span className="eyebrow">About LabNova</span>
          <h1>
            Supporting science.
            <br />
            <em>Simplifying supply.</em>
          </h1>
          <p>
            LabNova Scientific is an Australian laboratory and scientific supply
            company committed to supporting laboratories, research organisations
            and industry with reliable products, responsive service and
            practical scientific solutions.
          </p>
        </div>

        <div className="about-collage">
          <div className="about-image about-image--large">
            <img
              src="/assets/products/labprodcuts.jpg"
              alt="Amber laboratory glassware arranged on a clean work surface"
            />
          </div>
          <div className="about-statement">
            <span>OUR FOCUS</span>
            <strong>
              Clarity in every selection.
              <br />
              Confidence in every product.
            </strong>
          </div>
          <div className="about-image about-image--small">
            <img
              src="/assets/products/safety-lab-coat.png"
              alt="Laboratory coat and PPE"
            />
          </div>
        </div>
      </section>

      <section className="story section-wrap">
        <div className="story-title">
          <span>LABNOVA / AU</span>
          <h2>
            More than a catalogue,
            <br />
            considered carefully.
          </h2>
        </div>
        <div className="story-copy">
          <p>
            Laboratory procurement is more than buying a product —
            specification, quality and dependable supply all matter. We give
            customers a single trusted point of contact for their scientific
            requirements.
          </p>
          <p>
            Our range spans consumables, glassware, plasticware, sample storage
            and PPE, and we're expanding into sourcing, equipment support,
            calibration and maintenance services.
          </p>
          <p>
            Can't find exactly what you need? Talk to us — we take a
            solution-focused approach to hard-to-source specifications.
          </p>
        </div>
      </section>

      <section className="quality-banner section-wrap">
        <div>
          <span className="eyebrow">Quality & standards</span>
          <h2>Reliable by design.</h2>
          <p>
            We work to understand the technical and commercial requirements
            behind every enquiry and identify suitable sourcing options, helping
            customers reduce the time and complexity involved in laboratory
            procurement.
          </p>
        </div>
        <Button secondary onClick={() => navigate("/contact")}>
          Discuss your requirements
        </Button>
      </section>
    </main>
  );
}
