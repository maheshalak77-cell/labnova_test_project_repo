// import type { Product } from "../lib/types";
// import { resolveImageUrl } from "../lib/api";
// import { Button, Icon, money } from "./ui";

// export function ProductCard({ product, onOpen, onAdd }: { product: Product; onOpen: () => void; onAdd: () => void }) {
//   return (
//     <article className="product-card">
//       <button className="product-card__image" onClick={onOpen} aria-label={`View ${product.name}`}>
//         <img src={resolveImageUrl(product.image)} alt={`${product.name} laboratory product`} loading="lazy" />
//         <span>{product.category}</span>
//       </button>
//       <div className="product-card__body">
//         <button className="product-title" onClick={onOpen}>{product.name}<Icon name="arrow" size={18}/></button>
//         <p>{product.description}</p>
//         <div className="size-line"><span>Available</span><strong>{product.sizes.length ? product.sizes.join(" · ") : "Standard"}</strong></div>
//         <div className="product-card__footer">
//           <div className="price"><small>From</small><strong>{money(product.price)}</strong></div>
//           <Button onClick={onAdd}>Add to cart <Icon name="plus" size={17}/></Button>
//         </div>
//       </div>
//     </article>
//   );
// }

import type { Product } from "../lib/types";
import { resolveImageUrl } from "../lib/api";
import { Button, Icon, money } from "./ui";

export function ProductCard({
  product,
  onOpen,
  onAdd,
}: {
  product: Product;
  onOpen: () => void;
  onAdd: () => void;
}) {
  return (
    <article className="product-card">
      <button
        className="product-card__image"
        onClick={onOpen}
        aria-label={`View ${product.name}`}
      >
        <img
          src={resolveImageUrl(product.image)}
          alt={`${product.name} laboratory product`}
          loading="lazy"
        />
        <span>{product.category}</span>
      </button>
      <div className="product-card__body">
        <span
          className={`stock-pill ${product.inStock ? "stock-pill--in" : "stock-pill--out"}`}
        >
          <i />
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
        <button className="product-title" onClick={onOpen}>
          {product.name}
          <Icon name="arrow" size={18} />
        </button>
        <p>{product.description}</p>
        <div className="size-line">
          <span>Available</span>
          <strong>
            {product.sizes.length ? product.sizes.join(" · ") : "Standard"}
          </strong>
        </div>
        <div className="product-card__footer">
          {product.hidePrice ? (
            <div className="price">
              <small>&nbsp;</small>
              <strong className="price--on-request">Price on request</strong>
            </div>
          ) : (
            <div className="price">
              <small>From</small>
              <strong>{money(product.price)}</strong>
            </div>
          )}
          <Button onClick={onAdd}>
            {product.inStock ? "Add to cart" : "Request Quote"}{" "}
            <Icon name="plus" size={17} />
          </Button>
        </div>
      </div>
    </article>
  );
}
