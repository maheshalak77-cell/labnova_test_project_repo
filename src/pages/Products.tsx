import { useState } from "react";
import type { Category, Product } from "../lib/types";
import { Breadcrumb, Icon } from "../components/ui";
import { ProductCard } from "../components/ProductCard";

export function ProductsPage({
  navigate,
  openProduct,
  addProduct,
  products,
  categories,
  loading,
  error,
  initialCategory,
}: {
  navigate: (path: string) => void;
  openProduct: (p: Product) => void;
  addProduct: (p: Product) => void;
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  initialCategory?: string;
}) {
  const [filter, setFilter] = useState<string>(initialCategory || "All Products");
  const filtered = filter === "All Products" ? products : products.filter((p) => p.category === filter);
  return (
    <main className="inner-page products-page">
      <section className="page-intro section-wrap">
        <Breadcrumb navigate={navigate} items={[{ label: "Products" }]}/>
        <div className="page-intro__grid"><div><span className="eyebrow">The LabNova range</span><h1>Laboratory<br/>Products</h1></div><p>Explore our range of laboratory supplies and scientific products—selected for clarity, reliability, and everyday performance.</p></div>
        <div className="filter-row" role="tablist" aria-label="Product categories">
          {["All Products", ...categories.map((c) => c.name)].map((cat) => (
            <button role="tab" aria-selected={filter === cat} className={filter === cat ? "active" : ""} key={cat} onClick={() => setFilter(cat)}>
              {cat}<small>{cat === "All Products" ? products.length : products.filter((p) => p.category === cat).length}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="catalogue section-wrap">
        {loading && <div className="catalog-state">Loading products…</div>}
        {error && <div className="catalog-state catalog-state--error"><Icon name="alert" size={18}/> {error}</div>}
        {!loading && !error && (
          <>
            <div className="catalogue-meta"><span>{filtered.length.toString().padStart(2, "0")} PRODUCTS</span><i/><span>{filter.toUpperCase()}</span></div>
            {filtered.length ? (
              <div className="product-grid product-grid--catalogue">{filtered.map((p) => <ProductCard key={p.id} product={p} onOpen={() => openProduct(p)} onAdd={() => addProduct(p)}/>)}</div>
            ) : (
              <div className="catalog-state">No products in this category yet.</div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
