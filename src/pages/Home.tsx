import type { Product } from "../lib/types";
import { Button, Icon, IconName, SectionHeading } from "../components/ui";
import { ProductCard } from "../components/ProductCard";

const CylinderIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path
      d="M12 5h16v5l-2 24H14l-2-24V5Z"
      fill="#fff"
      stroke="#0B62CE"
      strokeWidth="1.7"
    />
    <path d="M13.5 24h13l-1 8H15l-1.5-8Z" fill="#06A9F4" fillOpacity=".55" />
    <path d="M11 9h18" stroke="#0B62CE" strokeWidth="2" />
    <path d="M22 14h5m-5 4h5m-5 4h5" stroke="#0B62CE" strokeWidth="1" />
  </svg>
);

const FlaskIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path
      d="M16 4h8v10l8 15c2 4 0 7-5 7H13c-5 0-7-4-5-8l8-14V4Z"
      fill="#fff"
      stroke="#0B62CE"
      strokeWidth="1.7"
    />
    <path
      d="M10 27c6-3 13 4 20-1l2 4c2 4 0 6-5 6H13c-4 0-6-3-3-9Z"
      fill="#06A9F4"
      fillOpacity=".55"
    />
    <path d="M14 4h12" stroke="#0B62CE" strokeWidth="2" />
  </svg>
);

export function Home({
  navigate,
  openProduct,
  addProduct,
  products,
  loading,
  error,
}: {
  navigate: (path: string) => void;
  openProduct: (p: Product) => void;
  addProduct: (p: Product) => void;
  products: Product[];
  loading: boolean;
  error: string | null;
}) {
  const benefits: { icon: IconName; title: string; text: string }[] = [
    {
      icon: "shield",
      title: "Secure & Trusted",
      text: "Trusted Australian supplier",
    },
    { icon: "quality", title: "Quality Assured", text: "Premium products" },
    {
      icon: "dispatch",
      title: "Fast Dispatch",
      text: "Same-day Australia-wide",
    },
    { icon: "expert", title: "Expert Support", text: "Technical specialists" },
    { icon: "returns", title: "Easy Returns", text: "Hassle-free process" },
  ];

  const featured = products.slice(0, 4);

  return (
    <main>
      <section className="lh-hero" aria-labelledby="hero-title">
        <div className="lh-hero-copy">
          <span className="lh-eyebrow">Laboratory supply, re-engineered</span>
          <h1 id="hero-title" className="lh-hero-title">
            <span className="lh-line">Science, stocked</span>
            <span className="lh-line lh-accent">for what&rsquo;s next.</span>
          </h1>
          <p className="lh-intro">
            Reliable laboratory supplies designed for research, education,
            healthcare and scientific applications&mdash;sourced with clarity
            and quoted without the procurement runaround.
          </p>

          <div className="lh-hero-actions">
            <Button onClick={() => navigate("/products")}>
              Explore Products <Icon name="arrow" />
            </Button>
            <Button secondary onClick={() => navigate("/contact")}>
              Request a Quote
            </Button>
          </div>

          <div className="lh-proof-row" aria-label="Service highlights">
            <div className="lh-proof-item">
              <strong>Traceable</strong>
              <span>Catalog data</span>
            </div>
            <div className="lh-proof-item">
              <strong>Responsive</strong>
              <span>Quote support</span>
            </div>
            <div className="lh-proof-item">
              <strong>Bulk-ready</strong>
              <span>Procurement</span>
            </div>
          </div>
        </div>

        <div
          className="lh-visual-wrap"
          aria-label="Laboratory glassware collection"
        >
          <div className="lh-orbital-field">
            <div className="lh-orbit lh-orbit-one" aria-hidden="true" />
            <div className="lh-orbit lh-orbit-two" aria-hidden="true" />
            <div className="lh-orbit lh-orbit-three" aria-hidden="true" />

            <div className="lh-data-rail" aria-hidden="true">
              <span>
                CLASS <b>A</b>
              </span>
              <span>
                CAL <b>20&deg;C</b>
              </span>
              <span>
                LOT <b>46-N</b>
              </span>
            </div>

            <div className="lh-chamber">
              <span className="lh-chamber-label">Lab essentials / curated</span>
              <span className="lh-chamber-index">LN &mdash; 024.6</span>
              <img
                className="lh-hero-photo"
                src="/lab-glassware-hero.webp"
                alt="Amber reagent bottle, graduated cylinder, flask, and beaker arranged on blue laboratory plinths"
              />
            </div>

            <div className="lh-product-card lh-card-a">
              <span className="lh-thumb">
                <CylinderIcon />
              </span>
              <span>
                <strong>Graduated ware</strong>
                <small>Class A / calibrated</small>
              </span>
            </div>
            <div className="lh-product-card lh-card-b">
              <span className="lh-thumb">
                <FlaskIcon />
              </span>
              <span>
                <strong>Borosilicate glass</strong>
                <small>Thermal resistant</small>
              </span>
            </div>

            <div className="lh-availability">
              <i aria-hidden="true" /> Quote team online
            </div>
          </div>
        </div>
      </section>

      <section className="featured section-wrap">
        <SectionHeading
          eyebrow="Curated essentials"
          title="Featured Products"
          action={
            <button className="text-link" onClick={() => navigate("/products")}>
              View All Products <Icon name="arrow" size={18} />
            </button>
          }
        />
        {loading && <div className="catalog-state">Loading products…</div>}
        {error && (
          <div className="catalog-state catalog-state--error">
            <Icon name="alert" size={18} />
            {error}
          </div>
        )}
        {!loading && !error && (
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpen={() => openProduct(p)}
                onAdd={() => addProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="why section-wrap">
        <div className="why-intro">
          <span className="eyebrow">Built on precision</span>
          <h2>
            Confidence at every <br />
            point of your workflow.
          </h2>
          <p>
            From selection to dispatch, every part of the LabNova experience is
            designed to keep scientific work moving.
          </p>
        </div>
        <div className="benefit-track">
          <div className="benefit-line" />
          {benefits.map((benefit) => (
            <article className="benefit" key={benefit.title}>
              <div className="benefit__icon">
                <Icon name={benefit.icon} />
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
