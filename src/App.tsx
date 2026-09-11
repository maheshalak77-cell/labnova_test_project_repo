import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
// import { AddModal, TermsModal } from "./components/Modals";
import { AddModal } from "./components/Modals";
import { SplashScreen } from "./components/SplashScreen";
import { Icon } from "./components/ui";
import { Home } from "./pages/Home";
import { ProductsPage } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { AboutPage } from "./pages/About";
import { LegalPage } from "./pages/Legal";
import { ContactPage } from "./pages/Contact";
import { CartPage } from "./pages/Cart";
import { AdminLogin } from "./admin/AdminLogin";
import { AdminLayout } from "./admin/AdminLayout";
import { AdminDashboard } from "./admin/AdminDashboard";
import { AdminQuotes } from "./admin/AdminQuotes";
import { AdminCategories } from "./admin/AdminCategories";
import { AdminProducts } from "./admin/AdminProducts";
import { useCatalog } from "./lib/useCatalog";
import { useAdminSession } from "./lib/useAdminSession";
import type { Product } from "./lib/types";

function useRoute() {
  const getRoute = () => window.location.hash.replace(/^#/, "") || "/";
  const [route, setRoute] = useState(getRoute);
  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const navigate = (path: string) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return { route, navigate };
}

type CartLine = { productId: string; quantities: Record<string, number> };
const SPLASH_MIN_MS = 900;

export function App() {
  const { route, navigate } = useRoute();
  const catalog = useCatalog();
  const admin = useAdminSession();

  const [cart, setCart] = useState<CartLine[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  const [contactIntent, setContactIntent] = useState<"question" | null>(null);
  const [categoryIntent, setCategoryIntent] = useState<string | null>(null);

  // Branded splash on first load: visible for at least SPLASH_MIN_MS *and*
  // until the initial product catalog fetch resolves, whichever is longer.
  // Only ever runs once per full page load (this state never resets).
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(
      () => setMinTimeElapsed(true),
      SPLASH_MIN_MS,
    );
    return () => window.clearTimeout(timer);
  }, []);
  const showSplash = !(minTimeElapsed && !catalog.loading);

  // A "Talk to a specialist" click sets a one-shot intent for the Contact
  // page; once we've navigated away from /contact it's cleared so a normal
  // later visit falls back to the cart-based default again.
  useEffect(() => {
    if (route !== "/contact" && contactIntent) setContactIntent(null);
  }, [route, contactIntent]);

  useEffect(() => {
    if (route !== "/products" && categoryIntent) setCategoryIntent(null);
  }, [route, categoryIntent]);

  const askQuestion = () => {
    setContactIntent("question");
    navigate("/contact");
  };

  const browseCategory = (categoryName: string) => {
    setCategoryIntent(categoryName);
    navigate("/products");
  };

  const cartCount = useMemo(
    () =>
      cart.reduce(
        (sum, line) =>
          sum + Object.values(line.quantities).reduce((a, b) => a + b, 0),
        0,
      ),
    [cart],
  );
  const openProduct = (p: Product) => navigate(`/products/${p.id}`);

  const addToCart = (quantities: Record<string, number>) => {
    if (!modalProduct) return;
    const clean = Object.fromEntries(
      Object.entries(quantities).filter(([, qty]) => qty > 0),
    );
    setCart((current) => {
      const found = current.find((x) => x.productId === modalProduct.id);
      if (!found)
        return [...current, { productId: modalProduct.id, quantities: clean }];
      return current.map((x) =>
        x.productId === modalProduct.id
          ? {
              ...x,
              quantities: Object.fromEntries(
                Object.entries(clean).map(([size, qty]) => [
                  size,
                  (x.quantities[size] || 0) + qty,
                ]),
              ),
            }
          : x,
      );
    });
    setToast(`${modalProduct.name} added to your quote cart.`);
    setModalProduct(null);
    window.setTimeout(() => setToast(""), 2800);
  };

  const updateLine = (id: string, size: string, qty: number) =>
    setCart((current) =>
      current
        .map((x) =>
          x.productId === id
            ? { ...x, quantities: { ...x.quantities, [size]: qty } }
            : x,
        )
        .filter((x) => Object.values(x.quantities).some((q) => q > 0)),
    );

  let mainContent;

  if (route === "/admin" || route.startsWith("/admin/")) {
    // ---------------------------------------------------------------------
    // Admin area — entirely separate shell, no public header/footer/cart.
    // ---------------------------------------------------------------------
    if (!admin.isAuthenticated) {
      mainContent = <AdminLogin onLogin={admin.login} />;
    } else {
      const renderAdminPage = () => {
        if (route === "/admin/quotes")
          return <AdminQuotes token={admin.token!} />;
        if (route === "/admin/products")
          return <AdminProducts token={admin.token!} />;
        if (route === "/admin/categories")
          return <AdminCategories token={admin.token!} />;
        return <AdminDashboard token={admin.token!} />;
      };
      mainContent = (
        <AdminLayout route={route} navigate={navigate} onLogout={admin.logout}>
          {renderAdminPage()}
        </AdminLayout>
      );
    }
  } else {
    // ---------------------------------------------------------------------
    // Public marketing site
    // ---------------------------------------------------------------------
    const renderPage = () => {
      if (route === "/") {
        return (
          <Home
            navigate={navigate}
            openProduct={openProduct}
            addProduct={setModalProduct}
            onBrowseCategory={browseCategory}
            products={catalog.products}
            categories={catalog.categories}
            loading={catalog.loading}
            error={catalog.error}
          />
        );
      }
      if (route === "/products") {
        return (
          <ProductsPage
            navigate={navigate}
            openProduct={openProduct}
            addProduct={setModalProduct}
            products={catalog.products}
            categories={catalog.categories}
            loading={catalog.loading}
            error={catalog.error}
            initialCategory={categoryIntent || undefined}
          />
        );
      }
      if (route.startsWith("/products/")) {
        const slug = route.split("/")[2];
        return (
          <ProductDetail
            slug={slug}
            navigate={navigate}
            addProduct={setModalProduct}
            onAskQuestion={askQuestion}
          />
        );
      }
      if (route === "/about") return <AboutPage navigate={navigate} />;
      if (route.startsWith("/legal/")) {
        const slug = route.split("/")[2];
        return <LegalPage slug={slug} navigate={navigate} />;
      }
      if (route === "/contact")
        return (
          <ContactPage
            navigate={navigate}
            cart={cart}
            clearCart={() => setCart([])}
            products={catalog.products}
            initialType={contactIntent || undefined}
          />
        );
      if (route === "/cart")
        return (
          <CartPage
            navigate={navigate}
            cart={cart}
            updateLine={updateLine}
            removeLine={(id) =>
              setCart((c) => c.filter((x) => x.productId !== id))
            }
            products={catalog.products}
          />
        );
      return (
        <Home
          navigate={navigate}
          openProduct={openProduct}
          addProduct={setModalProduct}
          onBrowseCategory={browseCategory}
          products={catalog.products}
          categories={catalog.categories}
          loading={catalog.loading}
          error={catalog.error}
        />
      );
    };

    mainContent = (
      <>
        <Header route={route} navigate={navigate} cartCount={cartCount} />
        <div className="page-transition" key={route}>
          {renderPage()}
        </div>
        <Footer navigate={navigate} />
        {modalProduct && (
          <AddModal
            product={modalProduct}
            onClose={() => setModalProduct(null)}
            onConfirm={addToCart}
          />
        )}
        <div className={`toast ${toast ? "toast--show" : ""}`}>
          <Icon name="check" size={18} />
          {toast}
        </div>
      </>
    );
  }

  return (
    <>
      <SplashScreen visible={showSplash} />
      {mainContent}
    </>
  );
}
