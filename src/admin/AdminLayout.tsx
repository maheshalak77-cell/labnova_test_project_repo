import { ReactNode } from "react";
import { Icon, IconName } from "../components/ui";

const NAV: { path: string; label: string; icon: IconName }[] = [
  { path: "/admin", label: "Dashboard", icon: "grid" },
  { path: "/admin/quotes", label: "Quotations", icon: "mail" },
  { path: "/admin/products", label: "Products", icon: "box" },
  { path: "/admin/categories", label: "Categories", icon: "tag" },
];

export function AdminLayout({
  route,
  navigate,
  onLogout,
  children,
}: {
  route: string;
  navigate: (path: string) => void;
  onLogout: () => void;
  children: ReactNode;
}) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__mark">LN</span>
          <span>LabNova<br/><small>Admin</small></span>
        </div>
        <nav>
          {NAV.map((item) => (
            <button key={item.path} className={route === item.path ? "active" : ""} onClick={() => navigate(item.path)}>
              <Icon name={item.icon} size={18}/> {item.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar__foot">
          <button onClick={() => navigate("/")}><Icon name="arrow" size={16}/> View live site</button>
          <button onClick={onLogout}><Icon name="logout" size={16}/> Log out</button>
        </div>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  );
}
