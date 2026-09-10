// // import { FormEvent, useState } from "react";
// // import type { Product } from "../lib/types";
// // import { api, resolveImageUrl } from "../lib/api";
// // import { Breadcrumb, Button, Icon } from "../components/ui";

// // type CartLine = { productId: string; quantities: Record<string, number> };

// // export function ContactPage({
// //   navigate,
// //   cart,
// //   clearCart,
// //   products,
// // }: {
// //   navigate: (path: string) => void;
// //   cart: CartLine[];
// //   clearCart: () => void;
// //   products: Product[];
// // }) {
// //   const [sent, setSent] = useState(false);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const cartProducts = cart.map((line) => ({ line, product: products.find((p) => p.id === line.productId)! })).filter((x) => x.product);

// //   const submit = async (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setError(null);
// //     const form = e.currentTarget;
// //     const data = new FormData(form);
// //     const items = cartProducts.flatMap(({ line, product }) =>
// //       Object.entries(line.quantities)
// //         .filter(([, qty]) => qty > 0)
// //         .map(([size, qty]) => ({ productSlug: product.id, size: product.sizes.length ? size : undefined, quantity: qty }))
// //     );

// //     setSubmitting(true);
// //     try {
// //       await api.submitQuote({
// //         fullName: String(data.get("fullName") || ""),
// //         email: String(data.get("email") || ""),
// //         phone: String(data.get("phone") || ""),
// //         message: String(data.get("message") || ""),
// //         items,
// //       });
// //       setSent(true);
// //       clearCart();
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <main className="inner-page contact-page section-wrap">
// //       <Breadcrumb navigate={navigate} items={[{ label: "Contact Us" }]}/>
// //       {sent ? (
// //         <section className="success-state">
// //           <div><Icon name="check" size={34}/></div>
// //           <span className="eyebrow">Request received</span>
// //           <h1>Thank you.</h1>
// //           <p>Your request has been sent to our scientific support team. We’ll be in touch shortly.</p>
// //           <Button onClick={() => navigate("/products")}>Continue browsing <Icon name="arrow"/></Button>
// //         </section>
// //       ) : (
// //         <div className="contact-layout">
// //           <section className="contact-intro">
// //             <span className="eyebrow">Start a conversation</span>
// //             <h1>Contact Us</h1>
// //             <p>Tell us what your laboratory needs. Our team will help with product selection, availability, and quotation requests.</p>
// //             <div className="contact-details">
// //               <div><span>EMAIL</span><strong>info@labnova.com.au</strong></div>
// //               <div><span>QUOTES</span><strong>quotes@labnova.com.au</strong></div>
// //               <div><span>ORDERS</span><strong>orders@labnova.com.au</strong></div>
// //               <div><span>PHONE</span><strong>1800 957 948</strong></div>
// //               <div><span>SERVICE</span><strong>Australia-wide</strong></div>
// //               <div><span>ABN</span><strong>68 339 533 614</strong></div>
// //             </div>
// //           </section>
// //           <section className="contact-form-wrap">
// //             {cartProducts.length > 0 && (
// //               <div className="quote-summary">
// //                 <div className="quote-summary__head"><div><span>QUOTE REQUEST</span><strong>{cartProducts.length} selected {cartProducts.length === 1 ? "product" : "products"}</strong></div><button onClick={() => navigate("/cart")}>Edit cart</button></div>
// //                 {cartProducts.map(({ line, product }) => <div className="quote-mini" key={product.id}><img src={resolveImageUrl(product.image)} alt="" /><div><strong>{product.name}</strong><span>{Object.entries(line.quantities).filter(([, q]) => q > 0).map(([s, q]) => `${s}: ${q}`).join(" · ")}</span></div></div>)}
// //               </div>
// //             )}
// //             <form onSubmit={submit} className="contact-form">
// //               <div className="field-row">
// //                 <label>Full Name<input name="fullName" required placeholder="Your full name"/></label>
// //                 <label>Email Address<input name="email" required type="email" placeholder="name@company.com"/></label>
// //               </div>
// //               <label>Phone Number<input name="phone" type="tel" placeholder="+61 400 000 000"/></label>
// //               <label>Message<textarea name="message" required rows={5} defaultValue={cartProducts.length ? "Please provide a quotation for the selected laboratory products." : ""} placeholder="Tell us how we can help..."/></label>
// //               {error && <p className="form-error"><Icon name="alert" size={16}/> {error}</p>}
// //               <div className="form-footer">
// //                 <p>By submitting, you agree that LabNova may contact you about this request.</p>
// //                 <Button type="submit" disabled={submitting}>{submitting ? "Sending…" : "Submit Request"} <Icon name="arrow"/></Button>
// //               </div>
// //             </form>
// //           </section>
// //         </div>
// //       )}
// //     </main>
// //   );
// // }

// import { FormEvent, useEffect, useState } from "react";
// import type { Product } from "../lib/types";
// import { api, resolveImageUrl } from "../lib/api";
// import { Breadcrumb, Button, Icon } from "../components/ui";

// type CartLine = { productId: string; quantities: Record<string, number> };
// type EnquiryType = "quote" | "question";

// export function ContactPage({
//   navigate,
//   cart,
//   clearCart,
//   products,
//   initialType,
// }: {
//   navigate: (path: string) => void;
//   cart: CartLine[];
//   clearCart: () => void;
//   products: Product[];
//   initialType?: EnquiryType;
// }) {
//   const cartProducts = cart
//     .map((line) => ({
//       line,
//       product: products.find((p) => p.id === line.productId)!,
//     }))
//     .filter((x) => x.product);

//   const [type, setType] = useState<EnquiryType>(
//     initialType || (cartProducts.length ? "quote" : "question"),
//   );
//   const [sent, setSent] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // If the person arrives via a fresh navigation with an explicit intent
//   // (e.g. "Talk to a specialist"), respect it even if a cart already exists.
//   useEffect(() => {
//     if (initialType) setType(initialType);
//   }, [initialType]);

//   const submit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     const form = e.currentTarget;
//     const data = new FormData(form);

//     if (type === "quote" && cartProducts.length === 0) {
//       setError(
//         "Your quote cart is empty. Add products first, or switch to General Enquiry.",
//       );
//       return;
//     }

//     const items =
//       type === "quote"
//         ? cartProducts.flatMap(({ line, product }) =>
//             Object.entries(line.quantities)
//               .filter(([, qty]) => qty > 0)
//               .map(([size, qty]) => ({
//                 productSlug: product.id,
//                 size: product.sizes.length ? size : undefined,
//                 quantity: qty,
//               })),
//           )
//         : [];

//     setSubmitting(true);
//     try {
//       await api.submitQuote({
//         fullName: String(data.get("fullName") || ""),
//         email: String(data.get("email") || ""),
//         phone: String(data.get("phone") || ""),
//         message: String(data.get("message") || ""),
//         type,
//         items,
//       });
//       setSent(true);
//       if (type === "quote") clearCart();
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong. Please try again.",
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <main className="inner-page contact-page section-wrap">
//       <Breadcrumb navigate={navigate} items={[{ label: "Contact Us" }]} />
//       {sent ? (
//         <section className="success-state">
//           <div>
//             <Icon name="check" size={34} />
//           </div>
//           <span className="eyebrow">
//             {type === "quote" ? "Request received" : "Message received"}
//           </span>
//           <h1>Thank you.</h1>
//           <p>
//             {type === "quote"
//               ? "Your quote request has been sent to our team. We’ll be in touch shortly."
//               : "Your message has been sent to our team. We’ll reply as soon as we can."}
//           </p>
//           <Button onClick={() => navigate("/products")}>
//             Continue browsing <Icon name="arrow" />
//           </Button>
//         </section>
//       ) : (
//         <div className="contact-layout">
//           <section className="contact-intro">
//             <span className="eyebrow">Start a conversation</span>
//             <h1>Contact Us</h1>
//             <p>
//               Tell us what your laboratory needs. Our team will help with
//               product selection, availability, and quotation requests.
//             </p>
//             <div className="contact-details">
//               <div>
//                 <span>EMAIL</span>
//                 <strong>info@labnova.com.au</strong>
//               </div>
//               <div>
//                 <span>QUOTES</span>
//                 <strong>quotes@labnova.com.au</strong>
//               </div>
//               <div>
//                 <span>ORDERS</span>
//                 <strong>orders@labnova.com.au</strong>
//               </div>
//               <div>
//                 <span>PHONE</span>
//                 <strong>1800 957 948</strong>
//               </div>
//               <div>
//                 <span>SERVICE</span>
//                 <strong>Australia-wide</strong>
//               </div>
//               <div>
//                 <span>ABN</span>
//                 <strong>68 339 533 614</strong>
//               </div>
//             </div>
//           </section>
//           <section className="contact-form-wrap">
//             <div
//               className="enquiry-toggle"
//               role="tablist"
//               aria-label="What are you contacting us about?"
//             >
//               <button
//                 type="button"
//                 role="tab"
//                 aria-selected={type === "question"}
//                 className={type === "question" ? "active" : ""}
//                 onClick={() => setType("question")}
//               >
//                 <Icon name="mail" size={16} /> General Enquiry
//               </button>
//               <button
//                 type="button"
//                 role="tab"
//                 aria-selected={type === "quote"}
//                 className={type === "quote" ? "active" : ""}
//                 onClick={() => setType("quote")}
//               >
//                 <Icon name="cart" size={16} /> Request a Quote
//               </button>
//             </div>

//             {type === "quote" && cartProducts.length > 0 && (
//               <div className="quote-summary">
//                 <div className="quote-summary__head">
//                   <div>
//                     <span>QUOTE REQUEST</span>
//                     <strong>
//                       {cartProducts.length} selected{" "}
//                       {cartProducts.length === 1 ? "product" : "products"}
//                     </strong>
//                   </div>
//                   <button type="button" onClick={() => navigate("/cart")}>
//                     Edit cart
//                   </button>
//                 </div>
//                 {cartProducts.map(({ line, product }) => (
//                   <div className="quote-mini" key={product.id}>
//                     <img src={resolveImageUrl(product.image)} alt="" />
//                     <div>
//                       <strong>{product.name}</strong>
//                       <span>
//                         {Object.entries(line.quantities)
//                           .filter(([, q]) => q > 0)
//                           .map(([s, q]) => `${s}: ${q}`)
//                           .join(" · ")}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {type === "quote" && cartProducts.length === 0 && (
//               <div className="enquiry-hint">
//                 <Icon name="cart" size={16} /> Your quote cart is empty —{" "}
//                 <button type="button" onClick={() => navigate("/products")}>
//                   browse products
//                 </button>{" "}
//                 to add some, or switch to General Enquiry to just send a
//                 message.
//               </div>
//             )}
//             {type === "question" && (
//               <div className="enquiry-hint">
//                 <Icon name="mail" size={16} /> This sends a plain message to our
//                 team — no products are attached.
//               </div>
//             )}

//             <form onSubmit={submit} className="contact-form">
//               <div className="field-row">
//                 <label>
//                   Full Name
//                   <input
//                     name="fullName"
//                     required
//                     placeholder="Your full name"
//                   />
//                 </label>
//                 <label>
//                   Email Address
//                   <input
//                     name="email"
//                     required
//                     type="email"
//                     placeholder="name@company.com"
//                   />
//                 </label>
//               </div>
//               <label>
//                 Phone Number
//                 <input name="phone" type="tel" placeholder="+61 400 000 000" />
//               </label>
//               <label>
//                 Message
//                 <textarea
//                   name="message"
//                   required
//                   rows={5}
//                   defaultValue={
//                     type === "quote" && cartProducts.length
//                       ? "Please provide a quotation for the selected laboratory products."
//                       : ""
//                   }
//                   placeholder="Tell us how we can help..."
//                 />
//               </label>
//               {error && (
//                 <p className="form-error">
//                   <Icon name="alert" size={16} /> {error}
//                 </p>
//               )}
//               <div className="form-footer">
//                 <p>
//                   By submitting, you agree that LabNova may contact you about
//                   this request.
//                 </p>
//                 <Button type="submit" disabled={submitting}>
//                   {submitting
//                     ? "Sending…"
//                     : type === "quote"
//                       ? "Submit Request"
//                       : "Send Message"}{" "}
//                   <Icon name="arrow" />
//                 </Button>
//               </div>
//             </form>
//           </section>
//         </div>
//       )}
//     </main>
//   );
// }

import { FormEvent, useEffect, useState } from "react";
import type { Product } from "../lib/types";
import { api, resolveImageUrl } from "../lib/api";
import { Breadcrumb, Button, Icon } from "../components/ui";

type CartLine = { productId: string; quantities: Record<string, number> };
type EnquiryType = "quote" | "question";

export function ContactPage({
  navigate,
  cart,
  clearCart,
  products,
  initialType,
}: {
  navigate: (path: string) => void;
  cart: CartLine[];
  clearCart: () => void;
  products: Product[];
  initialType?: EnquiryType;
}) {
  const cartProducts = cart
    .map((line) => ({
      line,
      product: products.find((p) => p.id === line.productId)!,
    }))
    .filter((x) => x.product);

  const [type, setType] = useState<EnquiryType>(
    initialType || (cartProducts.length ? "quote" : "question"),
  );
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If the person arrives via a fresh navigation with an explicit intent
  // (e.g. "Talk to a specialist"), respect it even if a cart already exists.
  useEffect(() => {
    if (initialType) setType(initialType);
  }, [initialType]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    if (type === "quote" && cartProducts.length === 0) {
      setError(
        "Your quote cart is empty. Add products first, or switch to General Enquiry.",
      );
      return;
    }

    const items =
      type === "quote"
        ? cartProducts.flatMap(({ line, product }) =>
            Object.entries(line.quantities)
              .filter(([, qty]) => qty > 0)
              .map(([size, qty]) => ({
                productSlug: product.id,
                size: product.sizes.length ? size : undefined,
                quantity: qty,
              })),
          )
        : [];

    setSubmitting(true);
    try {
      await api.submitQuote({
        fullName: String(data.get("fullName") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        message: String(data.get("message") || ""),
        type,
        items,
      });
      setSent(true);
      if (type === "quote") clearCart();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="inner-page contact-page section-wrap">
      <Breadcrumb navigate={navigate} items={[{ label: "Contact Us" }]} />

      {sent ? (
        <section className="success-state">
          <div>
            <Icon name="check" size={34} />
          </div>
          <span className="eyebrow">
            {type === "quote" ? "Request received" : "Message received"}
          </span>
          <h1>Thank you.</h1>
          <p>
            {type === "quote"
              ? "Your quote request has been sent to our team. We’ll be in touch shortly."
              : "Your message has been sent to our team. We’ll reply as soon as we can."}
          </p>
          <Button onClick={() => navigate("/products")}>
            Continue browsing <Icon name="arrow" />
          </Button>
        </section>
      ) : (
        <div className="contact-layout contact-layout--form-only">
          <section className="contact-intro">
            <span className="eyebrow">Start a conversation</span>
            <h1>Let's talk science.</h1>
            <p>
              Tell us what your laboratory needs. Our team will help with
              product selection, availability, and quotation requests — usually
              within one business day.
            </p>
          </section>

          <section className="contact-form-wrap">
            <div
              className="enquiry-toggle"
              role="tablist"
              aria-label="What are you contacting us about?"
            >
              <button
                type="button"
                role="tab"
                aria-selected={type === "question"}
                className={type === "question" ? "active" : ""}
                onClick={() => setType("question")}
              >
                <Icon name="mail" size={16} /> General Enquiry
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={type === "quote"}
                className={type === "quote" ? "active" : ""}
                onClick={() => setType("quote")}
              >
                <Icon name="cart" size={16} /> Request a Quote
              </button>
            </div>

            {type === "quote" && cartProducts.length > 0 && (
              <div className="quote-summary">
                <div className="quote-summary__head">
                  <div>
                    <span>QUOTE REQUEST</span>
                    <strong>
                      {cartProducts.length} selected{" "}
                      {cartProducts.length === 1 ? "product" : "products"}
                    </strong>
                  </div>
                  <button type="button" onClick={() => navigate("/cart")}>
                    Edit cart
                  </button>
                </div>
                {cartProducts.map(({ line, product }) => (
                  <div className="quote-mini" key={product.id}>
                    <img src={resolveImageUrl(product.image)} alt="" />
                    <div>
                      <strong>{product.name}</strong>
                      <span>
                        {Object.entries(line.quantities)
                          .filter(([, q]) => q > 0)
                          .map(([s, q]) => `${s}: ${q}`)
                          .join(" · ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {type === "quote" && cartProducts.length === 0 && (
              <div className="enquiry-hint">
                <Icon name="cart" size={16} />
                Your quote cart is empty —{" "}
                <button type="button" onClick={() => navigate("/products")}>
                  browse products
                </button>{" "}
                to add some, or switch to General Enquiry to just send a
                message.
              </div>
            )}

            {type === "question" && (
              <div className="enquiry-hint">
                <Icon name="mail" size={16} />
                This sends a plain message to our team — no products are
                attached.
              </div>
            )}

            <form onSubmit={submit} className="contact-form">
              <div className="field-row">
                <label>
                  Full Name
                  <input
                    name="fullName"
                    required
                    placeholder="Your full name"
                  />
                </label>
                <label>
                  Email Address
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="name@company.com"
                  />
                </label>
              </div>
              <label>
                Phone Number
                <input name="phone" type="tel" placeholder="+61 400 000 000" />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  required
                  rows={5}
                  defaultValue={
                    type === "quote" && cartProducts.length
                      ? "Please provide a quotation for the selected laboratory products."
                      : ""
                  }
                  placeholder="Tell us how we can help..."
                />
              </label>
              {error && (
                <p className="form-error">
                  <Icon name="alert" size={16} />
                  {error}
                </p>
              )}
              <div className="form-footer">
                <p>
                  By submitting, you agree that LabNova may contact you about
                  this request.
                </p>
                <Button type="submit" disabled={submitting}>
                  {submitting
                    ? "Sending…"
                    : type === "quote"
                      ? "Submit Request"
                      : "Send Message"}{" "}
                  <Icon name="arrow" />
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
