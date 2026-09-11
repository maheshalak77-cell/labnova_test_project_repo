// import type { Product } from "../lib/types";
// import { resolveImageUrl } from "../lib/api";
// import { Breadcrumb, Button, Icon, QuantityControl, money } from "../components/ui";

// type CartLine = { productId: string; quantities: Record<string, number> };

// export function CartPage({
//   navigate,
//   cart,
//   updateLine,
//   removeLine,
//   products,
// }: {
//   navigate: (path: string) => void;
//   cart: CartLine[];
//   updateLine: (id: string, size: string, qty: number) => void;
//   removeLine: (id: string) => void;
//   products: Product[];
// }) {
//   const lines = cart.map((line) => ({ line, product: products.find((p) => p.id === line.productId)! })).filter((x) => x.product);
//   const units = lines.reduce((sum, { line }) => sum + Object.values(line.quantities).reduce((a, b) => a + b, 0), 0);
//   const estimate = lines.reduce((sum, { line, product }) => sum + Object.values(line.quantities).reduce((a, b) => a + b, 0) * product.price, 0);

//   return (
//     <main className="inner-page cart-page section-wrap">
//       <Breadcrumb navigate={navigate} items={[{ label: "Quote Cart" }]}/>
//       <div className="cart-heading"><div><span className="eyebrow">Your selection</span><h1>Quote Request</h1></div><p>Review products and quantities before sending your request. No payment is taken online.</p></div>
//       {!lines.length ? (
//         <div className="empty-cart">
//           <div><Icon name="cart" size={34}/></div>
//           <h2>Your quote cart is empty.</h2>
//           <p>Add laboratory products to build a tailored quotation request.</p>
//           <Button onClick={() => navigate("/products")}>Explore Products <Icon name="arrow"/></Button>
//         </div>
//       ) : (
//         <div className="cart-layout">
//           <section className="cart-lines">
//             {lines.map(({ line, product }) => (
//               <article className="cart-line" key={product.id}>
//                 <button className="cart-line__image" onClick={() => navigate(`/products/${product.id}`)}><img src={resolveImageUrl(product.image)} alt={product.name}/></button>
//                 <div className="cart-line__main">
//                   <div className="cart-line__title">
//                     <div><span>{product.category}</span><h2>{product.name}</h2><small>{product.sku}</small></div>
//                     <button onClick={() => removeLine(product.id)} aria-label={`Remove ${product.name}`}><Icon name="trash" size={18}/> Remove</button>
//                   </div>
//                   <div className="cart-variants">
//                     {Object.entries(line.quantities).filter(([, qty]) => qty > 0).map(([size, qty]) => (
//                       <div key={size}><span>{size}</span><QuantityControl value={qty} onChange={(n) => updateLine(product.id, size, n)}/><strong>{money(product.price * qty)}</strong></div>
//                     ))}
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </section>
//           <aside className="cart-summary">
//             <span className="eyebrow">Request summary</span>
//             <div><span>Products</span><strong>{lines.length}</strong></div>
//             <div><span>Total units</span><strong>{units}</strong></div>
//             <div className="estimate"><span>Indicative value</span><strong>{money(estimate)}</strong></div>
//             <p>Final pricing, stock availability, and dispatch details will be confirmed in your quotation.</p>
//             <Button onClick={() => navigate("/contact")}>Request Quote <Icon name="arrow"/></Button>
//             <div className="no-payment"><Icon name="shield" size={17}/> No online payment required</div>
//           </aside>
//         </div>
//       )}
//     </main>
//   );
// }

import type { Product } from "../lib/types";
import { resolveImageUrl } from "../lib/api";
import {
  Breadcrumb,
  Button,
  Icon,
  QuantityControl,
  money,
} from "../components/ui";

type CartLine = { productId: string; quantities: Record<string, number> };

export function CartPage({
  navigate,
  cart,
  updateLine,
  removeLine,
  products,
}: {
  navigate: (path: string) => void;
  cart: CartLine[];
  updateLine: (id: string, size: string, qty: number) => void;
  removeLine: (id: string) => void;
  products: Product[];
}) {
  const lines = cart
    .map((line) => ({
      line,
      product: products.find((p) => p.id === line.productId)!,
    }))
    .filter((x) => x.product);
  const units = lines.reduce(
    (sum, { line }) =>
      sum + Object.values(line.quantities).reduce((a, b) => a + b, 0),
    0,
  );
  const pricedLines = lines.filter(({ product }) => !product.hidePrice);
  const estimate = pricedLines.reduce(
    (sum, { line, product }) =>
      sum +
      Object.values(line.quantities).reduce((a, b) => a + b, 0) * product.price,
    0,
  );
  const hasHiddenPriceItems = lines.some(({ product }) => product.hidePrice);
  const hasOutOfStockItems = lines.some(({ product }) => !product.inStock);

  return (
    <main className="inner-page cart-page section-wrap">
      <Breadcrumb navigate={navigate} items={[{ label: "Quote Cart" }]} />
      <div className="cart-heading">
        <div>
          <span className="eyebrow">Your selection</span>
          <h1>Quote Request</h1>
        </div>
        <p>
          Review products and quantities before sending your request. No payment
          is taken online.
        </p>
      </div>
      {!lines.length ? (
        <div className="empty-cart">
          <div>
            <Icon name="cart" size={34} />
          </div>
          <h2>Your quote cart is empty.</h2>
          <p>Add laboratory products to build a tailored quotation request.</p>
          <Button onClick={() => navigate("/products")}>
            Explore Products <Icon name="arrow" />
          </Button>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-lines">
            {lines.map(({ line, product }) => (
              <article className="cart-line" key={product.id}>
                <button
                  className="cart-line__image"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <img
                    src={resolveImageUrl(product.image)}
                    alt={product.name}
                  />
                </button>
                <div className="cart-line__main">
                  <div className="cart-line__title">
                    <div>
                      <span>{product.category}</span>
                      <h2>{product.name}</h2>
                      <small>{product.sku}</small>
                      {!product.inStock && (
                        <em className="cart-line__tag">
                          Quote only — currently out of stock
                        </em>
                      )}
                    </div>
                    <button
                      onClick={() => removeLine(product.id)}
                      aria-label={`Remove ${product.name}`}
                    >
                      <Icon name="trash" size={18} /> Remove
                    </button>
                  </div>
                  <div className="cart-variants">
                    {Object.entries(line.quantities)
                      .filter(([, qty]) => qty > 0)
                      .map(([size, qty]) => (
                        <div key={size}>
                          <span>{size}</span>
                          <QuantityControl
                            value={qty}
                            onChange={(n) => updateLine(product.id, size, n)}
                          />
                          {product.hidePrice ? (
                            <strong className="price--on-request">
                              On request
                            </strong>
                          ) : (
                            <strong>{money(product.price * qty)}</strong>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </article>
            ))}
          </section>
          <aside className="cart-summary">
            <span className="eyebrow">Request summary</span>
            <div>
              <span>Products</span>
              <strong>{lines.length}</strong>
            </div>
            <div>
              <span>Total units</span>
              <strong>{units}</strong>
            </div>
            <div className="estimate">
              <span>Indicative value</span>
              <strong>
                {hasHiddenPriceItems ? `${money(estimate)}+` : money(estimate)}
              </strong>
            </div>
            {hasHiddenPriceItems && (
              <p className="cart-summary__note">
                One or more items are priced on request and aren't included in
                the indicative value above.
              </p>
            )}
            {hasOutOfStockItems && (
              <p className="cart-summary__note">
                One or more items are currently out of stock — this will be sent
                as an availability / quotation enquiry.
              </p>
            )}
            <p>
              Final pricing, stock availability, and dispatch details will be
              confirmed in your quotation.
            </p>
            <Button onClick={() => navigate("/contact")}>
              Request Quote <Icon name="arrow" />
            </Button>
            <div className="no-payment">
              <Icon name="shield" size={17} /> No online payment required
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
