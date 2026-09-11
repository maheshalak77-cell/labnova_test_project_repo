// import { FormEvent, useEffect, useState } from "react";
// import { adminApi, resolveImageUrl } from "../lib/api";
// import type { Category, Product } from "../lib/types";
// import { Button, Icon, money } from "../components/ui";

// type FormMode = { kind: "new" } | { kind: "edit"; product: Product } | null;

// export function AdminProducts({ token }: { token: string }) {
//   const [products, setProducts] = useState<Product[] | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [mode, setMode] = useState<FormMode>(null);

//   const load = () =>
//     Promise.all([adminApi.getProducts(token), adminApi.getCategories(token)])
//       .then(([p, c]) => {
//         setProducts(p);
//         setCategories(c);
//       })
//       .catch((err) => setError(err instanceof Error ? err.message : "Could not load products."));

//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   const remove = async (product: Product) => {
//     if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
//     try {
//       await adminApi.deleteProduct(token, product.dbId!);
//       load();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Could not delete product.");
//     }
//   };

//   if (mode) {
//     return (
//       <ProductForm
//         token={token}
//         categories={categories}
//         product={mode.kind === "edit" ? mode.product : null}
//         onDone={() => {
//           setMode(null);
//           load();
//         }}
//         onCancel={() => setMode(null)}
//       />
//     );
//   }

//   return (
//     <div className="admin-page">
//       <header className="admin-page__head">
//         <div><h1>Products</h1><p>{products ? `${products.length} products across ${categories.length} categories.` : "Loading…"}</p></div>
//         <Button onClick={() => setMode({ kind: "new" })}>Add product <Icon name="plus" size={16}/></Button>
//       </header>

//       {error && <p className="form-error"><Icon name="alert" size={16}/> {error}</p>}

//       {!products ? (
//         <div className="catalog-state">Loading products…</div>
//       ) : (
//         <div className="admin-table-wrap">
//           <table className="admin-table admin-table--products">
//             <thead><tr><th></th><th>Name</th><th>Category</th><th>SKU</th><th>Price</th><th>Sizes</th><th></th></tr></thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p.dbId}>
//                   <td><img className="admin-thumb" src={resolveImageUrl(p.image)} alt="" /></td>
//                   <td><strong>{p.name}</strong></td>
//                   <td>{p.category}</td>
//                   <td><code>{p.sku}</code></td>
//                   <td>{money(p.price)}</td>
//                   <td>{p.sizes.length ? p.sizes.join(", ") : "Standard"}</td>
//                   <td className="admin-table__actions">
//                     <button className="admin-icon-btn" onClick={() => setMode({ kind: "edit", product: p })} aria-label="Edit"><Icon name="edit" size={16}/></button>
//                     <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(p)} aria-label="Delete"><Icon name="trash" size={16}/></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// function ProductForm({
//   token,
//   categories,
//   product,
//   onDone,
//   onCancel,
// }: {
//   token: string;
//   categories: Category[];
//   product: Product | null;
//   onDone: () => void;
//   onCancel: () => void;
// }) {
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [preview, setPreview] = useState<string | null>(product ? resolveImageUrl(product.image) : null);

//   const submit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     const form = new FormData(e.currentTarget);
//     setSubmitting(true);
//     try {
//       if (product) {
//         await adminApi.updateProduct(token, product.dbId!, form);
//       } else {
//         await adminApi.createProduct(token, form);
//       }
//       onDone();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Could not save product.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="admin-page">
//       <header className="admin-page__head"><h1>{product ? `Edit ${product.name}` : "Add product"}</h1><button className="admin-link" onClick={onCancel}>Back to products</button></header>

//       <form className="admin-form" onSubmit={submit}>
//         <div className="admin-form__grid">
//           <label>Product name<input name="name" required defaultValue={product?.name} /></label>
//           <label>SKU<input name="sku" required defaultValue={product?.sku} /></label>
//           <label>Category
//             <select name="categoryId" required defaultValue={product?.categoryId ?? ""}>
//               <option value="" disabled>Select a category</option>
//               {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
//             </select>
//           </label>
//           <label>Price (AUD)<input name="price" required type="number" step="0.01" min="0" defaultValue={product?.price} /></label>
//         </div>

//         <label>Short description (shown on product cards)<input name="description" required defaultValue={product?.description} /></label>
//         <label>Full description (shown on the product page)<textarea name="fullDescription" required rows={3} defaultValue={product?.fullDescription} /></label>

//         <div className="admin-form__grid">
//           <label>Sizes <small>(one per line — leave blank if this product has no size options)</small><textarea name="sizes" rows={4} defaultValue={product?.sizes.join("\n")} /></label>
//           <label>Specifications <small>(one per line)</small><textarea name="specifications" rows={4} defaultValue={product?.specifications.join("\n")} /></label>
//           <label>Features <small>(one per line)</small><textarea name="features" rows={4} defaultValue={product?.features.join("\n")} /></label>
//           <label>Applications <small>(one per line)</small><textarea name="applications" rows={4} defaultValue={product?.applications.join("\n")} /></label>
//         </div>

//         <label className="admin-form__image">
//           Product image
//           <input
//             name="image"
//             type="file"
//             accept="image/png,image/jpeg,image/webp,image/gif"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) setPreview(URL.createObjectURL(file));
//             }}
//           />
//           {preview && <img src={preview} alt="Preview" className="admin-form__preview" />}
//           {!preview && <small>No image selected — a placeholder will be used until you upload one.</small>}
//         </label>
//         {product && <input type="hidden" name="imageUrl" value={product.image} />}

//         <label className="admin-form__checkbox"><input type="checkbox" name="isActive" defaultChecked={product?.isActive ?? true} /> Visible on the live site</label>

//         {error && <p className="form-error"><Icon name="alert" size={16}/> {error}</p>}

//         <div className="form-footer">
//           <Button type="submit" disabled={submitting}>{submitting ? "Saving…" : "Save product"} <Icon name="check" size={16}/></Button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { FormEvent, useEffect, useState } from "react";
import { adminApi, resolveImageUrl } from "../lib/api";
import type { Category, Product } from "../lib/types";
import { Button, Icon, money } from "../components/ui";

type FormMode = { kind: "new" } | { kind: "edit"; product: Product } | null;

export function AdminProducts({ token }: { token: string }) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<FormMode>(null);

  const load = () =>
    Promise.all([adminApi.getProducts(token), adminApi.getCategories(token)])
      .then(([p, c]) => {
        setProducts(p);
        setCategories(c);
      })
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "Could not load products.",
        ),
      );

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const remove = async (product: Product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`))
      return;
    try {
      await adminApi.deleteProduct(token, product.dbId!);
      load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not delete product.",
      );
    }
  };

  if (mode) {
    return (
      <ProductForm
        token={token}
        categories={categories}
        products={products || []}
        product={mode.kind === "edit" ? mode.product : null}
        onDone={() => {
          setMode(null);
          load();
        }}
        onCancel={() => setMode(null)}
      />
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <h1>Products</h1>
          <p>
            {products
              ? `${products.length} products across ${categories.length} categories.`
              : "Loading…"}
          </p>
        </div>
        <Button onClick={() => setMode({ kind: "new" })}>
          Add product <Icon name="plus" size={16} />
        </Button>
      </header>

      {error && (
        <p className="form-error">
          <Icon name="alert" size={16} /> {error}
        </p>
      )}

      {!products ? (
        <div className="catalog-state">Loading products…</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table admin-table--products">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.dbId}>
                  <td>
                    <img
                      className="admin-thumb"
                      src={resolveImageUrl(p.image)}
                      alt=""
                    />
                  </td>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td>{p.category}</td>
                  <td>
                    <code>{p.sku}</code>
                  </td>
                  <td>
                    {p.hidePrice ? (
                      <span className="price--on-request">Hidden</span>
                    ) : (
                      money(p.price)
                    )}
                  </td>
                  <td>
                    <span
                      className={`pill ${p.inStock ? "pill--ok" : "pill--warn"}`}
                    >
                      {p.inStock ? "In stock" : "Out of stock"}
                    </span>
                    {p.isFeatured && (
                      <span
                        className="pill pill--type-quote"
                        style={{ marginLeft: 6 }}
                      >
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="admin-table__actions">
                    <button
                      className="admin-icon-btn"
                      onClick={() => setMode({ kind: "edit", product: p })}
                      aria-label="Edit"
                    >
                      <Icon name="edit" size={16} />
                    </button>
                    <button
                      className="admin-icon-btn admin-icon-btn--danger"
                      onClick={() => remove(p)}
                      aria-label="Delete"
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ProductForm({
  token,
  categories,
  products,
  product,
  onDone,
  onCancel,
}: {
  token: string;
  categories: Category[];
  products: Product[];
  product: Product | null;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(
    product ? resolveImageUrl(product.image) : null,
  );

  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [hidePrice, setHidePrice] = useState(product?.hidePrice ?? false);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);

  const featuredCount = products.filter(
    (p) => p.isFeatured && p.dbId !== product?.dbId,
  ).length;
  const featuredLimitReached = featuredCount >= 4 && !isFeatured;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    // Checkboxes are handled as controlled state above and written in
    // explicitly here — native form serialization silently drops unchecked
    // checkboxes, which would otherwise make "off" indistinguishable from
    // "field not sent".
    form.set("isActive", String(isActive));
    form.set("inStock", String(inStock));
    form.set("hidePrice", String(hidePrice));
    form.set("isFeatured", String(isFeatured));

    setSubmitting(true);
    try {
      if (product) {
        await adminApi.updateProduct(token, product.dbId!, form);
      } else {
        await adminApi.createProduct(token, form);
      }
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <h1>{product ? `Edit ${product.name}` : "Add product"}</h1>
        <button className="admin-link" onClick={onCancel}>
          Back to products
        </button>
      </header>

      <form className="admin-form" onSubmit={submit}>
        <div className="admin-form__grid">
          <label>
            Product name
            <input name="name" required defaultValue={product?.name} />
          </label>
          <label>
            SKU
            <input name="sku" required defaultValue={product?.sku} />
          </label>
          <label>
            Category
            <select
              name="categoryId"
              required
              defaultValue={product?.categoryId ?? ""}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Price (AUD)
            <input
              name="price"
              required
              type="number"
              step="0.01"
              min="0"
              defaultValue={product?.price}
            />
          </label>
        </div>

        <label>
          Short description (shown on product cards)
          <input
            name="description"
            required
            defaultValue={product?.description}
          />
        </label>
        <label>
          Full description (shown on the product page)
          <textarea
            name="fullDescription"
            required
            rows={3}
            defaultValue={product?.fullDescription}
          />
        </label>

        <div className="admin-form__grid">
          <label>
            Sizes{" "}
            <small>
              (one per line — leave blank if this product has no size options)
            </small>
            <textarea
              name="sizes"
              rows={4}
              defaultValue={product?.sizes.join("\n")}
            />
          </label>
          <label>
            Specifications <small>(one per line)</small>
            <textarea
              name="specifications"
              rows={4}
              defaultValue={product?.specifications.join("\n")}
            />
          </label>
          <label>
            Features <small>(one per line)</small>
            <textarea
              name="features"
              rows={4}
              defaultValue={product?.features.join("\n")}
            />
          </label>
          <label>
            Applications <small>(one per line)</small>
            <textarea
              name="applications"
              rows={4}
              defaultValue={product?.applications.join("\n")}
            />
          </label>
        </div>

        <label className="admin-form__image">
          Product image
          <input
            name="image"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
          {preview && (
            <img src={preview} alt="Preview" className="admin-form__preview" />
          )}
          {!preview && (
            <small>
              No image selected — a placeholder will be used until you upload
              one.
            </small>
          )}
        </label>
        {product && (
          <input type="hidden" name="imageUrl" value={product.image} />
        )}

        <div className="admin-toggles">
          <div className="admin-toggle">
            <div className="admin-toggle__label">
              <strong>Visible on site</strong>
              <small>Shown on the live Products page</small>
            </div>
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <span className="admin-switch__track" />
            </label>
          </div>

          <div className="admin-toggle">
            <div className="admin-toggle__label">
              <strong>In stock</strong>
              <small>Off shows "Request Quote" instead of "Add to cart"</small>
            </div>
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
              <span className="admin-switch__track" />
            </label>
          </div>

          <div className="admin-toggle">
            <div className="admin-toggle__label">
              <strong>Hide price</strong>
              <small>Shows "Price on request" everywhere instead</small>
            </div>
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={hidePrice}
                onChange={(e) => setHidePrice(e.target.checked)}
              />
              <span className="admin-switch__track" />
            </label>
          </div>

          <div className="admin-toggle">
            <div className="admin-toggle__label">
              <strong>Featured on Home</strong>
              <small>Up to 4 products at a time ({featuredCount}/4 used)</small>
            </div>
            <label className="admin-switch">
              <input
                type="checkbox"
                checked={isFeatured}
                disabled={featuredLimitReached}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <span className="admin-switch__track" />
            </label>
          </div>

          {featuredLimitReached && (
            <p className="admin-toggle-limit">
              <Icon name="alert" size={13} /> 4 products are already featured —
              un-feature one first to feature this one instead.
            </p>
          )}
        </div>

        {error && (
          <p className="form-error">
            <Icon name="alert" size={16} /> {error}
          </p>
        )}

        <div className="form-footer">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving…" : "Save product"}{" "}
            <Icon name="check" size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
}
