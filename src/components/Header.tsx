import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Icon } from "./ui";

export function Header({ route, navigate, cartCount }: { route: string; navigate: (path: string) => void; cartCount: number }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [route]);
  const active = (path: string) => route === path || route.startsWith(`${path}/`);
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="logo-button" onClick={() => navigate("/")} aria-label="Go to home page"><Logo /></button>
        <nav className={`main-nav ${open ? "main-nav--open" : ""}`} aria-label="Main navigation">
          <button className={active("/products") ? "active" : ""} onClick={() => navigate("/products")}>Products</button>
          <button className={active("/about") ? "active" : ""} onClick={() => navigate("/about")}>About Us</button>
          <button className={active("/contact") ? "active" : ""} onClick={() => navigate("/contact")}>Contact Us</button>
        </nav>
        <div className="header-actions">
          <button className="cart-button" onClick={() => navigate("/cart")} aria-label={`Quote cart with ${cartCount} items`}>
            <Icon name="cart" size={21}/><span className="cart-label">Quote cart</span><b>{cartCount}</b>
          </button>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><Icon name={open ? "x" : "menu"}/></button>
        </div>
      </div>
    </header>
  );
}
