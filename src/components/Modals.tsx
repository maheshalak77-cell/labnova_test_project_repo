// import { useState } from "react";
// import type { Product } from "../lib/types";
// import { resolveImageUrl } from "../lib/api";
// import { Button, Icon, QuantityControl, money } from "./ui";

// export function AddModal({ product, onClose, onConfirm }: { product: Product; onClose: () => void; onConfirm: (q: Record<string, number>) => void }) {
//   const options = product.sizes.length ? product.sizes : ["Quantity"];
//   const [quantities, setQuantities] = useState<Record<string, number>>(() => Object.fromEntries(options.map((x, i) => [x, i === 0 ? 1 : 0])));
//   const total = Object.values(quantities).reduce((sum, q) => sum + q, 0);
//   return (
//     <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
//       <section className="quantity-modal" role="dialog" aria-modal="true" aria-labelledby="quantity-title">
//         <div className="modal-head"><div><span className="eyebrow">Add to quote cart</span><h2 id="quantity-title">{product.name}</h2></div><button onClick={onClose} aria-label="Close"><Icon name="x"/></button></div>
//         <div className="modal-product"><img src={resolveImageUrl(product.image)} alt="" /><div><span>{product.category}</span><strong>{money(product.price)}</strong><small>per unit / pack</small></div></div>
//         <div className="quantity-options">
//           <div className="quantity-label"><span>{product.sizes.length ? "Select quantity for each size" : "Select quantity"}</span><small>Enter 0 for sizes you don’t need.</small></div>
//           {options.map((size) => <div className="quantity-row" key={size}><div><strong>{size}</strong>{product.sizes.length > 0 && <span>Available</span>}</div><QuantityControl value={quantities[size]} onChange={(n) => setQuantities({ ...quantities, [size]: n })}/></div>)}
//         </div>
//         <div className="modal-footer"><div><span>Selected quantity</span><strong>{total}</strong></div><Button disabled={!total} onClick={() => onConfirm(quantities)}>Add to Cart <Icon name="arrow"/></Button></div>
//       </section>
//     </div>
//   );
// }

// export function TermsModal({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
//       <section className="terms-modal" role="dialog" aria-modal="true">
//         <div className="modal-head"><div><span className="eyebrow">LabNova Scientific</span><h2>Terms &amp; Conditions</h2></div><button onClick={onClose} aria-label="Close"><Icon name="x"/></button></div>
//         <p>Product information and indicative pricing are provided for quotation purposes. Availability, final pricing, delivery terms, and applicable taxes are confirmed in writing before an order is accepted.</p>
//         <p>Images are representative. Specifications may change as products are refined or supplier standards are updated.</p>
//         <Button onClick={onClose}>Close</Button>
//       </section>
//     </div>
//   );
// }

import { useState } from "react";
import type { Product } from "../lib/types";
import { resolveImageUrl } from "../lib/api";
import { Button, Icon, QuantityControl, money } from "./ui";

export function AddModal({
  product,
  onClose,
  onConfirm,
}: {
  product: Product;
  onClose: () => void;
  onConfirm: (q: Record<string, number>) => void;
}) {
  const options = product.sizes.length ? product.sizes : ["Quantity"];
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(options.map((x, i) => [x, i === 0 ? 1 : 0])),
  );
  const total = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="quantity-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quantity-title"
      >
        <div className="modal-head">
          <div>
            <span className="eyebrow">Add to quote cart</span>
            <h2 id="quantity-title">{product.name}</h2>
          </div>
          <button onClick={onClose} aria-label="Close">
            <Icon name="x" />
          </button>
        </div>
        <div className="modal-product">
          <img src={resolveImageUrl(product.image)} alt="" />
          <div>
            <span>{product.category}</span>
            {product.hidePrice ? (
              <strong className="price--on-request">Price on request</strong>
            ) : (
              <strong>{money(product.price)}</strong>
            )}
            <small>per unit / pack</small>
          </div>
        </div>
        {!product.inStock && (
          <div className="stock-note">
            <Icon name="alert" size={15} /> This item is currently out of stock
            — your request will be sent as an availability / quotation enquiry,
            not an order.
          </div>
        )}
        <div className="quantity-options">
          <div className="quantity-label">
            <span>
              {product.sizes.length
                ? "Select quantity for each size"
                : "Select quantity"}
            </span>
            <small>Enter 0 for sizes you don’t need.</small>
          </div>
          {options.map((size) => (
            <div className="quantity-row" key={size}>
              <div>
                <strong>{size}</strong>
                {product.sizes.length > 0 && <span>Available</span>}
              </div>
              <QuantityControl
                value={quantities[size]}
                onChange={(n) => setQuantities({ ...quantities, [size]: n })}
              />
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <div>
            <span>Selected quantity</span>
            <strong>{total}</strong>
          </div>
          <Button disabled={!total} onClick={() => onConfirm(quantities)}>
            {product.inStock ? "Add to Cart" : "Request Quote"}{" "}
            <Icon name="arrow" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section className="terms-modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <span className="eyebrow">LabNova Scientific</span>
            <h2>Terms &amp; Conditions</h2>
          </div>
          <button onClick={onClose} aria-label="Close">
            <Icon name="x" />
          </button>
        </div>
        <p>
          Product information and indicative pricing are provided for quotation
          purposes. Availability, final pricing, delivery terms, and applicable
          taxes are confirmed in writing before an order is accepted.
        </p>
        <p>
          Images are representative. Specifications may change as products are
          refined or supplier standards are updated.
        </p>
        <Button onClick={onClose}>Close</Button>
      </section>
    </div>
  );
}
