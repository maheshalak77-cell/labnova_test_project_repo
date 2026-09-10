import { Logo } from "./Logo";

export function Footer({
  navigate,
  openTerms,
}: {
  navigate: (path: string) => void;
  openTerms: () => void;
}) {
  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo light />
          <p>
            Laboratory consumables, glassware and PPE for research, education
            and industry — sourced and supplied across Australia.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <span className="footer-nav__label">Navigate</span>
          <button onClick={() => navigate("/products")}>Products</button>
          <button onClick={() => navigate("/about")}>About Us</button>
          <button onClick={() => navigate("/contact")}>Contact Us</button>
          <button onClick={openTerms}>Terms &amp; Conditions</button>
        </nav>
      </div>
      <div className="footer-rule">
        <span>Laboratory supplies</span>
        <i />
        <span>Scientific solutions</span>
        <i />
        <span>© {new Date().getFullYear()} LabNova Scientific</span>
      </div>
    </footer>
  );
}
