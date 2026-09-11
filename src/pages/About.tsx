import { Breadcrumb, Button } from "../components/ui";

export function AboutPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <main className="inner-page about-page">
      <section className="about-hero section-wrap">
        <Breadcrumb navigate={navigate} items={[{ label: "About Us" }]} />
        <div className="about-headline">
          <span className="eyebrow">About LabNova</span>
          <h1>
            Supporting Science.
            <br />
            <em>Simplifying Supply.</em>
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
          <h2>A trusted point of contact.</h2>
        </div>
        <div className="story-copy">
          <p>
            We understand that laboratory procurement is about more than simply
            purchasing a product. The right specification, quality,
            availability, documentation and dependable supply all matter. Our
            goal is to make that process easier by providing customers with a
            trusted point of contact for their laboratory and scientific
            requirements.
          </p>
          <p>
            Our product portfolio covers a broad range of laboratory
            consumables, glassware, plasticware, sample collection and storage
            products, PPE and other scientific supplies. As our capabilities
            continue to develop, LabNova is also building solutions across
            specialised sourcing, equipment support, calibration, maintenance
            and related scientific services.
          </p>
        </div>
      </section>

      <section className="story section-wrap">
        <div className="story-title">
          <span>SOLUTION-FOCUSED</span>
          <h2>More Than a Catalogue</h2>
        </div>
        <div className="story-copy">
          <p>
            Not every laboratory requirement can be solved by selecting an item
            from a standard catalogue.
          </p>
          <p>
            Customers often need a particular specification, pack size,
            material, brand or specialised product that may be difficult to
            source. LabNova takes a solution-focused approach to these requests.
          </p>
          <p className="story-callout">
            If you can't find the product you need, talk to us.
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
