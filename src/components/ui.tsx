// // import { ReactNode } from "react";

// // export type IconName =
// //   | "arrow"
// //   | "cart"
// //   | "check"
// //   | "chevron"
// //   | "dispatch"
// //   | "expert"
// //   | "instagram"
// //   | "linkedin"
// //   | "mail"
// //   | "menu"
// //   | "minus"
// //   | "payment"
// //   | "plus"
// //   | "quality"
// //   | "returns"
// //   | "shield"
// //   | "trash"
// //   | "x"
// //   | "grid"
// //   | "tag"
// //   | "box"
// //   | "logout"
// //   | "edit"
// //   | "alert"
// //   | "upload"
// //   | "eye"
// //   | "chart"
// //   | "lock"
// //   | "search";

// // export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
// //   const paths: Record<IconName, ReactNode> = {
// //     arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
// //     cart: <><path d="M3 4h2l2.1 9.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 7H6"/><circle cx="9" cy="19" r="1"/><circle cx="17" cy="19" r="1"/></>,
// //     check: <path d="m5 12 4 4L19 6"/>,
// //     chevron: <path d="m9 18 6-6-6-6"/>,
// //     dispatch: <><path d="M3 6h11v10H3z"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
// //     expert: <><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/><path d="m17.5 8 1.3 1.3L22 6"/></>,
// //     instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></>,
// //     linkedin: <><path d="M6 9v12M6 5v.01M10 21V9h4v2a4 4 0 0 1 7 3v7M14 21v-7"/></>,
// //     mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
// //     menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
// //     minus: <path d="M5 12h14"/>,
// //     payment: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h3"/></>,
// //     plus: <path d="M12 5v14M5 12h14"/>,
// //     quality: <><path d="m12 3 3 2 3.5.5.5 3.5 2 3-2 3-.5 3.5-3.5.5-3 2-3-2-3.5-.5-.5-3.5-2-3 2-3 .5-3.5 3.5-.5z"/><path d="m9 12 2 2 4-4"/></>,
// //     returns: <><path d="M9 7H5v-4"/><path d="M5 7a8 8 0 1 1-1 8"/></>,
// //     shield: <><path d="M12 3 5 6v5c0 4.6 2.8 8.1 7 10 4.2-1.9 7-5.4 7-10V6z"/><path d="m9 12 2 2 4-4"/></>,
// //     trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/></>,
// //     x: <><path d="m6 6 12 12M18 6 6 18"/></>,
// //     grid: <><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></>,
// //     tag: <><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z"/><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none"/></>,
// //     box: <><path d="M3 8 12 3l9 5-9 5-9-5z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/></>,
// //     logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></>,
// //     edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></>,
// //     alert: <><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></>,
// //     upload: <><path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/></>,
// //     eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>,
// //     chart: <><path d="M3 3v18h18"/><path d="M7 16v-4M12 16V8M17 16v-7"/></>,
// //     lock: <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
// //     search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
// //   };

// //   return (
// //     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
// //       {paths[name]}
// //     </svg>
// //   );
// // }

// // export function Button({ children, onClick, secondary = false, className = "", type = "button", disabled = false }: { children: ReactNode; onClick?: () => void; secondary?: boolean; className?: string; type?: "button" | "submit"; disabled?: boolean }) {
// //   return <button type={type} disabled={disabled} onClick={onClick} className={`button ${secondary ? "button--secondary" : ""} ${className}`}>{children}</button>;
// // }

// // export function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
// //   return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{action}</div>;
// // }

// // export function Breadcrumb({ items, navigate }: { items: { label: string; path?: string }[]; navigate: (path: string) => void }) {
// //   return <div className="breadcrumb"><button onClick={() => navigate("/")}>Home</button>{items.map((item) => <span key={item.label}><Icon name="chevron" size={14}/>{item.path ? <button onClick={() => navigate(item.path!)}>{item.label}</button> : <em>{item.label}</em>}</span>)}</div>;
// // }

// // export function QuantityControl({ value, onChange }: { value: number; onChange: (n: number) => void }) {
// //   return <div className="quantity-control"><button onClick={() => onChange(Math.max(0, value - 1))} aria-label="Decrease quantity"><Icon name="minus" size={16}/></button><input aria-label="Quantity" type="number" min="0" value={value} onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}/><button onClick={() => onChange(value + 1)} aria-label="Increase quantity"><Icon name="plus" size={16}/></button></div>;
// // }

// // export const money = (value: number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(value);

// import { ReactNode } from "react";

// export type IconName =
//   | "arrow"
//   | "cart"
//   | "check"
//   | "chevron"
//   | "dispatch"
//   | "expert"
//   | "instagram"
//   | "linkedin"
//   | "mail"
//   | "menu"
//   | "minus"
//   | "payment"
//   | "plus"
//   | "quality"
//   | "returns"
//   | "shield"
//   | "trash"
//   | "x"
//   | "grid"
//   | "tag"
//   | "box"
//   | "logout"
//   | "edit"
//   | "alert"
//   | "upload"
//   | "eye"
//   | "chart"
//   | "lock"
//   | "search"
//   | "pin"
//   | "flask"
//   | "sourcing";

// export function Icon({
//   name,
//   size = 20,
//   className,
// }: {
//   name: IconName;
//   size?: number;
//   className?: string;
// }) {
//   const paths: Record<IconName, ReactNode> = {
//     arrow: (
//       <>
//         <path d="M5 12h14" />
//         <path d="m13 6 6 6-6 6" />
//       </>
//     ),
//     cart: (
//       <>
//         <path d="M3 4h2l2.1 9.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 7H6" />
//         <circle cx="9" cy="19" r="1" />
//         <circle cx="17" cy="19" r="1" />
//       </>
//     ),
//     check: <path d="m5 12 4 4L19 6" />,
//     chevron: <path d="m9 18 6-6-6-6" />,
//     dispatch: (
//       <>
//         <path d="M3 6h11v10H3z" />
//         <path d="M14 9h4l3 3v4h-7z" />
//         <circle cx="7" cy="18" r="2" />
//         <circle cx="18" cy="18" r="2" />
//       </>
//     ),
//     expert: (
//       <>
//         <circle cx="12" cy="8" r="4" />
//         <path d="M5 21a7 7 0 0 1 14 0" />
//         <path d="m17.5 8 1.3 1.3L22 6" />
//       </>
//     ),
//     instagram: (
//       <>
//         <rect x="3" y="3" width="18" height="18" rx="5" />
//         <circle cx="12" cy="12" r="4" />
//         <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
//       </>
//     ),
//     linkedin: (
//       <>
//         <path d="M6 9v12M6 5v.01M10 21V9h4v2a4 4 0 0 1 7 3v7M14 21v-7" />
//       </>
//     ),
//     mail: (
//       <>
//         <rect x="3" y="5" width="18" height="14" rx="2" />
//         <path d="m3 7 9 6 9-6" />
//       </>
//     ),
//     menu: (
//       <>
//         <path d="M4 7h16M4 12h16M4 17h16" />
//       </>
//     ),
//     minus: <path d="M5 12h14" />,
//     payment: (
//       <>
//         <rect x="3" y="5" width="18" height="14" rx="3" />
//         <path d="M3 10h18M7 15h3" />
//       </>
//     ),
//     plus: <path d="M12 5v14M5 12h14" />,
//     quality: (
//       <>
//         <path d="m12 3 3 2 3.5.5.5 3.5 2 3-2 3-.5 3.5-3.5.5-3 2-3-2-3.5-.5-.5-3.5-2-3 2-3 .5-3.5 3.5-.5z" />
//         <path d="m9 12 2 2 4-4" />
//       </>
//     ),
//     returns: (
//       <>
//         <path d="M9 7H5v-4" />
//         <path d="M5 7a8 8 0 1 1-1 8" />
//       </>
//     ),
//     shield: (
//       <>
//         <path d="M12 3 5 6v5c0 4.6 2.8 8.1 7 10 4.2-1.9 7-5.4 7-10V6z" />
//         <path d="m9 12 2 2 4-4" />
//       </>
//     ),
//     trash: (
//       <>
//         <path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" />
//       </>
//     ),
//     x: (
//       <>
//         <path d="m6 6 12 12M18 6 6 18" />
//       </>
//     ),
//     grid: (
//       <>
//         <rect x="3" y="3" width="8" height="8" rx="1.5" />
//         <rect x="13" y="3" width="8" height="8" rx="1.5" />
//         <rect x="3" y="13" width="8" height="8" rx="1.5" />
//         <rect x="13" y="13" width="8" height="8" rx="1.5" />
//       </>
//     ),
//     tag: (
//       <>
//         <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z" />
//         <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
//       </>
//     ),
//     box: (
//       <>
//         <path d="M3 8 12 3l9 5-9 5-9-5z" />
//         <path d="M3 8v9l9 5 9-5V8" />
//         <path d="M12 13v9" />
//       </>
//     ),
//     logout: (
//       <>
//         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//         <path d="M16 17l5-5-5-5" />
//         <path d="M21 12H9" />
//       </>
//     ),
//     edit: (
//       <>
//         <path d="M12 20h9" />
//         <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
//       </>
//     ),
//     alert: (
//       <>
//         <path d="M12 9v4" />
//         <path d="M12 17h.01" />
//         <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
//       </>
//     ),
//     upload: (
//       <>
//         <path d="M12 3v12" />
//         <path d="m7 8 5-5 5 5" />
//         <path d="M5 21h14" />
//       </>
//     ),
//     eye: (
//       <>
//         <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
//         <circle cx="12" cy="12" r="3" />
//       </>
//     ),
//     chart: (
//       <>
//         <path d="M3 3v18h18" />
//         <path d="M7 16v-4M12 16V8M17 16v-7" />
//       </>
//     ),
//     lock: (
//       <>
//         <rect x="4" y="11" width="16" height="10" rx="2" />
//         <path d="M8 11V7a4 4 0 0 1 8 0v4" />
//       </>
//     ),
//     search: (
//       <>
//         <circle cx="11" cy="11" r="7" />
//         <path d="m21 21-4.3-4.3" />
//       </>
//     ),
//     pin: (
//       <>
//         <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
//         <circle cx="12" cy="9.5" r="2.5" />
//       </>
//     ),
//     flask: (
//       <>
//         <path d="M9 3h6" />
//         <path d="M10 3v6l-5.2 9A2 2 0 0 0 6.6 21h10.8a2 2 0 0 0 1.8-3l-5.2-9V3" />
//         <path d="M7.5 15h9" />
//       </>
//     ),
//     sourcing: (
//       <>
//         <path d="M3 8 12 3l9 5-9 5-9-5z" />
//         <path d="M3 8v9l9 5 9-5V8" />
//         <path d="m7.5 10.5 9-5" />
//       </>
//     ),
//   };

//   return (
//     <svg
//       className={className}
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       {paths[name]}
//     </svg>
//   );
// }

// export function Button({
//   children,
//   onClick,
//   secondary = false,
//   className = "",
//   type = "button",
//   disabled = false,
// }: {
//   children: ReactNode;
//   onClick?: () => void;
//   secondary?: boolean;
//   className?: string;
//   type?: "button" | "submit";
//   disabled?: boolean;
// }) {
//   return (
//     <button
//       type={type}
//       disabled={disabled}
//       onClick={onClick}
//       className={`button ${secondary ? "button--secondary" : ""} ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

// export function SectionHeading({
//   eyebrow,
//   title,
//   action,
// }: {
//   eyebrow: string;
//   title: string;
//   action?: ReactNode;
// }) {
//   return (
//     <div className="section-heading">
//       <div>
//         <span className="eyebrow">{eyebrow}</span>
//         <h2>{title}</h2>
//       </div>
//       {action}
//     </div>
//   );
// }

// export function Breadcrumb({
//   items,
//   navigate,
// }: {
//   items: { label: string; path?: string }[];
//   navigate: (path: string) => void;
// }) {
//   return (
//     <div className="breadcrumb">
//       <button onClick={() => navigate("/")}>Home</button>
//       {items.map((item) => (
//         <span key={item.label}>
//           <Icon name="chevron" size={14} />
//           {item.path ? (
//             <button onClick={() => navigate(item.path!)}>{item.label}</button>
//           ) : (
//             <em>{item.label}</em>
//           )}
//         </span>
//       ))}
//     </div>
//   );
// }

// export function QuantityControl({
//   value,
//   onChange,
// }: {
//   value: number;
//   onChange: (n: number) => void;
// }) {
//   return (
//     <div className="quantity-control">
//       <button
//         onClick={() => onChange(Math.max(0, value - 1))}
//         aria-label="Decrease quantity"
//       >
//         <Icon name="minus" size={16} />
//       </button>
//       <input
//         aria-label="Quantity"
//         type="number"
//         min="0"
//         value={value}
//         onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
//       />
//       <button
//         onClick={() => onChange(value + 1)}
//         aria-label="Increase quantity"
//       >
//         <Icon name="plus" size={16} />
//       </button>
//     </div>
//   );
// }

// export const money = (value: number) =>
//   new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(
//     value,
//   );

import { ReactNode } from "react";

export type IconName =
  | "arrow"
  | "cart"
  | "check"
  | "chevron"
  | "dispatch"
  | "expert"
  | "instagram"
  | "linkedin"
  | "mail"
  | "menu"
  | "minus"
  | "payment"
  | "plus"
  | "quality"
  | "returns"
  | "shield"
  | "trash"
  | "x"
  | "grid"
  | "tag"
  | "box"
  | "logout"
  | "edit"
  | "alert"
  | "upload"
  | "eye"
  | "chart"
  | "lock"
  | "search"
  | "pin"
  | "flask"
  | "sourcing"
  | "headset";

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.1 9.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 7H6" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="17" cy="19" r="1" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    dispatch: (
      <>
        <path d="M3 6h11v10H3z" />
        <path d="M14 9h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    expert: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
        <path d="m17.5 8 1.3 1.3L22 6" />
      </>
    ),
    headset: (
      <>
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
        <path d="M19 19v1a3 3 0 0 1-3 3h-3" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
      </>
    ),
    linkedin: (
      <>
        <path d="M6 9v12M6 5v.01M10 21V9h4v2a4 4 0 0 1 7 3v7M14 21v-7" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    payment: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M3 10h18M7 15h3" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    quality: (
      <>
        <path d="m12 3 3 2 3.5.5.5 3.5 2 3-2 3-.5 3.5-3.5.5-3 2-3-2-3.5-.5-.5-3.5-2-3 2-3 .5-3.5 3.5-.5z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    returns: (
      <>
        <path d="M9 7H5v-4" />
        <path d="M5 7a8 8 0 1 1-1 8" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.6 2.8 8.1 7 10 4.2-1.9 7-5.4 7-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" />
      </>
    ),
    x: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </>
    ),
    tag: (
      <>
        <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z" />
        <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
      </>
    ),
    box: (
      <>
        <path d="M3 8 12 3l9 5-9 5-9-5z" />
        <path d="M3 8v9l9 5 9-5V8" />
        <path d="M12 13v9" />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="M16 17l5-5-5-5" />
        <path d="M21 12H9" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
    alert: (
      <>
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      </>
    ),
    upload: (
      <>
        <path d="M12 3v12" />
        <path d="m7 8 5-5 5 5" />
        <path d="M5 21h14" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 16v-4M12 16V8M17 16v-7" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
    flask: (
      <>
        <path d="M9 3h6" />
        <path d="M10 3v6l-5.2 9A2 2 0 0 0 6.6 21h10.8a2 2 0 0 0 1.8-3l-5.2-9V3" />
        <path d="M7.5 15h9" />
      </>
    ),
    sourcing: (
      <>
        <path d="M3 8 12 3l9 5-9 5-9-5z" />
        <path d="M3 8v9l9 5 9-5V8" />
        <path d="m7.5 10.5 9-5" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function Button({
  children,
  onClick,
  secondary = false,
  className = "",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`button ${secondary ? "button--secondary" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Breadcrumb({
  items,
  navigate,
}: {
  items: { label: string; path?: string }[];
  navigate: (path: string) => void;
}) {
  return (
    <div className="breadcrumb">
      <button onClick={() => navigate("/")}>Home</button>
      {items.map((item) => (
        <span key={item.label}>
          <Icon name="chevron" size={14} />
          {item.path ? (
            <button onClick={() => navigate(item.path!)}>{item.label}</button>
          ) : (
            <em>{item.label}</em>
          )}
        </span>
      ))}
    </div>
  );
}

export function QuantityControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="quantity-control">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        aria-label="Decrease quantity"
      >
        <Icon name="minus" size={16} />
      </button>
      <input
        aria-label="Quantity"
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
      />
      <button
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}

export const money = (value: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(
    value,
  );
