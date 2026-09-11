import type { Category, Product } from "../lib/types";
import { Button, Icon, IconName, SectionHeading } from "../components/ui";
import { ProductCard } from "../components/ProductCard";

const CATEGORY_ICONS: Record<string, IconName> = {
  plasticware: "box",
  glassware: "flask",
  consumables: "grid",
  "safety-ppe": "shield",
};

export function Home({
  navigate,
  openProduct,
  addProduct,
  onBrowseCategory,
  products,
  categories,
  loading,
  error,
}: {
  navigate: (path: string) => void;
  openProduct: (p: Product) => void;
  addProduct: (p: Product) => void;
  onBrowseCategory: (categoryName: string) => void;
  products: Product[];
  categories: Category[];
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
    { icon: "headset", title: "Expert Support", text: "Technical specialists" },
    { icon: "returns", title: "Easy Returns", text: "Hassle-free process" },
  ];

  // The Home page shows whatever the admin has chosen as "featured" (max 4).
  // Until an admin picks any, fall back to the first 4 products so the
  // section is never empty on a fresh install.
  const adminFeatured = products.filter((p) => p.isFeatured);
  const featured = (adminFeatured.length ? adminFeatured : products).slice(
    0,
    4,
  );

  return (
    <main>
      <section className="lh-hero" aria-labelledby="hero-title">
        <div className="lh-hero-copy">
          <span className="lh-eyebrow">Laboratory supply, re-engineered</span>
          <h1 id="hero-title" className="lh-hero-title">
            <span className="lh-line">Supplying Science.</span>
            <span className="lh-line">
              <span className="lh-accent">Delivering</span>{" "}
              <span className="lh-accent">Solutions.</span>
            </span>
          </h1>
          <p className="lh-intro">
            Supporting Australian laboratories, manufacturers, universities and
            research organisations with premium laboratory supplies, technical
            expertise and scientific solutions.
          </p>

          <div className="lh-hero-actions">
            <Button onClick={() => navigate("/products")}>
              Shop Products <Icon name="arrow" />
            </Button>
            <Button secondary onClick={() => navigate("/contact")}>
              Request a Quote
            </Button>
          </div>

          <div className="lh-trust-strip" aria-label="Why choose LabNova">
            <div className="lh-trust-item">
              <Icon name="pin" size={19} />
              <div>
                <strong>Australian-Owned</strong>
                <span>Local Support</span>
              </div>
            </div>
            <div className="lh-trust-item">
              <Icon name="shield" size={19} />
              <div>
                <strong>Quality Focused</strong>
                <span>Carefully Selected Products</span>
              </div>
            </div>
            <div className="lh-trust-item">
              <Icon name="dispatch" size={19} />
              <div>
                <strong>Fast &amp; Reliable Dispatch</strong>
                <span>Australia-Wide</span>
              </div>
            </div>
            <div className="lh-trust-item">
              <Icon name="flask" size={19} />
              <div>
                <strong>Scientific Solutions</strong>
                <span>For a Brighter Tomorrow</span>
              </div>
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
                <Icon name="flask" />
              </span>
              <span className="lh-card-text">
                <strong>Laboratory Supplies</strong>
                <small>Everyday to specialist solutions</small>
              </span>
            </div>
            <div className="lh-product-card lh-card-c">
              <span className="lh-thumb">
                <Icon name="headset" />
              </span>
              <span className="lh-card-text">
                <strong>Expert Support</strong>
                <small>When you need it</small>
              </span>
            </div>
            <div className="lh-product-card lh-card-b">
              <span className="lh-thumb">
                <Icon name="sourcing" />
              </span>
              <span className="lh-card-text">
                <strong>Product Sourcing</strong>
                <small>We find what you need</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products (now before categories) ── */}
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

      {/* ── Categories (now after featured products) ── */}
      {!loading && !error && categories.length > 0 && (
        <section className="category-tiles-section section-wrap">
          <SectionHeading
            eyebrow="Browse by range"
            title="Explore Our Product Categories"
          />
          <div className="category-tiles">
            {categories.map((c) => (
              <button
                key={c.id}
                className="category-tile"
                onClick={() => onBrowseCategory(c.name)}
              >
                <span className="category-tile__icon">
                  <Icon name={CATEGORY_ICONS[c.slug] || "grid"} size={22} />
                </span>
                <span className="category-tile__body">
                  <strong>{c.name}</strong>
                  <span>
                    {c.product_count ?? 0} product
                    {c.product_count === 1 ? "" : "s"}
                  </span>
                </span>
                <Icon name="arrow" size={16} className="category-tile__arrow" />
              </button>
            ))}
          </div>
        </section>
      )}

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
