import { useEffect, useState } from "react";
import type { Product } from "../lib/types";
import { api, resolveImageUrl } from "../lib/api";
import { Breadcrumb, Button, Icon, money } from "../components/ui";

const TABS = [
  "Product Information",
  "Technical Specifications",
  "Features",
  "Applications",
  "Available Sizes",
] as const;

export function ProductDetail({
  slug,
  navigate,
  addProduct,
  onAskQuestion,
}: {
  slug: string;
  navigate: (path: string) => void;
  addProduct: (p: Product) => void;
  onAskQuestion: () => void;
}) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined); // undefined = loading, null = not found
  const [tab, setTab] = useState<(typeof TABS)[number]>("Product Information");
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setProduct(undefined);
    setTab("Product Information");
    setZoomed(false);
    api
      .getProduct(slug)
      .then((p) => !cancelled && setProduct(p))
      .catch(() => !cancelled && setProduct(null));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Close the lightbox with Escape while it's open.
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  if (product === undefined) {
    return (
      <main className="inner-page detail-page section-wrap">
        <div className="catalog-state">Loading product…</div>
      </main>
    );
  }
  if (product === null) {
    return (
      <main className="inner-page detail-page section-wrap">
        <div className="catalog-state catalog-state--error">
          <Icon name="alert" size={18} /> We couldn't find that product.
        </div>
        <Button onClick={() => navigate("/products")}>
          Back to Products <Icon name="arrow" />
        </Button>
      </main>
    );
  }

  const content = {
    "Product Information": (
      <p className="tab-copy">
        {product.fullDescription} Each item is selected to support repeatable
        handling and straightforward integration into established laboratory
        routines.
      </p>
    ),
    "Technical Specifications": (
      <ul className="info-list">
        {product.specifications.map((x) => (
          <li key={x}>
            <Icon name="check" size={16} />
            {x}
          </li>
        ))}
      </ul>
    ),
    Features: (
      <ul className="info-list">
        {product.features.map((x) => (
          <li key={x}>
            <Icon name="check" size={16} />
            {x}
          </li>
        ))}
      </ul>
    ),
    Applications: (
      <ul className="info-list">
        {product.applications.map((x) => (
          <li key={x}>
            <Icon name="check" size={16} />
            {x}
          </li>
        ))}
      </ul>
    ),
    "Available Sizes": (
      <div className="detail-sizes">
        {(product.sizes.length ? product.sizes : ["Standard"]).map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
    ),
  };

  return (
    <main className="inner-page detail-page section-wrap">
      <Breadcrumb
        navigate={navigate}
        items={[
          { label: "Products", path: "/products" },
          { label: product.name },
        ]}
      />
      <section className="detail-hero">
        <div className="detail-gallery">
          <div className="gallery-index">LN / {product.sku.slice(-3)}</div>
          <button
            type="button"
            className="gallery-zoom-trigger"
            onClick={() => setZoomed(true)}
            aria-label={`View larger image of ${product.name}`}
          >
            <img
              src={resolveImageUrl(product.image)}
              alt={`${product.name} in laboratory use`}
            />
            <span className="gallery-zoom-hint">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
              Click to enlarge
            </span>
          </button>
          <div className="gallery-caption">
            <span>LABORATORY GRADE</span>
            <i />
            <span>QUALITY ASSURED</span>
          </div>
        </div>
        <div className="detail-copy">
          <div className="detail-badges">
            <span className="category-label">{product.category}</span>
            <span
              className={`stock-pill ${product.inStock ? "stock-pill--in" : "stock-pill--out"}`}
            >
              <i />
              {product.inStock ? "In Stock" : "Contact for availability"}
            </span>
          </div>
          <h1>{product.name}</h1>
          <p>{product.fullDescription}</p>
          <div className="detail-action">
            {product.hidePrice ? (
              <div className="detail-price" aria-hidden="true">
                <strong>&nbsp;</strong>
              </div>
            ) : (
              <div className="detail-price">
                <span>From</span>
                <strong>{money(product.price)}</strong>
                <small> AUD</small>
              </div>
            )}
            <div className="detail-option">
              <span>Available sizes</span>
              <div>
                {(product.sizes.length ? product.sizes : ["Standard"]).map(
                  (size) => (
                    <b key={size}>{size}</b>
                  ),
                )}
              </div>
            </div>
            <div className="detail-sku">
              <span>PRODUCT REFERENCE</span>
              <strong>{product.sku}</strong>
            </div>
            <Button className="detail-add" onClick={() => addProduct(product)}>
              {product.inStock ? "Choose quantities" : "Request Quote"}{" "}
              <Icon name="arrow" />
            </Button>
          </div>
          <p className="detail-help">
            <Icon name="expert" size={18} /> Need help selecting?{" "}
            <button onClick={onAskQuestion}>Talk to a specialist</button>
          </p>
        </div>
      </section>
      <section className="information-panel">
        <div className="tab-list" role="tablist">
          {TABS.map((item) => (
            <button
              role="tab"
              aria-selected={tab === item}
              className={tab === item ? "active" : ""}
              onClick={() => setTab(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="tab-content">
          <span className="tab-number">
            {String(TABS.indexOf(tab) + 1).padStart(2, "0")}
          </span>
          <div>
            <h2>{tab}</h2>
            {content[tab]}
          </div>
        </div>
      </section>

      {zoomed && (
        <div
          className="modal-backdrop image-lightbox"
          onClick={() => setZoomed(false)}
        >
          <button
            className="image-lightbox__close"
            onClick={() => setZoomed(false)}
            aria-label="Close enlarged image"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
          <img
            src={resolveImageUrl(product.image)}
            alt={`${product.name} enlarged`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
